/*
  Shared helpers used by every page.

  Each HTML page has an empty <header id="site-header"> and <footer id="site-footer">.
  initPage() fills them in, so the navigation only has to be edited here.
*/
(() => {
  const NAV = [
    { href: "index.html", label: "Home" },
    { href: "recipes.html", label: "Recipes" },
    { href: "items.html", label: "Items" },
    { href: "artifacts.html", label: "Artifacts" },
    { href: "bestiary.html", label: "Bestiary" },
    { href: "dungeons.html", label: "Dungeons" },
    { href: "tribes.html", label: "Tribes" },
    { href: "magic.html", label: "Magic" },
    { href: "world.html", label: "World" },
    { href: "towns.html", label: "Towns" },
    { href: "tracker.html", label: "Tracker" },
  ];

  const TRIBES = ["Clavat", "Lilty", "Yuke", "Selkie"];

  /* Sprite used for each equipment slot, consumable type, etc. */
  const SLOT_ICONS = {
    Sword: "sword", Spear: "spear", Hammer: "hammer", Racket: "racket",
    weapon: "sword", armor: "armor", shield: "shield", gloves: "gloves",
    helm: "helm", belt: "belt", accessory: "accessory",
    Magicite: "magicite", Seed: "seed-star", Food: "striped-apple", Misc: "pouch",
    material: "crystal", scroll: "scroll", gil: "gil",
  };

  const ARTIFACT_ICONS = {
    Strength: "sword", Defense: "shield", Magic: "magicite",
    Heart: "heart-red", "Command Slot": "bag", Magicite: "orb-red",
  };

  const assetUrl = (path) => `assets/img/${path}`;
  const iconUrl = (name) => assetUrl(`icon/${name}.png`);

  /* "Daemon's Court" -> "daemons-court". Must match the rule in data/README.md. */
  function slugify(text) {
    return String(text ?? "")
      .toLowerCase()
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  /*
    Some monsters share a name but differ by weapon or location, e.g. Goblin
    (Mace) vs Goblin (Spear). The key and display name both include the variant.
  */
  function enemyKey(enemy) {
    return slugify(enemy.variant ? `${enemy.name} ${enemy.variant}` : enemy.name);
  }

  function enemyName(enemy) {
    return enemy.variant ? `${enemy.name} (${enemy.variant})` : enemy.name;
  }

  /*
    Find a monster from free text used in other files ("Goblin Mace",
    "Goblin (Mace)", "Goblin"). Falls back to the first monster with that name.
  */
  function findEnemy(enemies, text) {
    const key = slugify(text);
    return enemies.find((e) => enemyKey(e) === key) ?? enemies.find((e) => slugify(e.name) === key) ?? null;
  }

  /*
    Data files are plain scripts (data/enemies.js sets window.CODEX_DATA.enemies)
    rather than JSON, because browsers refuse to fetch() JSON from a page opened
    straight from disk. Loading them with a <script> tag works both locally and online.
  */
  window.CODEX_DATA = window.CODEX_DATA || {};
  const dataRequests = new Map();

  function loadData(name) {
    if (!dataRequests.has(name)) {
      const request = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `data/${name}.js`;
        script.onload = () => {
          const data = window.CODEX_DATA[name];
          if (data) resolve(data);
          else reject(new Error(`data/${name}.js loaded but didn't set CODEX_DATA.${name}. Check the first line of the file.`));
        };
        script.onerror = () => reject(new Error(`Could not load data/${name}.js. If you just edited it, look for a missing comma or bracket.`));
        document.head.append(script);
      });
      dataRequests.set(name, request);
    }
    return dataRequests.get(name);
  }

  /*
    Tiny DOM builder so pages don't have to glue HTML strings together.
      el("a", { href: "x.html", class: "chip" }, "Text", childNode)
    Strings are always inserted as text, so data can never inject markup.
  */
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs ?? {})) {
      if (value === null || value === undefined || value === false) continue;
      if (key === "class") node.className = value;
      else if (key === "dataset") Object.assign(node.dataset, value);
      else if (key.startsWith("on") && typeof value === "function") node.addEventListener(key.slice(2), value);
      else if (value === true) node.setAttribute(key, "");
      else node.setAttribute(key, value);
    }
    appendAll(node, children);
    return node;
  }

  function appendAll(node, children) {
    for (const child of children.flat(Infinity)) {
      if (child === null || child === undefined || child === false) continue;
      node.append(child instanceof Node ? child : document.createTextNode(String(child)));
    }
  }

  /* Like node.append(), but skips null/false and flattens arrays, the same way el() does. */
  function append(node, ...children) {
    appendAll(node, children);
    return node;
  }

  function clear(node) {
    while (node.firstChild) node.firstChild.remove();
    return node;
  }

  function icon(name, { size = "", alt = "" } = {}) {
    return el("img", { class: `icon ${size}`.trim(), src: iconUrl(name), alt, loading: "lazy" });
  }

  function tribeChip(tribe) {
    if (!tribe) return null;
    const cls = TRIBES.includes(tribe) ? slugify(tribe) : "";
    const img = TRIBES.includes(tribe)
      ? el("img", { src: assetUrl(`tribe/${slugify(tribe)}-sigil.png`), alt: "" })
      : null;
    return el("span", { class: `chip ${cls}` }, img, tribe);
  }

  /* Resistance level 0-3 as three dots, with an optional word next to it. */
  function resistPips(level, { label = true } = {}) {
    if (level === null || level === undefined) return el("span", { class: "muted" }, "?");
    const words = ["Weak", "Resists", "Status immune", "Immune"];
    return el(
      "span",
      { title: `${level} – ${words[level] ?? ""}` },
      el("span", { class: "res", "data-level": level }, el("i"), el("i"), el("i")),
      label ? el("span", { class: "res-label" }, words[level] ?? level) : null,
    );
  }

  function formatGil(value) {
    if (value === null || value === undefined) return "—";
    return `${Number(value).toLocaleString()} gil`;
  }

  function formatPct(fraction) {
    if (fraction === null || fraction === undefined || Number.isNaN(fraction)) return "—";
    const pct = fraction * 100;
    return `${pct >= 10 || pct === 0 ? Math.round(pct) : pct.toFixed(1)}%`;
  }

  function listText(values) {
    return (values ?? []).filter(Boolean).join(", ");
  }

  /* Debounce for search boxes so we don't re-render on every keystroke. */
  function debounce(fn, wait = 150) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), wait);
    };
  }

  /* localStorage can throw (private mode, blocked storage), so wrap it. */
  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(`ccc:${key}`);
        return raw === null ? fallback : JSON.parse(raw);
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(`ccc:${key}`, JSON.stringify(value));
      } catch {
        /* Storage unavailable - the page still works, it just won't remember. */
      }
    },
  };

  function toast(message) {
    const node = el("div", { class: "toast", role: "status" }, message);
    document.body.append(node);
    setTimeout(() => node.remove(), 2200);
  }

  /*
    Makes a <table> sortable by clicking headers. Pass a getter per column that
    returns the value to sort by; columns without a getter stay unsortable.
  */
  function makeSortable(table, getters, onSort) {
    const headers = table.querySelectorAll("thead th");
    headers.forEach((th, index) => {
      if (!getters[index]) return;
      th.classList.add("sortable");
      th.tabIndex = 0;
      const activate = () => {
        const ascending = th.getAttribute("aria-sort") !== "ascending";
        headers.forEach((h) => h.removeAttribute("aria-sort"));
        th.setAttribute("aria-sort", ascending ? "ascending" : "descending");
        onSort((a, b) => compareValues(getters[index](a), getters[index](b)) * (ascending ? 1 : -1));
      };
      th.addEventListener("click", activate);
      th.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
    });
  }

  function compareValues(a, b) {
    // Unknown values always sink to the bottom.
    if (a === null || a === undefined) return 1;
    if (b === null || b === undefined) return -1;
    if (typeof a === "number" && typeof b === "number") return a - b;
    return String(a).localeCompare(String(b));
  }

  /* Accessible tab strip. Returns a function to switch tabs from code. */
  function makeTabs(container, tabs, onChange, initial) {
    clear(container);
    container.setAttribute("role", "tablist");
    const buttons = tabs.map((tab) =>
      el(
        "button",
        { type: "button", role: "tab", "aria-selected": "false", onclick: () => select(tab.id) },
        tab.icon ? el("img", { src: iconUrl(tab.icon), alt: "" }) : null,
        tab.label,
      ),
    );
    container.append(...buttons);
    function select(id) {
      tabs.forEach((tab, i) => buttons[i].setAttribute("aria-selected", String(tab.id === id)));
      onChange(id);
    }
    select(initial ?? tabs[0].id);
    return select;
  }

  /* Builds a segmented button group (e.g. Cycle 1 / 2 / 3). */
  function segmented(options, value, onChange, label) {
    const group = el("div", { class: "seg", role: "group", "aria-label": label });
    const buttons = options.map((option) =>
      el("button", { type: "button", "aria-pressed": String(option.value === value), onclick: () => pick(option.value) }, option.label),
    );
    group.append(...buttons);
    function pick(next) {
      options.forEach((option, i) => buttons[i].setAttribute("aria-pressed", String(option.value === next)));
      onChange(next);
    }
    return group;
  }

  /*
    Links between pages.

    buildItemIndex() takes items.js and artifacts.js and returns a function that
    turns any item name into the page that explains it (an artifact's finder,
    a material in the Items page, a scroll, a piece of gear). Gil, "Nothing"
    and unknown names return null so they stay plain text.
  */
  const DUNGEON_IDS = new Set([
    "river-belle-path", "mushroom-forest", "mine-of-cathuriges", "goblin-wall", "moschet-manor", "tida",
    "veo-lu-sluice", "daemons-court", "selepation-cave", "kilanda", "conall-curach", "rebena-te-ra",
    "lynari-desert", "mount-vellenge", "nest-of-memories",
  ]);

  /* Older notes say "Cathurige Mine", "Mount Kilanda", etc. */
  const DUNGEON_ALIASES = {
    "the-mine-of-cathuriges": "mine-of-cathuriges", "cathurige-mine": "mine-of-cathuriges",
    "cathuriges-mine": "mine-of-cathuriges", "cathuriges-mines": "mine-of-cathuriges",
    "the-mushroom-forest": "mushroom-forest", "mount-kilanda": "kilanda", "mt-kilanda": "kilanda",
    "veo-lu-sluce": "veo-lu-sluice", "conall-curch": "conall-curach",
  };

  function dungeonId(name) {
    const slug = slugify(name);
    const id = DUNGEON_ALIASES[slug] ?? slug;
    return DUNGEON_IDS.has(id) ? id : null;
  }

  function dungeonHref(name, cycle) {
    const id = dungeonId(name);
    if (!id) return null;
    return `dungeons.html?d=${id}${cycle ? `&cycle=${cycle}` : ""}`;
  }

  /*
    The world-map icon (assets/img/dungeon/*.png, from the game's own world map
    sprites) for a dungeon or town, or null when there isn't one.
  */
  const PLACE_ICONS = new Set([...DUNGEON_IDS, "tipa", "alfitaria", "shella", "leuda", "marrs-pass", "fum", "mag-mell"]);
  const PLACE_ICON_ALIASES = { "fields-of-fum": "fum", "mount-kilanda": "kilanda", "the-mine-of-cathuriges": "mine-of-cathuriges", "the-mushroom-forest": "mushroom-forest" };

  /* Places with no remaster sprite use their card from the GameCube world map instead. */
  const WORLD_CARD_ICONS = new Set(["port-tipa", "jegon-river-east", "jegon-river-west", "kilanda-islands"]);

  function placeIcon(nameOrId) {
    const slug = slugify(nameOrId);
    const key = PLACE_ICON_ALIASES[slug] ?? slug;
    if (PLACE_ICONS.has(key)) return assetUrl(`dungeon/${key}.png`);
    if (WORLD_CARD_ICONS.has(slug)) return assetUrl(`world/icons/${slug}.png`);
    return null;
  }

  /* Chalice element colours, used for hotspot pins and badges everywhere. */
  const ELEMENT_COLORS = { Fire: "#e2572d", Water: "#3c91f5", Wind: "#50cd73", Earth: "#b07a3a", Unknown: "#9a7fd1" };

  /*
    A row of small coloured dots, one per chalice element a dungeon has a
    hotspot for. `counts` is { Water: 2, Wind: 1 } from dungeons.js.
  */
  function hotspotBadges(counts) {
    const elements = Object.keys(ELEMENT_COLORS).filter((e) => counts?.[e]);
    if (!elements.length) return null;
    return el(
      "span",
      { class: "hotspot-badges", title: `Chalice hotspots: ${elements.map((e) => `${e} ×${counts[e]}`).join(", ")}` },
      elements.map((e) => el("i", { style: `background:${ELEMENT_COLORS[e]}` }, e[0])),
    );
  }

  const SLOT_TABS = { weapon: "weapons", accessory: "accessories" };

  function buildItemIndex(items, artifacts) {
    const pages = new Map();
    const add = (name, href) => {
      const key = slugify(name);
      if (key && !pages.has(key)) pages.set(key, href);
    };
    const itemsPage = (tab, name) => `items.html?tab=${tab}&q=${encodeURIComponent(name)}`;

    for (const a of artifacts?.artifacts ?? []) add(a.name, `artifacts.html?artifact=${slugify(a.name)}#finder`);
    for (const m of items?.materials ?? []) add(m.name, itemsPage("materials", m.name));
    for (const e of items?.equipment ?? []) add(e.name, itemsPage(SLOT_TABS[e.slot] ?? "armor", e.name));
    for (const s of items?.scrolls ?? []) {
      add(s.name, itemsPage("scrolls", s.name));
      // Boss reward lists call scrolls by what they make ("Diamond Armor"), so
      // fall back to the scroll when there's no item with that exact name.
      add(s.name.replace(/ Scroll$/, ""), itemsPage("scrolls", s.name));
    }
    for (const c of items?.consumables ?? []) add(c.name, itemsPage("consumables", c.name));
    add("Raise", itemsPage("consumables", "Life"));

    return (name) => pages.get(slugify(name)) ?? null;
  }

  /* A name as a link when we know where it goes, otherwise plain text. */
  function linkTo(text, href, attrs = {}) {
    return href ? el("a", { href, ...attrs }, text) : document.createTextNode(String(text));
  }

  function showError(target, error) {
    console.error(error);
    clear(target).append(
      el(
        "div",
        { class: "panel" },
        el("h2", {}, "Something went wrong"),
        el("p", {}, String(error.message ?? error)),
        el(
          "p",
          { class: "muted" },
          "If you've just edited a file in the data folder, check it for a missing comma, quote or bracket.",
        ),
      ),
    );
  }

  function loadingNode() {
    return el("div", { class: "loading" }, el("img", { src: iconUrl("crystal-0"), alt: "" }), el("p", {}, "Gathering myrrh…"));
  }

  /* Read/write simple ?key=value state in the URL so views can be bookmarked and shared. */
  const urlState = {
    get(key) {
      return new URLSearchParams(location.search).get(key);
    },
    set(values) {
      const params = new URLSearchParams(location.search);
      for (const [key, value] of Object.entries(values)) {
        if (value === null || value === undefined || value === "") params.delete(key);
        else params.set(key, value);
      }
      const query = params.toString();
      try {
        history.replaceState(null, "", `${location.pathname}${query ? `?${query}` : ""}${location.hash}`);
      } catch {
        /* Some browsers refuse this on file:// pages. Bookmarkable state is a nice-to-have. */
      }
    },
  };

  function buildHeader() {
    const current = location.pathname.split("/").pop() || "index.html";
    const nav = el(
      "nav",
      { class: "main-nav", id: "main-nav", "aria-label": "Main" },
      el(
        "ul",
        {},
        NAV.map((item) =>
          el("li", {}, el("a", { href: item.href, "aria-current": item.href === current ? "page" : null }, item.label)),
        ),
      ),
    );
    const toggle = el(
      "button",
      {
        class: "nav-toggle",
        type: "button",
        "aria-expanded": "false",
        "aria-controls": "main-nav",
        onclick: () => {
          const open = nav.classList.toggle("open");
          toggle.setAttribute("aria-expanded", String(open));
        },
      },
      "☰ Menu",
    );
    const theme = el("button", { class: "theme-toggle", type: "button", onclick: cycleTheme, title: "Switch light / dark" }, "◐");

    return el(
      "div",
      { class: "header-inner" },
      el(
        "a",
        { class: "brand", href: "index.html" },
        el("img", { src: iconUrl("crystal-0"), alt: "" }),
        el("span", {}, "Crystal Caravan Codex", el("small", {}, "FFCC FIELD GUIDE")),
      ),
      toggle,
      nav,
      theme,
    );
  }

  function cycleTheme() {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    store.set("theme", next);
  }

  function buildFooter() {
    return [
      el("p", {}, "Crystal Caravan Codex is a fan-made reference for Final Fantasy Crystal Chronicles. Not affiliated with Square Enix."),
      el(
        "p",
        {},
        "Data compiled from the FFCC World Ultimania, the Nintendo Power and Piggyback guides, GameFAQs contributors and the FFCC speedrun community. ",
        el("a", { href: "about.html" }, "Sources & how to contribute"),
        ".",
      ),
    ];
  }

  function initPage() {
    const savedTheme = store.get("theme", null);
    if (savedTheme) document.documentElement.dataset.theme = savedTheme;

    const header = document.getElementById("site-header");
    if (header) {
      const inner = buildHeader();
      header.append(inner);
      // Site search (search.js) when the page includes it.
      window.Codex.search?.mount(inner);
    }
    const footer = document.getElementById("site-footer");
    if (footer) footer.append(...buildFooter());

    addBackToTop();
    scrollToHashWhenReady();
  }

  /*
    Links like world.html#mog-stamps point at sections that only exist once the
    page's data has loaded, so the browser's own jump finds nothing. Watch for
    the section to appear (for a few seconds at most) and scroll to it then.
  */
  /*
    Pictures and maps above a target keep loading after the jump and push it
    down the page. For a few seconds, re-centre it whenever the page changes
    height – but stop as soon as the reader scrolls on their own.
  */
  function keepCentred(target) {
    let expected = window.scrollY;
    const recentre = () => {
      if (Math.abs(window.scrollY - expected) > 4) return stop();
      target.scrollIntoView({ block: "center", behavior: "instant" });
      expected = window.scrollY;
    };
    const watcher = new ResizeObserver(recentre);
    watcher.observe(document.body);
    const userScroll = () => {
      if (Math.abs(window.scrollY - expected) > 4) stop();
    };
    window.addEventListener("wheel", stop, { once: true, passive: true });
    window.addEventListener("touchstart", stop, { once: true, passive: true });
    window.addEventListener("keydown", stop, { once: true });
    const timer = setTimeout(stop, 3000);
    function stop() {
      watcher.disconnect();
      clearTimeout(timer);
      window.removeEventListener("scroll", userScroll);
    }
    window.addEventListener("scroll", userScroll, { passive: true });
  }

  function scrollToHashWhenReady() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id || document.getElementById(id)) return;
    const observer = new MutationObserver(() => {
      const target = document.getElementById(id);
      if (!target) return;
      observer.disconnect();
      requestAnimationFrame(() => {
        target.scrollIntoView({ block: "center", behavior: "instant" });
        // Glow briefly so it's obvious which row or card the link meant.
        target.classList.add("flash-target");
        setTimeout(() => target.classList.remove("flash-target"), 2600);
        keepCentred(target);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 5000);
  }

  /* A floating button that appears once you've scrolled a screen or so down. */
  function addBackToTop() {
    const button = el(
      "button",
      {
        class: "back-to-top",
        type: "button",
        "aria-label": "Back to top",
        title: "Back to top",
        onclick: () => {
          const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
          document.getElementById("main")?.focus({ preventScroll: true });
        },
      },
      el("img", { src: iconUrl("crystal-0"), alt: "" }),
    );
    document.body.append(button);

    const update = () => button.classList.toggle("visible", window.scrollY > 500);
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  window.Codex = {
    ELEMENT_COLORS,
    hotspotBadges,
    placeIcon,
    dungeonId,
    dungeonHref,
    buildItemIndex,
    linkTo,
    NAV,
    TRIBES,
    SLOT_ICONS,
    ARTIFACT_ICONS,
    assetUrl,
    iconUrl,
    slugify,
    enemyKey,
    enemyName,
    findEnemy,
    loadData,
    el,
    append,
    clear,
    icon,
    tribeChip,
    resistPips,
    formatGil,
    formatPct,
    listText,
    debounce,
    store,
    toast,
    makeSortable,
    makeTabs,
    segmented,
    showError,
    loadingNode,
    urlState,
    initPage,
  };
})();
