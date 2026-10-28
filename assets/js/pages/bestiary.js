/*
  Bestiary

  The table shows every monster with stats scaled to the chosen cycle and
  party size. Clicking a name opens a detail sheet with resistances, drops,
  attacks and a chart of how its HP grows.

  Scaling (FFCC World Ultimania):
    HP          × cycle multiplier × party-size multiplier
    STR/DEF/MAG × cycle multiplier only
*/
const {
  initPage, append, loadData, el, clear, debounce, showError, loadingNode, segmented,
  makeSortable, resistPips, slugify, urlState, listText, enemyKey, enemyName, assetUrl,
} = Codex;

initPage();

const app = document.getElementById("app");
app.append(loadingNode());

const RESISTS = [
  ["fire", "Fire"], ["blizzard", "Blizzard"], ["thunder", "Thunder"],
  ["slow", "Slow"], ["stop", "Stop"], ["gravity", "Gravity"], ["holy", "Holy"],
];

const state = {
  search: "",
  dungeon: urlState.get("dungeon") ?? "all",
  type: "all",
  bossesOnly: false,
  cycle: Number(urlState.get("cycle")) || 1,
  players: Number(urlState.get("players")) || 1,
};

let scaling;
let enemies = [];
let chart = null;

loadData("enemies")
  .then((data) => {
    scaling = data.scaling;
    enemies = data.enemies ?? [];
    render(data);
    const wanted = urlState.get("enemy");
    if (wanted) {
      const match = enemies.find((e) => enemyKey(e) === wanted) ?? enemies.find((e) => slugify(e.name) === wanted);
      if (match) openDetail(match);
    }
  })
  .catch((error) => showError(app, error));

const displayName = enemyName;

/* Rounded down; the game works in whole numbers. */
function scaled(enemy, stat) {
  const base = enemy[stat];
  if (base === null || base === undefined) return null;
  const cycle = String(state.cycle);
  if (stat === "hp") {
    return Math.floor(base * scaling.cycleHp[cycle] * scaling.playersHp[String(state.players)]);
  }
  return Math.floor(base * scaling.cycleStats[cycle]);
}

/* ---------- Main table ---------- */

const tbody = el("tbody");
const count = el("p", { class: "small muted" });
let rows = [];

function render() {
  clear(app);
  rows = [...enemies];

  const dungeons = [...new Set(enemies.flatMap((e) => (e.locations ?? []).map((l) => l.dungeon)))].sort();
  const types = [...new Set(enemies.flatMap((e) => (e.type ?? "").split("/")).filter(Boolean))].sort();

  const table = el(
    "table",
    {},
    el(
      "thead",
      {},
      el(
        "tr",
        {},
        el("th", {}, "Monster"),
        el("th", {}, "Type"),
        el("th", { class: "num" }, "HP"),
        el("th", { class: "num" }, "STR"),
        el("th", { class: "num" }, "DEF"),
        el("th", { class: "num" }, "MAG"),
        RESISTS.map(([, label]) => el("th", { title: `${label} resistance` }, label.slice(0, 4))),
        el("th", {}, "Found in"),
      ),
    ),
    tbody,
  );

  makeSortable(
    table,
    [
      (e) => displayName(e), (e) => e.type,
      (e) => scaled(e, "hp"), (e) => scaled(e, "str"), (e) => scaled(e, "def"), (e) => scaled(e, "mag"),
      ...RESISTS.map(([key]) => (e) => e.resist?.[key]),
      null,
    ],
    (compare) => { rows.sort(compare); drawRows(); },
  );

  const toolbar = el(
    "div",
    { class: "toolbar" },
    el(
      "label",
      { class: "field grow" },
      "Search",
      el("input", {
        type: "search",
        placeholder: "Monster, drop or weakness",
        oninput: debounce((e) => { state.search = e.target.value.toLowerCase(); drawRows(); }),
      }),
    ),
    el(
      "label",
      { class: "field" },
      "Dungeon",
      el(
        "select",
        { onchange: (e) => { state.dungeon = e.target.value; urlState.set({ dungeon: state.dungeon === "all" ? null : state.dungeon }); drawRows(); } },
        el("option", { value: "all" }, "Anywhere"),
        dungeons.map((d) => el("option", { value: slugify(d), selected: slugify(d) === state.dungeon }, d)),
      ),
    ),
    el(
      "label",
      { class: "field" },
      "Type",
      el(
        "select",
        { onchange: (e) => { state.type = e.target.value; drawRows(); } },
        el("option", { value: "all" }, "Any type"),
        types.map((t) => el("option", { value: t }, t)),
      ),
    ),
    el(
      "div",
      { class: "field" },
      "Cycle",
      segmented([1, 2, 3].map((c) => ({ value: c, label: `${c}` })), state.cycle, (v) => { state.cycle = v; urlState.set({ cycle: v }); drawRows(); }, "Cycle"),
    ),
    el(
      "div",
      { class: "field" },
      "Players",
      segmented([1, 2, 3, 4].map((p) => ({ value: p, label: `${p}P` })), state.players, (v) => { state.players = v; urlState.set({ players: v }); drawRows(); }, "Players"),
    ),
    el(
      "label",
      { class: "field", style: "flex-direction:row;align-items:center;gap:6px;min-height:40px" },
      el("input", { type: "checkbox", onchange: (e) => { state.bossesOnly = e.target.checked; drawRows(); } }),
      "Bosses only",
    ),
  );

  app.append(
    el(
      "div",
      { class: "note small" },
      el("b", {}, "Reading resistances: "),
      "dots go from 0 (weak) to 3 (immune). ",
      "0 – a basic Fire/Blizzard/Thunder spell inflicts its status. 1 – you need a fused (-ra / -ga) spell. 2 – it never gets the status. 3 – it takes no damage from it either. ",
      "For Gravity the level sets how much HP it removes: ½, ¼, 1/10 or none.",
    ),
    el("section", { class: "panel" }, toolbar, count, el("div", { class: "table-wrap", style: "max-height:70vh" }, table)),
    detailDialog,
  );
  drawRows();
}

function matches(enemy) {
  if (state.bossesOnly && !enemy.boss) return false;
  if (state.type !== "all" && !(enemy.type ?? "").split("/").includes(state.type)) return false;
  if (state.dungeon !== "all" && !(enemy.locations ?? []).some((l) => slugify(l.dungeon) === state.dungeon && l.cycles?.includes(state.cycle))) {
    return false;
  }
  if (!state.search) return true;
  const text = [
    displayName(enemy), enemy.type, ...(enemy.weak ?? []), ...(enemy.immune ?? []),
    ...(enemy.drops ?? []).map((d) => d.item), ...(enemy.locations ?? []).map((l) => l.dungeon),
  ].join(" ").toLowerCase();
  return text.includes(state.search);
}

function drawRows() {
  const visible = rows.filter(matches);
  count.textContent = `${visible.length} monsters · stats for cycle ${state.cycle}, ${state.players} player${state.players > 1 ? "s" : ""}`
    + (state.dungeon !== "all" ? " · only monsters that appear in this cycle" : "");
  append(clear(tbody),
    ...visible.map((enemy) =>
      el(
        "tr",
        {},
        el(
          "td",
          {},
          el("img", { class: "icon monster-thumb", src: assetUrl(`monster/${enemyKey(enemy)}.png`), alt: "", loading: "lazy", onerror: (e) => e.target.remove() }),
          el("a", { href: `?enemy=${enemyKey(enemy)}`, onclick: (ev) => { ev.preventDefault(); openDetail(enemy); } }, displayName(enemy)),
          enemy.boss ? el("span", { class: "chip boss", style: "margin-left:6px" }, "Boss") : null,
        ),
        el("td", { class: "small" }, enemy.type ?? ""),
        ["hp", "str", "def", "mag"].map((stat) => el("td", { class: "num" }, scaled(enemy, stat) ?? "?")),
        RESISTS.map(([key]) => el("td", {}, resistPips(enemy.resist?.[key], { label: false }))),
        el("td", { class: "small" }, listText((enemy.locations ?? []).map((l) => l.dungeon))),
      ),
    ),
  );
}

/* ---------- Detail sheet ---------- */

const detailDialog = el("dialog", {
  class: "panel",
  style: "max-width:760px;width:calc(100% - 32px);padding:0",
  onclick: (event) => { if (event.target === detailDialog) detailDialog.close(); },
});
detailDialog.addEventListener("close", () => urlState.set({ enemy: null }));

function openDetail(enemy) {
  urlState.set({ enemy: enemyKey(enemy) });
  const body = el("div", { style: "padding:22px" });
  append(clear(detailDialog), body);

  const canvas = el("canvas", { height: "180", "aria-label": `${displayName(enemy)} HP by cycle and party size`, role: "img" });

  append(body,
    el(
      "div",
      { style: "display:flex;justify-content:space-between;gap:10px;align-items:start" },
      // Portraits are rendered from the game's models; monsters without one just skip it.
      el("img", {
        class: "monster-portrait",
        src: assetUrl(`monster/${enemyKey(enemy)}.png`),
        alt: "",
        onerror: (e) => e.target.remove(),
      }),
      el(
        "div",
        { style: "flex:1" },
        el("h2", { style: "margin-bottom:4px" }, displayName(enemy)),
        el(
          "div",
          { style: "display:flex;gap:6px;flex-wrap:wrap" },
          enemy.boss ? el("span", { class: "chip boss" }, "Boss") : null,
          enemy.type ? el("span", { class: "chip" }, enemy.type) : null,
          enemy.stunChance !== null && enemy.stunChance !== undefined ? el("span", { class: "chip" }, `${enemy.stunChance}% stun chance on a 3-hit combo`) : null,
        ),
      ),
      el("button", { class: "btn small secondary", type: "button", onclick: () => detailDialog.close(), "aria-label": "Close" }, "✕"),
    ),
    el("p", { class: "small muted", style: "margin-top:8px" }, `Cycle ${state.cycle}, ${state.players} player${state.players > 1 ? "s" : ""}. Base (cycle 1, solo) in brackets.`),
    el(
      "div",
      { class: "stat-block" },
      ["hp", "str", "def", "mag"].map((stat) =>
        el("div", {}, el("b", {}, scaled(enemy, stat) ?? "?"), el("span", {}, `${stat.toUpperCase()} (${enemy[stat] ?? "?"})`)),
      ),
    ),
    el("h3", { style: "margin-top:16px" }, "Resistances"),
    el(
      "div",
      { class: "grid grid-3", style: "gap:6px" },
      [...(enemy.resist?.physical !== undefined ? [["physical", "Physical"]] : []), ...RESISTS].map(([key, label]) =>
        el("div", { style: "display:flex;justify-content:space-between;gap:8px" }, el("span", {}, label), resistPips(enemy.resist?.[key])),
      ),
    ),
    enemy.weak?.length || enemy.immune?.length
      ? el(
          "p",
          { style: "margin-top:10px" },
          enemy.weak?.length ? [el("b", {}, "Weak to: "), enemy.weak.join(", "), " "] : null,
          enemy.immune?.length ? [el("b", {}, "Immune to: "), enemy.immune.join(", ")] : null,
        )
      : null,
    el("h3", { style: "margin-top:14px" }, "Where to find it"),
    enemy.locations?.length
      ? el(
          "ul",
          {},
          enemy.locations.map((l) =>
            el("li", {}, el("a", { href: `dungeons.html?d=${slugify(l.dungeon)}` }, l.dungeon), l.cycles?.length ? ` – cycle ${l.cycles.join(", ")}` : ""),
          ),
        )
      : el("p", { class: "muted" }, "Not found in a regular dungeon."),
    enemy.drops?.length
      ? [
          el("h3", {}, "Drops"),
          el(
            "ul",
            {},
            enemy.drops.map((d) =>
              el("li", {}, d.item, d.chance !== null && d.chance !== undefined ? ` – ${d.chance}%` : "", d.cycles?.length ? ` (cycle ${d.cycles.join(", ")})` : "", d.notes ? el("span", { class: "small muted" }, ` – ${d.notes}`) : null),
            ),
          ),
        ]
      : null,
    enemy.tips?.length
      ? [
          el("h3", {}, "How to beat it"),
          el("ul", { class: "tips" }, enemy.tips.map((tip) => el("li", {}, tip))),
        ]
      : null,
    enemy.attacks?.length
      ? [
          el("h3", {}, "Attacks"),
          el("ul", {}, enemy.attacks.map((a) => el("li", {}, el("b", {}, a.name), a.notes ? ` – ${a.notes}` : ""))),
        ]
      : null,
    enemy.hp ? [el("h3", {}, "HP by cycle and party size"), canvas] : null,
    enemy.notes ? el("p", { class: "small muted", style: "margin-top:10px" }, enemy.notes) : null,
    enemy.source ? el("p", { class: "small muted" }, `Source: ${enemy.source}`) : null,
  );

  detailDialog.showModal();
  if (enemy.hp) drawChart(canvas, enemy);
}

function drawChart(canvas, enemy) {
  if (!window.Chart) return; // CDN blocked - the rest of the sheet still works.
  chart?.destroy();
  const colors = ["#7fc7ff", "#e3c27a", "#c0473b"];
  chart = new window.Chart(canvas, {
    type: "bar",
    data: {
      labels: ["1 player", "2 players", "3 players", "4 players"],
      datasets: [1, 2, 3].map((cycle, i) => ({
        label: `Cycle ${cycle}`,
        backgroundColor: colors[i],
        data: [1, 2, 3, 4].map((p) => Math.floor(enemy.hp * scaling.cycleHp[cycle] * scaling.playersHp[p])),
      })),
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: "#3b2a16" } } },
      scales: {
        x: { ticks: { color: "#3b2a16" }, grid: { display: false } },
        y: { ticks: { color: "#3b2a16" }, beginAtZero: true },
      },
    },
  });
}

