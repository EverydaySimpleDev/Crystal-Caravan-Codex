/*
  Tribes page – the four tribes side by side.

  Most of the numbers come from the Ultimania p.219 chart (translated by
  Linitaa). Timings are stored as { frames, seconds }; the game runs at 30 fps.
*/
const { initPage, append, loadData, el, clear, assetUrl, showError, loadingNode, segmented, slugify } = Codex;

initPage();

const app = document.getElementById("app");
app.append(loadingNode());

const TRIBE_COLORS = { Clavat: "#d9a441", Lilty: "#c0473b", Yuke: "#4c6fd1", Selkie: "#4f9a45" };

const DURATIONS = [
  ["burn", "Burn"], ["freeze", "Freeze"], ["paralysis", "Paralysis"], ["stun", "Stun (after a combo)"],
  ["slow", "Slow"], ["stop", "Stop"], ["haste", "Haste (on yourself)"],
  ["holyOnGhosts", "Holy on ghosts"], ["gravityOnFlyers", "Gravity on flyers"],
];

let unit = "seconds";

loadData("tribes")
  .then((data) => {
    const tribes = data.tribes ?? [];
    append(clear(app),
      el("div", { class: "grid grid-4" }, tribes.map(tribeCard)),
      statsChart(tribes),
      timingTable(data, tribes),
      foodPanel(data),
    );
  })
  .catch((error) => showError(app, error));

function tribeCard(tribe) {
  const s = tribe.baseStats ?? {};
  return el(
    "article",
    { class: "panel", style: `border-top:6px solid ${TRIBE_COLORS[tribe.name] ?? "var(--frame)"}` },
    el(
      "div",
      { class: "tribe-head" },
      el("img", { class: "sigil", src: assetUrl(`tribe/${slugify(tribe.name)}-sigil.png`), alt: "" }),
      el("h2", { style: "margin:0" }, tribe.name),
    ),
    el("p", { style: "margin-top:10px" }, tribe.summary),
    el(
      "div",
      { class: "stat-block", style: "grid-template-columns:repeat(3,1fr)" },
      el("div", {}, el("b", {}, s.str ?? "?"), el("span", {}, "STR")),
      el("div", {}, el("b", {}, s.def ?? "?"), el("span", {}, "DEF")),
      el("div", {}, el("b", {}, s.mag ?? "?"), el("span", {}, "MAG")),
    ),
    el(
      "dl",
      { class: "stats", style: "margin-top:12px" },
      el("dt", {}, "Weapon"), el("dd", {}, tribe.weapon ?? "—"),
      el("dt", {}, "Own armour"), el("dd", {}, tribe.armorPiece ?? "—"),
      el("dt", {}, "Defend"), el("dd", {}, tribe.defenseCommand ?? "—"),
      el("dt", {}, "Starts liking"), el("dd", {}, tribe.favoriteFood ?? "—"),
    ),
    tribe.perks?.length ? [el("h3", { style: "margin-top:12px" }, "Perks"), el("ul", {}, tribe.perks.map((p) => el("li", {}, p)))] : null,
  );
}

function statsChart(tribes) {
  const canvas = el("canvas", { height: "120", role: "img", "aria-label": "Base STR, DEF and MAG per tribe" });
  const panel = el("section", { class: "panel" }, el("h2", {}, "Base stats compared"), canvas);
  if (window.Chart) {
    // Chart.js needs the canvas in the page before it can measure it.
    requestAnimationFrame(() => {
      new window.Chart(canvas, {
        type: "bar",
        data: {
          labels: ["Strength", "Defense", "Magic"],
          datasets: tribes.map((t) => ({
            label: t.name,
            backgroundColor: TRIBE_COLORS[t.name],
            data: [t.baseStats?.str, t.baseStats?.def, t.baseStats?.mag],
          })),
        },
        options: {
          plugins: { legend: { labels: { color: "#3b2a16" } } },
          scales: { x: { ticks: { color: "#3b2a16" }, grid: { display: false } }, y: { beginAtZero: true, ticks: { color: "#3b2a16" } } },
        },
      });
    });
  }
  return panel;
}

/* Shows a { frames, seconds } value in the unit the reader picked. */
function timing(value) {
  if (!value) return "—";
  if (unit === "frames") return `${value.frames}f`;
  return `${value.seconds}s`;
}

function genderTiming(value) {
  if (!value) return "—";
  if (value.all) return timing(value.all);
  const male = value.male ? `M ${timing(value.male)}` : null;
  const female = value.female ? `F ${timing(value.female)}` : null;
  return [male, female].filter(Boolean).join(" / ") || "—";
}

function comboTiming(frames) {
  if (!frames) return "—";
  const show = (list) => list.map((hit) => (typeof hit === "number" ? (unit === "frames" ? `${hit}f` : `${(hit / 30).toFixed(2)}s`) : timing(hit))).join(", ");
  if (frames.all) return show(frames.all);
  return [frames.male ? `M: ${show(frames.male)}` : null, frames.female ? `F: ${show(frames.female)}` : null]
    .filter(Boolean)
    .map((line) => el("div", {}, line));
}

function timingTable(data, tribes) {
  const body = el("div");

  function draw() {
    const rows = [
      ["Auto-attack hits land (Ultimania)", (t) => comboTiming(t.autoAttack?.frames)],
      ["Auto-attack hits (community frame tests)", (t) => comboTiming(t.autoAttack?.alternateFrames)],
      ["Hold A → focus attack starts charging", (t) => genderTiming(t.focusChargeFrames)],
      ["Hold A → starts casting", (t) => timing(t.castStartFrames)],
      ["Extra cast time", (t) => (t.casting?.extraFrames?.frames ? `+${timing(t.casting.extraFrames)}` : "Fastest")],
      ["Spell range bonus", (t) => (t.casting?.rangeBonus ? `+${t.casting.rangeBonus}` : "Base")],
      ...DURATIONS.map(([key, label]) => [label, (t) => timing(t.statusDurations?.[key])]),
      ["Miasma damage every", (t) => timing(t.miasmaDamageInterval)],
    ];
    append(clear(body),
      el(
        "div",
        { class: "table-wrap" },
        el(
          "table",
          {},
          el("thead", {}, el("tr", {}, el("th", {}, ""), tribes.map((t) => el("th", {}, t.name)))),
          el("tbody", {}, rows.map(([label, get]) => el("tr", {}, el("th", { scope: "row" }, label), tribes.map((t) => el("td", {}, get(t)))))),
        ),
      ),
    );
  }

  const panel = el(
    "section",
    { class: "panel" },
    el("h2", {}, "Timings & status durations"),
    el(
      "div",
      { class: "toolbar" },
      segmented(
        [{ value: "seconds", label: "Seconds" }, { value: "frames", label: "Frames (30 fps)" }],
        unit,
        (v) => { unit = v; draw(); },
        "Units",
      ),
    ),
    body,
    [data.frameNote, data.autoAttackNote, data.castingNote, data.statusDurationsNote]
      .filter(Boolean)
      .map((text) => el("p", { class: "small muted" }, text)),
    el("p", { class: "small muted" }, "Status durations depend on who cast the spell. In a fusion, the first caster's tribe decides the duration and the damage."),
  );
  draw();
  return panel;
}

function foodPanel(data) {
  if (!data.foods?.length) return el("div");
  return el(
    "section",
    { class: "panel" },
    el("h2", {}, "Food"),
    el(
      "div",
      { class: "table-wrap" },
      el(
        "table",
        {},
        el("thead", {}, el("tr", {}, el("th", {}, "Food"), el("th", {}, "Effect"))),
        el("tbody", {}, data.foods.map((f) => el("tr", {}, el("td", {}, f.name), el("td", {}, f.effect ?? "—")))),
      ),
    ),
    (data.foodNotes ?? []).map((n) => el("p", { class: "small muted" }, n)),
  );
}
