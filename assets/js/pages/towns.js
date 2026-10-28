/*
  Towns page – one tab per town with what it's like, its map (rendered from
  the game by tools/build_town_maps.py) with every shop, smith and Moogle Nest
  pinned and listed beside it, and what each shop sells underneath.

  Links can open a town directly – towns.html?town=marrs-pass – and point at
  one kind of place in it: towns.html?town=tipa&poi=moogle picks the Moogle Nest.
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
  slugify,
  formatGil,
  buildItemIndex,
  linkTo,
  segmented,
  urlState,
  placeIcon,
} = Codex;
const { renderTownArea, kindOf } = Codex.townmap;

initPage();

const app = document.getElementById("app");
app.append(loadingNode());

/* Filled in once the data loads: item name -> the page that explains it. */
let itemHref = () => null;

Promise.all([
  loadData("world"),
  loadData("items"),
  loadData("artifacts"),
  loadData("townmaps").catch(() => null),
])
  .then(([world, items, artifacts, townMaps]) => {
    itemHref = buildItemIndex(items, artifacts);
    append(clear(app), townsView(world.towns ?? [], townMaps ?? {}, items.shops ?? []));
  })
  .catch((error) => showError(app, error));

/*
  Every town that has a description, a map or a shop gets a tab, in the order
  world.js lists them (then any extras the maps or shops add).
*/
function collectTowns(descriptions, townMaps, shops) {
  const towns = new Map();
  const add = (key, name) => {
    if (!towns.has(key)) towns.set(key, { key, name, info: null, map: null, shops: [] });
    return towns.get(key);
  };
  for (const info of descriptions) add(slugify(info.name), info.name).info = info;
  for (const [key, map] of Object.entries(townMaps)) add(key, map.name).map = map;
  for (const shop of shops) add(slugify(shop.town), shop.town).shops.push(shop);
  return [...towns.values()];
}

function townsView(descriptions, townMaps, shops) {
  const towns = collectTowns(descriptions, townMaps, shops);
  if (!towns.length) return el("p", { class: "empty" }, "No towns yet.");

  const linked = urlState.get("town");
  const state = {
    town: towns.some((t) => t.key === linked) ? linked : towns[0].key,
    area: 0,
    selected: null,
  };
  const picker = el("div", { class: "tabs", role: "tablist" });
  const body = el("div");

  // A link asking for one kind of place (e.g. the Moogle Nest from a Mog Stamp)
  // opens the area it's in with its pin picked, then scrolls the map into view.
  const wanted = urlState.get("poi");
  if (wanted) {
    const town = towns.find((t) => t.key === state.town);
    (town?.map?.areas ?? []).some((area, areaIndex) => {
      const index = shownPois(area).findIndex((p) => p.kind === wanted);
      if (index < 0) return false;
      state.area = areaIndex;
      state.selected = index;
      return true;
    });
    requestAnimationFrame(() => document.getElementById("town-map")?.scrollIntoView({ behavior: "smooth", block: "center" }));
  }

  function draw() {
    urlState.set({ town: state.town });
    for (const tab of picker.children) {
      tab.setAttribute("aria-selected", String(tab.dataset.town === state.town));
    }
    const town = towns.find((t) => t.key === state.town);
    append(clear(body), infoCard(town), mapSection(town, state, draw));
  }

  picker.append(
    ...towns.map((town) =>
      el(
        "button",
        {
          type: "button",
          role: "tab",
          dataset: { town: town.key },
          onclick: () => {
            state.town = town.key;
            state.area = 0;
            state.selected = null;
            urlState.set({ poi: null });
            draw();
          },
        },
        placeIcon(town.key) ? el("img", { src: placeIcon(town.key), alt: "" }) : null,
        town.name,
      ),
    ),
  );
  draw();

  return el("div", {}, picker, el("section", { class: "panel", style: "border-top-left-radius:0" }, body));
}

/* The places worth pinning. Town crystals are left off – you can't miss them. */
function shownPois(area) {
  return (area.pois ?? []).filter((p) => p.kind !== "crystal");
}

/* The town's icon, region, description, services and notes. */
function infoCard(town) {
  const info = town.info;
  return el(
    "div",
    { class: "town-info" },
    placeIcon(town.key) ? el("img", { src: placeIcon(town.key), alt: "", class: "town-info-icon" }) : null,
    el(
      "div",
      {},
      el("h2", { style: "margin-bottom:2px" }, town.name),
      info?.region ? el("div", { class: "small muted" }, info.region) : null,
      info?.description ? el("p", { style: "margin:8px 0" }, info.description) : null,
      info?.services?.length
        ? el(
            "div",
            { style: "display:flex;gap:4px;flex-wrap:wrap" },
            info.services.map((s) => el("span", { class: "chip" }, s)),
          )
        : null,
      info?.notes ? el("p", { class: "small muted", style: "margin:8px 0 0" }, info.notes) : null,
    ),
  );
}

/*
  The map with its numbered places beside it, and every shop's stock under it.
  Picking a shop on the map or in the list highlights its table and scrolls to it.
*/
function mapSection(town, state, redraw) {
  const areas = town.map?.areas ?? [];
  const area = areas[state.area] ?? null;
  const pois = area ? shownPois(area) : [];
  const tables = new Map(); // "town|vendor" -> its stock table section

  const select = (index) => {
    state.selected = state.selected === index ? null : index;
    redraw();
    const shopKey = pois[state.selected]?.shop;
    if (shopKey) document.getElementById(`shop-${slugify(shopKey)}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  const selectedShop = pois[state.selected]?.shop ?? null;

  const shopTables = town.shops.map((shop) => {
    const key = `${shop.town}|${shop.vendor}`;
    const pinIndex = pois.findIndex((p) => p.shop === key);
    const section = el(
      "section",
      { class: `shop-table${key === selectedShop ? " selected" : ""}`, id: `shop-${slugify(key)}` },
      el(
        "h3",
        {},
        pinIndex >= 0 ? el("span", { class: "poi-number" }, pinIndex + 1) : null,
        shop.vendor,
      ),
      stockTable(shop),
    );
    tables.set(key, section);
    return section;
  });

  return [
    el("h3", { style: "margin-top:18px" }, "Map"),
    areas.length > 1
      ? el(
          "div",
          { class: "toolbar", style: "margin-bottom:8px" },
          segmented(
            areas.map((a, i) => ({ value: i, label: a.name ?? `Area ${a.area}` })),
            state.area,
            (v) => {
              state.area = v;
              state.selected = null;
              redraw();
            },
            "Town area",
          ),
        )
      : null,
    area
      ? el(
          "div",
          { class: "town-layout", id: "town-map" },
          renderTownArea({ ...area, pois }, { selected: state.selected, onSelect: select }),
          el(
            "ol",
            { class: "poi-list" },
            pois.map((poi, i) =>
              el(
                "li",
                {},
                el(
                  "button",
                  { type: "button", class: `poi${i === state.selected ? " selected" : ""}`, onclick: () => select(i) },
                  el("span", { class: "poi-number" }, i + 1),
                  kindOf(poi).icon ? el("img", { class: "icon sm", src: assetUrl(kindOf(poi).icon), alt: "" }) : null,
                  el(
                    "span",
                    {},
                    poi.label,
                    poi.shop ? el("span", { class: "chip", style: "margin-left:6px" }, "Shop") : null,
                    poi.note ? el("span", { class: "small muted" }, ` – ${poi.note}`) : null,
                  ),
                ),
              ),
            ),
          ),
        )
      : el("p", { class: "muted" }, "No map of this town yet."),
    shopTables.length
      ? [
          el("h3", { style: "margin-top:18px" }, "Shops"),
          el(
            "p",
            { class: "small muted" },
            "Stock can change by year – check the When column. Numbers match the pins on the map.",
          ),
          el("div", { class: "shop-tables" }, shopTables),
        ]
      : null,
  ];
}

function stockTable(shop) {
  return el(
    "div",
    { class: "table-wrap" },
    el(
      "table",
      {},
      el("thead", {}, el("tr", {}, el("th", {}, "Item"), el("th", { class: "num" }, "Price"), el("th", {}, "When"))),
      el(
        "tbody",
        {},
        (shop.stock ?? []).map((row) =>
          el(
            "tr",
            {},
            el("td", {}, linkTo(row.item, itemHref(row.item))),
            el("td", { class: "num" }, formatGil(row.price)),
            el("td", { class: "small" }, row.condition ?? ""),
          ),
        ),
      ),
    ),
  );
}
