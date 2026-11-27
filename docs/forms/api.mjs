// Reads and edits the Google Forms through the Google Forms API.
//
//   npm run forms:api -- login                       authorize (once)
//   npm run forms:api -- status                      where each form is
//   npm run forms:api -- get <form>                  save the form as JSON
//   npm run forms:api -- sync <form>                 compare content/<form>.md
//                                                    with the form: shows the
//                                                    differences and writes
//                                                    build/<form>.sync.json
//   npm run forms:api -- update <form> <requests.json> [--con-borrados]
//                                                    apply a batchUpdate (such
//                                                    as the one sync writes)
//
// <form> is the name of a file in content/ (e.g. inscripcion) or a form id
// (the one in docs.google.com/forms/d/<id>/edit).
//
// Only the forms of the current edition can be changed: `update` refuses a
// form that is not inside the Google Drive folder drive_folder of
// ../emails/edition.toml, and that folder's name has to contain the
// edition's year. New forms are made by copying last year's in Google Drive
// into that folder, never with the API (it would create them outside it).
//
// Credentials, outside the repository:
//   ~/.config/pycamp/google-credentials.json  the OAuth client ("Desktop app")
//                                            downloaded from Google Cloud
//   ~/.config/pycamp/google-token.json        written by `login`
// PYCAMP_GOOGLE_DIR changes that folder.
//
// `sync` changes nothing. `update` refuses to delete items (their answers would
// be lost) unless --con-borrados is given, and to apply a sync file if the
// form changed after it was written.
//
// requests.json is the list of requests of forms.batchUpdate, as documented in
// https://developers.google.com/workspace/forms/api/reference/rest/v1/forms/batchUpdate
// (either the bare list or {"requests": [...]}).

import { createServer } from "node:http";
import { createHash, randomBytes } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { edition } from "../emails/build.mjs";
import { buildForms } from "./forms.mjs";
import { fromApi, parseMarkdown, plan, render } from "./sync.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(HERE, "content");
const OUTPUT_DIR = join(HERE, "build");
const CONFIG_DIR =
  process.env.PYCAMP_GOOGLE_DIR || join(homedir(), ".config", "pycamp");
const CREDENTIALS = join(CONFIG_DIR, "google-credentials.json");
const TOKEN = join(CONFIG_DIR, "google-token.json");

const DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.metadata.readonly";
const SCOPES = ["https://www.googleapis.com/auth/forms.body", DRIVE_SCOPE];
const FORMS_API = "https://forms.googleapis.com/v1/forms";
const DRIVE_API = "https://www.googleapis.com/drive/v3/files";

function fail(message) {
  console.error(message);
  process.exit(1);
}

// --- OAuth ------------------------------------------------------------------

function readClient() {
  if (!existsSync(CREDENTIALS)) {
    fail(
      `Falta ${CREDENTIALS}: es el JSON del cliente OAuth ("Desktop app") descargado de Google Cloud.`
    );
  }
  const json = JSON.parse(readFileSync(CREDENTIALS, "utf-8"));
  const client = json.installed;
  if (!client) {
    fail(
      `${CREDENTIALS} no es de un cliente "Desktop app": créalo de ese tipo en Google Cloud.`
    );
  }
  return client;
}

function openBrowser(url) {
  const command = process.platform === "darwin" ? "open" : "xdg-open";
  spawn(command, [url], { stdio: "ignore", detached: true })
    .on("error", () => {})
    .unref();
}

// Installed-app flow: Google redirects the browser to a local server with the
// authorization code, which is exchanged for a refresh token.
async function login() {
  const client = readClient();
  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  const state = randomBytes(16).toString("hex");

  const code = await new Promise((resolve, reject) => {
    const server = createServer((request, response) => {
      const url = new URL(request.url, "http://127.0.0.1");
      if (url.pathname !== "/") {
        response.writeHead(404).end();
        return;
      }
      const error = url.searchParams.get("error");
      const ok = !error && url.searchParams.get("state") === state;
      response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(
        ok
          ? "Listo: ya puedes cerrar esta pestaña."
          : `Error al autorizar: ${error || "state incorrecto"}`
      );
      server.close();
      if (ok) {
        resolve({
          code: url.searchParams.get("code"),
          redirect: server.redirect,
        });
      } else {
        reject(new Error(error || "state incorrecto"));
      }
    });
    server.listen(0, "127.0.0.1", () => {
      server.redirect = `http://127.0.0.1:${server.address().port}`;
      const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      url.search = new URLSearchParams({
        client_id: client.client_id,
        redirect_uri: server.redirect,
        response_type: "code",
        scope: SCOPES.join(" "),
        code_challenge: challenge,
        code_challenge_method: "S256",
        state,
        access_type: "offline",
        prompt: "consent",
      });
      console.log(
        `Abre esta URL en el navegador si no se abre sola:\n\n${url}\n`
      );
      openBrowser(url.toString());
    });
  });

  const token = await tokenRequest(client, {
    grant_type: "authorization_code",
    code: code.code,
    redirect_uri: code.redirect,
    code_verifier: verifier,
  });
  if (!token.refresh_token) {
    fail("Google no devolvió un refresh token: vuelve a ejecutar login.");
  }
  mkdirSync(CONFIG_DIR, { recursive: true });
  writeFileSync(
    TOKEN,
    JSON.stringify(
      { refresh_token: token.refresh_token, scope: token.scope },
      null,
      2
    ),
    { mode: 0o600 }
  );
  console.log(`Autorizado. Token guardado en ${TOKEN}\n`);
}

async function tokenRequest(client, params) {
  const response = await fetch(
    client.token_uri || "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      body: new URLSearchParams({
        client_id: client.client_id,
        client_secret: client.client_secret,
        ...params,
      }),
    }
  );
  const json = await response.json();
  if (!response.ok) {
    if (json.error === "invalid_grant") {
      fail(
        "La autorización caducó o se revocó: ejecuta `npm run forms:api -- login`."
      );
    }
    fail(`Error de OAuth: ${json.error} ${json.error_description || ""}`);
  }
  return json;
}

let accessToken;

async function getAccessToken() {
  if (accessToken) {
    return accessToken;
  }
  if (!existsSync(TOKEN)) {
    fail("Todavía no hay autorización: ejecuta `npm run forms:api -- login`.");
  }
  const { refresh_token, scope = "" } = JSON.parse(
    readFileSync(TOKEN, "utf-8")
  );
  if (!scope.split(" ").includes(DRIVE_SCOPE)) {
    fail(
      "La autorización no incluye leer las carpetas de Google Drive: ejecuta `npm run forms:api -- login`."
    );
  }
  const token = await tokenRequest(readClient(), {
    grant_type: "refresh_token",
    refresh_token,
  });
  accessToken = token.access_token;
  return accessToken;
}

async function api(method, url, body) {
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: body && JSON.stringify(body),
  });
  const json = await response.json();
  if (!response.ok) {
    const error = json.error || {};
    const hint =
      error.status === "PERMISSION_DENIED" || error.status === "NOT_FOUND"
        ? "\n(¿el formulario es de otra cuenta, o el id es el público en vez del de edición?)"
        : "";
    fail(
      `Error de la API (${response.status}): ${error.message || JSON.stringify(json)}${hint}`
    );
  }
  return json;
}

// --- Edition folder ---------------------------------------------------------

async function driveFile(id) {
  return api(
    "GET",
    `${DRIVE_API}/${id}?fields=name,parents,trashed&supportsAllDrives=true`
  );
}

let editionFolder;

// The Drive folder of the current edition, checked against its year.
async function getEditionFolder() {
  if (editionFolder) {
    return editionFolder;
  }
  const id = String(edition.drive_folder || "");
  if (!id || id.startsWith("POR DEFINIR")) {
    fail(
      `Falta drive_folder en edition.toml: el id de la carpeta "PyCampES ${edition.year}" de Google Drive.`
    );
  }
  const folder = await driveFile(id);
  if (!folder.name.includes(String(edition.year))) {
    fail(
      `drive_folder de edition.toml es la carpeta "${folder.name}", que no es la de ${edition.year} (year en edition.toml).`
    );
  }
  editionFolder = { id, name: folder.name };
  return editionFolder;
}

// Name of the folder that holds a form, and whether it is the edition's.
async function location(formId) {
  const file = await driveFile(formId);
  const folder = await getEditionFolder();
  const parents = file.parents || [];
  if (parents.includes(folder.id) && !file.trashed) {
    return { ok: true, folder: folder.name };
  }
  const names = await Promise.all(
    parents.map((parent) => driveFile(parent).then((f) => f.name))
  );
  const where = names.length ? names.join(", ") : "fuera de cualquier carpeta";
  return {
    ok: false,
    folder: file.trashed ? `${where}, en la papelera` : where,
  };
}

async function assertInEdition(formId) {
  const { ok, folder } = await location(formId);
  if (!ok) {
    const { name } = await getEditionFolder();
    fail(
      `No se cambia: el formulario está en "${folder}", no en "${name}". ` +
        "Solo se pueden cambiar los formularios de la edición actual."
    );
  }
}

// --- Forms ------------------------------------------------------------------

function contentForms() {
  const forms = {};
  for (const file of readdirSync(CONTENT_DIR).filter((f) =>
    f.endsWith(".md")
  )) {
    const text = readFileSync(join(CONTENT_DIR, file), "utf-8");
    const frontMatter = text.match(/^---\n([\s\S]*?)\n---/);
    const form = frontMatter && frontMatter[1].match(/^form:\s*"(.*)"\s*$/m);
    forms[basename(file, ".md")] = form ? form[1] : "";
  }
  return forms;
}

// Returns { name, id } from a content/ name or a form id.
function resolve(value) {
  if (!value) {
    fail("Falta el formulario: un nombre de content/ o un id.");
  }
  const forms = contentForms();
  if (!(value in forms)) {
    return { name: value, id: value };
  }
  const id = forms[value];
  if (!id) {
    fail(`content/${value}.md no tiene "form" todavía.`);
  }
  if (id.startsWith("e/")) {
    fail(
      `content/${value}.md tiene el id público (${id}). La API necesita el de la URL de edición: ` +
        "docs.google.com/forms/d/<id>/edit. Pásalo directamente o cámbialo en el archivo."
    );
  }
  return { name: value, id };
}

async function get(value) {
  const { name, id } = resolve(value);
  const form = await api("GET", `${FORMS_API}/${id}`);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const path = join(OUTPUT_DIR, `${name}.api.json`);
  writeFileSync(path, JSON.stringify(form, null, 2) + "\n");
  console.log(
    `${form.info.title}: ${(form.items || []).length} elementos → ${path}`
  );
}

async function update(value, requestsPath, allowDeletes) {
  const { id } = resolve(value);
  if (!requestsPath) {
    fail("Falta el archivo JSON con las peticiones de batchUpdate.");
  }
  const json = JSON.parse(readFileSync(requestsPath, "utf-8"));
  const requests = Array.isArray(json) ? json : json.requests;
  if (json.form && json.form !== id) {
    fail(`${requestsPath} es de otro formulario (${json.form}), no de ${id}.`);
  }
  if (!requests.length) {
    console.log("No hay nada que cambiar.");
    return;
  }
  const deletes = requests.filter((request) => request.deleteItem).length;
  if (deletes && !allowDeletes) {
    fail(
      `Las peticiones borran ${deletes} elemento(s) y se perderían sus respuestas. ` +
        "Si es lo que quieres, añade --con-borrados."
    );
  }
  await assertInEdition(id);
  const body = { requests };
  if (json.revisionId) {
    // Fails if the form changed after `sync` compared it.
    body.writeControl = { requiredRevisionId: json.revisionId };
  }
  const result = await api("POST", `${FORMS_API}/${id}:batchUpdate`, body);
  console.log(
    `Aplicadas ${requests.length} peticiones. Revisión: ${result.writeControl?.requiredRevisionId}`
  );
}

async function sync(value) {
  const { name, id } = resolve(value);
  const built = buildForms().find((form) => form.name === name);
  if (!built) {
    fail(`sync necesita un nombre de content/, no un id.`);
  }
  const pending = built.text
    .split("\n")
    .filter((line) => line.includes("POR DEFINIR"));
  if (pending.length) {
    fail(
      `build/${name}.md todavía tiene datos POR DEFINIR de edition.toml:\n` +
        pending.map((line) => `  ${line.trim()}`).join("\n")
    );
  }
  const wanted = parseMarkdown(built.text);
  const apiForm = await api("GET", `${FORMS_API}/${id}`);
  const { requests, changes, manual, deletes } = plan(wanted, apiForm);

  const before = join(OUTPUT_DIR, `${name}.sync-antes.md`);
  const after = join(OUTPUT_DIR, `${name}.sync-despues.md`);
  writeFileSync(before, render(fromApi(apiForm)));
  writeFileSync(after, render(wanted));
  const diff = spawnSync(
    "git",
    [
      "diff",
      "--no-index",
      "--color=always",
      "--word-diff=color",
      before,
      after,
    ],
    { encoding: "utf-8" }
  );
  const output = join(OUTPUT_DIR, `${name}.sync.json`);
  writeFileSync(
    output,
    JSON.stringify(
      { form: id, revisionId: apiForm.revisionId, requests },
      null,
      2
    ) + "\n"
  );

  if (!changes.length) {
    console.log(`${name}: el formulario ya está igual que content/${name}.md`);
  } else {
    console.log(
      `${name}: diferencias (en rojo, lo que hay ahora en Google Forms; en verde, cómo quedaría)\n`
    );
    console.log(diff.stdout);
    console.log("Cambios:");
    console.log(changes.map((change) => `  ${change}`).join("\n"));
  }
  if (manual.length) {
    console.log("\nA mano en Google Forms:");
    console.log(manual.map((line) => `  ${line}`).join("\n"));
  }
  console.log(
    "\nEl mensaje al enviar y el de formulario cerrado no están en la API: " +
      `revísalos con npm run forms:check -- ${name}.`
  );
  if (changes.length) {
    console.log(
      `\nPara aplicarlo: npm run forms:api -- update ${name} ${output}` +
        (deletes ? " --con-borrados" : "")
    );
  }
}

// Lists the forms of content/ and the folder they are in.
async function status() {
  const folder = await getEditionFolder();
  console.log(`Edición ${edition.year}: carpeta "${folder.name}"\n`);
  for (const [name, id] of Object.entries(contentForms())) {
    if (!id) {
      console.log(`  · ${name}: sin formulario todavía`);
    } else if (id.startsWith("e/")) {
      console.log(`  · ${name}: tiene el id público, falta el de edición`);
    } else {
      const form = await api("GET", `${FORMS_API}/${id}`);
      const { ok, folder } = await location(id);
      console.log(
        `  ${ok ? "✓" : "✗"} ${name}: ${form.info.title}` +
          (ok ? "" : `\n      en "${folder}": no se puede cambiar`)
      );
    }
  }
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  switch (command) {
    case "login":
      await login();
      console.log("Formularios de content/:");
      await status();
      break;
    case "status":
      await status();
      break;
    case "get":
      await get(args[0]);
      break;
    case "sync":
      await sync(args[0]);
      break;
    case "update":
      await update(
        args[0],
        args.filter((arg) => !arg.startsWith("--"))[1],
        args.includes("--con-borrados")
      );
      break;
    default:
      fail(
        "Uso: npm run forms:api -- login | status | get <form> | sync <form> | update <form> <requests.json> [--con-borrados]"
      );
  }
}

await main();
