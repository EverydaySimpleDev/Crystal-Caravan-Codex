/*
  Items page – one searchable, sortable table per tab.

  Each tab is described by a small config: where its rows come from and which
  columns to show. To add a column, add an entry to that tab's `columns`.

  Clicking an item's name opens "Where to get it" (sources.js): every chest,
  monster, shop and boss reward that gives it, with the real odds.
*/
const {
  initPage, append, loadData, el, clear, icon, tribeChip, formatGil, debounce, showError,
  loadingNode, makeTabs, makeSortable, SLOT_ICONS, TRIBES, urlState, listText, linkTo, dungeonHref,
  buildItemIndex, slugify,
} = Codex;

initPage();

const app = document.getElementById("app");
app.append(loadingNode());

const ARMOR_SLOTS = ["armor", "shield", "gloves", "helm", "belt"];

const statCol = (key, label) => ({ label, num: true, value: (r) => r.stats?.[key] ?? null });
const foundText = (found) =>
  listText((found ?? []).map((f) => [f.where, f.how ? `(${f.how.toLowerCase()})` : "", f.cycles?.length ? `c${f.cycles.join("/")}` : ""].filter(Boolean).join(" ")));
/* The same "where to find" list, with dungeons linking to the right cycle. */
const foundLinks = (found) =>
  (found ?? []).map((f, i) => [
    i ? "; " : "",
    linkTo(f.where, dungeonHref(f.where, f.cycles?.[0])),
    f.how ? ` (${f.how.toLowerCase()})` : "",
    f.cycles?.length ? ` c${f.cycles.join("/")}` : "",
  ]);
/* Filled in once the data loads: item name -> the page that explains it. */
let itemHref = () => null;
let itemsData = null;

/*
  The "where to get it" lookup. It needs the big dungeon-map file, so it's only
  built the first time someone asks.
*/
let whereLookup = null;
function loadWhere() {
  whereLookup ??= Promise.all([loadData("dungeons"), loadData("stagemaps"), loadData("world")]).then(([dungeons, stagemaps, world]) =>
    Codex.sources.build({ items: itemsData, dungeons, stagemaps, missables: world.missables ?? [] }),
  );
  return whereLookup;
}

/*
  Item name slug -> missable warning, for the "Missable" tag in the tables.
  Filled in the background after the page shows, then the table redraws.
*/
let missables = new Map();
let redrawTable = () => {};
function findMissables() {
  loadWhere().then((where) => {
    const names = [
      ...(itemsData.equipment ?? []), ...(itemsData.materials ?? []),
      ...(itemsData.scrolls ?? []), ...(itemsData.consumables ?? []),
    ].map((x) => x.name);
    missables = new Map(names.map((n) => [slugify(n), where(n).missable]).filter(([, m]) => m));
    redrawTable();
  });
}
const nameLinks = (names) => (names ?? []).map((n, i) => [i ? ", " : "", linkTo(n, itemHref(n))]);
/* "2× Iron, 1× Alloy" with each material linking to its entry in the Materials tab. */
const materialLinks = (materials) =>
  (materials ?? []).map((m, i) => [i ? ", " : "", `${m.qty ?? 1}× `, linkTo(m.item, itemHref(m.item))]);
const recipeText = (r) =>
  r.recipe?.materials?.length ? r.recipe.materials.map((m) => `${m.qty ?? 1}× ${m.item}`).join(", ") : "";

function tabsConfig(items) {
  const equipment = items.equipment ?? [];
  return [
    {
      id: "weapons",
      label: "Weapons",
      icon: "sword",
      rows: equipment.filter((e) => e.slot === "weapon"),
      tribeFilter: true,
      columns: [
        { label: "Weapon", value: (r) => r.name, render: (r) => [icon(SLOT_ICONS[r.subtype] ?? "sword", { size: "sm" }), " ", r.name] },
        { label: "Tribe", value: (r) => r.tribe, render: (r) => tribeChip(r.tribe) },
        statCol("str", "STR"),
        { label: "Effect", value: (r) => r.effect ?? "" },
        { label: "Materials", value: recipeText, render: (r) => materialLinks(r.recipe?.materials), sortable: false, small: true },
        { label: "Craft fee", num: true, value: (r) => r.recipe?.gil ?? null, render: (r) => formatGil(r.recipe?.gil) },
      ],
    },
    {
      id: "armor",
      label: "Armour",
      icon: "armor",
      rows: equipment.filter((e) => ARMOR_SLOTS.includes(e.slot)),
      tribeFilter: true,
      columns: [
        { label: "Armour", value: (r) => r.name, render: (r) => [icon(SLOT_ICONS[r.slot] ?? "armor", { size: "sm" }), " ", r.name] },
        { label: "Slot", value: (r) => r.slot },
        { label: "Tribe", value: (r) => r.tribe, render: (r) => tribeChip(r.tribe) },
        statCol("def", "DEF"),
        { label: "Effect", value: (r) => r.effect ?? "" },
        { label: "Materials", value: recipeText, render: (r) => materialLinks(r.recipe?.materials), sortable: false, small: true },
        { label: "Craft fee", num: true, value: (r) => r.recipe?.gil ?? null, render: (r) => formatGil(r.recipe?.gil) },
      ],
    },
    {
      id: "accessories",
      label: "Accessories",
      icon: "accessory",
      rows: equipment.filter((e) => e.slot === "accessory"),
      tribeFilter: true,
      columns: [
        { label: "Accessory", value: (r) => r.name },
        { label: "Tribe", value: (r) => r.tribe, render: (r) => tribeChip(r.tribe) },
        { label: "Effect", value: (r) => r.effect ?? "" },
        { label: "Materials", value: recipeText, render: (r) => materialLinks(r.recipe?.materials), sortable: false, small: true },
        { label: "Craft fee", num: true, value: (r) => r.recipe?.gil ?? null, render: (r) => formatGil(r.recipe?.gil) },
      ],
    },
    {
      id: "materials",
      label: "Materials",
      icon: "crystal",
      rows: items.materials ?? [],
      columns: [
        { label: "Material", value: (r) => r.name },
        { label: "Rank", value: (r) => r.rank ?? "" },
        { label: "Buy", num: true, value: (r) => r.buy ?? null, render: (r) => formatGil(r.buy) },
        { label: "Sell", num: true, value: (r) => r.sell ?? null, render: (r) => formatGil(r.sell) },
        { label: "Where to find", value: (r) => foundText(r.found), render: (r) => foundLinks(r.found), small: true, sortable: false },
        { label: "Used in", value: (r) => listText(r.usedIn), render: (r) => nameLinks(r.usedIn), small: true, sortable: false },
      ],
    },
    {
      id: "scrolls",
      label: "Scrolls",
      icon: "scroll",
      rows: items.scrolls ?? [],
      tribeFilter: true,
      columns: [
        { label: "Scroll", value: (r) => r.name },
        { label: "Makes", value: (r) => listText([r.makes].flat()) },
        { label: "Tribe", value: (r) => r.tribe, render: (r) => tribeChip(r.tribe) },
        { label: "Materials", value: (r) => listText((r.materials ?? []).map((m) => `${m.qty ?? 1}× ${m.item}`)), render: (r) => materialLinks(r.materials), small: true, sortable: false },
        { label: "Fee", num: true, value: (r) => r.gil ?? null, render: (r) => formatGil(r.gil) },
        { label: "Where to find", value: (r) => foundText(r.found), render: (r) => foundLinks(r.found), small: true, sortable: false },
      ],
    },
    {
      id: "consumables",
      label: "Magicite, Food & More",
      icon: "striped-apple",
      rows: items.consumables ?? [],
      columns: [
        { label: "Item", value: (r) => r.name, render: (r) => [icon(SLOT_ICONS[r.category] ?? "pouch", { size: "sm" }), " ", r.name] },
        { label: "Kind", value: (r) => r.category ?? "" },
        { label: "Effect", value: (r) => r.effect ?? "" },
        { label: "Where to find", value: (r) => foundText(r.found), render: (r) => foundLinks(r.found), small: true, sortable: false },
      ],
    },
    {
      id: "shops",
      label: "Shops",
      noWhere: true,
      icon: "gil",
      // One row per item per shop, so you can search "Iron" and see every seller.
      rows: (items.shops ?? []).flatMap((shop) =>
        (shop.stock ?? []).map((s) => ({ ...s, town: shop.town, vendor: shop.vendor })),
      ),
      columns: [
        { label: "Town", value: (r) => r.town },
        { label: "Shop", value: (r) => r.vendor ?? "" },
        { label: "Item", value: (r) => r.item, render: (r) => linkTo(r.item, itemHref(r.item)) },
        { label: "Price", num: true, value: (r) => r.price ?? null, render: (r) => formatGil(r.price) },
        { label: "When", value: (r) => r.condition ?? "", small: true },
      ],
    },
  ];
}

Promise.all([loadData("items"), loadData("artifacts")])
  .then(([items, artifacts]) => {
    itemsData = items;
    itemHref = buildItemIndex(items, artifacts);
    // Work out what's missable once the page is up, so it doesn't slow the first draw.
    setTimeout(findMissables, 300);
    clear(app);
    const tabStrip = el("div", { class: "tabs" });
    const body = el("section", { class: "panel", style: "border-top-left-radius:0" });
    app.append(tabStrip, body);

    const tabs = tabsConfig(items).filter((t) => t.rows.length);
    makeTabs(
      tabStrip,
      tabs,
      (id) => {
        // A link like items.html?tab=materials&q=Orichalcum opens that one entry.
        const query = id === urlState.get("tab") ? urlState.get("q") ?? "" : "";
        urlState.set({ tab: id, q: query || null });
        renderTab(body, tabs.find((t) => t.id === id), query);
      },
      tabs.some((t) => t.id === urlState.get("tab")) ? urlState.get("tab") : undefined,
    );
  })
  .catch((error) => showError(app, error));

function renderTab(container, tab, query = "") {
  // "exact" shows only the row whose name matches a link's query; typing in the box goes back to normal search.
  const state = { search: "", exact: query.toLowerCase(), tribe: "All" };
  const rows = [...tab.rows];
  const tbody = el("tbody");
  const count = el("p", { class: "small muted" });
  const whereBox = el("div", { class: "where-box" });

  async function showWhere(name) {
    append(clear(whereBox), loadingNode());
    try {
      const where = await loadWhere();
      append(clear(whereBox),
        el("button", { type: "button", class: "btn small secondary where-close", onclick: () => clear(whereBox), "aria-label": "Close" }, "✕"),
        Codex.sources.panel(name, where(name), itemHref),
      );
      whereBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (error) {
      showError(whereBox, error);
    }
  }

  const table = el(
    "table",
    {},
    el("thead", {}, el("tr", {}, tab.columns.map((c) => el("th", { class: c.num ? "num" : null }, c.label)))),
    tbody,
  );

  function draw() {
    const visible = rows.filter((row) => {
      if (state.tribe !== "All" && row.tribe !== state.tribe && row.tribe !== "All") return false;
      if (state.exact) return String(tab.columns[0].value(row)).toLowerCase() === state.exact;
      if (!state.search) return true;
      return tab.columns.map((c) => c.value(row)).join(" ").toLowerCase().includes(state.search);
    });
    count.textContent = `${visible.length} of ${rows.length}`;
    append(clear(tbody),
      ...visible.map((row) =>
        el(
          "tr",
          {},
          tab.columns.map((c, i) => {
            let content = c.render ? c.render(row) : c.value(row);
            if (i === 0 && !tab.noWhere) {
              const missable = missables.get(slugify(c.value(row)));
              content = [
                el(
                  "button",
                  { type: "button", class: "link-button", title: "Where to get it", onclick: () => showWhere(c.value(row)) },
                  content,
                ),
                missable ? el("span", { class: "chip missable-chip", title: `Get it ${missable.when.toLowerCase()}` }, "Missable") : null,
              ];
            }
            return el("td", { class: [c.num ? "num" : "", c.small ? "small" : ""].join(" ").trim() || null }, content ?? "—");
          }),
        ),
      ),
    );
  }

  redrawTable = draw;
  makeSortable(table, tab.columns.map((c) => (c.sortable === false ? null : c.value)), (compare) => {
    rows.sort(compare);
    draw();
  });

  append(clear(container),
    el(
      "div",
      { class: "toolbar" },
      el(
        "label",
        { class: "field grow" },
        "Search",
        el("input", {
          type: "search",
          value: query,
          placeholder: `Search ${tab.label.toLowerCase()}`,
          oninput: debounce((e) => {
            state.exact = "";
            state.search = e.target.value.toLowerCase();
            urlState.set({ q: null });
            draw();
          }),
        }),
      ),
      tab.tribeFilter
        ? el(
            "label",
            { class: "field" },
            "Tribe",
            el(
              "select",
              { onchange: (e) => { state.tribe = e.target.value; draw(); } },
              ["All", ...TRIBES].map((t) => el("option", { value: t }, t === "All" ? "Any tribe" : t)),
            ),
          )
        : null,
    ),
    whereBox,
    count,
    el("div", { class: "table-wrap", style: "max-height:72vh" }, table),
  );
  draw();
  // Arriving from a link or the site search (…&q=Orichalcum): show where to get it straight away.
  if (query && !tab.noWhere) {
    // Use the row's own spelling of the name when the link's casing differs.
    const match = rows.find((r) => String(tab.columns[0].value(r)).toLowerCase() === state.exact);
    showWhere(match ? tab.columns[0].value(match) : query);
  }
}
