/*
  Magic & Damage page

  - Damage calculator using the formulas from the Piggyback (FR) official guide.
  - Spell fusion recipes, filterable by spell family.
  - Magicite, magic strikes, status effects, timing types and other rules.
*/
const {
  initPage, append, loadData, el, clear, assetUrl, showError, loadingNode, debounce,
  enemyName, segmented,
} = Codex;

initPage();

const app = document.getElementById("app");
app.append(loadingNode());

const SPELL_RINGS = {
  Fire: "fire", Blizzard: "blizzard", Thunder: "thunder", Cure: "cure", Life: "raise",
  Clear: "clear", Holy: "holy", Gravity: "gravity", Slow: "slow", Haste: "haste", Stop: "stop",
};

Promise.all([loadData("magic"), loadData("enemies")])
  .then(([magic, enemyData]) => {
    append(clear(app),
      calculator(enemyData),
      spellsPanel(magic),
      el("div", { class: "grid grid-2" }, magicitePanel(magic), strikesPanel(magic)),
      statusPanel(magic),
      rulesPanel(magic),
    );
  })
  .catch((error) => showError(app, error));

/* ---------- Damage calculator ---------- */

const ATTACKS = {
  auto: { label: "Auto attack (1 hit)", power: "Weapon STR is already in your STR" },
  focus: { label: "Focus attack", power: "Focus attack STR" },
  spell: { label: "Spell", power: "Spell MAG" },
  fusion: { label: "Spell fusion", power: "Spell MAG" },
};

/*
  Piggyback formulas (results are rounded down):
    auto:   STR / 5 − DEF
    focus:  (FA STR + STR) / 5 − DEF
    spell:  (MAG + spell MAG) / 5 − DEF
    fusion: ((spell MAG + first caster's MAG) / 5 − DEF) × coefficient
*/
function damage({ type, str, mag, power, def, coefficient }) {
  let raw;
  if (type === "auto") raw = str / 5 - def;
  else if (type === "focus") raw = (power + str) / 5 - def;
  else if (type === "spell") raw = (mag + power) / 5 - def;
  else raw = ((power + mag) / 5 - def) * coefficient;
  return Math.max(0, Math.floor(raw));
}

function calculator(enemyData) {
  const enemies = (enemyData.enemies ?? []).filter((e) => e.def !== null && e.def !== undefined);
  const scaling = enemyData.scaling;
  const state = { type: "auto", str: 20, mag: 20, power: 10, def: 2, coefficient: 2, enemy: "", cycle: 1 };
  const result = el("div", { class: "stat-block", style: "grid-template-columns:1fr" });
  const powerLabel = el("span", {}, ATTACKS.auto.power);
  const defInput = numberInput("def", "Monster DEF");

  function numberInput(key, label) {
    return el("input", {
      type: "number",
      min: "0",
      value: state[key],
      "aria-label": label,
      oninput: (e) => { state[key] = Number(e.target.value) || 0; update(); },
    });
  }

  function syncEnemyDef() {
    const enemy = enemies.find((e) => enemyName(e) === state.enemy);
    if (!enemy) return;
    state.def = Math.floor(enemy.def * scaling.cycleStats[String(state.cycle)]);
    defInput.value = state.def;
  }

  function update() {
    powerLabel.textContent = ATTACKS[state.type].power;
    const value = damage(state);
    append(clear(result),
      el("div", {}, el("b", { style: "font-size:2rem" }, value), el("span", {}, "damage per hit")),
    );
  }

  const panel = el(
    "section",
    { class: "panel", id: "damage" },
    el("h2", {}, "Damage calculator"),
    el(
      "div",
      { class: "toolbar" },
      el(
        "label",
        { class: "field" },
        "Attack",
        el(
          "select",
          { onchange: (e) => { state.type = e.target.value; update(); } },
          Object.entries(ATTACKS).map(([key, a]) => el("option", { value: key }, a.label)),
        ),
      ),
      el("label", { class: "field" }, "Your STR", numberInput("str", "Your strength")),
      el("label", { class: "field" }, "Your MAG", numberInput("mag", "Your magic")),
      el("label", { class: "field" }, powerLabel, numberInput("power", "Attack power")),
      el(
        "label",
        { class: "field" },
        "Fusion bonus",
        el(
          "select",
          { onchange: (e) => { state.coefficient = Number(e.target.value); update(); } },
          el("option", { value: "2" }, "×2 (-ra)"),
          el("option", { value: "3" }, "×3 (-ga)"),
        ),
      ),
    ),
    el(
      "div",
      { class: "toolbar" },
      el(
        "label",
        { class: "field grow" },
        "Monster (fills in DEF)",
        el("input", {
          type: "search",
          list: "calc-enemies",
          placeholder: "Optional – e.g. Ogre",
          oninput: debounce((e) => { state.enemy = e.target.value; syncEnemyDef(); update(); }, 150),
        }),
        el("datalist", { id: "calc-enemies" }, enemies.map((e) => el("option", { value: enemyName(e) }))),
      ),
      el(
        "div",
        { class: "field" },
        "Cycle",
        segmented([1, 2, 3].map((c) => ({ value: c, label: `${c}` })), state.cycle, (v) => { state.cycle = v; syncEnemyDef(); update(); }, "Cycle"),
      ),
      el("label", { class: "field" }, "Monster DEF", defInput),
    ),
    result,
    el(
      "p",
      { class: "small muted", style: "margin-top:10px" },
      "Formulas from the Piggyback (French) official guide. A spell combined with a focus attack multiplies the focus attack's damage by 1, 2 or 3, one for each player whose spell went into it.",
    ),
  );
  update();
  return panel;
}

/* ---------- Spells ---------- */

function spellsPanel(magic) {
  const spells = magic.spells ?? [];
  const families = [...new Set(spells.map((s) => s.family).filter(Boolean))];
  const state = { family: "all", search: "" };
  const body = el("div");

  function draw() {
    const visible = spells.filter((s) => {
      if (state.family !== "all" && s.family !== state.family) return false;
      return !state.search || [s.name, s.singlePlayer, s.multiplayer, s.effect].join(" ").toLowerCase().includes(state.search);
    });
    append(clear(body),
      el(
        "div",
        { class: "table-wrap" },
        el(
          "table",
          {},
          el(
            "thead",
            {},
            el("tr", {}, el("th", {}, "Spell"), el("th", {}, "Solo recipe"), el("th", {}, "Multiplayer recipe"), el("th", {}, "Power"), el("th", {}, "Area"), el("th", {}, "Effect")),
          ),
          el(
            "tbody",
            {},
            visible.map((s) =>
              el(
                "tr",
                {},
                el(
                  "td",
                  { style: "white-space:nowrap" },
                  SPELL_RINGS[s.family] ? el("img", { class: "icon sm", src: assetUrl(`spell/${SPELL_RINGS[s.family]}.png`), alt: "" }) : null,
                  " ",
                  el("b", {}, s.name),
                  s.timing ? el("span", { class: "chip", style: "margin-left:4px", title: "Fusion timing type" }, s.timing) : null,
                ),
                el("td", { class: "small" }, s.singlePlayer ?? "—"),
                el("td", { class: "small" }, s.multiplayer ?? "—"),
                el("td", {}, s.power ?? "—"),
                el("td", {}, s.area ?? "—"),
                el("td", { class: "small" }, s.effect ?? "", s.notes ? el("div", { class: "muted" }, s.notes) : null),
              ),
            ),
          ),
        ),
      ),
    );
  }

  const panel = el(
    "section",
    { class: "panel" },
    el("h2", {}, "Spells & fusions"),
    el(
      "div",
      { class: "toolbar" },
      el(
        "label",
        { class: "field grow" },
        "Search",
        el("input", { type: "search", placeholder: "Spell or magicite", oninput: debounce((e) => { state.search = e.target.value.toLowerCase(); draw(); }) }),
      ),
      el(
        "label",
        { class: "field" },
        "Family",
        el(
          "select",
          { onchange: (e) => { state.family = e.target.value; draw(); } },
          el("option", { value: "all" }, "All spells"),
          families.map((f) => el("option", { value: f }, f)),
        ),
      ),
    ),
    body,
    magic.fusionTimings?.length
      ? el(
          "details",
          { style: "margin-top:12px" },
          el("summary", {}, "Fusion timing types (A–E)"),
          el("dl", { class: "stats", style: "margin-top:8px" }, magic.fusionTimings.map((t) => [el("dt", {}, t.type), el("dd", {}, t.description)])),
        )
      : null,
  );
  draw();
  return panel;
}

function magicitePanel(magic) {
  return el(
    "section",
    { class: "panel" },
    el("h2", {}, "Magicite"),
    el(
      "ul",
      { style: "list-style:none;padding:0;margin:0" },
      (magic.magicite ?? []).map((m) =>
        el(
          "li",
          { style: "display:flex;gap:10px;align-items:flex-start;margin-bottom:10px" },
          SPELL_RINGS[m.name] ? el("img", { class: "icon lg", src: assetUrl(`spell/${SPELL_RINGS[m.name]}.png`), alt: "" }) : null,
          el(
            "div",
            {},
            el("b", {}, m.name),
            m.ring ? el("span", { class: "small muted" }, ` · ring: ${m.ring}`) : null,
            el("div", { class: "small" }, m.effect),
          ),
        ),
      ),
    ),
  );
}

function strikesPanel(magic) {
  return el(
    "section",
    { class: "panel" },
    el("h2", {}, "Magic strikes"),
    magic.magicStrikesNote ? el("p", { class: "small muted" }, magic.magicStrikesNote) : null,
    el(
      "div",
      { class: "table-wrap" },
      el(
        "table",
        {},
        el("thead", {}, el("tr", {}, el("th", {}, "Strike"), el("th", {}, "How"), el("th", {}, "Inflicts"))),
        el("tbody", {}, (magic.magicStrikes ?? []).map((s) => el("tr", {}, el("td", {}, s.name), el("td", {}, s.combination), el("td", {}, s.status ?? "—")))),
      ),
    ),
  );
}

function statusPanel(magic) {
  return el(
    "section",
    { class: "panel" },
    el("h2", {}, "Status effects"),
    magic.statusEffectsNote ? el("p", { class: "small muted" }, magic.statusEffectsNote) : null,
    el(
      "div",
      { class: "table-wrap" },
      el(
        "table",
        {},
        el("thead", {}, el("tr", {}, el("th", {}, "Status"), el("th", {}, "What it does"), el("th", {}, "Cured by"))),
        el(
          "tbody",
          {},
          (magic.statusEffects ?? []).map((s) =>
            el("tr", {}, el("td", {}, el("b", {}, s.name)), el("td", {}, s.effect, s.notes ? el("div", { class: "small muted" }, s.notes) : null), el("td", {}, (s.cure ?? []).join(", ") || "—")),
          ),
        ),
      ),
    ),
    el("p", { class: "small" }, "How long a status lasts depends on the caster's tribe. See the ", el("a", { href: "tribes.html" }, "Tribes page"), "."),
  );
}

function rulesPanel(magic) {
  return el(
    "section",
    { class: "grid grid-2" },
    el(
      "div",
      { class: "panel" },
      el("h2", {}, "Formulas"),
      (magic.formulas ?? []).map((f) =>
        el(
          "div",
          { style: "margin-bottom:12px" },
          el("b", {}, f.name),
          el("div", { style: "font-family:ui-monospace,Consolas,monospace;font-size:.92rem" }, f.formula),
          f.notes ? el("div", { class: "small muted" }, f.notes) : null,
          f.source ? el("div", { class: "small muted" }, `Source: ${f.source}`) : null,
        ),
      ),
    ),
    el(
      "div",
      { class: "panel" },
      el("h2", {}, "Good to know"),
      (magic.rules ?? []).map((r) => el("div", { style: "margin-bottom:12px" }, el("b", {}, r.name), el("div", { class: "small" }, r.text))),
    ),
  );
}
