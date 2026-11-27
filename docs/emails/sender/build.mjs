// Builds the HTML of the Sender.net emails from their Markdown content.
//
//   npm run emails
//
// Input:
//   content/*.md   one email per file: front matter (subject, preheader...) + body
//   edition.toml   edition data, used in the content as ${name}
//   template.mjml  shared layout (header, footer, styles)
// Output:
//   html/*.html    ready to paste in Sender as "Custom HTML" (not committed:
//                  generate it whenever it is needed)
//
// In the body, a line with only [[Text]](url) becomes a button, and
//
//   <!-- if dates venue -->
//   text shown when every listed value in edition.toml is defined
//   <!-- else -->
//   text shown otherwise (optional)
//   <!-- endif -->
//
// keeps one of the two texts, depending on edition.toml. A value is defined
// when it exists and does not start with "POR DEFINIR".

import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import mjml2html from "mjml";
import { marked } from "marked";
import { parse as parseToml } from "smol-toml";

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(HERE, "content");
const OUTPUT_DIR = join(HERE, "html");

export const edition = parseToml(
  readFileSync(join(HERE, "edition.toml"), "utf-8")
);
const template = readFileSync(join(HERE, "template.mjml"), "utf-8");
const globals = {
  ...edition,
  images_url: `https://pycamp.es/${edition.year}/emails/`,
};

const BUTTON = /^\[\[(.+?)\]\]\((.+?)\)\s*$/;
const CONDITIONAL =
  /<!--\s*if\s+([\w\s]+?)\s*-->([\s\S]*?)(?:<!--\s*else\s*-->([\s\S]*?))?<!--\s*endif\s*-->/g;

function isDefined(name) {
  const value = globals[name];
  return value !== undefined && !String(value).startsWith("POR DEFINIR");
}

function resolveConditionals(text, source) {
  return text.replace(CONDITIONAL, (_, names, whenDefined, otherwise = "") => {
    for (const name of names.split(/\s+/)) {
      if (!(name in globals)) {
        throw new Error(`${source}: unknown variable "${name}" in <!-- if -->`);
      }
    }
    return names.split(/\s+/).every(isDefined) ? whenDefined : otherwise;
  });
}

function interpolate(text, values, source) {
  return text.replace(/\$\{(\w+)\}/g, (_, name) => {
    if (!(name in values)) {
      throw new Error(`${source}: unknown variable \${${name}}`);
    }
    return String(values[name]);
  });
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readContent(path) {
  const text = readFileSync(path, "utf-8");
  const parts = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!parts) {
    throw new Error(`${path}: missing front matter between --- lines`);
  }
  const frontMatter = {};
  for (const line of parts[1].split("\n")) {
    const field = line.match(/^(\w+):\s*"(.*)"\s*$/);
    if (field) {
      frontMatter[field[1]] = field[2];
    }
  }
  return { frontMatter, body: parts[2] };
}

function bodyToMjml(body, image) {
  const blocks = [];
  if (image) {
    blocks.push(
      `<mj-image src="${globals.images_url}${image}" alt="" padding="0 50px 30px" />`
    );
  }
  let markdown = [];
  const flushText = () => {
    const text = markdown.join("\n").trim();
    if (text) {
      blocks.push(`<mj-text>${marked.parse(text)}</mj-text>`);
    }
    markdown = [];
  };
  for (const line of body.split("\n")) {
    const button = line.match(BUTTON);
    if (button) {
      flushText();
      blocks.push(`<mj-button href="${button[2]}">${button[1]}</mj-button>`);
    } else {
      markdown.push(line);
    }
  }
  flushText();
  return blocks.join("\n");
}

// Builds every email in content/ and returns, for each one, its file name,
// its front matter (with the edition values filled in) and its HTML.
export async function buildEmails() {
  const emails = [];

  const files = readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith(".md"))
    .sort();
  for (const name of files) {
    const { frontMatter, body } = readContent(join(CONTENT_DIR, name));
    const values = {
      ...globals,
      ...Object.fromEntries(
        Object.entries(frontMatter).map(([key, value]) => [
          key,
          interpolate(value, globals, name),
        ])
      ),
    };
    const content = bodyToMjml(
      interpolate(resolveConditionals(body, name), values, name),
      frontMatter.image
    );
    const mjml = interpolate(
      template,
      {
        ...values,
        subject: escapeHtml(values.subject),
        preheader: escapeHtml(values.preheader || ""),
        reason: escapeHtml(values.reason || ""),
      },
      "template.mjml"
    ).replace("<!-- CONTENT -->", content);

    const { html, errors } = await mjml2html(mjml, {
      validationLevel: "strict",
    });
    if (errors?.length) {
      throw new Error(
        `${name}: ${errors.map((error) => error.formattedMessage).join("\n")}`
      );
    }
    const pending = [...new Set(html.match(/POR DEFINIR[^<"]*/g) || [])];
    emails.push({ name: basename(name, ".md"), values, html, pending });
  }
  return emails;
}

function describeSending(values) {
  if (values.workflow) {
    return `Workflow «${values.workflow}»: ${values.trigger || ""}`;
  }
  let when = values.trigger || "A mano";
  if (values.days_before_event) {
    when = `${values.days_before_event} días antes, ${values.send_time}`;
  } else if (values.days_after_event) {
    when = `${values.days_after_event} días después, ${values.send_time}`;
  }
  return `Campaña a ${values.audience || "?"}: ${when}`;
}

// A local page to look through every email in the browser. It lives in html/,
// which is not committed nor published.
function previewPage(emails) {
  const data = emails.map(({ name, values, html, pending }) => ({
    name,
    subject: values.subject,
    preheader: values.preheader || "",
    sending: describeSending(values),
    pending,
    html,
  }));
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Emails del PyCamp ${edition.year}</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; display: flex; height: 100vh; font: 14px/1.4 system-ui, sans-serif; color: #222; }
  nav { width: 340px; overflow-y: auto; border-right: 1px solid #ddd; background: #fafafa; }
  nav h1 { font-size: 15px; margin: 0; padding: 14px 16px; border-bottom: 1px solid #ddd; }
  nav a { display: block; padding: 9px 16px; color: inherit; text-decoration: none; border-bottom: 1px solid #eee; }
  nav a:hover { background: #f0f0f0; }
  nav a.active { background: #e3ecff; }
  nav .file { font-family: ui-monospace, monospace; font-size: 12px; color: #666; }
  nav .warn { color: #b45309; }
  main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  header { padding: 12px 20px; border-bottom: 1px solid #ddd; }
  header .subject { font-size: 17px; font-weight: 600; }
  header .preheader { color: #555; }
  header .meta { color: #777; font-size: 12px; margin-top: 4px; }
  header .pending { color: #b45309; font-size: 12px; margin-top: 4px; }
  .toolbar { margin-top: 8px; }
  .toolbar button { font: inherit; padding: 3px 10px; border: 1px solid #bbb; background: #fff; border-radius: 4px; cursor: pointer; }
  .toolbar button.active { background: #222; color: #fff; border-color: #222; }
  .stage { flex: 1; overflow: auto; background: #e9e9e9; padding: 20px; }
  iframe { display: block; margin: 0 auto; width: 100%; height: 100%; border: 0; background: #fff; box-shadow: 0 1px 6px rgba(0,0,0,.15); }
</style>
</head>
<body>
<nav><h1>Emails del PyCamp ${edition.year}</h1><div id="list"></div></nav>
<main>
  <header>
    <div class="subject" id="subject"></div>
    <div class="preheader" id="preheader"></div>
    <div class="meta" id="meta"></div>
    <div class="pending" id="pending"></div>
    <div class="toolbar">
      <button data-width="100%" class="active">Escritorio</button>
      <button data-width="375px">Móvil</button>
    </div>
  </header>
  <div class="stage"><iframe id="frame"></iframe></div>
</main>
<script>
const emails = ${json};
const list = document.getElementById("list");
const frame = document.getElementById("frame");
const text = (tag, className, value) => {
  const el = document.createElement(tag);
  el.className = className;
  el.textContent = value;
  return el;
};
for (const email of emails) {
  const link = document.createElement("a");
  link.href = "#" + email.name;
  link.append(text("div", "file", email.name + (email.pending.length ? " ⚠" : "")));
  link.append(text("div", "", email.subject));
  list.append(link);
}
function show() {
  const name = decodeURIComponent(location.hash.slice(1));
  const email = emails.find((e) => e.name === name) || emails[0];
  for (const link of list.children) {
    link.classList.toggle("active", link.getAttribute("href") === "#" + email.name);
  }
  document.getElementById("subject").textContent = email.subject;
  document.getElementById("preheader").textContent = email.preheader;
  document.getElementById("meta").textContent = email.name + ".md · " + email.sending;
  document.getElementById("pending").textContent = email.pending.length
    ? "Datos POR DEFINIR: " + email.pending.join(" | ")
    : "";
  frame.srcdoc = email.html;
}
for (const button of document.querySelectorAll(".toolbar button")) {
  button.addEventListener("click", () => {
    for (const other of document.querySelectorAll(".toolbar button")) {
      other.classList.toggle("active", other === button);
    }
    frame.style.width = button.dataset.width;
  });
}
document.addEventListener("keydown", (event) => {
  const step = { ArrowDown: 1, ArrowUp: -1, j: 1, k: -1 }[event.key];
  if (!step) return;
  const name = decodeURIComponent(location.hash.slice(1));
  const index = Math.max(0, emails.findIndex((e) => e.name === name));
  const next = emails[Math.min(emails.length - 1, Math.max(0, index + step))];
  location.hash = next.name;
  event.preventDefault();
});
window.addEventListener("hashchange", show);
show();
</script>
</body>
</html>
`;
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const undefinedValues = [];
  const emails = await buildEmails();
  writeFileSync(join(OUTPUT_DIR, "index.html"), previewPage(emails));
  for (const { name, values, html, pending } of emails) {
    writeFileSync(join(OUTPUT_DIR, `${name}.html`), html);
    if (pending.length) {
      undefinedValues.push(`  ${name}: ${pending.join(" | ")}`);
    }
    console.log(`${name}.md -> html/${name}.html  (${values.subject})`);
  }

  if (undefinedValues.length) {
    console.warn(
      `\nWarning: some values in edition.toml are still POR DEFINIR:\n${undefinedValues.join("\n")}`
    );
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
