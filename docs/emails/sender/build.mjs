// Builds the HTML of the Sender.net emails from their Markdown content.
//
//   npm run emails
//
// Input:
//   content/*.md   one email per file: front matter (subject, preheader...) + body
//   edition.toml   edition data, used in the content as ${name}
//   template.mjml  shared layout (header, footer, styles)
// Output:
//   html/*.html    ready to paste in Sender as "Custom HTML"
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

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const undefinedValues = [];
  for (const { name, values, html, pending } of await buildEmails()) {
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
