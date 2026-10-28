/*
  Artifacts page

  1. Drop calculator – pick a dungeon, cycle, party size and bonus points and see
     which reward sets are unlocked and the chance of each artifact.
  2. Artifact finder – pick an artifact and see the best places to farm it.
  3. Catalogue – every artifact with its effect and sources.
*/
const {
  initPage, append, loadData, el, clear, icon, slugify, debounce, showError, loadingNode,
  formatPct, segmented, makeSortable, urlState, ARTIFACT_ICONS, listText, buildItemIndex, linkTo, dungeonHref,
} = Codex;
const { rewardOdds, bestPlacesFor, scoreBands } = Codex.drops;

initPage();

const app = document.getElementById("app");
app.append(loadingNode());

/* Filled in once the data loads: item name -> the page that explains it. */
let itemHref = () => null;

Promise.all([loadData("artifacts"), loadData("dungeons"), loadData("items")])
  .then(([artifactData, dungeonData, items]) => {
    itemHref = buildItemIndex(items, artifactData);
    const artifacts = artifactData.artifacts ?? [];
    const dungeons = (dungeonData.dungeons ?? []).filter((d) => d.rewardSets?.length);
    const rules = dungeonData.rewardSetRules;
    const byName = new Map(artifacts.map((a) => [a.name, a]));

    clear(app);
    app.append(
      calculator(dungeons, rules, byName),
      finder(artifacts, dungeons, rules),
      catalogue(artifacts),
    );

    // Deep links like artifacts.html#calculator or ?artifact=masamune
    if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
  })
  .catch((error) => showError(app, error));

function artifactIcon(artifact) {
  return icon(ARTIFACT_ICONS[artifact?.category] ?? "accessory", { size: "sm" });
}

/* ---------- 1. Calculator ---------- */

function calculator(dungeons, rules, byName) {
  const saved = {
    dungeon: urlState.get("dungeon") ?? dungeons[0]?.id,
    cycle: Number(urlState.get("cycle")) || 1,
    players: Number(urlState.get("players")) || 1,
    points: Number(urlState.get("points")) || 0,
  };
  const state = { ...saved };
  const output = el("div");

  const pointsInput = el("input", {
    type: "number",
    min: "0",
    max: "999",
    value: state.points,
    "aria-label": "Bonus points",
    oninput: (event) => {
      state.points = Math.max(0, Number(event.target.value) || 0);
      slider.value = state.points;
      update();
    },
  });
  const slider = el("input", {
    type: "range",
    min: "0",
    max: "420",
    value: state.points,
    style: "width:100%",
    "aria-label": "Bonus points slider",
    oninput: (event) => {
      state.points = Number(event.target.value);
      pointsInput.value = state.points;
      update();
    },
  });

  const dungeonSelect = el(
    "select",
    { onchange: (event) => { state.dungeon = event.target.value; update(); } },
    dungeons.map((d) => el("option", { value: d.id, selected: d.id === state.dungeon }, d.name)),
  );

  function update() {
    urlState.set({ dungeon: state.dungeon, cycle: state.cycle, players: state.players, points: state.points || null });
    const dungeon = dungeons.find((d) => d.id === state.dungeon) ?? dungeons[0];
    if (!dungeon) return;
    const odds = rewardOdds(dungeon, rules, state);
    const bands = scoreBands(dungeon, rules, state.cycle, state.players);

    append(clear(output),
      el(
        "p",
        { class: "small" },
        "Score goals for ", el("b", {}, `${state.players} player${state.players > 1 ? "s" : ""}, cycle ${state.cycle}`), ": ",
        bands.map((b, i) => el("span", { class: "chip", style: "margin-right:4px" }, `${i + 1} set${i ? "s" : ""}: ${b.min}+`)),
      ),
      el(
        "div",
        { class: "grid grid-4", style: "margin-bottom:16px" },
        odds.sets.map((s) =>
          el(
            "div",
            { class: `reward-set${s.unlocked ? "" : " locked"}` },
            el("h4", {}, `Set ${s.set}`, el("span", { class: "pct" }, s.unlocked ? formatPct(s.chance) : `${s.needed ?? "?"}+ pts`)),
            el("ul", { class: "small" }, s.items.map((name) => el("li", {}, linkTo(name, itemHref(name))))),
          ),
        ),
      ),
      odds.items.length
        ? el(
            "div",
            { class: "table-wrap" },
            el(
              "table",
              {},
              el("thead", {}, el("tr", {}, el("th", {}, "Item"), el("th", {}, "Effect"), el("th", { class: "num" }, "Chance it's offered"), el("th", { style: "width:30%" }, ""))),
              el(
                "tbody",
                {},
                odds.items.map(({ item, chance }) => {
                  const artifact = byName.get(item);
                  return el(
                    "tr",
                    {},
                    el("td", {}, artifactIcon(artifact), " ", linkTo(item, itemHref(item))),
                    el("td", { class: "small" }, artifact?.effect ?? el("span", { class: "muted" }, "Material")),
                    el("td", { class: "num" }, el("span", { class: "pct" }, formatPct(chance))),
                    el("td", {}, el("div", { class: "bar" }, el("span", { style: `width:${chance * 100}%` }))),
                  );
                }),
              ),
            ),
          )
        : el("p", { class: "empty" }, "No reward data for this dungeon yet."),
    );
  }

  const panel = el(
    "section",
    { class: "panel", id: "calculator", "aria-labelledby": "calc-title" },
    el("h2", { id: "calc-title" }, "Boss reward calculator"),
    el(
      "p",
      { class: "note small" },
      "At the end of a dungeon one of the unlocked sets is picked at random, then you pick one item from it. Higher scores add better sets but never remove the earlier ones.",
    ),
    el(
      "div",
      { class: "toolbar" },
      el("label", { class: "field" }, "Dungeon", dungeonSelect),
      el(
        "div",
        { class: "field" },
        "Cycle",
        segmented([1, 2, 3].map((c) => ({ value: c, label: `${c}` })), state.cycle, (v) => { state.cycle = v; update(); }, "Cycle"),
      ),
      el(
        "div",
        { class: "field" },
        "Players",
        segmented([1, 2, 3, 4].map((p) => ({ value: p, label: `${p}P` })), state.players, (v) => { state.players = v; update(); }, "Players"),
      ),
      el("label", { class: "field" }, "Bonus points", pointsInput),
      el("div", { class: "field grow" }, " ", slider),
    ),
    output,
  );
  update();
  return panel;
}

/* ---------- 2. Finder ---------- */

function finder(artifacts, dungeons, rules) {
  // Links pass the artifact as a slug (?artifact=onion-sword); show its real name in the box.
  const linked = urlState.get("artifact") ?? "";
  const state = { name: artifacts.find((a) => slugify(a.name) === slugify(linked))?.name ?? linked, players: 1 };
  const output = el("div");
  const options = el("datalist", { id: "artifact-names" }, artifacts.map((a) => el("option", { value: a.name })));

  function update() {
    const artifact = artifacts.find((a) => slugify(a.name) === slugify(state.name));
    clear(output);
    if (!artifact) {
      append(output, el("p", { class: "muted" }, "Start typing an artifact name, e.g. Masamune or Ribbon."));
      return;
    }
    urlState.set({ artifact: slugify(artifact.name) });

    const bossPlaces = bestPlacesFor(artifact.name, dungeons, rules, state.players);
    const otherSources = (artifact.sources ?? []).filter((s) => s.type !== "Boss");

    append(output,
      el(
        "div",
        { style: "display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:10px" },
        artifactIcon(artifact),
        el("b", { style: "font-size:1.15rem" }, artifact.name),
        el("span", { class: "chip" }, artifact.effect ?? artifact.category),
        artifact.jpName ? el("span", { class: "small muted" }, artifact.jpName) : null,
        artifact.routeYear ? el("span", { class: "chip" }, `Ultimania route: year ${artifact.routeYear}`) : null,
      ),
      bossPlaces.length
        ? el(
            "div",
            { class: "table-wrap" },
            el(
              "table",
              {},
              el("thead", {}, el("tr", {}, el("th", {}, "Boss reward"), el("th", {}, "Cycle"), el("th", {}, `Score (${state.players}P)`), el("th", { class: "num" }, "Chance"))),
              el(
                "tbody",
                {},
                bossPlaces.slice(0, 12).map((p) =>
                  el(
                    "tr",
                    {},
                    el("td", {}, el("a", { href: dungeonHref(p.dungeon.name, p.cycle) }, p.dungeon.name)),
                    el("td", {}, p.cycle),
                    el("td", {}, p.max === null ? `${p.min}+` : `${p.min}–${p.max}`),
                    el("td", { class: "num" }, el("span", { class: "pct" }, formatPct(p.chance))),
                  ),
                ),
              ),
            ),
          )
        : el("p", { class: "muted" }, "Not found in any boss reward set."),
      otherSources.length
        ? el(
            "div",
            { style: "margin-top:12px" },
            el("h3", {}, "Other ways to get it"),
            el(
              "ul",
              {},
              otherSources.map((s) =>
                el(
                  "li",
                  {},
                  el("b", {}, s.type), " – ", linkTo(s.where ?? "?", dungeonHref(s.where, s.cycles?.[0])),
                  s.cycles?.length ? ` (cycle ${s.cycles.join(", ")})` : "",
                  s.detail ? `: ${s.detail}` : "",
                  s.chance !== null && s.chance !== undefined ? el("span", { class: "chip", style: "margin-left:6px" }, `${s.chance}%`) : null,
                ),
              ),
            ),
          )
        : null,
      artifact.notes ? el("p", { class: "small muted", style: "margin-top:10px" }, artifact.notes) : null,
    );
  }

  const panel = el(
    "section",
    { class: "panel", id: "finder", "aria-labelledby": "finder-title" },
    el("h2", { id: "finder-title" }, "Where's my best chance?"),
    el(
      "div",
      { class: "toolbar" },
      el(
        "label",
        { class: "field grow" },
        "Artifact",
        el("input", {
          type: "search",
          list: "artifact-names",
          value: state.name,
          placeholder: "Type an artifact name",
          oninput: debounce((event) => { state.name = event.target.value; update(); }, 120),
        }),
        options,
      ),
      el(
        "div",
        { class: "field" },
        "Players",
        segmented([1, 2, 3, 4].map((p) => ({ value: p, label: `${p}P` })), state.players, (v) => { state.players = v; update(); }, "Players"),
      ),
    ),
    output,
  );
  update();
  return panel;
}

/* ---------- 3. Catalogue ---------- */

function catalogue(artifacts) {
  const categories = [...new Set(artifacts.map((a) => a.category).filter(Boolean))];
  const state = { search: "", category: "all" };
  let rows = [...artifacts];
  const tbody = el("tbody");
  const count = el("p", { class: "small muted" });

  const table = el(
    "table",
    {},
    el(
      "thead",
      {},
      el("tr", {}, el("th", {}, "Artifact"), el("th", {}, "Type"), el("th", {}, "Effect"), el("th", {}, "Where"), el("th", { class: "num" }, "Route year")),
    ),
    tbody,
  );

  function draw() {
    const visible = rows.filter((a) => {
      if (state.category !== "all" && a.category !== state.category) return false;
      if (!state.search) return true;
      return [a.name, a.effect, a.jpName, ...(a.sources ?? []).map((s) => s.where)].join(" ").toLowerCase().includes(state.search);
    });
    count.textContent = `${visible.length} artifacts`;
    append(clear(tbody),
      ...visible.map((a) =>
        el(
          "tr",
          {},
          el("td", { style: "white-space:nowrap" }, artifactIcon(a), " ", el("a", { href: `?artifact=${slugify(a.name)}#finder` }, a.name)),
          el("td", {}, a.category ?? "—"),
          el("td", {}, a.effect ?? "—"),
          el("td", { class: "small" }, listText([...new Set((a.sources ?? []).map((s) => `${s.where ?? ""}${s.type && s.type !== "Boss" ? ` (${s.type.toLowerCase()})` : ""}`))])),
          el("td", { class: "num" }, a.routeYear ?? ""),
        ),
      ),
    );
  }

  makeSortable(
    table,
    [(a) => a.name, (a) => a.category, (a) => a.effect, null, (a) => a.routeYear],
    (compare) => { rows.sort(compare); draw(); },
  );
  draw();

  return el(
    "section",
    { class: "panel", "aria-labelledby": "cat-title" },
    el("h2", { id: "cat-title" }, "All artifacts"),
    el(
      "div",
      { class: "toolbar" },
      el(
        "label",
        { class: "field grow" },
        "Search",
        el("input", { type: "search", placeholder: "Name, effect or place", oninput: debounce((e) => { state.search = e.target.value.toLowerCase(); draw(); }) }),
      ),
      el(
        "label",
        { class: "field" },
        "Type",
        el(
          "select",
          { onchange: (e) => { state.category = e.target.value; draw(); } },
          el("option", { value: "all" }, "All types"),
          categories.map((c) => el("option", { value: c }, c)),
        ),
      ),
    ),
    count,
    el("div", { class: "table-wrap" }, table),
  );
}
