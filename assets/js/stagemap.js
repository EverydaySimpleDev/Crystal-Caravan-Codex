/*
  Dungeon area maps.

  Each area is one SVG: the top-down stage render numbered chest pins with lines out to note boxes
  listing what the chest can hold this cycle, a letter for each monster spawn,
  and the chalice hotspots. Everything is in the image's own pixel units, so
  the whole thing scales together.

  Data comes from data/stagemaps.js; see that file's generator for the format.
*/
(() => {
  const { el, enemyKey, linkTo } = Codex;

  const SVG_NS = "http://www.w3.org/2000/svg";
  const NOTE_WIDTH = 270;
  const NOTE_GAP = 34; // space between the map and the note column
  const LINE_HEIGHT = 19;
  const HOTSPOT_COLORS = {
    Fire: "#e2572d",
    Water: "#3c91f5",
    Wind: "#50cd73",
    Earth: "#b07a3a",
    Unknown: "#9a7fd1",
  };

  /* Spell -> its target-ring sprite in assets/img/spell. */
  const SPELL_RINGS = {
    Fire: "fire", Blizzard: "blizzard", Thunder: "thunder", Cure: "cure", Life: "raise",
    Clear: "clear", Holy: "holy", Gravity: "gravity", Slow: "slow", Haste: "haste", Stop: "stop",
  };

  function svg(tag, attrs = {}, ...children) {
    const node = document.createElementNS(SVG_NS, tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (value !== null && value !== undefined) node.setAttribute(key, value);
    }
    for (const child of children.flat()) {
      if (child)
        node.append(
          child instanceof Node
            ? child
            : document.createTextNode(String(child)),
        );
    }
    return node;
  }

  /* What a chest can hold in one cycle, best odds first: [{ item, chance }]. */
  function chestLoot(chest, cycle) {
    return [...(chest.loot?.[String(cycle)] ?? [])].sort(
      (a, b) => b.chance - a.chance,
    );
  }

  function inCycle(entry, cycle) {
    return !entry.cycles?.length || entry.cycles.includes(cycle);
  }

  /* Some spawns only appear with a bigger party; "players" lists the party sizes they spawn for. */
  function forParty(monster, players) {
    return !monster.players?.length || monster.players.includes(players);
  }

  /*
    How a party-size-limited spawn is described: "2+ players", "solo play only",
    or the exact sizes. Null when it appears for every party size.
  */
  function partyNote(monster) {
    const sizes = monster.players;
    if (!sizes?.length || sizes.length === 4) return null;
    if (sizes.length === 1 && sizes[0] === 1) return "solo play only";
    const fewest = Math.min(...sizes);
    if (sizes.length === 5 - fewest) return `${fewest}+ players`;
    return `${sizes.join("/")} players`;
  }

  /*
    Stack the note boxes down the right-hand side, each as close to its chest's
    height as it can get without overlapping the one above.
  */
  function layoutNotes(chests, cycle) {
    let nextFree = 8;
    return [...chests]
      .sort((a, b) => a.y - b.y)
      .map((chest) => {
        const loot = chestLoot(chest, cycle);
        const height = 30 + Math.max(1, loot.length) * LINE_HEIGHT;
        const top = Math.max(nextFree, chest.y - height / 2);
        nextFree = top + height + 8;
        return { chest, loot, top, height };
      });
  }

  function toRoman(n) {
    return (
      [
        "",
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII",
      ][n] ?? String(n)
    );
  }

  /* One letter per monster type, A, B, C... in the order they first appear. */
  function monsterLetters(monsters) {
    const letters = new Map();
    for (const m of monsters) {
      const key = enemyKey(m);
      if (!letters.has(key))
        letters.set(key, String.fromCharCode(65 + (letters.size % 26)));
    }
    return letters;
  }

  /*
    Draws one area. Options:
      cycle        1-3
      players      party size 1-4 (hides spawns that need a bigger party)
      notes        draw the chest note boxes beside the map (off on phones)
      monsters     draw monster letters
      hotspots     draw hotspot pins
      warps        draw sand traps and other teleports
      puzzle       draw puzzle steps (Lynari Desert's Unknown element)
      incoming     warps from other areas that land in this one: [{ warp, fromArea }]
      itemHref     item name -> link (or null)
  */
  function renderArea(area, options) {
    const {
      cycle,
      players = 4,
      notes,
      monsters: showMonsters,
      hotspots: showHotspots,
      warps: showWarps = true,
      puzzle: showPuzzle = true,
      incoming = [],
      itemHref,
    } = options;
    const chests = (area.chests ?? []).filter((c) => inCycle(c, cycle));
    const monsters = (area.monsters ?? []).filter(
      (m) => inCycle(m, cycle) && forParty(m, players),
    );
    const layout = notes ? layoutNotes(chests, cycle) : [];
    const noteBottom = layout.length
      ? layout[layout.length - 1].top + layout[layout.length - 1].height
      : 0;

    const width =
      area.width + (notes && layout.length ? NOTE_GAP + NOTE_WIDTH : 0);
    const height = Math.max(area.height, noteBottom + 8);
    const map = svg("svg", {
      viewBox: `0 0 ${width} ${height}`,
      class: "stage-map",
      role: "img",
      "aria-label": `Map of area ${area.area}`,
    });

    map.append(
      svg("image", {
        href: area.image,
        x: 0,
        y: 0,
        width: area.width,
        height: area.height,
      }),
    );

    // Leader lines first so the pins and boxes sit on top of them.
    const noteX = area.width + NOTE_GAP;
    for (const { chest, top } of layout) {
      map.append(
        svg("polyline", {
          points: `${chest.x},${chest.y} ${area.width + 8},${chest.y} ${noteX},${top + 15}`,
          class: "stage-leader",
        }),
      );
    }

    if (showHotspots) {
      for (const spot of area.hotspots ?? []) {
        const color = HOTSPOT_COLORS[spot.element] ?? "#999";
        map.append(
          svg(
            "g",
            {
              class: "stage-hotspot",
              transform: `translate(${spot.x} ${spot.y})`,
            },
            svg("title", {}, `${spot.element} hotspot`),
            svg("path", { d: "M0 12 L-8 -2 A9 9 0 1 1 8 -2 Z", fill: color }),
            svg("text", { y: "-3" }, spot.element[0]),
          ),
        );
      }
    }

    const letters = monsterLetters(monsters);
    if (showMonsters) {
      for (const m of monsters) {
        const party = partyNote(m);
        map.append(
          svg(
            "g",
            {
              class: `stage-monster${party ? " party" : ""}`,
              transform: `translate(${m.x} ${m.y})`,
            },
            svg(
              "title",
              {},
              `${m.variant ? `${m.name} (${m.variant})` : m.name}${m.key ? " – carries a key" : ""}${party ? ` – only appears in ${party}` : ""}`,
            ),
            svg("circle", { r: 9 }),
            svg("text", { y: "1" }, letters.get(enemyKey(m))),
          ),
        );
      }
    }

    // Sand traps and other teleports. A trap that drops you somewhere else in the
    // same area gets a dashed arrow to where you land.
    if (showWarps) {
      map.append(
        svg(
          "defs",
          {},
          svg(
            "marker",
            {
              id: `warp-arrow-${area.area}`,
              viewBox: "0 0 10 10",
              refX: "8",
              refY: "5",
              markerWidth: "6",
              markerHeight: "6",
              orient: "auto-start-reverse",
            },
            svg("path", { d: "M0 0 L10 5 L0 10 Z", fill: "#f5d98e" }),
          ),
        ),
      );
      for (const warp of area.warps ?? []) {
        const sameArea =
          warp.toArea === area.area &&
          warp.toX !== undefined &&
          warp.toY !== undefined;
        if (sameArea) {
          const midX = (warp.x + warp.toX) / 2;
          const midY =
            (warp.y + warp.toY) / 2 -
            Math.hypot(warp.toX - warp.x, warp.toY - warp.y) * 0.2;
          map.append(
            svg("path", {
              class: "stage-warp-line",
              d: `M${warp.x} ${warp.y} Q${midX} ${midY} ${warp.toX} ${warp.toY}`,
              "marker-end": `url(#warp-arrow-${area.area})`,
            }),
            svg("circle", {
              class: "stage-warp-landing",
              cx: warp.toX,
              cy: warp.toY,
              r: 6,
            }),
          );
        }
        // "Quicksand II" when you land in this same area (the arrow shows where),
        // "Quicksand IV → Area 2" when it takes you somewhere else.
        const name = warp.number
          ? `${warp.label} ${toRoman(warp.number)}`
          : warp.label;
        const text = warp.to && !sameArea ? `${name} → ${warp.to}` : name;
        if (sameArea && warp.number) {
          map.append(
            svg(
              "text",
              {
                class: "stage-warp-landing-label",
                x: warp.toX + 9,
                y: warp.toY + 4,
              },
              `${toRoman(warp.number)} lands here`,
            ),
          );
        }
        map.append(
          svg(
            "g",
            {
              class: "stage-warp",
              transform: `translate(${warp.x} ${warp.y})`,
            },
            svg("title", {}, text),
            svg("circle", { r: 11 }),
            svg("path", {
              d: "M-5 -2 A5 5 0 1 1 0 5 A3 3 0 1 1 3 0",
              class: "swirl",
            }),
            svg("text", { x: 14, y: 4 }, text),
          ),
        );
      }
    }

    // Landing spots of traps in other areas that drop you here.
    if (showWarps) {
      for (const { warp, fromArea } of incoming) {
        map.append(
          svg(
            "g",
            {
              class: "stage-warp-incoming",
              transform: `translate(${warp.toX} ${warp.toY})`,
            },
            svg(
              "title",
              {},
              `Where ${warp.label} ${toRoman(warp.number)} in Area ${fromArea} drops you`,
            ),
            svg("circle", { r: 8 }),
            svg(
              "text",
              { x: 12, y: 4 },
              `${toRoman(warp.number)} lands here (from Area ${fromArea})`,
            ),
          ),
        );
      }
    }

    // Puzzle steps: a numbered badge with the spell to cast. Rocks that share a
    // step also show their order (4a, 4b, 4c), and a dashed line joins the steps.
    if (showPuzzle && area.puzzle?.length) {
      const steps = [...area.puzzle].sort((a, b) => a.step - b.step || (a.order ?? 0) - (b.order ?? 0));
      map.append(svg("polyline", { class: "stage-puzzle-path", points: steps.map((p) => `${p.x},${p.y}`).join(" ") }));
      for (const p of steps) {
        const tag = p.order ? `${p.step}${"abc"[p.order - 1] ?? p.order}` : String(p.step);
        map.append(
          svg(
            "g",
            { class: "stage-puzzle", transform: `translate(${p.x} ${p.y})` },
            svg("title", {}, `Step ${tag}: cast ${p.spell} on the ${p.label.toLowerCase()}`),
            svg("circle", { r: 16 }),
            SPELL_RINGS[p.spell]
              ? svg("image", { href: `assets/img/spell/${SPELL_RINGS[p.spell]}.png`, x: -14, y: -14, width: 28, height: 28 })
              : null,
            svg("text", { class: "stage-puzzle-step", x: 14, y: -12 }, tag),
          ),
        );
      }
    }

    // Moogle Nests: where you get this dungeon's Mog Stamp.
    for (const nest of area.moogle ?? []) {
      map.append(
        svg(
          "g",
          {
            class: "stage-moogle",
            transform: `translate(${nest.x} ${nest.y})`,
          },
          svg("title", {}, "Moogle Nest – Mog Stamp"),
          svg("circle", { r: 15 }),
          svg("image", {
            href: "assets/img/ui/mog-0.png",
            x: -13,
            y: -13,
            width: 26,
            height: 26,
          }),
        ),
      );
    }

    for (const chest of chests) {
      const spots = chest.spots?.length ? chest.spots : [[chest.x, chest.y]];
      for (const [x, y] of spots) {
        map.append(
          svg(
            "g",
            { class: "stage-chest", transform: `translate(${x} ${y})` },
            svg("title", {}, `Chest ${chest.chest}`),
            svg("circle", { r: 12 }),
            svg("text", { y: "1" }, chest.chest),
          ),
        );
      }
    }

    for (const { chest, loot, top, height: boxHeight } of layout) {
      const box = svg("foreignObject", {
        x: noteX,
        y: top,
        width: NOTE_WIDTH,
        height: boxHeight,
      });
      box.append(
        el(
          "div",
          { class: "stage-note", xmlns: "http://www.w3.org/1999/xhtml" },
          el("b", {}, `Chest ${chest.chest}`),
          loot.length
            ? loot.map((entry) =>
                el(
                  "div",
                  { class: "stage-note-line" },
                  el("span", {}, linkTo(entry.item, itemHref?.(entry.item))),
                  el("span", { class: "pct" }, `${entry.chance}%`),
                ),
              )
            : el(
                "div",
                { class: "stage-note-line" },
                el("span", { class: "muted" }, "Empty this cycle"),
              ),
        ),
      );
      map.append(box);
    }

    return { map, letters, monsters, chests };
  }

  window.Codex.stagemap = {
    renderArea,
    chestLoot,
    inCycle,
    forParty,
    partyNote,
    monsterLetters,
  };
})();
