// Creates and schedules in Sender.net the campaigns sent before and after the
// event (the content/*.md files with days_before_event or days_after_event).
//
//   npm run emails:schedule            # shows the plan, changes nothing
//   npm run emails:schedule -- --apply # creates and schedules the campaigns
//
// Needs SENDER_NET_API_TOKEN in the environment and the event dates
// (event_start, event_end) in edition.toml. Campaigns that already exist in
// Sender (same title) are skipped, so it is safe to run it again.

import { buildEmails, edition } from "./build.mjs";

const API = "https://api.sender.net/v2";
const FROM_NAME = "PyCamp España";
const REPLY_TO = "newsletter@pycamp.es";
const apply = process.argv.includes("--apply");

async function api(method, path, body) {
  const response = await fetch(`${API}/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.SENDER_NET_API_TOKEN}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `${method} ${path}: HTTP ${response.status} ${JSON.stringify(data)}`
    );
  }
  return data;
}

async function getAll(path) {
  const items = [];
  for (let page = 1; ; page++) {
    const { data, meta } = await api("GET", `${path}?page=${page}`);
    items.push(...data);
    if (!meta || page >= meta.last_page) {
      return items;
    }
  }
}

function parseDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
}

function addDays(isoDate, days) {
  const date = new Date(`${isoDate}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

async function main() {
  const start = parseDate(edition.event_start);
  const end = parseDate(edition.event_end);

  const campaigns = (await buildEmails())
    .filter(({ values }) => values.days_before_event || values.days_after_event)
    .map((email) => {
      const { values } = email;
      const time = `${values.send_time || "10:00"}:00`;
      let sendAt;
      if (values.days_before_event) {
        sendAt = start
          ? `${addDays(start, -Number(values.days_before_event))} ${time}`
          : `${values.days_before_event} días antes de event_start`;
      } else {
        sendAt = end
          ? `${addDays(end, Number(values.days_after_event))} ${time}`
          : `${values.days_after_event} días después de event_end`;
      }
      return {
        ...email,
        title: `PyCamp ${edition.year} · ${email.name}`,
        sendAt,
      };
    });

  console.log(
    apply
      ? "Creating and scheduling:\n"
      : "Plan (nothing is changed; use --apply):\n"
  );
  for (const { title, sendAt, values, pending } of campaigns) {
    console.log(`  ${sendAt}  ${values.audience.padEnd(16)}  ${title}`);
    if (pending.length) {
      console.log(`      POR DEFINIR: ${pending.join(" | ")}`);
    }
  }

  if (!apply) {
    return;
  }
  if (!start || !end) {
    throw new Error(
      "\nSet event_start and event_end (AAAA-MM-DD) in edition.toml."
    );
  }
  if (campaigns.some(({ pending }) => pending.length)) {
    throw new Error("\nComplete the POR DEFINIR values in edition.toml first.");
  }
  if (!process.env.SENDER_NET_API_TOKEN) {
    throw new Error("Missing SENDER_NET_API_TOKEN in the environment.");
  }

  const groups = Object.fromEntries(
    (await getAll("groups")).map((group) => [group.title, group.id])
  );
  const existing = new Set((await getAll("campaigns")).map((c) => c.title));
  const now = new Date().toISOString().replace("T", " ").slice(0, 19);

  for (const { title, sendAt, values, html } of campaigns) {
    if (existing.has(title)) {
      console.log(`  skip (already in Sender): ${title}`);
      continue;
    }
    if (sendAt <= now) {
      console.log(`  skip (date already passed): ${title}`);
      continue;
    }
    const groupId = groups[values.audience];
    if (!groupId) {
      throw new Error(`Sender has no group called "${values.audience}".`);
    }
    const { data } = await api("POST", "campaigns", {
      title,
      subject: values.subject,
      preheader: values.preheader,
      from: FROM_NAME,
      reply_to: REPLY_TO,
      content_type: "html",
      content: html,
      groups: [groupId],
    });
    await api("POST", `campaigns/${data.id}/schedule`, {
      schedule_time: sendAt,
    });
    console.log(`  scheduled ${sendAt}: ${title} (${data.id})`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
