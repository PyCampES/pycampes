// Creates in Sender.net the campaigns: the content/*.md files with an
// `audience` (one Sender group, or several separated by commas). Those with days_before_event or days_after_event are scheduled
// relative to the event dates; the others (such as the date and venue
// announcement) are left as drafts, to be reviewed and sent by hand.
//
//   npm run emails:schedule            # shows the plan, changes nothing
//   npm run emails:schedule -- --apply # creates and schedules the campaigns
//
// Needs SENDER_NET_API_TOKEN in the environment. Campaigns that already exist
// in Sender (same title), that still have POR DEFINIR values or, if scheduled,
// lack the event dates are skipped, so it is safe to run it again as the
// edition data gets completed.

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
    .filter(({ values }) => values.audience)
    .map((email) => {
      const { values } = email;
      const time = `${values.send_time || "10:00"}:00`;
      let sendAt = null;
      let when = "draft, sent by hand";
      if (values.days_before_event) {
        sendAt =
          start &&
          `${addDays(start, -Number(values.days_before_event))} ${time}`;
        when = sendAt || `${values.days_before_event} days before event_start`;
      } else if (values.days_after_event) {
        sendAt =
          end && `${addDays(end, Number(values.days_after_event))} ${time}`;
        when = sendAt || `${values.days_after_event} days after event_end`;
      }
      const dated = Boolean(
        values.days_before_event || values.days_after_event
      );
      return {
        ...email,
        title: `PyCamp ${edition.year} · ${email.name}`,
        dated,
        sendAt,
        when,
      };
    });

  console.log(
    apply
      ? "Creating in Sender:\n"
      : "Plan (nothing is changed; use --apply):\n"
  );
  for (const { title, when, values, pending } of campaigns) {
    console.log(`  ${when.padEnd(30)}  ${title}\n      to: ${values.audience}`);
    if (pending.length) {
      console.log(`      POR DEFINIR: ${pending.join(" | ")}`);
    }
  }

  if (!apply) {
    return;
  }
  if (!process.env.SENDER_NET_API_TOKEN) {
    throw new Error("Missing SENDER_NET_API_TOKEN in the environment.");
  }

  const groups = Object.fromEntries(
    (await getAll("groups")).map((group) => [group.title, group.id])
  );
  const existing = new Set((await getAll("campaigns")).map((c) => c.title));
  const now = new Date().toISOString().replace("T", " ").slice(0, 19);

  for (const { title, dated, sendAt, values, html, pending } of campaigns) {
    if (existing.has(title)) {
      console.log(`  skip (already in Sender): ${title}`);
      continue;
    }
    if (pending.length) {
      console.log(`  skip (POR DEFINIR values in edition.toml): ${title}`);
      continue;
    }
    if (dated && !sendAt) {
      console.log(`  skip (set event_start and event_end): ${title}`);
      continue;
    }
    if (dated && sendAt <= now) {
      console.log(`  skip (date already passed): ${title}`);
      continue;
    }
    // `audience` is one group or several, separated by commas.
    const groupIds = values.audience.split(",").map((name) => {
      const id = groups[name.trim()];
      if (!id) {
        throw new Error(`Sender has no group called "${name.trim()}".`);
      }
      return id;
    });
    const { data } = await api("POST", "campaigns", {
      title,
      subject: values.subject,
      preheader: values.preheader,
      from: FROM_NAME,
      reply_to: REPLY_TO,
      content_type: "html",
      content: html,
      groups: groupIds,
    });
    if (dated) {
      await api("POST", `campaigns/${data.id}/schedule`, {
        schedule_time: sendAt,
      });
      console.log(`  scheduled ${sendAt}: ${title} (${data.id})`);
    } else {
      console.log(
        `  draft created, send it from Sender: ${title} (${data.id})`
      );
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
