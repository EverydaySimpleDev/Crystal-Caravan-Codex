/*
  Caravan Tracker

  Everything here is saved in the browser (localStorage) under "ccc:tracker".
  Players can export it to a file and import it on another device.

  Saved shape:
    {
      year: 1,
      myrrh: { "1": ["river-belle-path", ...], "2": [...] },   dungeons cleared for myrrh, per year
      members: [ { id, name, tribe, gender, artifacts: ["Shuriken", ...], notes } ]
    }
*/
const {
  initPage, append, loadData, el, clear, assetUrl, showError, loadingNode, store, toast,
  slugify, TRIBES, ARTIFACT_ICONS, icon, dungeonHref, segmented, formatPct,
} = Codex;
const { bestPlacesFor } = Codex.drops;

initPage();

const app = document.getElementById("app");
app.append(loadingNode());

/* Every caravanner starts with 4 hearts and 4 command slots, and can reach 8 of each. */
const START_HEARTS = 4;
const START_SLOTS = 4;
const MAX_HEARTS = 8;
const MAX_SLOTS = 8;

const blankState = () => ({ year: 1, myrrh: {}, members: [] });
let tracker = store.get("tracker", blankState());
let artifacts = [];
let tribes = [];
let dungeons = [];
let rewardRules = null;

/* How the "Still missing" lists are sorted and which party size the odds assume. */
const missingView = { sort: store.get("missing-sort", "easiest"), players: 1 };

const save = () => store.set("tracker", tracker);

/* Which artifact groups are expanded ("<member id>:<category>"), so ticking a box doesn't fold them up. */
const openGroups = new Set();
/* Sections that start open, like "Still missing", once the player has folded them away. */
const closedGroups = new Set();

Promise.all([loadData("artifacts"), loadData("tribes"), loadData("dungeons")])
  .then(([artifactData, tribeData, dungeonData]) => {
    artifacts = artifactData.artifacts ?? [];
    tribes = tribeData.tribes ?? [];
    dungeons = (dungeonData.dungeons ?? []).filter((d) => d.rewardSets?.length);
    rewardRules = dungeonData.rewardSetRules;
    render();
  })
  .catch((error) => showError(app, error));

function render() {
  append(clear(app),
    el(
      "p",
      { class: "note small" },
      "Your caravan is saved in this browser only. Use ",
      el("b", {}, "Export"),
      " to back it up or move it to another device.",
    ),
    yearPanel(),
    stampsSummary(),
    membersPanel(),
    ...tracker.members.map(memberPanel),
    backupPanel(),
  );
}

/* The Mog Stamp checklist lives on the World page; this just shows the count and links there. */
function stampsSummary() {
  const got = Object.keys(store.get("mog-stamps", {})).length;
  return el(
    "p",
    { class: "note small" },
    el("img", { class: "icon sm", src: assetUrl("ui/mog-1.png"), alt: "" }),
    ` Mog Stamps: ${got} / 23 collected. `,
    el("a", { href: "world.html#mog-stamps" }, "Open the stamp checklist"),
  );
}

/* ---------- Year & myrrh ---------- */

function yearPanel() {
  const year = String(tracker.year);
  const cleared = new Set(tracker.myrrh[year] ?? []);
  const drops = Math.min(3, cleared.size);

  return el(
    "section",
    { class: "panel" },
    el(
      "div",
      { style: "display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap" },
      el("h2", { style: "margin:0" }, `Year ${tracker.year}`),
      el(
        "div",
        { style: "display:flex;gap:6px;align-items:center" },
        el("button", { class: "btn small secondary", type: "button", disabled: tracker.year <= 1 ? true : null, onclick: () => changeYear(-1) }, "◀ Previous year"),
        el("button", { class: "btn small", type: "button", onclick: () => changeYear(1) }, "Next year ▶"),
      ),
    ),
    el(
      "div",
      { style: "display:flex;gap:6px;align-items:center;margin:12px 0", "aria-label": `${drops} of 3 drops of myrrh` },
      [0, 1, 2].map((i) => el("img", { src: assetUrl(`icon/crystal-${i < drops ? 0 : 7}.png`), alt: "", style: `width:34px;${i < drops ? "" : "opacity:.3;filter:grayscale(1)"}` })),
      el("b", { style: "margin-left:8px" }, `${drops} / 3 drops of myrrh`),
    ),
    el(
      "p",
      { class: "small muted" },
      "Tick the dungeons you've cleared for myrrh this year, in the order you did them. After a harvest, a tree only grows back once you've collected 5 more drops elsewhere.",
    ),
    el(
      "div",
      { class: "check-grid" },
      dungeons.map((d) => {
        const wait = dropsUntilRegrown(d.id);
        const resting = !cleared.has(d.id) && wait > 0;
        return el(
          "label",
          { title: resting ? `Grows back after ${wait} more drop${wait > 1 ? "s" : ""}` : null },
          el("input", {
            type: "checkbox",
            checked: cleared.has(d.id) ? true : null,
            onchange: (e) => {
              const list = new Set(tracker.myrrh[year] ?? []);
              if (e.target.checked) list.add(d.id);
              else list.delete(d.id);
              tracker.myrrh[year] = [...list];
              save();
              render();
            },
          }),
          d.name,
          resting ? el("span", { class: "chip", style: "margin-left:auto" }, `regrows in ${wait}`) : null,
        );
      }),
    ),
  );
}

/*
  How many more drops of myrrh you need before this dungeon's tree has myrrh again.
  Harvests are read in order: year by year, then in the order they were ticked.
*/
const REGROW_AFTER = 5;

function dropsUntilRegrown(dungeonId) {
  const history = Object.keys(tracker.myrrh)
    .map(Number)
    .filter((y) => y <= tracker.year)
    .sort((a, b) => a - b)
    .flatMap((y) => tracker.myrrh[String(y)] ?? []);
  const last = history.lastIndexOf(dungeonId);
  if (last === -1) return 0;
  const since = history.length - 1 - last;
  return Math.max(0, REGROW_AFTER - since);
}

function changeYear(step) {
  tracker.year = Math.max(1, tracker.year + step);
  save();
  render();
}

/* ---------- Members ---------- */

function membersPanel() {
  const nameInput = el("input", { type: "text", placeholder: "Name", maxlength: "24", required: true });
  const tribeSelect = el("select", {}, TRIBES.map((t) => el("option", { value: t }, t)));
  const genderSelect = el("select", {}, el("option", { value: "male" }, "Male"), el("option", { value: "female" }, "Female"));

  return el(
    "section",
    { class: "panel" },
    el("h2", {}, "Caravanners"),
    el(
      "form",
      {
        class: "toolbar",
        onsubmit: (event) => {
          event.preventDefault();
          const name = nameInput.value.trim();
          if (!name) return;
          tracker.members.push({ id: Date.now().toString(36), name, tribe: tribeSelect.value, gender: genderSelect.value, artifacts: [], notes: "" });
          save();
          render();
        },
      },
      el("label", { class: "field grow" }, "Name", nameInput),
      el("label", { class: "field" }, "Tribe", tribeSelect),
      el("label", { class: "field" }, "Gender", genderSelect),
      el("button", { class: "btn", type: "submit" }, "Add caravanner"),
    ),
    tracker.members.length
      ? el(
          "div",
          { class: "table-wrap" },
          el(
            "table",
            {},
            el("thead", {}, el("tr", {}, el("th", {}, "Name"), el("th", {}, "Tribe"), el("th", { class: "num" }, "STR"), el("th", { class: "num" }, "DEF"), el("th", { class: "num" }, "MAG"), el("th", { class: "num" }, "Hearts"), el("th", { class: "num" }, "Slots"), el("th", { class: "num" }, "Artifacts"))),
            el(
              "tbody",
              {},
              tracker.members.map((m) => {
                const s = memberStats(m);
                return el(
                  "tr",
                  {},
                  el("td", {}, el("a", { href: `#member-${m.id}` }, m.name)),
                  el("td", {}, m.tribe),
                  el("td", { class: "num" }, s.str), el("td", { class: "num" }, s.def), el("td", { class: "num" }, s.mag),
                  el("td", { class: "num" }, s.hearts), el("td", { class: "num" }, s.slots),
                  el("td", { class: "num" }, `${m.artifacts.length} / ${artifacts.length}`),
                );
              }),
            ),
          ),
        )
      : el("p", { class: "empty" }, "Add your first caravanner to start tracking."),
  );
}

/* Base tribe stats plus every artifact ticked. Equipment isn't included. */
function memberStats(member) {
  const base = tribes.find((t) => t.name === member.tribe)?.baseStats ?? { str: 0, def: 0, mag: 0 };
  const owned = new Set(member.artifacts);
  const total = { str: base.str ?? 0, def: base.def ?? 0, mag: base.mag ?? 0, hearts: START_HEARTS, slots: START_SLOTS };
  for (const a of artifacts) {
    if (!owned.has(a.name)) continue;
    for (const key of Object.keys(total)) total[key] += a.stat?.[key] ?? 0;
  }
  total.hearts = Math.min(MAX_HEARTS, total.hearts);
  total.slots = Math.min(MAX_SLOTS, total.slots);
  return total;
}

function memberPanel(member) {
  const stats = memberStats(member);
  const owned = new Set(member.artifacts);
  const categories = [...new Set(artifacts.map((a) => a.category))];

  const toggle = (name, checked) => {
    if (checked) owned.add(name);
    else owned.delete(name);
    member.artifacts = [...owned];
    save();
    // Redraw in place: keep the open groups open and the page where it was.
    const scroll = window.scrollY;
    render();
    window.scrollTo(0, scroll);
  };

  return el(
    "section",
    { class: "panel", id: `member-${member.id}` },
    el(
      "div",
      { style: "display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap" },
      el(
        "div",
        { class: "tribe-head" },
        el("img", { class: "sigil", src: assetUrl(`tribe/${slugify(member.tribe)}-sigil.png`), alt: "" }),
        el("div", {}, el("h2", { style: "margin:0" }, member.name), el("span", { class: "small muted" }, `${member.tribe} · ${member.gender}`)),
      ),
      el(
        "button",
        {
          class: "btn small danger",
          type: "button",
          onclick: () => {
            if (!confirm(`Remove ${member.name} from the caravan?`)) return;
            tracker.members = tracker.members.filter((m) => m.id !== member.id);
            save();
            render();
          },
        },
        "Remove",
      ),
    ),
    el(
      "div",
      { class: "stat-block", style: "grid-template-columns:repeat(5,1fr);margin:14px 0" },
      [["str", "STR"], ["def", "DEF"], ["mag", "MAG"], ["hearts", "Hearts"], ["slots", "Slots"]].map(([key, label]) =>
        el("div", {}, el("b", {}, stats[key]), el("span", {}, label)),
      ),
    ),
    el("p", { class: "small muted" }, "Tribe base stats plus artifacts. Weapon and armour bonuses aren't counted."),
    categories.map((category) => {
      const group = artifacts.filter((a) => a.category === category);
      const have = group.filter((a) => owned.has(a.name)).length;
      return el(
        "details",
        {
          style: "margin-top:8px",
          open: openGroups.has(`${member.id}:${category}`) ? true : null,
          ontoggle: (e) => {
            const key = `${member.id}:${category}`;
            if (e.target.open) openGroups.add(key);
            else openGroups.delete(key);
          },
        },
        el("summary", {}, icon(ARTIFACT_ICONS[category] ?? "accessory", { size: "sm" }), ` ${category} `, el("span", { class: "chip" }, `${have} / ${group.length}`)),
        el(
          "div",
          { class: "check-grid", style: "margin-top:8px" },
          group.map((a) =>
            el(
              "label",
              { title: a.effect },
              el("input", { type: "checkbox", checked: owned.has(a.name) ? true : null, onchange: (e) => toggle(a.name, e.target.checked) }),
              el("span", {}, a.name, el("span", { class: "small muted" }, ` ${shortEffect(a)}`)),
            ),
          ),
        ),
      );
    }),
    missingPanel(member, owned, toggle),
    el(
      "label",
      { class: "field", style: "margin-top:14px" },
      "Notes",
      el("textarea", {
        rows: "3",
        placeholder: "Equipment, favourite food, plans…",
        onchange: (e) => { member.notes = e.target.value; save(); },
      }, member.notes ?? ""),
    ),
  );
}

/*
  The best boss reward for an artifact, cached per party size: the dungeon,
  cycle and score band that give it the highest chance, lowest score first
  when chances tie.
*/
const bestPlaceCache = new Map();

function bestPlace(artifact) {
  const key = `${missingView.players}:${artifact.name}`;
  if (!bestPlaceCache.has(key)) {
    bestPlaceCache.set(key, bestPlacesFor(artifact.name, dungeons, rewardRules, missingView.players)[0] ?? null);
  }
  return bestPlaceCache.get(key);
}

const MISSING_SORTS = {
  easiest: (a, b) => (bestPlace(b)?.chance ?? 0) - (bestPlace(a)?.chance ?? 0) || (bestPlace(a)?.min ?? 999) - (bestPlace(b)?.min ?? 999),
  route: (a, b) => (a.routeYear ?? 99) - (b.routeYear ?? 99) || a.name.localeCompare(b.name),
  type: (a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
};

/* Every artifact this caravanner still needs, with the quickest way to get each one. */
function missingPanel(member, owned, toggle) {
  const missing = artifacts.filter((a) => !owned.has(a.name)).sort(MISSING_SORTS[missingView.sort]);
  const key = `${member.id}:missing`;

  const redraw = () => {
    const scroll = window.scrollY;
    render();
    window.scrollTo(0, scroll);
  };

  return el(
    "details",
    {
      class: "missing",
      style: "margin-top:14px",
      // Open unless the player folded it away.
      open: closedGroups.has(key) ? null : true,
      ontoggle: (e) => {
        if (e.target.open) closedGroups.delete(key);
        else closedGroups.add(key);
      },
    },
    el("summary", {}, icon("bag", { size: "sm" }), " Still missing ", el("span", { class: "chip" }, missing.length)),
    missing.length
      ? [
          el(
            "div",
            { class: "toolbar", style: "margin:10px 0" },
            el(
              "label",
              { class: "field" },
              "Sort by",
              el(
                "select",
                {
                  onchange: (e) => {
                    missingView.sort = e.target.value;
                    store.set("missing-sort", missingView.sort);
                    redraw();
                  },
                },
                [["easiest", "Best chance first"], ["route", "Ultimania route order"], ["type", "Artifact type"]].map(([value, label]) =>
                  el("option", { value, selected: value === missingView.sort ? true : null }, label),
                ),
              ),
            ),
            el(
              "div",
              { class: "field" },
              "Odds for",
              segmented([1, 2, 3, 4].map((p) => ({ value: p, label: `${p}P` })), missingView.players, (v) => {
                missingView.players = v;
                redraw();
              }, "Party size"),
            ),
          ),
          el(
            "div",
            { class: "table-wrap" },
            el(
              "table",
              {},
              el(
                "thead",
                {},
                el("tr", {}, el("th", {}, "Artifact"), el("th", {}, "Best boss reward"), el("th", { class: "num" }, "Chance"), el("th", {}, "Also from"), el("th", {}, "")),
              ),
              el(
                "tbody",
                {},
                missing.map((a) => {
                  const best = bestPlace(a);
                  // One entry per place and kind – a dungeon with several possible chests is listed once.
                  const other = [...new Map((a.sources ?? []).filter((src) => src.type !== "Boss")
                    .map((src) => [`${src.where}|${src.type}`, src])).values()];
                  return el(
                    "tr",
                    {},
                    el(
                      "td",
                      { style: "white-space:nowrap" },
                      icon(ARTIFACT_ICONS[a.category] ?? "accessory", { size: "sm" }),
                      " ",
                      el("a", { href: `artifacts.html?artifact=${slugify(a.name)}#finder` }, a.name),
                      el("div", { class: "small muted" }, shortEffect(a)),
                    ),
                    el(
                      "td",
                      {},
                      best
                        ? [
                            el("a", { href: dungeonHref(best.dungeon.name, best.cycle) }, best.dungeon.name),
                            el("div", { class: "small muted" }, `Cycle ${best.cycle} · score ${best.max === null ? `${best.min}+` : `${best.min}–${best.max}`}`),
                          ]
                        : el("span", { class: "muted" }, "Not a boss reward"),
                    ),
                    el("td", { class: "num" }, best ? el("span", { class: "pct" }, formatPct(best.chance)) : "—"),
                    el(
                      "td",
                      { class: "small" },
                      other.length
                        ? other.map((src, i) => [
                            i ? ", " : "",
                            el("a", { href: dungeonHref(src.where, src.cycles?.[0]) ?? "#" }, src.where),
                            ` (${src.type.toLowerCase()})`,
                          ])
                        : "—",
                    ),
                    el("td", {}, el("button", { class: "btn small secondary", type: "button", style: "white-space:nowrap", onclick: () => toggle(a.name, true) }, "Got it")),
                  );
                }),
              ),
            ),
          ),
        ]
      : el("p", { class: "empty" }, "Every artifact collected – well done!"),
  );
}

function shortEffect(artifact) {
  const s = artifact.stat ?? {};
  const parts = [];
  if (s.str) parts.push(`+${s.str} STR`);
  if (s.def) parts.push(`+${s.def} DEF`);
  if (s.mag) parts.push(`+${s.mag} MAG`);
  if (s.hearts) parts.push("+1 heart");
  if (s.slots) parts.push("+1 slot");
  if (artifact.spell) parts.push(artifact.spell);
  return parts.join(", ");
}

/* ---------- Backup ---------- */

function backupPanel() {
  const fileInput = el("input", {
    type: "file",
    accept: "application/json,.json",
    class: "visually-hidden",
    onchange: async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      try {
        const data = JSON.parse(await file.text());
        if (!Array.isArray(data.members)) throw new Error("That file isn't a caravan export.");
        tracker = { ...blankState(), ...data };
        save();
        render();
        toast("Caravan imported");
      } catch (error) {
        alert(`Couldn't import: ${error.message}`);
      }
    },
  });

  return el(
    "section",
    { class: "panel-dark no-print" },
    el("h2", {}, "Backup"),
    el(
      "div",
      { style: "display:flex;gap:8px;flex-wrap:wrap" },
      el("button", { class: "btn", type: "button", onclick: exportTracker }, "Export to file"),
      el("button", { class: "btn secondary", type: "button", onclick: () => fileInput.click() }, "Import from file"),
      fileInput,
      el(
        "button",
        {
          class: "btn danger",
          type: "button",
          onclick: () => {
            if (!confirm("Erase the whole caravan? This can't be undone.")) return;
            tracker = blankState();
            save();
            render();
          },
        },
        "Start over",
      ),
    ),
  );
}

function exportTracker() {
  const blob = new Blob([JSON.stringify(tracker, null, 2)], { type: "application/json" });
  const link = el("a", { href: URL.createObjectURL(blob), download: "crystal-caravan.json" });
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}
