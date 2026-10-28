/*
  World & Events page – the world map and globe, year-by-year goals, miasma
  streams, caravan encounters (with a "seen it" checklist saved in the
  browser), Mog Stamps, missables and the smaller systems like ferries, family
  jobs and Mog grooming. Towns and their shops have their own page (towns.js).
*/
const {
  ELEMENT_COLORS,
  initPage,
  append,
  loadData,
  el,
  clear,
  assetUrl,
  showError,
  loadingNode,
  store,
  debounce,
  slugify,
  urlState,
} = Codex;
const { renderMap } = Codex.worldmap;
const { supported: globeSupported, createGlobe } = Codex.globe;

initPage();

const app = document.getElementById("app");
app.append(loadingNode());

/* Character art for encounters whose name contains one of these words. */
const ENCOUNTER_ART = [
  ["brigand", "striped-brigands"],
  ["alfitaria", "alfitaria-caravan"],
  ["sol racht", "alfitaria-caravan"],
  ["shella", "shella-caravan"],
  ["leuda", "leuda-caravan"],
  ["fum", "fum-caravanners"],
  ["marr", "marrs-pass-caravan"],
  ["gurdy", "gurdy-hurdy"],
  ["hurdy", "gurdy-hurdy"],
  ["black knight", "black-knight"],
  ["fiona", "fiona"],
];

function artFor(text) {
  const lower = String(text ?? "").toLowerCase();
  const hit = ENCOUNTER_ART.find(([word]) => lower.includes(word));
  return hit ? assetUrl(`art/${hit[1]}.webp`) : null;
}

/* { dungeonId: { Water: 2, … } } – which chalice hotspots each dungeon has, for the map icons. */
let hotspots = {};

Promise.all([
  loadData("world"),
  loadData("worldmap").catch(() => null),
  loadData("dungeons"),
  loadData("diary").catch(() => null),
])
  .then(([world, worldMap, dungeonData, diary]) => {
    hotspots = Object.fromEntries((dungeonData.dungeons ?? []).map((d) => [d.id, d.hotspots ?? {}]));
    append(
      clear(app),
      worldMap ? worldMapPanel(worldMap) : null,
      el(
        "section",
        { class: "grid grid-2" },
        el(
          "div",
          { class: "panel" },
          el("h2", {}, "How the years work"),
          (world.rules ?? []).map((r) => el("p", { class: "small" }, r.text)),
        ),
        el("div", {}, yearsPanel(world), regionsPanel(world)),
      ),
      miasmaPanel(world),
      eventsPanel(world),
      encountersPanel(world),
      stampsPanel(world),
      diary ? diaryPanel(diary) : null,
      el(
        "div",
        { class: "grid grid-2" },
        missablesPanel(world),
        familiesPanel(world),
      ),
      el("div", { class: "grid grid-2" }, ferriesPanel(world), mogPanel(world)),
    );
  })
  .catch((error) => showError(app, error));

/*
  The overworld: the whole world on the left with every region outlined, and
  the picked region's close-up on the right. Dungeon pins open the dungeon,
  town pins open that town on the Towns page.
*/
function worldMapPanel(worldMap) {
  const sections = worldMap.sections ?? [];
  const boxes = (worldMap.overview.sections ?? []).map((box) => ({
    ...box,
    name: sections.find((s) => s.id === box.id)?.name,
  }));
  const state = { section: urlState.get("region") ?? sections[0]?.id ?? null };
  const overviewBody = el("div");
  const sectionBody = el("div");

  const pinHref = (pin) => {
    if (pin.kind === "dungeon" && pin.id) return `dungeons.html?d=${pin.id}`;
    if (pin.kind === "town") return `towns.html?town=${slugify(pin.name)}`;
    return null;
  };

  // The spinning globe when the browser can draw it, otherwise the flat overview.
  const useGlobe = Boolean(worldMap.globe) && globeSupported();
  let globe = null;
  if (useGlobe) {
    const holder = el("div", { class: "globe-holder" });
    overviewBody.append(
      holder,
      el(
        "p",
        { class: "small muted", style: "margin:6px 0 0" },
        "Drag to spin · scroll or pinch to zoom · click land to open a region, or a pin to go there.",
      ),
    );
    // The texture comes as a data: URL (data/globe-texture.js) so it also works offline.
    // Wait a frame as well, so the holder has its size before WebGL measures it.
    loadData("globe-texture")
      .catch(() => null)
      .then((texture) =>
        requestAnimationFrame(() => {
          globe = createGlobe(holder, worldMap.globe, {
            texture,
            hotspots,
            selected: state.section,
            onPin: (pin) => {
              const href = pinHref(pin);
              if (href) location.href = href;
            },
            onRegion: (id) => {
              state.section = id;
              draw();
            },
          });
        }),
      );
  }

  function draw() {
    urlState.set({ region: state.section });
    const section = sections.find((s) => s.id === state.section);
    if (useGlobe) {
      globe?.select(state.section);
    } else {
      append(
        clear(overviewBody),
        renderMap(worldMap.overview, {
          pinHref,
          hotspots,
          labels: false,
          sections: boxes,
          selectedSection: state.section,
          onSection: (id) => {
            state.section = id;
            draw();
          },
        }),
      );
    }
    append(
      clear(sectionBody),
      section
        ? [
            el("h3", { style: "margin:0 0 6px" }, section.name),
            renderMap(section, { pinHref, hotspots }),
          ]
        : el("p", { class: "muted" }, "Pick a region on the map."),
    );
  }
  draw();

  return el(
    "section",
    { class: "panel", id: "world-map" },
    el("h2", {}, "World map"),
    el(
      "p",
      { class: "small muted" },
      useGlobe
        ? "Rendered from the game's own world map – in FFCC the world really is a small planet. Spin it, then click a region to see it up close."
        : "Rendered from the game's own world map – it's a small planet, so the edges of the overview bend away. Hover a pin to see its name, or click a region to see it up close.",
    ),
    el("div", { class: "world-layout" }, overviewBody, sectionBody),
  );
}

function yearsPanel(world) {
  return el(
    "div",
    { class: "panel" },
    el("h2", {}, "Year by year"),
    (world.years ?? []).map((y) =>
      el(
        "details",
        { open: y.year === 1 ? true : null, style: "margin-bottom:8px" },
        el(
          "summary",
          {},
          el("b", {}, `Year ${y.year}${y.year === 8 ? " and later" : ""}`),
        ),
        el(
          "ul",
          {},
          (y.goals ?? []).map((g) => el("li", {}, g)),
        ),
        y.suggestedDungeons?.length
          ? el(
              "p",
              { class: "small" },
              el("b", {}, "Dungeons: "),
              y.suggestedDungeons.map((d, i) => [
                i ? ", " : "",
                el("a", { href: `dungeons.html?d=${slugify(d)}` }, d),
              ]),
            )
          : null,
        y.notes ? el("p", { class: "small muted" }, y.notes) : null,
      ),
    ),
  );
}

function regionsPanel(world) {
  if (!world.regions?.length) return null;
  return el(
    "div",
    { class: "panel" },
    el("h2", {}, "Regions"),
    el(
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
            el("th", {}, "Region"),
            el("th", {}, "Towns"),
            el("th", {}, "Dungeons"),
          ),
        ),
        el(
          "tbody",
          {},
          world.regions.map((r) =>
            el(
              "tr",
              {},
              el("td", {}, r.name),
              el("td", { class: "small" }, (r.towns ?? []).join(", ")),
              el("td", { class: "small" }, (r.dungeons ?? []).join(", ")),
            ),
          ),
        ),
      ),
    ),
  );
}

/*
  Miasma streams. The element each stream needs loops every 4 years (the
  world script picks it with year & 3), so the table has four columns and each
  covers Years 1, 5, 9… / 2, 6, 10… and so on. Enter the current year to
  highlight the column you need.
*/
function miasmaPanel(world) {
  const streams = world.miasmaStreams?.streams ?? [];
  if (!streams.length) return el("div");
  const loop = world.miasmaStreams.cycleYears ?? 4;
  const years = Object.keys(streams[0].elements ?? {}).map(Number);
  const yearsFor = (y) => [y, y + loop, y + loop * 2, y + loop * 3].join(" · ");
  const state = { year: Number(store.get("miasma-year", 1)) || 1 };
  const table = el("div", { class: "table-wrap" });
  const answer = el("p", { class: "small", style: "margin:8px 0 0" });

  function draw() {
    const column = ((state.year - 1) % loop) + 1;
    append(clear(table),
      el(
        "table",
        { class: "miasma-table" },
        el(
          "thead",
          {},
          el(
            "tr",
            {},
            el("th", {}, "Stream"),
            el("th", {}, "Between"),
            years.map((y) => el("th", { class: y === column ? "current" : null }, `Years ${yearsFor(y)}…`)),
          ),
        ),
        el(
          "tbody",
          {},
          streams.map((s) =>
            el(
              "tr",
              {},
              el("td", {}, s.code),
              el("td", { class: "small" }, (s.connects ?? []).join(" ↔ ")),
              years.map((y) => {
                const element = s.elements?.[y] ?? "?";
                return el(
                  "td",
                  { class: y === column ? "current" : null },
                  el("span", { class: "element-chip", style: `--element:${ELEMENT_COLORS[element] ?? "#8a6a32"}` }, element),
                );
              }),
            ),
          ),
        ),
      ),
    );
    answer.textContent = `Year ${state.year} uses the same streams as Year ${column}.`;
  }

  draw();
  return el(
    "section",
    { class: "panel" },
    el("h2", {}, "Miasma streams"),
    el("p", { class: "small muted" }, world.miasmaStreams.note),
    el(
      "div",
      { class: "toolbar" },
      el(
        "label",
        { class: "field" },
        "What year is it?",
        el("input", {
          type: "number",
          min: "1",
          value: state.year,
          oninput: (e) => {
            state.year = Math.max(1, Number(e.target.value) || 1);
            store.set("miasma-year", state.year);
            draw();
          },
        }),
      ),
    ),
    table,
    answer,
    world.chaliceElements?.length
      ? [
          el("h3", { style: "margin-top:14px" }, "Chalice elements"),
          el(
            "div",
            { class: "grid grid-4" },
            world.chaliceElements.map((c) =>
              el(
                "div",
                { class: "reward-set" },
                el("h4", {}, c.name),
                el("div", { class: "small" }, c.bonus),
                c.hotspots?.length
                  ? el(
                      "div",
                      { class: "small muted" },
                      "Hotspots: ",
                      c.hotspots.join(", "),
                    )
                  : null,
              ),
            ),
          ),
        ]
      : null,
  );
}

function eventsPanel(world) {
  const events = world.events ?? [];
  const types = [...new Set(events.map((e) => e.type).filter(Boolean))];
  const state = { type: "all", missableOnly: false, search: "" };
  const list = el("div", { class: "list-cards" });

  function draw() {
    const visible = events.filter((e) => {
      if (state.type !== "all" && e.type !== state.type) return false;
      if (state.missableOnly && !e.missable) return false;
      return (
        !state.search ||
        [e.name, e.where, e.what, e.when]
          .join(" ")
          .toLowerCase()
          .includes(state.search)
      );
    });
    append(
      clear(list),
      ...visible.map((e) => {
        const art = artFor(`${e.name} ${e.what}`);
        return el(
          "article",
          { class: "mini-card", style: "cursor:default", id: `event-${slugify(e.name)}` },
          art
            ? el("img", {
                src: art,
                alt: "",
                loading: "lazy",
                style:
                  "float:right;width:72px;height:72px;object-fit:contain;margin-left:8px",
              })
            : null,
          el("h3", {}, e.name),
          el(
            "div",
            { style: "display:flex;gap:4px;flex-wrap:wrap;margin-bottom:6px" },
            e.type ? el("span", { class: "chip" }, e.type) : null,
            e.missable ? el("span", { class: "chip boss" }, "Missable") : null,
          ),
          e.where || e.when
            ? el(
                "div",
                { class: "small muted" },
                [e.where, e.when].filter(Boolean).join(" · "),
              )
            : null,
          el("p", { class: "small", style: "margin:6px 0" }, e.what),
          e.choices
            ? el(
                "p",
                { class: "small", style: "margin:0" },
                el("b", {}, "Choices: "),
                [e.choices].flat().join(" / "),
              )
            : null,
          e.notes
            ? el(
                "p",
                { class: "small muted", style: "margin:6px 0 0" },
                e.notes,
              )
            : null,
          e.link ? el("p", { class: "small", style: "margin:6px 0 0" }, el("a", { href: e.link }, "How to do it, step by step →")) : null,
        );
      }),
    );
    if (!visible.length)
      append(list, el("p", { class: "empty" }, "Nothing matches."));
  }

  const panel = el(
    "section",
    { class: "panel" },
    el("h2", {}, "Events & side stories"),
    el(
      "div",
      { class: "toolbar" },
      el(
        "label",
        { class: "field grow" },
        "Search",
        el("input", {
          type: "search",
          oninput: debounce((e) => {
            state.search = e.target.value.toLowerCase();
            draw();
          }),
        }),
      ),
      el(
        "label",
        { class: "field" },
        "Kind",
        el(
          "select",
          {
            onchange: (e) => {
              state.type = e.target.value;
              draw();
            },
          },
          el("option", { value: "all" }, "All"),
          types.map((t) => el("option", { value: t }, t)),
        ),
      ),
      el(
        "label",
        {
          class: "field",
          style:
            "flex-direction:row;align-items:center;gap:6px;min-height:40px",
        },
        el("input", {
          type: "checkbox",
          onchange: (e) => {
            state.missableOnly = e.target.checked;
            draw();
          },
        }),
        "Missable only",
      ),
    ),
    list,
  );
  draw();
  return panel;
}

function encountersPanel(world) {
  const encounters = world.encounters ?? [];
  const seen = store.get("encounters-seen", {});
  const counter = el("span", { class: "chip" });

  const keyFor = (e, i) => `${slugify(e.who)}-${i}`;
  const updateCount = () => {
    counter.textContent = `${encounters.filter((e, i) => seen[keyFor(e, i)]).length} / ${encounters.length} seen`;
  };
  updateCount();

  return el(
    "section",
    { class: "panel" },
    el("h2", {}, "Caravan encounters on the road ", counter),
    world.encountersNote
      ? el("p", { class: "small muted" }, world.encountersNote)
      : null,
    el(
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
            el("th", {}, "Seen"),
            el("th", {}, "Who"),
            el("th", {}, "What happens"),
            el("th", {}, "Reward / choices"),
          ),
        ),
        el(
          "tbody",
          {},
          encounters.map((e, i) => {
            const key = keyFor(e, i);
            const art = artFor(e.who);
            return el(
              "tr",
              { id: `encounter-${key}` },
              el(
                "td",
                {},
                el("input", {
                  type: "checkbox",
                  checked: seen[key] ? true : null,
                  "aria-label": `Seen: ${e.who} – ${e.scene}`,
                  onchange: (ev) => {
                    if (ev.target.checked) seen[key] = true;
                    else delete seen[key];
                    store.set("encounters-seen", seen);
                    updateCount();
                  },
                }),
              ),
              el(
                "td",
                { style: "white-space:nowrap" },
                art ? el("img", { class: "icon", src: art, alt: "" }) : null,
                " ",
                e.who,
              ),
              el("td", { class: "small" }, e.scene),
              el(
                "td",
                { class: "small" },
                [e.reward, e.choices].flat().filter(Boolean).join(" · ") || "—",
              ),
            );
          }),
        ),
      ),
    ),
  );
}

/*
  Mog Stamps as a stamp card. Ticks are saved in this browser under
  "mog-stamps" – the Tracker page reads the same key to show your count.
*/
/* Stamp locations as the guides name them -> the town's id on the Towns page. */
const STAMP_TOWNS = { "the-fields-of-fum": "fields-of-fum", "west-jegon-river": "jegon-river-west" };

/* A link that opens the map with this stamp's Moogle Nest picked out. */
function stampHref(stamp) {
  if (stamp.dungeonId) return `dungeons.html?d=${stamp.dungeonId}&focus=moogle`;
  const slug = slugify(stamp.where);
  return `towns.html?town=${STAMP_TOWNS[slug] ?? slug}&poi=moogle`;
}

/*
  The diary (Chronicle): every entry the game can write, as a checklist.
  Ticks are saved in this browser under "diary-seen". Each entry shows what
  unlocks it, with the game's own text folded away underneath.
*/
function diaryPanel(diary) {
  const entries = diary.entries ?? [];
  const seen = store.get("diary-seen", {});
  const state = { category: "all", search: "", hideSeen: false };
  const list = el("div", { class: "diary-list" });
  const counter = el("span", { class: "chip" });

  const updateCount = () => {
    counter.textContent = `${entries.filter((e) => seen[e.id]).length} / ${entries.length} written`;
  };

  function draw() {
    const q = state.search;
    const visible = entries.filter((e) => {
      if (state.category !== "all" && e.category !== state.category) return false;
      if (state.hideSeen && seen[e.id]) return false;
      if (!q) return true;
      return [e.title, e.trigger, e.text, ...(e.alternatives ?? [])].join(" ").toLowerCase().includes(q);
    });
    append(clear(list),
      visible.length
        ? visible.map((e) =>
            el(
              "article",
              { class: `diary-entry${seen[e.id] ? " seen" : ""}`, id: `diary-${e.id}` },
              el(
                "label",
                { class: "diary-head" },
                el("input", {
                  type: "checkbox",
                  checked: seen[e.id] ? true : null,
                  "aria-label": `Written: ${e.title}`,
                  onchange: (ev) => {
                    if (ev.target.checked) seen[e.id] = true;
                    else delete seen[e.id];
                    store.set("diary-seen", seen);
                    ev.target.closest(".diary-entry").classList.toggle("seen", ev.target.checked);
                    updateCount();
                  },
                }),
                el("span", {}, el("b", {}, e.title), el("span", { class: "chip", style: "margin-left:6px" }, e.category)),
              ),
              el(
                "p",
                { class: "small", style: "margin:4px 0 0 28px" },
                el("b", {}, "Unlocked by: "),
                e.trigger,
                e.dungeonId ? [" ", el("a", { href: `dungeons.html?d=${e.dungeonId}` }, "Dungeon →")] : null,
              ),
              e.source
                ? el(
                    "p",
                    { class: "small muted", style: "margin:2px 0 0 28px" },
                    `Source: ${e.source}`,
                    e.address ? ` · flag ${e.address}${e.bit !== null && e.bit !== undefined ? ` bit ${e.bit}` : ""}${e.addressGuess ? " (best guess)" : ""}` : "",
                  )
                : null,
              el(
                "details",
                { class: "diary-text" },
                el("summary", {}, "Read the entry"),
                (e.text ?? "").split(/\n\n+/).map((para) => el("p", {}, para)),
                e.alternatives?.length
                  ? [el("p", { class: "small muted" }, "Or, depending on what you did:"), e.alternatives.map((alt) => el("blockquote", {}, alt))]
                  : null,
              ),
            ),
          )
        : el("p", { class: "empty" }, "No entries match."),
    );
  }

  updateCount();
  draw();
  return el(
    "section",
    { class: "panel", id: "diary" },
    el("div", { class: "tribe-head" }, el("img", { src: assetUrl("icon/letter.png"), alt: "" }), el("h2", { style: "margin:0" }, "Diary entries ", counter)),
    el("p", { style: "margin-top:10px" }, diary.about),
    el(
      "div",
      { class: "toolbar" },
      el(
        "label",
        { class: "field grow" },
        "Search",
        el("input", { type: "search", placeholder: "A place, a person or a line you remember", oninput: debounce((ev) => { state.search = ev.target.value.toLowerCase(); draw(); }) }),
      ),
      el(
        "label",
        { class: "field" },
        "Kind",
        el(
          "select",
          { onchange: (ev) => { state.category = ev.target.value; draw(); } },
          el("option", { value: "all" }, "All entries"),
          (diary.categories ?? []).map((c) => el("option", { value: c }, c)),
        ),
      ),
      el(
        "label",
        { class: "field", style: "flex-direction:row;align-items:center;gap:6px;min-height:40px" },
        el("input", { type: "checkbox", onchange: (ev) => { state.hideSeen = ev.target.checked; draw(); } }),
        "Hide written",
      ),
    ),
    list,
    el(
      "p",
      { class: "small muted" },
      `${entries.length} entries, transcribed from the game's text via the Hex Code Notes and the GameFAQs guide. `,
      "Still missing: the Mount Vellenge page and about twenty minor pages the guide skipped (mostly rematch wins). ",
      "If you know their text, add them to data/diary.js.",
    ),
  );
}

function stampsPanel(world) {
  const stamps = world.mogStamps;
  if (!stamps?.stamps?.length) return el("div");
  const got = store.get("mog-stamps", {});
  const counter = el("span", { class: "chip" });
  const updateCount = () => {
    counter.textContent = `${stamps.stamps.filter((s) => got[s.number]).length} / ${stamps.stamps.length} collected`;
  };
  updateCount();

  return el(
    "section",
    { class: "panel", id: "mog-stamps" },
    el(
      "div",
      { class: "tribe-head" },
      el("img", { src: assetUrl("ui/mog-1.png"), alt: "" }),
      el("h2", { style: "margin:0" }, "Mog Stamps ", counter),
    ),
    el("p", { style: "margin-top:10px" }, stamps.about),
    stamps.card ? el("p", { class: "small muted" }, stamps.card) : null,
    el(
      "div",
      { class: "stamp-grid" },
      stamps.stamps.map((stamp) => {
        const place = el("a", { href: stampHref(stamp), title: "Show this Moogle Nest on the map" }, stamp.where);
        const box = el("input", {
          type: "checkbox",
          checked: got[stamp.number] ? true : null,
          "aria-label": `Stamp ${stamp.number}: ${stamp.where}`,
          onchange: (e) => {
            if (e.target.checked) got[stamp.number] = true;
            else delete got[stamp.number];
            store.set("mog-stamps", got);
            card.classList.toggle("collected", e.target.checked);
            updateCount();
          },
        });
        const card = el(
          "label",
          { class: `stamp${got[stamp.number] ? " collected" : ""}`, id: `stamp-${stamp.number}` },
          el("span", { class: "stamp-number" }, stamp.number),
          el(
            "span",
            { class: "stamp-body" },
            el("b", {}, place),
            el(
              "span",
              { class: "chip", style: "margin-left:6px" },
              stamp.kind === "dungeon" ? "Dungeon" : "Town",
            ),
            el(
              "span",
              { class: "small", style: "display:block;margin-top:4px" },
              stamp.how,
            ),
            stamp.notes
              ? el(
                  "span",
                  {
                    class: "small muted",
                    style: "display:block;margin-top:4px",
                  },
                  stamp.notes,
                )
              : null,
          ),
          box,
        );
        return card;
      }),
    ),
    stamps.sets?.length
      ? el(
          "p",
          { class: "small", style: "margin-top:12px" },
          el("b", {}, "Reward: "),
          stamps.sets
            .map((s) => s.reward)
            .filter(Boolean)
            .join(" "),
        )
      : null,
    stamps.source
      ? el("p", { class: "small muted" }, `Source: ${stamps.source}`)
      : null,
  );
}

function missablesPanel(world) {
  return el(
    "section",
    { class: "panel" },
    el("h2", {}, "Don't miss these"),
    world.missablesNote
      ? el("p", { class: "small muted" }, world.missablesNote)
      : null,
    el(
      "ul",
      {},
      (world.missables ?? []).map((m) =>
        el(
          "li",
          { style: "margin-bottom:6px" },
          el("b", {}, m.name),
          m.when ? ` (${m.when})` : "",
          m.consequence ? el("div", { class: "small" }, m.consequence) : null,
        ),
      ),
    ),
  );
}

function familiesPanel(world) {
  return el(
    "section",
    { class: "panel" },
    el("h2", {}, "Family jobs"),
    world.familiesNote
      ? el("p", { class: "small muted" }, world.familiesNote)
      : null,
    el(
      "dl",
      { class: "stats" },
      (world.families ?? []).map((f) => [
        el("dt", {}, f.job),
        el("dd", { class: "small" }, f.description),
      ]),
    ),
  );
}

function ferriesPanel(world) {
  const ferries = world.ferries;
  if (!ferries) return el("div");
  return el(
    "section",
    { class: "panel" },
    el("h2", {}, "Ferries"),
    el("p", { class: "small muted" }, ferries.note),
    el(
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
            el("th", {}, "Stop"),
            el("th", { class: "num" }, "Price"),
            el("th", {}, "From year"),
            el("th", {}, "Notes"),
          ),
        ),
        el(
          "tbody",
          {},
          (ferries.routes ?? []).map((r) =>
            el(
              "tr",
              {},
              el("td", {}, r.stop),
              el("td", { class: "num" }, r.price ?? "?"),
              el("td", {}, r.availableFromYear ?? "—"),
              el("td", { class: "small" }, r.notes ?? ""),
            ),
          ),
        ),
      ),
    ),
    ferries.discounts
      ? el("p", { class: "small" }, [ferries.discounts].flat().join(" "))
      : null,
  );
}

function mogPanel(world) {
  const mog = world.mogGrooming;
  if (!mog) return el("div");
  return el(
    "section",
    { class: "panel" },
    el(
      "div",
      { class: "tribe-head" },
      el("img", { src: assetUrl("ui/mog-0.png"), alt: "" }),
      el("h2", { style: "margin:0" }, "Mog grooming"),
    ),
    el("p", { class: "small", style: "margin-top:8px" }, mog.note),
    el(
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
            el("th", {}, "Colour"),
            el("th", {}, "Magic he finds"),
            el("th", {}, "GBA radar"),
          ),
        ),
        el(
          "tbody",
          {},
          (mog.colors ?? []).map((c) =>
            el(
              "tr",
              {},
              el("td", {}, c.color),
              el("td", {}, c.magic),
              el("td", {}, c.radar),
            ),
          ),
        ),
      ),
    ),
    mog.hotDungeons?.length
      ? el(
          "p",
          { class: "small" },
          el("b", {}, "Shave him for: "),
          mog.hotDungeons.join(", "),
        )
      : null,
    mog.coldDungeons?.length
      ? el(
          "p",
          { class: "small" },
          el("b", {}, "Let his fur grow for: "),
          mog.coldDungeons.join(", "),
        )
      : null,
    mog.hotNote ? el("p", { class: "small muted" }, mog.hotNote) : null,
  );
}
