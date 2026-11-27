// Builds the texts of the Google Forms from their Markdown templates, and
// checks them against the published forms.
//
//   npm run forms                    generate build/<name>.md from content/
//   npm run forms:check [-- name...] compare them with the published forms
//
// Input:
//   content/*.md   one form per file: front matter with the form id, then its
//                  texts and questions in the format described in README.md
//   ../emails/sender/edition.toml
//                  edition data, used in the content as ${name} (the same file
//                  the emails use)
// Output:
//   build/<name>.md       the texts to copy into Google Forms
//   build/<name>.live.md  (check) what the published form has now
// build/ is not committed.
//
// Google Forms can only be edited from its web editor: these files are the
// reference to copy from, and `check` says what is still different.

import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { globals, interpolate } from "../emails/sender/build.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(HERE, "content");
const OUTPUT_DIR = join(HERE, "build");

function readTemplate(path) {
  const text = readFileSync(path, "utf-8");
  const parts = text.match(/^---\n([\s\S]*?)\n---\n\n?([\s\S]*)$/);
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

export function buildForms() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const forms = [];
  const files = readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith(".md"))
    .sort();
  for (const file of files) {
    const name = basename(file, ".md");
    const { frontMatter, body } = readTemplate(join(CONTENT_DIR, file));
    const text = interpolate(body, globals, file);
    writeFileSync(join(OUTPUT_DIR, `${name}.md`), text);
    const pending = [
      ...new Set(
        [...body.matchAll(/\$\{(\w+)\}/g)]
          .map((match) => match[1])
          .filter((name) => String(globals[name]).startsWith("POR DEFINIR"))
      ),
    ];
    forms.push({ name, form: frontMatter.form, text, pending });
  }
  return forms;
}

// --- Published form -> Markdown -------------------------------------------
//
// The public page of a form embeds its structure as JSON in
// FB_PUBLIC_LOAD_DATA_. It is not a documented API: if Google changes it,
// this is the part to fix.

const TYPES = {
  0: "texto corto",
  1: "texto largo",
  2: "una opción",
  3: "desplegable",
  4: "varias opciones",
  5: "escala",
  7: "cuadrícula",
  9: "fecha",
  10: "hora",
  13: "subir archivo",
  18: "valoración",
};
const SECTION = 8;
const TITLE = 6;
const IMAGE = 11;
const VIDEO = 12;
// Where an option sends the person (values of its "go to section" field).
const NAVIGATION = {
  "-3": "enviar el formulario",
  "-1": "volver al principio",
};
const EMAIL_COLLECTION = {
  2: "verificado con su cuenta de Google",
  3: "lo escribe quien responde",
};

function get(value, ...indexes) {
  for (const index of indexes) {
    if (!Array.isArray(value) || index >= value.length) {
      return undefined;
    }
    value = value[index];
  }
  return value ?? undefined;
}

function quote(text) {
  return text
    .trim()
    .split(/\r?\n/)
    .map((line) => `> ${line}`.trimEnd())
    .join("\n");
}

function question(number, item, sections) {
  const [, rawTitle, help, kind] = item;
  const q = get(item, 4, 0) || [];
  let detail = TYPES[kind] || `tipo ${kind}`;
  let lines = [];

  if (kind === 5) {
    const values = (get(q, 1) || []).map((option) => option[0]);
    const labels = get(q, 3) || [];
    if (values.length) {
      detail = `escala de ${values[0]} a ${values.at(-1)}`;
    }
    if (labels.some(Boolean)) {
      detail += ` (${labels[0] || ""} … ${labels[1] || ""})`;
    }
  } else if (kind === 7) {
    const columns = (get(q, 1) || []).map((column) => column[0]);
    const rows = item[4].map((row) => get(row, 3, 0));
    lines = [
      `- Filas: ${rows.join(" · ")}`,
      `- Columnas: ${columns.join(" · ")}`,
    ];
  } else if ([2, 3, 4].includes(kind)) {
    for (const option of get(q, 1) || []) {
      if (get(option, 4) === 1) {
        lines.push("- Otro: …");
        continue;
      }
      let line = `- ${option[0]}`;
      const goto = get(option, 2);
      if (goto !== undefined && sections.has(goto)) {
        line += ` → ir a «${sections.get(goto)}»`;
      } else if (goto !== undefined && NAVIGATION[goto]) {
        line += ` → ${NAVIGATION[goto]}`;
      }
      lines.push(line);
    }
  }
  const required = get(q, 2);
  if (required !== undefined) {
    detail += required ? ", obligatoria" : ", opcional";
  }
  const validation = get(q, 4, 0, 3);
  if (validation) {
    detail += `, valida: «${validation}»`;
  }

  const out = [`**${number}. ${(rawTitle || "").trim()}** _(${detail})_`];
  if (help) {
    out.push("", quote(help));
  }
  if (lines.length) {
    out.push("", ...lines);
  }
  out.push("");
  return out;
}

export function formToMarkdown(data) {
  const form = data[1];
  const items = form[1] || [];
  const sections = new Map(
    items
      .filter((item) => item[3] === SECTION)
      .map((item) => [item[0], (item[1] || "(sección sin título)").trim()])
  );

  const out = [`# ${(form[8] || data[3]).trim()}`, ""];
  const email = EMAIL_COLLECTION[get(form, 10, 6)];
  if (email) {
    out.push(`_Pide el email: ${email}._`, "");
  }
  if (form[0]) {
    out.push(quote(form[0]), "");
  }

  let number = 0;
  for (const item of items) {
    const [, rawTitle, help, kind] = item;
    const title = (rawTitle || "").trim();
    if (kind === SECTION || kind === TITLE) {
      const heading = kind === SECTION ? "##" : "###";
      out.push(`${heading} ${title || "(sección sin título)"}`, "");
      if (help) {
        out.push(quote(help), "");
      }
    } else if (kind === IMAGE || kind === VIDEO) {
      out.push(
        `_[${kind === IMAGE ? "imagen" : "vídeo"}: ${title || "sin título"}]_`,
        ""
      );
    } else {
      number += 1;
      out.push(...question(number, item, sections));
    }
  }

  out.push(
    "## Mensaje al enviar",
    "",
    quote(get(form, 2, 0) || "(el mensaje por defecto de Google)"),
    ""
  );
  const closed = get(form, 7, 1);
  if (closed) {
    out.push("## Mensaje con el formulario cerrado", "", quote(closed), "");
  }
  return out.join("\n");
}

async function fetchForm(id) {
  const response = await fetch(
    `https://docs.google.com/forms/d/${id}/viewform`,
    {
      headers: { "User-Agent": "Mozilla/5.0" },
    }
  );
  const html = await response.text();
  const match = html.match(/FB_PUBLIC_LOAD_DATA_ = ([\s\S]*?);<\/script>/);
  return match ? JSON.parse(match[1]) : null;
}

async function check(forms, only) {
  let different = false;
  for (const { name, form } of forms) {
    if (only.length && !only.includes(name)) {
      continue;
    }
    if (!form) {
      console.log(
        `${name}: sin formulario todavía (falta "form" en content/${name}.md)`
      );
      continue;
    }
    const data = await fetchForm(form);
    if (!data) {
      console.log(
        `${name}: no se pueden leer las preguntas. ¿El formulario está cerrado?`
      );
      different = true;
      continue;
    }
    const live = join(OUTPUT_DIR, `${name}.live.md`);
    writeFileSync(live, formToMarkdown(data));
    const diff = spawnSync(
      "git",
      [
        "diff",
        "--no-index",
        "--color=always",
        "--word-diff=color",
        join(OUTPUT_DIR, `${name}.md`),
        live,
      ],
      { encoding: "utf-8" }
    );
    if (diff.status === 0) {
      console.log(`${name}: igual que el formulario publicado`);
    } else {
      different = true;
      console.log(
        `${name}: el formulario publicado es distinto (en rojo, lo que falta poner en Google Forms; en verde, lo que hay que quitar)`
      );
      console.log(diff.stdout);
    }
  }
  return different;
}

async function main() {
  const [command, ...only] = process.argv.slice(2);
  const forms = buildForms();
  if (command === "check") {
    process.exit((await check(forms, only)) ? 1 : 0);
  }
  for (const { name, pending } of forms) {
    console.log(`content/${name}.md -> build/${name}.md`);
    if (pending.length) {
      console.warn(`  POR DEFINIR en edition.toml: ${pending.join(", ")}`);
    }
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
