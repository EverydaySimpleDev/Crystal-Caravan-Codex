/*
  Site-wide search: a magnifier button in the header (or the "/" key) opens a
  box that finds any page, item, artifact, monster, dungeon or town and jumps
  straight to it.

  The data is only loaded the first time the box opens, so pages that never use
  search don't pay for it. core.js calls Codex.search.mount(headerInner).
*/
(() => {
  const { el, clear, append, loadData, slugify, iconUrl, assetUrl, placeIcon, enemyKey, enemyName, buildItemIndex, NAV } = Codex;

  const MAX_RESULTS = 10;

  /* Everything searchable, built once: [{ name, kind, href, icon, extra }]. */
  let entries = null;

  async function loadEntries() {
    if (entries) return entries;
    const [items, artifacts, enemies, dungeons, world, diary] = await Promise.all([
      loadData("items"),
      loadData("artifacts"),
      loadData("enemies"),
      loadData("dungeons"),
      loadData("world"),
      loadData("diary").catch(() => null),
    ]);
    const itemHref = buildItemIndex(items, artifacts);
    const list = [];
    const add = (name, kind, href, icon, extra = "") => href && list.push({ name, kind, href, icon, extra, key: name.toLowerCase() });

    for (const page of NAV) add(page.label, "Page", page.href, iconUrl("crystal-0"));
    for (const a of artifacts.artifacts ?? []) add(a.name, "Artifact", itemHref(a.name), assetUrl("icon/accessory.png"), a.effect ?? "");
    for (const e of items.equipment ?? []) add(e.name, "Equipment", itemHref(e.name), assetUrl("icon/tab-weapon.png"), [e.tribe, e.effect].filter(Boolean).join(" · "));
    for (const m of items.materials ?? []) add(m.name, "Material", itemHref(m.name), assetUrl("icon/crystal.png"));
    for (const s of items.scrolls ?? []) add(s.name, "Scroll", itemHref(s.name), assetUrl("icon/scroll.png"));
    for (const c of items.consumables ?? []) add(c.name, c.category ?? "Item", itemHref(c.name), assetUrl("icon/pouch.png"), c.effect ?? "");
    for (const e of enemies.enemies ?? []) {
      add(enemyName(e), e.boss ? "Boss" : "Monster", `bestiary.html?enemy=${enemyKey(e)}`, assetUrl(`monster/${enemyKey(e)}.png`), e.type ?? "");
    }
    for (const d of dungeons.dungeons ?? []) {
      add(d.name, "Dungeon", `dungeons.html?d=${d.id}`, placeIcon(d.id) ?? iconUrl("crystal-0"), d.boss ? `Boss: ${d.boss}` : "");
      if (d.puzzle) add(d.puzzle.title, "Guide", `dungeons.html?d=${d.id}#${d.puzzle.id}`, placeIcon(d.id) ?? iconUrl("crystal-0"), d.name);
    }
    for (const t of world.towns ?? []) add(t.name, "Town", `towns.html?town=${slugify(t.name)}`, placeIcon(t.name) ?? iconUrl("gil"), t.region ?? "");
    for (const ev of world.events ?? []) add(ev.name, "Event", ev.link ?? `world.html#event-${slugify(ev.name)}`, assetUrl("icon/letter.png"), ev.where ?? "");
    // Road encounters are listed by who you meet; the scene text is the extra line so it's searchable too.
    (world.encounters ?? []).forEach((enc, i) =>
      add(enc.who, "Encounter", `world.html#encounter-${slugify(enc.who)}-${i}`, assetUrl("icon/bag.png"), enc.scene ?? ""),
    );
    // Diary entries: found by their title, or by anything in the trigger or the text.
    for (const entry of diary?.entries ?? []) {
      add(entry.title, "Diary", `world.html#diary-${entry.id}`, assetUrl("icon/letter.png"), `${entry.trigger} ${entry.text ?? ""}`);
    }
    for (const stamp of world.mogStamps?.stamps ?? []) {
      add(`Mog Stamp ${stamp.number}: ${stamp.where}`, "Mog Stamp", `world.html#stamp-${stamp.number}`, assetUrl("ui/mog-1.png"), stamp.how ?? "");
    }
    entries = list;
    return list;
  }

  /*
    Best matches first: whole-name match, then names that start with the text,
    then a word that starts with it, then anywhere in the name, then the extra line.
  */
  function rank(text) {
    const q = text.trim().toLowerCase();
    if (!q) return [];
    const scored = [];
    for (const e of entries) {
      let score = -1;
      if (e.key === q) score = 100;
      else if (e.key.startsWith(q)) score = 80;
      else if (e.key.split(/[\s(]+/).some((w) => w.startsWith(q))) score = 60;
      else if (e.key.includes(q)) score = 40;
      else if (e.extra.toLowerCase().includes(q)) score = 10;
      if (score >= 0) scored.push({ e, score: score - e.name.length / 100 });
    }
    return scored.sort((a, b) => b.score - a.score).slice(0, MAX_RESULTS).map((s) => s.e);
  }

  function mount(headerInner) {
    const input = el("input", {
      type: "search",
      class: "site-search-input",
      placeholder: "Search items, monsters, dungeons, towns…",
      "aria-label": "Search the Codex",
      autocomplete: "off",
      role: "combobox",
      "aria-expanded": "false",
      "aria-controls": "site-search-results",
    });
    const results = el("ul", { class: "site-search-results", id: "site-search-results", role: "listbox" });
    const box = el("div", { class: "site-search", hidden: true }, input, results);
    const button = el("button", { class: "theme-toggle search-toggle", type: "button", title: "Search (press /)", "aria-label": "Search" });
    // A plain magnifier, drawn as SVG so it needs no image file.
    button.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M15 15l6 6" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';

    let matches = [];
    let active = 0;

    function draw() {
      clear(results);
      input.setAttribute("aria-expanded", String(matches.length > 0));
      if (input.value.trim() && !matches.length) {
        results.append(el("li", { class: "site-search-empty" }, "Nothing found."));
        return;
      }
      append(results,
        matches.map((m, i) =>
          el(
            "li",
            { role: "option", "aria-selected": String(i === active) },
            el(
              "a",
              { href: m.href, onmouseenter: () => { active = i; mark(); } },
              el("img", { src: m.icon, alt: "", loading: "lazy", onerror: (e) => { e.target.src = iconUrl("crystal-0"); } }),
              el("span", { class: "site-search-name" }, m.name, m.extra ? el("small", {}, m.extra) : null),
              el("span", { class: "chip" }, m.kind),
            ),
          ),
        ),
      );
    }

    function mark() {
      [...results.children].forEach((li, i) => li.setAttribute("aria-selected", String(i === active)));
    }

    async function open() {
      box.hidden = false;
      input.focus();
      input.select();
      try {
        await loadEntries();
      } catch {
        results.replaceChildren(el("li", { class: "site-search-empty" }, "Search data couldn't load."));
        return;
      }
      if (input.value) update();
    }

    function close() {
      box.hidden = true;
      matches = [];
      draw();
    }

    function update() {
      if (!entries) return;
      matches = rank(input.value);
      active = 0;
      draw();
    }

    input.addEventListener("input", update);
    input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (!matches.length) return;
        active = (active + (event.key === "ArrowDown" ? 1 : -1) + matches.length) % matches.length;
        mark();
        results.children[active]?.scrollIntoView({ block: "nearest" });
      } else if (event.key === "Enter") {
        const target = matches[active];
        if (target) location.href = target.href;
      } else if (event.key === "Escape") {
        close();
        button.focus();
      }
    });
    button.addEventListener("click", () => (box.hidden ? open() : close()));
    document.addEventListener("keydown", (event) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName ?? "");
      if (event.key === "/" && !typing) {
        event.preventDefault();
        open();
      }
    });
    document.addEventListener("click", (event) => {
      if (!box.hidden && !box.contains(event.target) && !button.contains(event.target)) close();
    });

    headerInner.append(button, box);
  }

  window.Codex.search = { mount };
})();
