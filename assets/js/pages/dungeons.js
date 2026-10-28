/*
  Dungeons page

  Pick a dungeon from the icon grid, then a cycle. Shows the monsters and
  chests for that cycle, a map of every area, the bonus point rules and the
  boss reward sets.

  Chest contents, monster drops and the maps come from data/stagemaps.js reads out of the game itself.
*/
const {
  initPage,
  append,
  loadData,
  el,
  clear,
  assetUrl,
  showError,
  loadingNode,
  segmented,
  urlState,
  findEnemy,
  enemyKey,
  enemyName,
  resistPips,
  buildItemIndex,
  linkTo,
  store,
} = Codex;
const { renderArea, chestLoot, inCycle, partyNote } = Codex.stagemap;
const { setsForCycle, pointsNeeded } = Codex.drops;

initPage();

const app = document.getElementById("app");
app.append(loadingNode());

const dungeonIcon = (id) => assetUrl(`dungeon/${id}.png`);

const state = {
  id: urlState.get("d"),
  cycle: Number(urlState.get("cycle")) || 1,
  players: 1,
  // What the area maps show; remembered between visits.
  layers: {
    notes: true,
    monsters: true,
    hotspots: true,
    warps: true,
    puzzle: true,
    ...store.get("map-layers", {}),
  },
};

/* data/stagemaps.js, or null if it hasn't been generated. */
let stageMaps = null;

/* Filled in once the data loads: item name -> the page that explains it. */
let itemHref = () => null;

Promise.all([
  loadData("dungeons"),
  loadData("enemies"),
  loadData("items"),
  loadData("artifacts"),
  loadData("stagemaps").catch(() => null),
])
  .then(([dungeonData, enemyData, items, artifacts, stageData]) => {
    itemHref = buildItemIndex(items, artifacts);
    stageMaps = stageData;
    const dungeons = [...(dungeonData.dungeons ?? [])].sort(
      (a, b) => (a.order ?? 99) - (b.order ?? 99),
    );
    const enemies = enemyData.enemies ?? [];
    if (!dungeons.some((d) => d.id === state.id)) state.id = dungeons[0]?.id;

    const picker = el("div", {
      class: "dungeon-picker",
      role: "group",
      "aria-label": "Choose a dungeon",
    });
    const detail = el("div");

    function pick(id) {
      state.id = id;
      urlState.set({ d: id });
      for (const button of picker.children)
        button.setAttribute("aria-pressed", String(button.dataset.id === id));
      renderDungeon(
        detail,
        dungeons.find((d) => d.id === id),
        dungeonData,
        enemies,
      );
    }

    picker.append(
      ...dungeons.map((d) =>
        el(
          "button",
          {
            type: "button",
            dataset: { id: d.id },
            "aria-pressed": "false",
            onclick: () => pick(d.id),
          },
          el("img", {
            src: dungeonIcon(d.id),
            alt: "",
            loading: "lazy",
            onerror: (e) => {
              e.target.src = assetUrl("icon/crystal-0.png");
            },
          }),
          d.name,
        ),
      ),
    );

    append(clear(app), picker, detail);
    pick(state.id);
  })
  .catch((error) => showError(app, error));

function renderDungeon(container, dungeon, data, enemies) {
  if (!dungeon) return;
  const cycleBody = el("div");

  function drawCycle() {
    urlState.set({ cycle: state.cycle });
    const stage = stageMaps?.[dungeon.id];
    append(
      clear(cycleBody),
      el(
        "div",
        { class: "grid grid-2" },
        enemiesPanel(dungeon, enemies, stage),
        stage ? stageChestsPanel(stage) : null,
      ),
      stage ? hotspotsPanel(stage) : null,
      dungeon.puzzle ? puzzlePanel(dungeon.puzzle) : null,
      stage ? stageMapsPanel(stage, setCycle) : null,
      rewardsPanel(dungeon, data.rewardSetRules),
      bonusHelperPanel(dungeon, data, stage),
    );
  }

  /*
    The cycle can be changed from the top of the page or from the map toolbar.
    Keep the top buttons in step, and keep the page where it was so switching
    from the map doesn't jump you away from it.
  */
  const topCycle = segmented(
    [1, 2, 3].map((c) => ({ value: c, label: `Cycle ${c}` })),
    state.cycle,
    (v) => setCycle(v),
    "Cycle",
  );
  function setCycle(cycle) {
    state.cycle = cycle;
    [...topCycle.children].forEach((button, i) =>
      button.setAttribute("aria-pressed", String(i + 1 === cycle)),
    );
    const scroll = window.scrollY;
    drawCycle();
    window.scrollTo(0, scroll);
  }

  append(
    clear(container),
    el(
      "section",
      { class: "panel" },
      el(
        "div",
        {
          style: "display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap",
        },
        el("img", {
          src: dungeonIcon(dungeon.id),
          alt: "",
          style: "width:96px;height:96px;object-fit:contain",
          onerror: (e) => e.target.remove(),
        }),
        el(
          "div",
          { style: "flex:1;min-width:240px" },
          el("h2", { style: "margin-bottom:6px" }, dungeon.name),
          el(
            "div",
            { style: "display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px" },
            dungeon.boss
              ? el(
                  "span",
                  { class: "chip boss" },
                  "Boss: ",
                  bossLink(dungeon.boss, enemies),
                )
              : null,
            dungeon.firstYear
              ? el(
                  "span",
                  { class: "chip" },
                  `Open from year ${dungeon.firstYear}`,
                )
              : null,
            dungeon.element
              ? el(
                  "span",
                  { class: "chip" },
                  `Chalice element: ${dungeon.element}`,
                )
              : null,
            dungeon.region
              ? el("span", { class: "chip" }, dungeon.region)
              : null,
          ),
          dungeon.description ? el("p", {}, dungeon.description) : null,
        ),
      ),
      dungeon.tips?.length
        ? el(
            "ul",
            {},
            dungeon.tips.map((t) => el("li", {}, t)),
          )
        : null,
      dungeon.notes ? el("p", { class: "small muted" }, dungeon.notes) : null,
    ),
    el(
      "div",
      { class: "toolbar" },
      el("div", { class: "field" }, "Cycle (dungeon level)", topCycle),
    ),
    cycleBody,
    bonusPanel(dungeon, data.bonusConditions ?? []),
  );
  drawCycle();
}

function bossLink(name, enemies) {
  const boss = findEnemy(enemies, name);
  return boss
    ? el(
        "a",
        {
          href: `bestiary.html?enemy=${enemyKey(boss)}`,
          style: "color:inherit",
        },
        name,
      )
    : name;
}

/*
  A monster type's drops in this dungeon and cycle, as the chance per kill:
  each spawn rolls its own table, so average over every spawn of that type.
*/
function monsterDrops(stage, name) {
  const spawns = (stage?.areas ?? [])
    .flatMap((a) => a.monsters ?? [])
    .filter((m) => m.name === name && inCycle(m, state.cycle));
  if (!spawns.length) return [];
  const totals = new Map();
  for (const m of spawns) {
    for (const d of m.drops?.[String(state.cycle)] ?? []) {
      if (d.item === "Nothing") continue;
      totals.set(d.item, (totals.get(d.item) ?? 0) + d.chance);
    }
  }
  return [...totals.entries()]
    .map(([item, sum]) => ({ item, chance: Math.round(sum / spawns.length) }))
    .filter((d) => d.chance > 0)
    .sort((a, b) => b.chance - a.chance);
}

function enemiesPanel(dungeon, enemies, stage) {
  const names = dungeon.enemies?.[String(state.cycle)] ?? [];
  return el(
    "section",
    { class: "panel" },
    el("h3", {}, `Monsters – cycle ${state.cycle}`),
    names.length
      ? el(
          "div",
          { class: "table-wrap" },
          el(
            "table",
            {},
            el(
              "thead",
              {},
              el(
                "tr",
                {},
                el("th", {}, "Monster"),
                el("th", {}, "Fire"),
                el("th", {}, "Bliz."),
                el("th", {}, "Thun."),
                el("th", {}, "Weak to"),
                stage ? el("th", {}, "Drops (per kill)") : null,
              ),
            ),
            el(
              "tbody",
              {},
              names.map((name) => {
                const enemy = findEnemy(enemies, name);
                return el(
                  "tr",
                  {},
                  el(
                    "td",
                    {},
                    enemy
                      ? el("img", {
                          class: "icon monster-thumb",
                          src: assetUrl(`monster/${enemyKey(enemy)}.png`),
                          alt: "",
                          loading: "lazy",
                          onerror: (e) => e.target.remove(),
                        })
                      : null,
                    enemy
                      ? el(
                          "a",
                          {
                            href: `bestiary.html?enemy=${enemyKey(enemy)}&cycle=${state.cycle}`,
                          },
                          enemyName(enemy),
                        )
                      : name,
                  ),
                  ["fire", "blizzard", "thunder"].map((k) =>
                    el(
                      "td",
                      {},
                      enemy
                        ? resistPips(enemy.resist?.[k], { label: false })
                        : "",
                    ),
                  ),
                  el("td", { class: "small" }, enemy?.weak?.join(", ") ?? ""),
                  stage
                    ? el(
                        "td",
                        { class: "small" },
                        dropList(monsterDrops(stage, enemy?.name ?? name)),
                      )
                    : null,
                );
              }),
            ),
          ),
        )
      : el("p", { class: "muted" }, "No monster list for this cycle yet."),
  );
}

function rewardsPanel(dungeon, rules) {
  if (!dungeon.rewardSets?.length || !rules) return el("div");
  const playersBody = el("div");

  function draw() {
    const sets = setsForCycle(rules, state.cycle);
    append(
      clear(playersBody),
      el(
        "div",
        { class: "grid grid-4" },
        sets.map(({ set, requirement }) => {
          const needed = pointsNeeded(dungeon, requirement, state.players);
          return el(
            "div",
            { class: "reward-set" },
            el(
              "h4",
              {},
              `Set ${set}`,
              el(
                "span",
                { class: "small" },
                requirement === "always" ? "always" : `${needed ?? "?"}+ pts`,
              ),
            ),
            el(
              "ul",
              { class: "small" },
              (dungeon.rewardSets[set - 1] ?? []).map((item) =>
                el("li", {}, linkTo(item, itemHref(item))),
              ),
            ),
          );
        }),
      ),
    );
  }

  const panel = el(
    "section",
    { class: "panel" },
    el("h3", {}, `Boss reward sets – cycle ${state.cycle}`),
    el(
      "div",
      { class: "toolbar" },
      el(
        "div",
        { class: "field" },
        "Players",
        segmented(
          [1, 2, 3, 4].map((p) => ({ value: p, label: `${p}P` })),
          state.players,
          (v) => {
            state.players = v;
            draw();
          },
          "Players",
        ),
      ),
      el(
        "a",
        {
          class: "btn small",
          href: `artifacts.html?dungeon=${dungeon.id}&cycle=${state.cycle}#calculator`,
        },
        "Open in drop calculator",
      ),
    ),
    playersBody,
  );
  draw();
  return panel;
}

/*
  Bonus point helper: pick the condition you rolled and see which reward sets
  you can reach in this cycle and party size, and how much more you need for
  the next one.

    final score = condition points (0–100) + enemies defeated + items picked up

  Positive conditions earn their value every time you do the thing. "Don't …"
  and "Avoid damage" start you with points and take them away for each slip;
  the guides don't give that starting amount, so it's assumed to be the 100 cap.
*/
const CONDITION_CAP = 100;

function bonusHelperPanel(dungeon, data, stage) {
  const conditions = (data.bonusConditions ?? [])
    .map((c) => ({ name: c.name, value: c.values?.[dungeon.id] }))
    .filter((c) => typeof c.value === "number");
  const rules = data.rewardSetRules;
  if (!conditions.length || !dungeon.tiers || !rules) return null;

  // Sensible starting guesses for the two counts that always add to your score.
  const spawns = (players) =>
    (stage?.areas ?? []).flatMap((a) => a.monsters ?? [])
      .filter((m) => (!m.cycles?.length || m.cycles.includes(state.cycle)) && (!m.players?.length || m.players.includes(players))).length;
  const chests = (stage?.areas ?? []).flatMap((a) => a.chests ?? [])
    .filter((c) => !c.cycles?.length || c.cycles.includes(state.cycle)).length;

  const helper = {
    condition: conditions[0].name,
    players: state.players,
    times: 10,
    enemies: spawns(state.players),
    items: chests,
  };
  const result = el("div");

  function number(key, label, help) {
    return el(
      "label",
      { class: "field" },
      label,
      el("input", {
        type: "number",
        min: "0",
        value: helper[key],
        oninput: (e) => {
          helper[key] = Math.max(0, Number(e.target.value) || 0);
          draw();
        },
      }),
      help ? el("span", { class: "small muted" }, help) : null,
    );
  }

  function draw() {
    const condition = conditions.find((c) => c.name === helper.condition);
    const gain = condition.value > 0;
    const conditionPoints = gain
      ? Math.min(CONDITION_CAP, condition.value * helper.times)
      : Math.max(0, CONDITION_CAP + condition.value * helper.times);
    const score = conditionPoints + helper.enemies + helper.items;

    const sets = setsForCycle(rules, state.cycle).map(({ set, requirement }) => ({
      set,
      needed: pointsNeeded(dungeon, requirement, helper.players),
      items: dungeon.rewardSets?.[set - 1] ?? [],
    }));
    const unlocked = sets.filter((s) => s.needed !== null && score >= s.needed);
    const next = sets.find((s) => s.needed !== null && score < s.needed);

    // How many more of the condition's action would reach the next set, if the condition alone could get there.
    let nextHint = null;
    if (next) {
      const short = next.needed - score;
      if (gain && conditionPoints < CONDITION_CAP) {
        const more = Math.ceil(short / condition.value);
        nextHint = conditionPoints + more * condition.value <= CONDITION_CAP
          ? `${more} more "${condition.name.toLowerCase()}" (+${condition.value} each) would unlock Set ${next.set}.`
          : `Set ${next.set} needs ${next.needed}. Your condition caps at ${CONDITION_CAP}, so the last ${short - (CONDITION_CAP - conditionPoints)} points have to come from defeating enemies or picking things up.`;
      } else if (!gain) {
        nextHint = `Set ${next.set} needs ${next.needed} – you're ${short} short. Every slip costs ${-condition.value}, so slip less or defeat more enemies and pick up more items.`;
      } else {
        nextHint = `Your condition is already at the ${CONDITION_CAP} cap – ${short} more enemies defeated or items picked up would unlock Set ${next.set}.`;
      }
    }

    append(clear(result),
      el(
        "div",
        { class: "stat-block", style: "grid-template-columns:repeat(4,1fr);margin:12px 0" },
        el("div", {}, el("b", {}, conditionPoints), el("span", {}, "Condition")),
        el("div", {}, el("b", {}, helper.enemies), el("span", {}, "Enemies")),
        el("div", {}, el("b", {}, helper.items), el("span", {}, "Items")),
        el("div", { class: "score-total" }, el("b", {}, score), el("span", {}, "Score")),
      ),
      el(
        "div",
        { class: "grid grid-4" },
        sets.map((s) => {
          const open = unlocked.includes(s);
          return el(
            "div",
            { class: `reward-set${open ? "" : " locked"}` },
            el(
              "h4",
              {},
              `Set ${s.set}`,
              el("span", { class: "pct" }, open ? `${Math.round(100 / unlocked.length)}%` : `${s.needed}+`),
            ),
            el("ul", { class: "small" }, s.items.map((item) => el("li", {}, linkTo(item, itemHref(item))))),
          );
        }),
      ),
      el(
        "p",
        { class: "note small", style: "margin-top:12px" },
        unlocked.length
          ? `${unlocked.length} of ${sets.length} reward sets in the pool – one is picked at random, so each is ${Math.round(100 / unlocked.length)}%. `
          : "",
        next ? nextHint : "Every reward set for this cycle is unlocked – the best one is as likely as it gets.",
      ),
      gain
        ? null
        : el("p", { class: "small muted" }, `"${condition.name}" is assumed to start you at ${CONDITION_CAP} points (the guides don't say exactly).`),
    );
  }

  const conditionSelect = el(
    "select",
    { onchange: (e) => { helper.condition = e.target.value; timesLabel(); draw(); } },
    conditions.map((c) => el("option", { value: c.name }, `${c.name} (${c.value > 0 ? "+" : ""}${c.value})`)),
  );
  const timesField = number("times", "Times you'll do it", null);
  function timesLabel() {
    const c = conditions.find((x) => x.name === helper.condition);
    timesField.firstChild.textContent = c.value > 0 ? "Times you'll do it" : "Times you'll slip";
  }

  const panel = el(
    "section",
    { class: "panel", id: "bonus-helper" },
    el("h3", {}, `Bonus point helper – cycle ${state.cycle}`),
    el(
      "p",
      { class: "small muted" },
      "Pick the bonus condition you rolled, then guess how often you'll do it. Score = your condition (capped at 100) + enemies defeated + items picked up. Enemy and item counts start at this dungeon's monsters and chests for the cycle – change them to match your run.",
    ),
    el(
      "div",
      { class: "toolbar" },
      el("label", { class: "field" }, "Your bonus condition", conditionSelect),
      timesField,
      number("enemies", "Enemies defeated"),
      number("items", "Items picked up"),
      el(
        "div",
        { class: "field" },
        "Players",
        segmented([1, 2, 3, 4].map((p) => ({ value: p, label: `${p}P` })), helper.players, (v) => {
          helper.players = v;
          draw();
        }, "Players"),
      ),
    ),
    result,
  );
  draw();
  return panel;
}

function bonusPanel(dungeon, conditions) {
  const rows = conditions
    .map((c) => ({ name: c.name, value: c.values?.[dungeon.id] }))
    .filter((c) => c.value !== undefined && c.value !== null);
  const tiers = dungeon.tiers;

  return el(
    "section",
    { class: "panel" },
    el("h3", {}, "Bonus points"),
    el(
      "p",
      { class: "small muted" },
      "Each player gets one random bonus condition per run. Final score = condition points (max 100) + monsters defeated + items picked up.",
    ),
    el(
      "div",
      { class: "grid grid-2" },
      rows.length
        ? el(
            "div",
            { class: "table-wrap" },
            el(
              "table",
              {},
              el(
                "thead",
                {},
                el(
                  "tr",
                  {},
                  el("th", {}, "Condition"),
                  el("th", { class: "num" }, "Points each time"),
                ),
              ),
              el(
                "tbody",
                {},
                rows.map((r) =>
                  el(
                    "tr",
                    {},
                    el("td", {}, r.name),
                    el(
                      "td",
                      { class: "num" },
                      r.value > 0 ? `+${r.value}` : r.value,
                    ),
                  ),
                ),
              ),
            ),
          )
        : el("p", { class: "muted" }, "No bonus conditions recorded."),
      tiers
        ? el(
            "div",
            { class: "table-wrap" },
            el(
              "table",
              {},
              el(
                "thead",
                {},
                el(
                  "tr",
                  {},
                  el("th", {}, "Tier"),
                  [1, 2, 3, 4].map((p) => el("th", { class: "num" }, `${p}P`)),
                ),
              ),
              el(
                "tbody",
                {},
                ["A", "B", "C"].map((tier) =>
                  el(
                    "tr",
                    {},
                    el("td", {}, `Tier ${tier}`),
                    (tiers[tier] ?? []).map((v) =>
                      el("td", { class: "num" }, v ?? "?"),
                    ),
                  ),
                ),
              ),
            ),
            el(
              "p",
              { class: "small muted" },
              "Score at least this many points to add the next reward set to the pool.",
            ),
          )
        : null,
    ),
  );
}

function dropList(drops) {
  if (!drops.length) return el("span", { class: "muted" }, "—");
  return drops
    .slice(0, 4)
    .map((d, i) => [
      i ? ", " : "",
      linkTo(d.item, itemHref(d.item)),
      ` ${d.chance}%`,
    ]);
}

/* Spell -> its target-ring sprite (assets/img/spell). */
const SPELL_ICONS = {
  Fire: "fire", Blizzard: "blizzard", Thunder: "thunder", Cure: "cure", Life: "raise",
  Clear: "clear", Holy: "holy", Gravity: "gravity", Slow: "slow", Haste: "haste", Stop: "stop",
};

/*
  A dungeon puzzle walked through step by step – Lynari Desert's Unknown
  element. The data is the `puzzle` field in dungeons.js.
*/
function puzzlePanel(puzzle) {
  return el(
    "section",
    { class: "panel puzzle", id: puzzle.id },
    el("h3", {}, puzzle.title, puzzle.when ? el("span", { class: "chip", style: "margin-left:8px" }, puzzle.when) : null),
    el("p", {}, puzzle.summary),
    el(
      "ol",
      { class: "puzzle-steps" },
      puzzle.steps.map((step) =>
        el(
          "li",
          {},
          SPELL_ICONS[step.spell] ? el("img", { src: assetUrl(`spell/${SPELL_ICONS[step.spell]}.png`), alt: "" }) : null,
          el(
            "div",
            {},
            el("b", {}, `Cast ${step.spell}`, " on ", step.target.charAt(0).toLowerCase() + step.target.slice(1)),
            el("div", { class: "small" }, step.where),
          ),
        ),
      ),
    ),
    el("p", { class: "note small" }, el("b", {}, "Reward: "), puzzle.reward),
    puzzle.notes?.length ? el("ul", { class: "small" }, puzzle.notes.map((n) => el("li", {}, n))) : null,
    puzzle.mapHint ? el("p", { class: "small muted" }, puzzle.mapHint) : null,
    puzzle.source ? el("p", { class: "small muted" }, `Source: ${puzzle.source}`) : null,
  );
}

/* The order and colours used for chalice elements everywhere on the site. */
const ELEMENTS = [
  ["Fire", "#e2572d"],
  ["Water", "#3c91f5"],
  ["Wind", "#50cd73"],
  ["Earth", "#b07a3a"],
  ["Unknown", "#9a7fd1"],
];

/*
  Every chalice hotspot in the dungeon, grouped by element: which elements you
  can switch to here and in which area. Hotspots are the same in every cycle.
*/
function hotspotsPanel(stage) {
  const byElement = new Map();
  for (const area of stage.areas) {
    for (const spot of area.hotspots ?? []) {
      if (!byElement.has(spot.element)) byElement.set(spot.element, new Map());
      const areas = byElement.get(spot.element);
      areas.set(area.area, (areas.get(area.area) ?? 0) + 1);
    }
  }
  if (!byElement.size) {
    return el(
      "p",
      { class: "note small" },
      el("b", {}, "No chalice hotspots here. "),
      "You can't change the chalice's element inside this dungeon, so set it before you come in.",
    );
  }
  const multi = stage.areas.length > 1;

  return el(
    "section",
    { class: "panel" },
    el("h3", {}, "Chalice hotspots"),
    el(
      "p",
      { class: "small muted" },
      "Set the chalice down on a hotspot to change its element – that's what lets you cross a miasma stream of that element on the world map. A hotspot also lets you leave the dungeon early.",
    ),
    el(
      "div",
      { class: "hotspot-grid" },
      ELEMENTS.filter(([name]) => byElement.has(name)).map(([name, color]) => {
        const areas = byElement.get(name);
        const total = [...areas.values()].reduce((a, b) => a + b, 0);
        return el(
          "div",
          { class: "hotspot-card", style: `--element:${color}` },
          el("span", { class: "hotspot-pin", "aria-hidden": "true" }, name[0]),
          el(
            "div",
            {},
            el("b", {}, `${name} `, el("span", { class: "chip" }, `×${total}`)),
            el(
              "div",
              { class: "small" },
              multi
                ? [...areas.entries()]
                    .sort((a, b) => a[0] - b[0])
                    .map(
                      ([n, count]) =>
                        `Area ${n}${count > 1 ? ` ×${count}` : ""}`,
                    )
                    .join(" · ")
                : "On the map below",
            ),
          ),
        );
      }),
    ),
  );
}

function stageChestsPanel(stage) {
  const rows = stage.areas.flatMap((area) =>
    (area.chests ?? [])
      .filter((c) => inCycle(c, state.cycle))
      .map((chest) => ({ area, chest })),
  );
  return el(
    "section",
    { class: "panel" },
    el("h3", {}, `Treasure chests – cycle ${state.cycle}`),
    el(
      "p",
      { class: "small muted" },
      "Read from the game: opening a chest rolls one of four outcomes, so each 25% is one of them.",
    ),
    rows.length
      ? el(
          "div",
          { class: "table-wrap" },
          el(
            "table",
            {},
            el(
              "thead",
              {},
              el("tr", {}, el("th", {}, "Chest"), el("th", {}, "Contents")),
            ),
            el(
              "tbody",
              {},
              rows.map(({ area, chest }) =>
                el(
                  "tr",
                  {},
                  el(
                    "td",
                    { style: "white-space:nowrap" },
                    stage.areas.length > 1
                      ? `Area ${area.area} · #${chest.chest}`
                      : `#${chest.chest}`,
                  ),
                  el(
                    "td",
                    {},
                    chestLoot(chest, state.cycle).map((entry, i) =>
                      el(
                        "span",
                        {},
                        i ? " · " : "",
                        linkTo(entry.item, itemHref(entry.item)),
                        el(
                          "span",
                          { class: "small muted" },
                          ` ${entry.chance}%`,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        )
      : el("p", { class: "muted" }, "No chests in this cycle."),
  );
}

function stageMapsPanel(stage, setCycle) {
  const body = el("div");
  // Note boxes beside the map are unreadable on a phone; the chest table covers it there.
  const roomForNotes = () => window.matchMedia("(min-width: 760px)").matches;

  function toggle(key, label) {
    return el(
      "label",
      {
        class: "field",
        style: "flex-direction:row;align-items:center;gap:6px;min-height:36px",
      },
      el("input", {
        type: "checkbox",
        checked: state.layers[key] ? true : null,
        onchange: (e) => {
          state.layers[key] = e.target.checked;
          store.set("map-layers", state.layers);
          draw();
        },
      }),
      label,
    );
  }

  // Number the dungeon's traps I, II, III... and work out which ones land in each area.
  let warpNumber = 0;
  const incomingByArea = new Map();
  for (const area of stage.areas) {
    for (const warp of area.warps ?? []) {
      warp.number ??= ++warpNumber;
      if (warp.toArea && warp.toArea !== area.area && warp.toX !== undefined) {
        if (!incomingByArea.has(warp.toArea))
          incomingByArea.set(warp.toArea, []);
        incomingByArea.get(warp.toArea).push({ warp, fromArea: area.area });
      }
    }
  }

  function draw() {
    append(
      clear(body),
      stage.areas.map((area) => {
        const { map, letters, monsters } = renderArea(area, {
          incoming: incomingByArea.get(area.area) ?? [],
          cycle: state.cycle,
          players: state.players,
          notes: state.layers.notes && roomForNotes(),
          monsters: state.layers.monsters,
          hotspots: state.layers.hotspots,
          warps: state.layers.warps,
          puzzle: state.layers.puzzle,
          itemHref,
        });
        const counts = new Map();
        for (const m of monsters)
          counts.set(enemyKey(m), (counts.get(enemyKey(m)) ?? 0) + 1);
        // Spawns in this area that only show up with a bigger party, by monster type.
        const partyOnly = new Map();
        for (const m of monsters) {
          const note = partyNote(m);
          if (note)
            partyOnly.set(enemyKey(m), (partyOnly.get(enemyKey(m)) ?? 0) + 1);
        }
        const named = new Map(monsters.map((m) => [enemyKey(m), m]));
        return el(
          "section",
          { class: "stage-area", id: `map-area-${area.area}` },
          stage.areas.length > 1 ? el("h4", {}, `Area ${area.area}`) : null,
          map,
          state.layers.monsters && letters.size
            ? el(
                "div",
                { class: "stage-legend" },
                [...letters.entries()].map(([key, letter]) =>
                  el(
                    "span",
                    {},
                    el("span", { class: "letter" }, letter),
                    el(
                      "a",
                      {
                        href: `bestiary.html?enemy=${key}&cycle=${state.cycle}`,
                      },
                      enemyName(named.get(key)),
                    ),
                    ` ×${counts.get(key)}`,
                    partyOnly.has(key)
                      ? el(
                          "span",
                          {
                            class: "party-mark",
                            title: "These spawns depend on party size",
                          },
                          ` (${partyOnly.get(key)} depend on party size)`,
                        )
                      : null,
                  ),
                ),
              )
            : null,
          state.layers.monsters && partyOnly.size
            ? el(
                "p",
                { class: "small muted", style: "margin:4px 0 0" },
                "Letters with a dashed ring depend on party size – some only spawn with more players, a few only in solo play. Pick your party size above to see exactly what you'll meet.",
              )
            : null,
          (area.moogle ?? []).length
            ? el(
                "p",
                { class: "small", style: "margin:4px 0 0" },
                el("img", {
                  class: "icon sm",
                  src: assetUrl("ui/mog-0.png"),
                  alt: "",
                }),
                " Moogle Nest – visit it for this dungeon's Mog Stamp.",
              )
            : null,
        );
      }),
    );
  }

  const panel = el(
    "section",
    { class: "panel" },
    el("h3", {}, `Maps – cycle ${state.cycle}`),
    el(
      "div",
      { class: "toolbar", style: "margin-bottom:8px" },
      toggle("notes", "Chest notes"),
      toggle("monsters", "Monsters"),
      toggle("hotspots", "Hotspots"),
      stage.areas.some((a) => a.warps?.length)
        ? toggle("warps", "Sand traps & warps")
        : null,
      stage.areas.some((a) => a.puzzle?.length)
        ? toggle("puzzle", "Puzzle steps")
        : null,
      el(
        "div",
        { class: "field" },
        "Cycle",
        segmented(
          [1, 2, 3].map((c) => ({ value: c, label: `${c}` })),
          state.cycle,
          (v) => setCycle(v),
          "Map cycle",
        ),
      ),
      el(
        "div",
        { class: "field" },
        "Party size",
        segmented(
          [1, 2, 3, 4].map((p) => ({ value: p, label: `${p}P` })),
          state.players,
          (v) => {
            state.players = v;
            draw();
          },
          "Party size",
        ),
      ),
    ),
    body,
  );
  draw();

  // dungeons.html?d=…&focus=moogle (from a Mog Stamp) jumps to the Moogle Nest
  // and makes its marker pulse so it's easy to spot.
  if (urlState.get("focus") === "moogle") {
    const nestArea = stage.areas.find((a) => a.moogle?.length);
    requestAnimationFrame(() => {
      const section = nestArea && document.getElementById(`map-area-${nestArea.area}`);
      if (!section) return;
      section.querySelectorAll(".stage-moogle").forEach((nest) => nest.classList.add("focus"));
      section.querySelector(".stage-moogle")?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
  return panel;
}
