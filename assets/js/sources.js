/*
  "Where do I get this?" – every source of an item, built in reverse from the
  game data the rest of the site already has:

    chests      data/stagemaps.js  chest loot per cycle (read from the game)
    monsters    data/stagemaps.js  monster drops per cycle, as a chance per kill
    shops       data/items.js      shop stock
    bosses      data/dungeons.js   end-of-dungeon reward sets (odds from drops.js)
    craft       data/items.js      for equipment: its scroll, materials and fee, plus
                                   where to get that scroll (equipment itself is
                                   never found – you forge it from the scroll)
    info        data/items.js      how you get gear that can't be crafted
                                   (starting equipment, gifts)
    missable    data/world.js      a warning when you can lose the chance to get it:
                                   the guides' missables list, plus anything the game
                                   data only has in cycles 1–2 and no shop sells, plus
                                   gear whose scroll or materials are missable

  Usage:
    const where = Codex.sources.build({ items, dungeons, stagemaps });
    where("Orichalcum")  ->  { chests, monsters, shops, bosses, craft, info }   (best first)
    Codex.sources.panel(name, result, itemHref) -> a ready-made panel element
*/
(() => {
  const { el, slugify, linkTo, dungeonHref, enemyKey, enemyName, formatGil, formatPct } = Codex;

  /* A chest result like "Iron Shield Scroll + 20 Gil" gives both things. */
  const parts = (result) => String(result).split(" + ").map((s) => s.trim());

  /* Dungeons outside the usual 3-cycle loop – you only visit them once, at the end. */
  const ONE_VISIT = new Set(["mount-vellenge", "nest-of-memories"]);

  function build({ items, dungeons, stagemaps, missables = [] }) {
    // The guides list scrolls by what they make ("Novice's Weapon"), so match both spellings.
    const guideMissables = new Map();
    for (const m of missables) {
      guideMissables.set(slugify(m.name), m);
      guideMissables.set(slugify(`${m.name} Scroll`), m);
    }
    const dungeonList = dungeons?.dungeons ?? [];
    const names = new Map(dungeonList.map((d) => [d.id, d.name]));
    const index = new Map(); // item slug -> { chests, monsters, shops }
    const entry = (item) => {
      const key = slugify(item);
      if (!index.has(key)) index.set(key, { chests: [], monsters: [], shops: [] });
      return index.get(key);
    };

    for (const [id, stage] of Object.entries(stagemaps ?? {})) {
      const multi = stage.areas.length > 1;
      // Monster drops are averaged over every spawn of that monster in the
      // dungeon and cycle, which is the chance for "a kill of this monster here".
      const spawns = new Map(); // "monster key|cycle" -> { monster, cycle, count, totals }
      for (const area of stage.areas) {
        for (const chest of area.chests ?? []) {
          for (const [cycle, loot] of Object.entries(chest.loot ?? {})) {
            for (const { item, chance } of loot) {
              for (const part of parts(item)) {
                if (part === "Nothing" || /^\d+ Gil$/.test(part)) continue;
                entry(part).chests.push({
                  dungeon: id, name: names.get(id) ?? id, cycle: Number(cycle), chance,
                  chest: chest.chest, area: multi ? area.area : null,
                });
              }
            }
          }
        }
        for (const m of area.monsters ?? []) {
          for (const cycle of m.cycles ?? [1, 2, 3]) {
            const key = `${enemyKey(m)}|${cycle}`;
            if (!spawns.has(key)) spawns.set(key, { monster: m, cycle, count: 0, totals: new Map() });
            const rec = spawns.get(key);
            rec.count += 1;
            for (const { item, chance } of m.drops?.[String(cycle)] ?? []) {
              for (const part of parts(item)) {
                if (part === "Nothing" || /^\d+ Gil$/.test(part)) continue;
                rec.totals.set(part, (rec.totals.get(part) ?? 0) + chance);
              }
            }
          }
        }
      }
      for (const { monster, cycle, count, totals } of spawns.values()) {
        for (const [item, sum] of totals) {
          const chance = Math.round(sum / count);
          if (chance) entry(item).monsters.push({ dungeon: id, name: names.get(id) ?? id, cycle, chance, monster });
        }
      }
    }

    for (const shop of items?.shops ?? []) {
      for (const row of shop.stock ?? []) {
        entry(row.item).shops.push({ town: shop.town, vendor: shop.vendor, price: row.price, condition: row.condition });
      }
    }

    const rules = dungeons?.rewardSetRules;
    const { bestPlacesFor } = Codex.drops ?? {};

    const equipment = new Map((items?.equipment ?? []).map((e) => [slugify(e.name), e]));
    const scrolls = new Map((items?.scrolls ?? []).map((sc) => [slugify(sc.name), sc]));

    /* Why an item can be missed, or null. `found` is that item's own sources. */
    function missableFor(name, found, bosses) {
      const guide = guideMissables.get(slugify(name));
      const all = [...found.chests, ...found.monsters, ...bosses.map((b) => ({ cycle: b.cycle, dungeon: b.dungeon.id }))];
      const lastCycle = all.length && !found.shops.length && !all.some((x) => ONE_VISIT.has(x.dungeon))
        ? Math.max(...all.map((x) => x.cycle))
        : null;
      if (!guide && !(lastCycle && lastCycle < 3)) return null;
      return {
        when: guide?.when ?? `Before cycle ${lastCycle + 1}`,
        why: guide?.consequence ?? null,
        lastCycle,
        source: guide ? "guides" : "game data",
      };
    }

    return function where(name) {
      const found = index.get(slugify(name)) ?? { chests: [], monsters: [], shops: [] };
      const byChance = (a, b) => b.chance - a.chance || a.cycle - b.cycle;
      const gear = equipment.get(slugify(name));
      let craft = null;
      let info = null;
      if (gear?.recipe?.scroll) {
        const scroll = scrolls.get(slugify(gear.recipe.scroll));
        craft = {
          scroll: gear.recipe.scroll,
          materials: gear.recipe.materials ?? [],
          gil: gear.recipe.gil,
          smith: scroll?.smith ?? null,
          // The scroll is what you actually go looking for, so show where it is.
          scrollSources: where(gear.recipe.scroll),
        };
      } else if (gear) {
        info = [gear.obtain, gear.notes].filter(Boolean).join(" – ") || null;
      }
      const bosses = rules && bestPlacesFor
        ? dedupe(bestPlacesFor(name, dungeonList, rules, 1), (p) => `${p.dungeon.id}|${p.cycle}`)
        : [];
      let missable = missableFor(name, found, bosses);
      // Gear can't be found, only forged – it's missable when its scroll or a material is.
      if (craft) {
        const scrollMissable = craft.scrollSources.missable;
        const material = craft.materials.map((m) => ({ m, w: where(m.item).missable })).find((x) => x.w);
        const cause = scrollMissable ? { what: craft.scroll, w: scrollMissable } : material ? { what: material.m.item, w: material.w } : null;
        if (cause) missable = { when: cause.w.when, why: `Needs the ${cause.what}, which is missable.`, source: cause.w.source };
      }
      return {
        craft,
        info,
        missable,
        chests: [...found.chests].sort(byChance),
        monsters: [...found.monsters].sort(byChance),
        shops: [...found.shops].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity)),
        // Boss reward sets, solo odds, best band per dungeon and cycle.
        bosses,
      };
    };
  }

  function dedupe(list, key) {
    const seen = new Set();
    return list.filter((x) => {
      const k = key(x);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }

  /* Shows at most `limit` rows, with the rest behind a "show all" toggle. */
  function capped(rows, limit = 6) {
    if (rows.length <= limit) return el("ul", { class: "where-list" }, rows);
    const more = el("ul", { class: "where-list", hidden: true }, rows.slice(limit));
    const button = el(
      "button",
      {
        type: "button",
        class: "btn small secondary",
        onclick: () => {
          more.hidden = !more.hidden;
          button.textContent = more.hidden ? `Show ${rows.length - limit} more` : "Show fewer";
        },
      },
      `Show ${rows.length - limit} more`,
    );
    return [el("ul", { class: "where-list" }, rows.slice(0, limit)), more, button];
  }

  function group(title, rows) {
    return rows.length ? el("div", { class: "where-group" }, el("h4", {}, title, el("span", { class: "chip" }, rows.length)), capped(rows)) : null;
  }

  /* The "Craft it" block for equipment: scroll, materials, fee, smith, and the scroll's best sources. */
  function craftBlock(craft, itemHref) {
    const src = craft.scrollSources;
    const best = [
      ...src.shops.slice(0, 2).map((s) => [el("a", { href: `towns.html?town=${slugify(s.town)}` }, s.town), ` shop – ${formatGil(s.price)}`, s.condition ? ` (${s.condition.toLowerCase()})` : ""]),
      ...src.chests.slice(0, 3).map((c) => [el("a", { href: dungeonHref(c.name, c.cycle) }, c.name), ` cycle ${c.cycle}, ${c.area ? `Area ${c.area} ` : ""}chest #${c.chest} – ${c.chance}%`]),
      ...src.monsters.slice(0, 2).map((m) => [enemyName(m.monster), " in ", el("a", { href: dungeonHref(m.name, m.cycle) }, m.name), ` cycle ${m.cycle} – ${m.chance}% per kill`]),
      ...src.bosses.slice(0, 1).map((b) => [el("a", { href: `artifacts.html?dungeon=${b.dungeon.id}&cycle=${b.cycle}#calculator` }, b.dungeon.name), ` boss reward, cycle ${b.cycle} – ${formatPct(b.chance)}`]),
    ];
    return el(
      "div",
      { class: "where-craft" },
      el("h4", {}, "Craft it"),
      el(
        "p",
        { style: "margin:0 0 6px" },
        "Forge it from the ",
        linkTo(craft.scroll, itemHref?.(craft.scroll)),
        " with ",
        craft.materials.map((m, i) => [i ? ", " : "", `${m.qty ?? 1}× `, linkTo(m.item, itemHref?.(m.item))]),
        craft.gil ? ` and ${formatGil(craft.gil)}.` : ".",
      ),
      craft.smith ? el("p", { class: "small muted", style: "margin:0 0 6px" }, `Who can make it: ${craft.smith}`) : null,
      best.length
        ? [el("p", { class: "small", style: "margin:0" }, el("b", {}, "Best places to get the scroll:")), el("ul", { class: "where-list" }, best.map((row) => el("li", {}, row)))]
        : el("p", { class: "small muted", style: "margin:0" }, "The game data has no chest, shop or drop for this scroll – check its notes on the Scrolls tab."),
    );
  }

  /* The "get this early" warning shown at the top of the panel. */
  function missableAlert(m) {
    return el(
      "div",
      { class: "missable-alert", role: "note" },
      el("b", {}, "⚠ Missable – get it ", m.when.toLowerCase(), ". "),
      m.why ?? (m.lastCycle ? `It's only found in cycles 1–${m.lastCycle} and no shop sells it, so once these dungeons reach cycle ${m.lastCycle + 1} it's gone.` : ""),
      el("span", { class: "small muted" }, ` (from the ${m.source})`),
    );
  }

  /* The "Where to get it" panel for one item. */
  function panel(name, result, itemHref) {
    const { chests, monsters, shops, bosses, craft, info, missable } = result;
    const any = chests.length || monsters.length || shops.length || bosses.length;
    return el(
      "section",
      { class: "where-panel" },
      el(
        "h3",
        {},
        "Where to get ",
        linkTo(name, itemHref?.(name)),
      ),
      missable ? missableAlert(missable) : null,
      craft ? craftBlock(craft, itemHref) : null,
      info ? el("p", { class: "where-info" }, el("b", {}, "How you get it: "), info) : null,
      any
        ? el(
            "div",
            { class: "where-grid" },
            group(
              "Shops",
              shops.map((s) =>
                el(
                  "li",
                  {},
                  el("a", { href: `towns.html?town=${slugify(s.town)}` }, s.town),
                  ` – ${s.vendor}`,
                  el("span", { class: "where-odds" }, formatGil(s.price)),
                  s.condition ? el("div", { class: "small muted" }, s.condition) : null,
                ),
              ),
            ),
            group(
              "Treasure chests",
              chests.map((c) =>
                el(
                  "li",
                  {},
                  el("a", { href: dungeonHref(c.name, c.cycle) }, c.name),
                  ` · cycle ${c.cycle} · ${c.area ? `Area ${c.area}, ` : ""}chest #${c.chest}`,
                  el("span", { class: "where-odds" }, `${c.chance}%`),
                ),
              ),
            ),
            group(
              "Monster drops",
              monsters.map((m) =>
                el(
                  "li",
                  {},
                  el("a", { href: `bestiary.html?enemy=${enemyKey(m.monster)}&cycle=${m.cycle}` }, enemyName(m.monster)),
                  " in ",
                  el("a", { href: dungeonHref(m.name, m.cycle) }, m.name),
                  ` · cycle ${m.cycle}`,
                  el("span", { class: "where-odds", title: "Chance per kill" }, `${m.chance}%`),
                ),
              ),
            ),
            group(
              "Boss rewards",
              bosses.map((b) =>
                el(
                  "li",
                  {},
                  el("a", { href: `artifacts.html?dungeon=${b.dungeon.id}&cycle=${b.cycle}#calculator` }, b.dungeon.name),
                  ` · cycle ${b.cycle} · ${b.max === null ? `${b.min}+` : `${b.min}–${b.max}`} pts (1P)`,
                  el("span", { class: "where-odds", title: "Chance the reward set offers it" }, formatPct(b.chance)),
                ),
              ),
            ),
          )
        : craft || info
          ? null
          : el("p", { class: "muted" }, "No chest, monster, shop or boss in the game data gives this – it may be a quest item or made by a family job."),
      any
        ? el(
            "p",
            { class: "small muted", style: "margin:8px 0 0" },
            "Chest and drop odds come from the game itself. A chest rolls once each time you open it; drops are per kill.",
          )
        : null,
    );
  }

  window.Codex.sources = { build, panel };
})();
