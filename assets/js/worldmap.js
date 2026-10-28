/*
  The overworld map

  renderMap() draws one image – the whole world or one region – as an SVG with
  a labelled pin for every town, dungeon, port and miasma stream. On the
  overview each region is also an outlined box that can be clicked.
*/
(() => {
  const { placeIcon, ELEMENT_COLORS } = Codex;
  const MIASMA_ICON = "assets/img/world/miasma.png";
  const SVG_NS = "http://www.w3.org/2000/svg";
  const PIN_COLORS = {
    dungeon: "#c0473b",
    town: "#4f9a45",
    port: "#3a7cc4",
    stream: "#6b4a9a",
    other: "#8a6a32",
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

  /*
    Options:
      pinHref(pin)       link for a pin, or null for no link
      sections           region boxes to outline (overview only)
      selectedSection    id of the highlighted region
      onSection(id)      called when a region box is clicked
      labels             draw place names (off on the overview, where they'd overlap)
      hotspots           { dungeonId: { Water: 2, … } } – element dots under dungeon icons
  */
  function renderMap(
    view,
    {
      pinHref,
      sections = [],
      selectedSection = null,
      onSection,
      labels = true,
      hotspots = {},
    } = {},
  ) {
    // Pins and labels are sized from the image so they read the same on every map.
    const scale = Math.max(view.width, view.height) / 1000;
    const map = svg("svg", {
      viewBox: `0 0 ${view.width} ${view.height}`,
      class: "stage-map world-map",
      role: "img",
      "aria-label": view.name ? `Map of ${view.name}` : "World map",
    });
    map.append(
      svg("image", {
        href: view.image,
        x: 0,
        y: 0,
        width: view.width,
        height: view.height,
      }),
    );

    for (const box of sections) {
      const rect = svg(
        "g",
        {
          class: `world-section${box.id === selectedSection ? " selected" : ""}`,
          tabindex: "0",
          role: "button",
        },
        svg("title", {}, `Open ${box.name ?? box.id}`),
        svg("rect", {
          x: box.x,
          y: box.y,
          width: box.width,
          height: box.height,
          rx: 12 * scale,
        }),
      );
      if (onSection) {
        rect.addEventListener("click", () => onSection(box.id));
        rect.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSection(box.id);
          }
        });
      }
      map.append(rect);
    }

    for (const pin of view.pins ?? []) {
      const color = PIN_COLORS[pin.kind] ?? PIN_COLORS.other;
      const r = 7 * scale;
      // Dungeons and towns use their world-map icon; ports and streams keep a simple marker.
      // The game's own world-map card when the data has one, else the remaster sprite.
      const iconUrl =
        pin.icon ??
        (pin.kind === "dungeon" || pin.kind === "town"
          ? placeIcon(pin.id ?? pin.name)
          : pin.kind === "stream"
            ? MIASMA_ICON
            : null);
      const size = (pin.kind === "stream" ? 52 : 74) * scale;
      let mark;
      if (iconUrl) {
        mark = svg("image", {
          href: iconUrl,
          x: -size / 2,
          y: -size * 0.85,
          width: size,
          height: size,
          class: "world-icon",
        });
      } else if (pin.kind === "stream") {
        mark = svg("path", {
          d: `M0 ${-r * 1.3} L${r * 1.2} 0 L0 ${r * 1.3} L${-r * 1.2} 0 Z`,
          fill: color,
        });
      } else {
        mark = svg("circle", { r, fill: color });
      }
      // Coloured dots under a dungeon's icon for each chalice element it has a hotspot for.
      const elements = Object.keys(ELEMENT_COLORS).filter((e) => hotspots[pin.id]?.[e]);
      const dot = 7 * scale;
      const badges = elements.map((e, i) =>
        svg(
          "g",
          { class: "world-hotspot", transform: `translate(${(i - (elements.length - 1) / 2) * dot * 2.3} ${-size * 0.85 - dot})` },
          svg("circle", { r: dot, fill: ELEMENT_COLORS[e] }),
          svg("text", { y: dot * 0.38, style: `font-size:${dot * 1.2}px` }, e[0]),
        ),
      );
      const marker = svg(
        "g",
        {
          class: `world-pin kind-${pin.kind}`,
          transform: `translate(${pin.x} ${pin.y})`,
        },
        svg(
          "title",
          {},
          elements.length ? `${pin.name} – hotspots: ${elements.map((e) => `${e} ×${hotspots[pin.id][e]}`).join(", ")}` : pin.name,
        ),
        mark,
        badges,
        pin.kind === "stream" || !labels
          ? null
          : svg(
              "text",
              {
                y: iconUrl ? size * 0.38 : -r * 1.7,
                style: `font-size:${13 * scale}px;stroke-width:${3.5 * scale}px`,
              },
              pin.name,
            ),
      );
      const href = pinHref?.(pin);
      map.append(href ? wrapLink(marker, href) : marker);
    }
    return map;
  }

  function wrapLink(node, href) {
    const link = document.createElementNS(SVG_NS, "a");
    link.setAttribute("href", href);
    link.append(node);
    return link;
  }

  window.Codex.worldmap = { renderMap, PIN_COLORS };
})();
