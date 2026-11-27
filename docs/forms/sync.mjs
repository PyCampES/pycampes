// Compares a form written in Markdown (the format of content/, described in
// README.md) with the form as the Google Forms API returns it, and works out
// the forms.batchUpdate requests that make the second match the first.
//
// Both are turned into the same model, a list of items:
//   { kind: "section" | "text" | "image" | "video" | "question" | "grid",
//     title, description, question?, grid? }
// Items are paired by kind and title; an existing item is always updated in
// place, never deleted and created again, because a question that is created
// again loses the link with the answers it already has. Items that cannot be
// paired become deletions and creations, and the plan says so.

import { randomBytes } from "node:crypto";

const EMAIL = {
  VERIFIED: "verificado con su cuenta de Google",
  RESPONDER_INPUT: "lo escribe quien responde",
};
const TYPES = {
  short: "texto corto",
  paragraph: "texto largo",
  RADIO: "una opción",
  DROP_DOWN: "desplegable",
  CHECKBOX: "varias opciones",
  date: "fecha",
  time: "hora",
  file: "subir archivo",
  rating: "valoración",
};
const NAVIGATION = {
  SUBMIT_FORM: "enviar el formulario",
  RESTART_FORM: "volver al principio",
};
const KIND_NAMES = {
  section: "sección",
  text: "bloque de texto",
  image: "imagen",
  video: "vídeo",
  question: "pregunta",
  grid: "cuadrícula",
};
const CHOICE = ["RADIO", "CHECKBOX", "DROP_DOWN"];

export function normalize(text) {
  return (text || "")
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

function same(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

// --- Markdown -> model ------------------------------------------------------

function parseDetail(detail) {
  const question = { required: false };
  let rest = detail;
  const validation = rest.match(/, valida: «(.*)»$/);
  if (validation) {
    question.validation = validation[1];
    rest = rest.slice(0, validation.index);
  }
  const required = rest.match(/, (obligatoria|opcional)$/);
  if (required) {
    question.required = required[1] === "obligatoria";
    rest = rest.slice(0, required.index);
  }
  const scale = rest.match(
    /^escala de (-?\d+) a (-?\d+)(?: \((.*) … (.*)\))?$/
  );
  if (scale) {
    question.type = "scale";
    question.scale = {
      low: Number(scale[1]),
      high: Number(scale[2]),
      lowLabel: scale[3] || "",
      highLabel: scale[4] || "",
    };
  } else if (rest === "cuadrícula") {
    question.type = "grid";
  } else {
    const type = Object.keys(TYPES).find((key) => TYPES[key] === rest);
    if (!type) {
      throw new Error(`tipo de pregunta desconocido: «${rest}»`);
    }
    question.type = type;
  }
  return question;
}

function parseOption(text) {
  if (text === "Otro: …") {
    return { value: "", isOther: true, goto: "" };
  }
  const arrow = text.lastIndexOf(" → ");
  if (arrow === -1) {
    return { value: text, isOther: false, goto: "" };
  }
  const target = text.slice(arrow + 3);
  const section = target.match(/^ir a «(.*)»$/);
  const action = Object.keys(NAVIGATION).find((k) => NAVIGATION[k] === target);
  if (!section && !action) {
    return { value: text, isOther: false, goto: "" };
  }
  return {
    value: text.slice(0, arrow),
    isOther: false,
    goto: section ? `section:${section[1]}` : action,
  };
}

export function parseMarkdown(text) {
  const lines = text.split(/\r?\n/);
  const form = { title: "", description: "", email: "", items: [] };
  let i = 0;

  const quote = () => {
    const out = [];
    while (i < lines.length && lines[i].startsWith(">")) {
      out.push(lines[i].replace(/^> ?/, ""));
      i += 1;
    }
    return normalize(out.join("\n"));
  };
  const skipBlank = () => {
    while (i < lines.length && !lines[i].trim()) {
      i += 1;
    }
  };
  const untitled = (title) =>
    title === "(sección sin título)" ? "" : title.trim();

  skipBlank();
  const title = (lines[i] || "").match(/^# (.*)$/);
  if (!title) {
    throw new Error("el formulario tiene que empezar con «# Título»");
  }
  form.title = title[1].trim();
  i += 1;
  skipBlank();
  const email = (lines[i] || "").match(/^_Pide el email: (.*)\._$/);
  if (email) {
    form.email = Object.keys(EMAIL).find((k) => EMAIL[k] === email[1]) || "";
    i += 1;
    skipBlank();
  }
  form.description = quote();

  while (i < lines.length) {
    skipBlank();
    if (i >= lines.length) {
      break;
    }
    const line = lines[i];
    let match;
    if (/^## Mensaje (al enviar|con el formulario cerrado)$/.test(line)) {
      // Not in the API: these stay manual.
      break;
    } else if ((match = line.match(/^(##|###) (.*)$/))) {
      i += 1;
      skipBlank();
      form.items.push({
        kind: match[1] === "##" ? "section" : "text",
        title: untitled(match[2]),
        description: quote(),
      });
    } else if ((match = line.match(/^_\[(imagen|vídeo): (.*)\]_$/))) {
      i += 1;
      form.items.push({
        kind: match[1] === "imagen" ? "image" : "video",
        title: match[2] === "sin título" ? "" : match[2],
        description: "",
      });
    } else if ((match = line.match(/^\*\*\d+\. (.*)\*\* _\((.*)\)_$/))) {
      i += 1;
      const question = parseDetail(match[2]);
      skipBlank();
      const description = quote();
      skipBlank();
      const options = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        options.push(lines[i].slice(2));
        i += 1;
      }
      const item = { kind: "question", title: match[1].trim(), description };
      if (question.type === "grid") {
        const rows = options.find((o) => o.startsWith("Filas: "));
        const columns = options.find((o) => o.startsWith("Columnas: "));
        item.kind = "grid";
        item.grid = {
          required: question.required,
          rows: rows ? rows.slice(7).split(" · ") : [],
          columns: columns ? columns.slice(10).split(" · ") : [],
        };
      } else {
        if (CHOICE.includes(question.type)) {
          question.options = options.map(parseOption);
        }
        item.question = question;
      }
      form.items.push(item);
    } else {
      throw new Error(`línea ${i + 1} no reconocida: «${line}»`);
    }
  }
  return form;
}

// --- API -> model -----------------------------------------------------------

export function fromApi(apiForm) {
  const items = apiForm.items || [];
  const sections = new Map(
    items
      .filter((item) => item.pageBreakItem)
      .map((item) => [item.itemId, (item.title || "").trim()])
  );
  const goto = (option) => {
    if (option.goToSectionId) {
      return `section:${sections.get(option.goToSectionId) ?? option.goToSectionId}`;
    }
    return NAVIGATION[option.goToAction] ? option.goToAction : "";
  };

  const model = {
    title: (apiForm.info.title || apiForm.info.documentTitle || "").trim(),
    description: normalize(apiForm.info.description),
    email: EMAIL[apiForm.settings?.emailCollectionType]
      ? apiForm.settings.emailCollectionType
      : "",
    items: [],
  };
  for (const api of items) {
    const item = {
      title: (api.title || "").trim(),
      description: normalize(api.description),
      api,
    };
    if (api.pageBreakItem) {
      item.kind = "section";
    } else if (api.textItem) {
      item.kind = "text";
    } else if (api.imageItem) {
      item.kind = "image";
    } else if (api.videoItem) {
      item.kind = "video";
    } else if (api.questionGroupItem) {
      const group = api.questionGroupItem;
      item.kind = "grid";
      item.grid = {
        required: Boolean(group.questions?.[0]?.required),
        rows: (group.questions || []).map((q) => q.rowQuestion?.title || ""),
        columns: (group.grid?.columns?.options || []).map((o) => o.value),
      };
    } else {
      const q = api.questionItem.question;
      const question = { required: Boolean(q.required) };
      if (q.choiceQuestion) {
        question.type = q.choiceQuestion.type;
        question.options = (q.choiceQuestion.options || []).map((o) => ({
          value: o.isOther ? "" : o.value,
          isOther: Boolean(o.isOther),
          goto: goto(o),
        }));
      } else if (q.textQuestion) {
        question.type = q.textQuestion.paragraph ? "paragraph" : "short";
      } else if (q.scaleQuestion) {
        const s = q.scaleQuestion;
        question.type = "scale";
        question.scale = {
          low: s.low ?? 0,
          high: s.high,
          lowLabel: s.lowLabel || "",
          highLabel: s.highLabel || "",
        };
      } else if (q.dateQuestion) {
        question.type = "date";
      } else if (q.timeQuestion) {
        question.type = "time";
      } else if (q.fileUploadQuestion) {
        question.type = "file";
      } else if (q.ratingQuestion) {
        question.type = "rating";
      } else {
        question.type = "unknown";
      }
      item.kind = "question";
      item.question = question;
    }
    model.items.push(item);
  }
  return model;
}

// --- model -> Markdown (to show the differences) ------------------------------

function quote(text) {
  return text
    .split("\n")
    .map((line) => `> ${line}`.trimEnd())
    .join("\n");
}

export function render(model) {
  const out = [`# ${model.title}`, ""];
  if (model.email) {
    out.push(`_Pide el email: ${EMAIL[model.email]}._`, "");
  }
  if (model.description) {
    out.push(quote(model.description), "");
  }
  let number = 0;
  for (const item of model.items) {
    if (item.kind === "section" || item.kind === "text") {
      const heading = item.kind === "section" ? "##" : "###";
      out.push(`${heading} ${item.title || "(sección sin título)"}`, "");
      if (item.description) {
        out.push(quote(item.description), "");
      }
      continue;
    }
    if (item.kind === "image" || item.kind === "video") {
      const name = item.kind === "image" ? "imagen" : "vídeo";
      out.push(`_[${name}: ${item.title || "sin título"}]_`, "");
      continue;
    }
    number += 1;
    let detail;
    const lines = [];
    if (item.kind === "grid") {
      detail = `cuadrícula, ${item.grid.required ? "obligatoria" : "opcional"}`;
      lines.push(
        `- Filas: ${item.grid.rows.join(" · ")}`,
        `- Columnas: ${item.grid.columns.join(" · ")}`
      );
    } else {
      const q = item.question;
      if (q.type === "scale") {
        detail = `escala de ${q.scale.low} a ${q.scale.high}`;
        if (q.scale.lowLabel || q.scale.highLabel) {
          detail += ` (${q.scale.lowLabel} … ${q.scale.highLabel})`;
        }
      } else {
        detail = TYPES[q.type] || q.type;
      }
      detail += q.required ? ", obligatoria" : ", opcional";
      for (const option of q.options || []) {
        if (option.isOther) {
          lines.push("- Otro: …");
        } else if (option.goto.startsWith("section:")) {
          lines.push(`- ${option.value} → ir a «${option.goto.slice(8)}»`);
        } else if (option.goto) {
          lines.push(`- ${option.value} → ${NAVIGATION[option.goto]}`);
        } else {
          lines.push(`- ${option.value}`);
        }
      }
    }
    out.push(`**${number}. ${item.title}** _(${detail})_`, "");
    if (item.description) {
      out.push(quote(item.description), "");
    }
    if (lines.length) {
      out.push(...lines, "");
    }
  }
  return out.join("\n");
}

// --- plan -------------------------------------------------------------------

const key = (item) => `${item.kind}\u0000${item.title}`;

// Share of words in common between two titles (0 to 1).
function similarity(a, b) {
  const words = (text) =>
    new Set(text.toLowerCase().match(/[\p{L}\p{N}]+/gu) || []);
  const x = words(a);
  const y = words(b);
  const common = [...x].filter((word) => y.has(word)).length;
  return common / Math.max(x.size, y.size, 1);
}

// Pairs the items of `wanted` (Markdown) with those of `current` (API), in
// order: first by kind and title, then, between two paired items, the items in
// the same positions when both stretches have the same kinds (an edited title),
// or else items of the same kind with similar titles.
function align(wanted, current) {
  const n = wanted.length;
  const m = current.length;
  const lcs = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      lcs[i][j] =
        key(wanted[i]) === key(current[j])
          ? lcs[i + 1][j + 1] + 1
          : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }
  const anchors = [];
  for (let i = 0, j = 0; i < n && j < m;) {
    if (key(wanted[i]) === key(current[j])) {
      anchors.push([i, j]);
      i += 1;
      j += 1;
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      i += 1;
    } else {
      j += 1;
    }
  }
  const pairs = [];
  let previous = [-1, -1];
  for (const anchor of [...anchors, [n, m]]) {
    const gapWanted = [];
    const gapCurrent = [];
    for (let i = previous[0] + 1; i < anchor[0]; i++) gapWanted.push(i);
    for (let j = previous[1] + 1; j < anchor[1]; j++) gapCurrent.push(j);
    const kinds = (gap, items) => gap.map((k) => items[k].kind).join();
    if (
      gapWanted.length === gapCurrent.length &&
      kinds(gapWanted, wanted) === kinds(gapCurrent, current)
    ) {
      gapWanted.forEach((i, k) => pairs.push([i, gapCurrent[k]]));
    } else {
      // Otherwise, items of the same kind whose titles share most words.
      let next = 0;
      for (const i of gapWanted) {
        const k = gapCurrent.findIndex(
          (j, index) =>
            index >= next &&
            wanted[i].kind === current[j].kind &&
            similarity(wanted[i].title, current[j].title) >= 0.5
        );
        if (k !== -1) {
          pairs.push([i, gapCurrent[k]]);
          next = k + 1;
        }
      }
    }
    if (anchor[0] < n) {
      pairs.push(anchor);
    }
    previous = anchor;
  }
  return pairs;
}

function newId(used) {
  let id;
  do {
    id = randomBytes(4).toString("hex");
  } while (used.has(id));
  used.add(id);
  return id;
}

function apiOptions(options, sectionIds) {
  return options.map((option) => {
    if (option.isOther) {
      return { isOther: true };
    }
    const out = { value: option.value };
    if (option.goto.startsWith("section:")) {
      const id = sectionIds.get(option.goto.slice(8));
      if (!id) {
        throw new Error(`no existe la sección «${option.goto.slice(8)}»`);
      }
      out.goToSectionId = id;
    } else if (option.goto) {
      out.goToAction = option.goto;
    }
    return out;
  });
}

function questionBody(question, sectionIds, withGoto) {
  const options = withGoto
    ? question.options
    : question.options?.map((o) => ({ ...o, goto: "" }));
  switch (question.type) {
    case "short":
      return { textQuestion: {} };
    case "paragraph":
      return { textQuestion: { paragraph: true } };
    case "scale":
      return { scaleQuestion: { ...question.scale } };
    case "date":
      return { dateQuestion: { includeYear: true } };
    case "time":
      return { timeQuestion: {} };
    default:
      return {
        choiceQuestion: {
          type: question.type,
          options: apiOptions(options, sectionIds),
        },
      };
  }
}

// Question types that can be changed into each other in place.
function family(type) {
  if (CHOICE.includes(type)) {
    return "choice";
  }
  return ["short", "paragraph"].includes(type) ? "text" : type;
}

const CREATABLE = ["section", "text", "grid"];
const CREATABLE_TYPES = [
  "short",
  "paragraph",
  "scale",
  "date",
  "time",
  ...CHOICE,
];

// Returns { requests, changes, manual, deletes }: the batchUpdate requests, a
// line per change for people, what has to be done by hand, and how many items
// would be deleted.
export function plan(wanted, apiForm) {
  const current = fromApi(apiForm);
  const requests = [];
  const changes = [];
  const manual = [];
  const label = (item) => `${KIND_NAMES[item.kind]} «${item.title}»`;

  const info = {};
  const infoMask = [];
  if (wanted.title !== current.title) {
    info.title = wanted.title;
    infoMask.push("title");
    changes.push("~ título del formulario");
  }
  if (wanted.description !== current.description) {
    info.description = wanted.description;
    infoMask.push("description");
    changes.push("~ descripción del formulario");
  }
  if (infoMask.length) {
    requests.push({
      updateFormInfo: { info, updateMask: infoMask.join(",") },
    });
  }
  if (wanted.email !== current.email) {
    requests.push({
      updateSettings: {
        settings: { emailCollectionType: wanted.email || "DO_NOT_COLLECT" },
        updateMask: "emailCollectionType",
      },
    });
    changes.push(
      `~ pedir el email: ${EMAIL[wanted.email] || "no"} (antes: ${EMAIL[current.email] || "no"})`
    );
  }

  // A question that changes to a type of another family (text to choice,
  // say) cannot be updated: it is deleted and created again.
  const pairs = align(wanted.items, current.items).filter(([i, j]) => {
    const want = wanted.items[i].question;
    const have = current.items[j].question;
    return !want || !have || family(want.type) === family(have.type);
  });
  const pairOf = new Map(pairs);
  const paired = new Set(pairs.map(([, j]) => j));

  // Items that cannot be created through the API are left out, and the final
  // position of the rest counts without them.
  const skipped = new Set();
  wanted.items.forEach((item, i) => {
    if (pairOf.has(i)) {
      return;
    }
    const creatable =
      CREATABLE.includes(item.kind) ||
      (item.kind === "question" &&
        CREATABLE_TYPES.includes(item.question.type));
    if (!creatable) {
      skipped.add(i);
      manual.push(`crear a mano ${label(item)}: la API no puede crearla`);
    } else if (item.question?.validation) {
      manual.push(`poner a mano la validación de ${label(item)}`);
    }
  });
  const position = new Map();
  let index = 0;
  wanted.items.forEach((item, i) => {
    if (!skipped.has(i)) {
      position.set(i, index++);
    }
  });

  // Ids of every section once the plan is applied, to point options to them.
  const used = new Set(current.items.map((item) => item.api.itemId));
  const ids = new Map();
  wanted.items.forEach((item, i) => {
    ids.set(
      i,
      pairOf.has(i) ? current.items[pairOf.get(i)].api.itemId : newId(used)
    );
  });
  const sectionIds = new Map();
  wanted.items.forEach((item, i) => {
    if (item.kind === "section" && !sectionIds.has(item.title)) {
      sectionIds.set(item.title, ids.get(i));
    }
  });

  // 1. Deletions, from the last one, so the other positions do not move.
  const deletes = current.items
    .map((item, j) => j)
    .filter((j) => !paired.has(j))
    .reverse();
  for (const j of deletes) {
    requests.push({ deleteItem: { location: { index: j } } });
    const item = current.items[j];
    const loses =
      item.kind === "question" || item.kind === "grid"
        ? ": SE PIERDEN SUS RESPUESTAS"
        : "";
    changes.push(`- BORRA ${label(item)}${loses}`);
  }

  // 2. Creations, in order (the paired items are already in that order).
  const later = [];
  wanted.items.forEach((item, i) => {
    if (pairOf.has(i) || skipped.has(i)) {
      return;
    }
    const created = { itemId: ids.get(i), title: item.title };
    if (item.description) {
      created.description = item.description;
    }
    if (item.kind === "section") {
      created.pageBreakItem = {};
    } else if (item.kind === "text") {
      created.textItem = {};
    } else if (item.kind === "grid") {
      created.questionGroupItem = {
        questions: item.grid.rows.map((title) => ({
          required: item.grid.required,
          rowQuestion: { title },
        })),
        grid: {
          columns: {
            type: "RADIO",
            options: item.grid.columns.map((value) => ({ value })),
          },
        },
      };
    } else {
      created.questionItem = {
        question: {
          required: item.question.required,
          ...questionBody(item.question, sectionIds, false),
        },
      };
      if (item.question.options?.some((o) => o.goto)) {
        later.push(i);
      }
    }
    requests.push({
      createItem: { item: created, location: { index: position.get(i) } },
    });
    changes.push(`+ crea ${label(item)} (posición ${position.get(i) + 1})`);
  });

  // 3. Updates in place, at the final positions.
  for (const i of later) {
    const item = wanted.items[i];
    requests.push({
      updateItem: {
        item: {
          itemId: ids.get(i),
          questionItem: {
            question: questionBody(item.question, sectionIds, true),
          },
        },
        location: { index: position.get(i) },
        updateMask: "questionItem.question.choiceQuestion",
      },
    });
  }
  for (const [i, j] of pairs) {
    const want = wanted.items[i];
    const have = current.items[j];
    const item = structuredClone(have.api);
    const mask = [];
    const what = [];
    if (want.title !== have.title) {
      item.title = want.title;
      mask.push("title");
      what.push("título");
    }
    if (want.description !== have.description) {
      item.description = want.description;
      mask.push("description");
      what.push("descripción");
    }
    if (want.kind === "grid") {
      if (!same(want.grid, have.grid)) {
        manual.push(`cambiar a mano las filas o columnas de ${label(want)}`);
      }
    } else if (want.kind === "question") {
      const q = want.question;
      const old = have.question;
      const question = item.questionItem.question;
      if (q.required !== old.required) {
        question.required = q.required;
        mask.push("questionItem.question.required");
        what.push(q.required ? "pasa a obligatoria" : "pasa a opcional");
      }
      if (family(q.type) === "choice") {
        if (q.type !== old.type || !same(q.options, old.options)) {
          question.choiceQuestion = {
            ...question.choiceQuestion,
            ...questionBody(q, sectionIds, true).choiceQuestion,
          };
          mask.push("questionItem.question.choiceQuestion");
          what.push(q.type !== old.type ? "tipo y opciones" : "opciones");
        }
      } else if (family(q.type) === "text" && q.type !== old.type) {
        question.textQuestion = questionBody(q).textQuestion;
        mask.push("questionItem.question.textQuestion");
        what.push(TYPES[q.type]);
      } else if (q.type === "scale" && !same(q.scale, old.scale)) {
        question.scaleQuestion = { ...q.scale };
        mask.push("questionItem.question.scaleQuestion");
        what.push("escala");
      }
    }
    if (mask.length) {
      requests.push({
        updateItem: {
          item,
          location: { index: position.get(i) },
          updateMask: mask.join(","),
        },
      });
      changes.push(`~ ${label(have)}: ${what.join(", ")}`);
    }
  }
  return { requests, changes, manual, deletes: deletes.length };
}
