/*
  Recipes & Shopping List

  Left side: every craftable item, filterable by tribe/slot/search.
  Right side: the "shopping list" – add recipes and it totals up the materials,
  scrolls and crafting gil you need. The list is saved in the browser and can
  be shared with a link (?list=bastard-sword:1,mythril-gloves:2).
*/
const {
  initPage, append, loadData, el, clear, icon, tribeChip, formatGil, slugify, debounce,
  store, toast, showError, loadingNode, SLOT_ICONS, TRIBES, urlState, buildItemIndex, linkTo, dungeonHref,
} = Codex;

initPage();

const app = document.getElementById("app");
app.append(loadingNode());

const state = {
  search: "",
  tribe: "All",
  slot: "all",
  basket: new Map(), // equipment slug -> how many to craft
  owned: store.get("recipes-owned", {}), // material slug -> how many you already have
};

let recipes = [];
let materialsBySlug = new Map();
let scrollsByMakes = new Map();
let scrollsByName = new Map();
let itemHref = () => null;

loadData("items")
  .then((items) => {
    recipes = (items.equipment ?? []).filter((e) => e.recipe?.materials?.length);
    materialsBySlug = new Map((items.materials ?? []).map((m) => [slugify(m.name), m]));
    for (const c of items.consumables ?? []) {
      if (!materialsBySlug.has(slugify(c.name))) materialsBySlug.set(slugify(c.name), c);
    }
    // Weapon scrolls like "Mighty Weapon Scroll" make a different weapon per tribe, so makes can be a list.
    scrollsByMakes = new Map((items.scrolls ?? []).flatMap((s) => [s.makes].flat().map((made) => [slugify(made), s])));
    scrollsByName = new Map((items.scrolls ?? []).map((s) => [s.name, s]));
    itemHref = buildItemIndex(items, null);
    restoreBasket();
    render();
  })
  .catch((error) => showError(app, error));

function restoreBasket() {
  // A shared link wins over what this browser had saved.
  const fromUrl = urlState.get("list");
  const saved = fromUrl ? parseListParam(fromUrl) : store.get("recipes-basket", {});
  const known = new Set(recipes.map((r) => slugify(r.name)));
  for (const [slug, qty] of Object.entries(saved)) {
    if (known.has(slug) && qty > 0) state.basket.set(slug, qty);
  }
}

function parseListParam(text) {
  const out = {};
  for (const part of text.split(",")) {
    const [slug, qty] = part.split(":");
    if (slug) out[slug] = Math.max(1, Number(qty) || 1);
  }
  return out;
}

function saveBasket() {
  store.set("recipes-basket", Object.fromEntries(state.basket));
  store.set("recipes-owned", state.owned);
  urlState.set({ list: null });
}

/* ---------- Layout ---------- */

const listBody = el("div", { class: "list-cards" });
const countNote = el("p", { class: "muted small" });
const basketPanel = el("aside", { class: "panel sticky-side", "aria-labelledby": "basket-title" });

function render() {
  clear(app);

  const slots = [...new Set(recipes.map((r) => r.slot))];
  const toolbar = el(
    "div",
    { class: "toolbar" },
    el(
      "label",
      { class: "field grow" },
      "Search",
      el("input", {
        type: "search",
        placeholder: "e.g. Mythril, Flame, Ragnarok…",
        oninput: debounce((event) => {
          state.search = event.target.value.trim().toLowerCase();
          renderList();
        }),
      }),
    ),
    el(
      "label",
      { class: "field" },
      "Tribe",
      el(
        "select",
        { onchange: (event) => { state.tribe = event.target.value; renderList(); } },
        ["All", ...TRIBES].map((t) => el("option", { value: t }, t === "All" ? "Any tribe" : t)),
      ),
    ),
    el(
      "label",
      { class: "field" },
      "Type",
      el(
        "select",
        { onchange: (event) => { state.slot = event.target.value; renderList(); } },
        el("option", { value: "all" }, "Everything"),
        slots.map((s) => el("option", { value: s }, capitalise(s))),
      ),
    ),
  );

  app.append(
    el(
      "div",
      { class: "two-col" },
      el("section", { "aria-label": "Recipes" }, toolbar, countNote, listBody),
      basketPanel,
    ),
  );
  renderList();
  renderBasket();
}

function renderList() {
  const matches = recipes.filter((r) => {
    if (state.tribe !== "All" && r.tribe !== state.tribe && r.tribe !== "All") return false;
    if (state.slot !== "all" && r.slot !== state.slot) return false;
    if (!state.search) return true;
    const haystack = [r.name, r.subtype, r.effect, ...r.recipe.materials.map((m) => m.item)].join(" ").toLowerCase();
    return haystack.includes(state.search);
  });

  countNote.textContent = `${matches.length} of ${recipes.length} recipes`;
  clear(listBody);
  if (!matches.length) {
    append(listBody, el("p", { class: "empty" }, "No recipes match those filters."));
    return;
  }
  append(listBody, ...matches.map(recipeCard));
}

function recipeCard(recipe) {
  const slug = slugify(recipe.name);
  const inBasket = state.basket.get(slug) ?? 0;
  const stats = recipe.stats ?? {};
  const statText = [
    stats.str ? `STR ${stats.str}` : null,
    stats.def ? `DEF ${stats.def}` : null,
    stats.mag ? `MAG ${stats.mag}` : null,
  ].filter(Boolean).join(" · ");

  return el(
    "article",
    { class: "mini-card", style: "cursor:default" },
    el(
      "div",
      { style: "display:flex;gap:10px;align-items:flex-start" },
      icon(SLOT_ICONS[recipe.subtype] ?? SLOT_ICONS[recipe.slot] ?? "scroll", { size: "lg" }),
      el(
        "div",
        { style: "flex:1;min-width:0" },
        el("h3", {}, recipe.name),
        el("div", { style: "display:flex;gap:4px;flex-wrap:wrap;margin-bottom:4px" }, tribeChip(recipe.tribe), statText ? el("span", { class: "chip" }, statText) : null),
        recipe.effect ? el("div", { class: "small" }, recipe.effect) : null,
      ),
    ),
    el(
      "ul",
      { class: "small", style: "margin:8px 0;padding-left:18px" },
      recipe.recipe.materials.map((m) => el("li", {}, `${m.qty ?? 1}× `, linkTo(m.item, itemHref(m.item)))),
      el("li", {}, formatGil(recipe.recipe.gil), " to craft"),
    ),
    el(
      "div",
      { style: "display:flex;justify-content:space-between;align-items:center;gap:8px" },
      el("span", { class: "small muted" }, scrollName(recipe)),
      el(
        "button",
        { class: "btn small", type: "button", onclick: () => addToBasket(slug, recipe.name) },
        inBasket ? `Add another (${inBasket})` : "Add to list",
      ),
    ),
  );
}

function scrollName(recipe) {
  return recipe.recipe.scroll ?? scrollsByMakes.get(slugify(recipe.name))?.name ?? "";
}

function addToBasket(slug, name) {
  state.basket.set(slug, (state.basket.get(slug) ?? 0) + 1);
  saveBasket();
  toast(`Added ${name}`);
  renderList();
  renderBasket();
}

function setQty(slug, qty) {
  if (qty <= 0) state.basket.delete(slug);
  else state.basket.set(slug, qty);
  saveBasket();
  renderList();
  renderBasket();
}

/* ---------- Shopping list ---------- */

function totals() {
  const bySlug = new Map(recipes.map((r) => [slugify(r.name), r]));
  const materials = new Map(); // material name -> qty
  const scrolls = [];
  let gil = 0;
  let unknownGil = false;

  for (const [slug, count] of state.basket) {
    const recipe = bySlug.get(slug);
    if (!recipe) continue;
    for (const m of recipe.recipe.materials) {
      materials.set(m.item, (materials.get(m.item) ?? 0) + (m.qty ?? 1) * count);
    }
    if (recipe.recipe.gil === null || recipe.recipe.gil === undefined) unknownGil = true;
    else gil += recipe.recipe.gil * count;
    const scroll = scrollName(recipe);
    if (scroll) scrolls.push(scroll);
  }
  return { materials, scrolls: [...new Set(scrolls)], gil, unknownGil, bySlug };
}

function renderBasket() {
  clear(basketPanel);
  append(basketPanel, el("h2", { id: "basket-title" }, "Shopping List"));

  if (!state.basket.size) {
    append(basketPanel,
      el("p", { class: "empty" }, icon("bag", { size: "lg" }), el("br"), "Your list is empty. Add a recipe to start."),
    );
    return;
  }

  const { materials, scrolls, gil, unknownGil, bySlug } = totals();

  // What you're crafting
  append(basketPanel,
    el("h3", {}, "Crafting"),
    el(
      "div",
      {},
      [...state.basket].map(([slug, count]) =>
        el(
          "div",
          { class: "basket-line" },
          el("span", {}, bySlug.get(slug)?.name ?? slug),
          el(
            "span",
            { style: "display:flex;gap:4px;align-items:center" },
            el("button", { class: "btn small secondary", type: "button", "aria-label": "One fewer", onclick: () => setQty(slug, count - 1) }, "−"),
            el("b", { style: "min-width:1.5em;text-align:center" }, count),
            el("button", { class: "btn small secondary", type: "button", "aria-label": "One more", onclick: () => setQty(slug, count + 1) }, "+"),
          ),
        ),
      ),
    ),
  );

  // Materials, minus what you already own
  let shopCost = 0;
  const rows = [...materials.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([name, needed]) => {
      const slug = slugify(name);
      const info = materialsBySlug.get(slug);
      const owned = state.owned[slug] ?? 0;
      const still = Math.max(0, needed - owned);
      if (info?.buy && still) shopCost += info.buy * still;
      const where = uniqueBy(info?.found ?? [], (f) => f.where).filter((f) => f.where).slice(0, 3);
      return el(
        "tr",
        { style: still === 0 ? "opacity:.55" : null },
        el(
          "td",
          {},
          el("span", { class: "basket-material" }, linkTo(name, itemHref(name))),
          where.length
            ? el("div", { class: "basket-where" }, el("span", { class: "basket-where-label" }, "Found in "), where.map((f, i) => [i ? ", " : "", foundLink(f)]))
            : null,
        ),
        el("td", { class: "num" }, needed),
        el(
          "td",
          { class: "num" },
          el("input", {
            type: "number",
            min: "0",
            value: owned,
            style: "width:4.2em",
            "aria-label": `${name} you already have`,
            onchange: (event) => {
              state.owned[slug] = Math.max(0, Number(event.target.value) || 0);
              saveBasket();
              renderBasket();
            },
          }),
        ),
        el("td", { class: "num" }, still === 0 ? "✓" : still),
      );
    });

  append(basketPanel,
    el("h3", { style: "margin-top:14px" }, "Materials"),
    el(
      "div",
      { class: "table-wrap" },
      el(
        "table",
        {},
        el("thead", {}, el("tr", {}, el("th", {}, "Material"), el("th", { class: "num" }, "Need"), el("th", { class: "num" }, "Have"), el("th", { class: "num" }, "Left"))),
        el("tbody", {}, rows),
      ),
    ),
    el(
      "dl",
      { class: "stats", style: "margin-top:12px" },
      el("dt", {}, "Crafting fees"),
      el("dd", {}, formatGil(gil), unknownGil ? el("span", { class: "muted small" }, " (some unknown)") : null),
      el("dt", {}, "Buyable materials"),
      el("dd", {}, formatGil(shopCost), el("span", { class: "muted small" }, " at shop prices")),
      el("dt", {}, "Total"),
      el("dd", {}, el("b", {}, formatGil(gil + shopCost))),
    ),
  );

  if (scrolls.length) {
    append(basketPanel,
      el("h3", { style: "margin-top:14px" }, "Scrolls needed"),
      el("p", { class: "small muted", style: "margin:0 0 4px" }, "Click a scroll to see where to get it."),
      scrolls.map(scrollDetails),
    );
  }

  append(basketPanel,
    el(
      "div",
      { class: "no-print", style: "display:flex;flex-wrap:wrap;gap:8px;margin-top:14px" },
      el("button", { class: "btn small", type: "button", onclick: copyShareLink }, "Copy share link"),
      el(
        "button",
        {
          class: "btn small danger",
          type: "button",
          onclick: () => {
            if (!confirm("Clear the whole shopping list?")) return;
            state.basket.clear();
            saveBasket();
            renderList();
            renderBasket();
          },
        },
        "Clear",
      ),
    ),
  );
}

function copyShareLink() {
  const list = [...state.basket].map(([slug, qty]) => `${slug}:${qty}`).join(",");
  const url = `${location.href.split(/[?#]/)[0]}?list=${encodeURIComponent(list)}`;
  navigator.clipboard?.writeText(url).then(
    () => toast("Link copied"),
    () => prompt("Copy this link:", url),
  ) ?? prompt("Copy this link:", url);
}

function capitalise(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function uniqueBy(list, key) {
  const seen = new Set();
  return list.filter((entry) => {
    const k = key(entry);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/* A "where to find" entry as a link: dungeons open on the first cycle it's found in. */
function foundLink(found) {
  return linkTo(found.where, dungeonHref(found.where, found.cycles?.[0]));
}

function scrollDetails(name) {
  const scroll = scrollsByName.get(name);
  const found = scroll?.found ?? [];
  return el(
    "details",
    { class: "small", style: "margin:2px 0" },
    el("summary", {}, name),
    el(
      "div",
      { style: "padding:4px 0 6px 18px" },
      found.length
        ? el(
            "ul",
            { style: "margin:0;padding-left:16px" },
            found.map((f) =>
              el("li", {}, foundLink(f), f.how ? ` – ${f.how}` : "", f.cycles?.length ? ` (cycle ${f.cycles.join(", ")})` : ""),
            ),
          )
        : el("span", { class: "muted" }, "No location recorded yet."),
      scroll?.buy ? el("div", {}, `Buy price: ${formatGil(scroll.buy)}`) : null,
      el("a", { href: itemHref(name) ?? "items.html?tab=scrolls" }, "Open in Items →"),
    ),
  );
}
