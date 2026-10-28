/*
  Town maps.

  Each town area is one SVG: the top-down render with a round pin for every shop, blacksmith, Moogle Nest and so on. Pins can
  be numbered so a list beside the map can refer to them, and one pin can be
  highlighted when its entry in that list is selected.

  Data comes from data/townmaps.js.
*/
(() => {
  const SVG_NS = "http://www.w3.org/2000/svg";

  /* Sprite and colour for each kind of place. */
  const KINDS = {
    shop: { icon: "icon/gil.png", color: "#d9a441", label: "Shop" },
    blacksmith: {
      icon: "icon/tab-weapon.png",
      color: "#8a6a32",
      label: "Blacksmith",
    },
    moogle: { icon: "ui/mog-0.png", color: "#c0473b", label: "Moogle Nest" },
    family: {
      icon: "icon/letter.png",
      color: "#4f9a45",
      label: "Family house",
    },
    crystal: { icon: "icon/crystal-0.png", color: "#3a7cc4", label: "Crystal" },
    ferry: { icon: "icon/ship.svg", color: "#3c91f5", label: "Ferry" },
    exit: { icon: null, color: "#3b2a16", label: "Exit" },
    other: { icon: "icon/pouch.png", color: "#6d5536", label: "Other" },
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

  function kindOf(poi) {
    return KINDS[poi.kind] ?? KINDS.other;
  }

  /*
    Draws one town area. `selected` is the index of the pin to highlight;
    `onSelect(index)` is called when a pin is clicked.
  */
  function renderTownArea(area, { selected = null, onSelect } = {}) {
    const map = svg("svg", {
      viewBox: `0 0 ${area.width} ${area.height}`,
      class: "stage-map town-map",
      role: "img",
      "aria-label": `Map of ${area.name ?? "town"}`,
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

    (area.pois ?? []).forEach((poi, index) => {
      const kind = kindOf(poi);
      const pin = svg(
        "g",
        {
          class: `town-pin${index === selected ? " selected" : ""}`,
          transform: `translate(${poi.x} ${poi.y})`,
          tabindex: "0",
          role: "button",
        },
        svg("title", {}, `${poi.label}${poi.note ? ` (${poi.note})` : ""}`),
        svg("circle", { r: 17, fill: "#fffaf0", stroke: kind.color }),
        kind.icon
          ? svg("image", {
              href: `assets/img/${kind.icon}`,
              x: -12,
              y: -12,
              width: 24,
              height: 24,
            })
          : svg("text", { y: "1" }, "→"),
        svg("text", { class: "town-pin-number", x: 15, y: -13 }, index + 1),
      );
      if (onSelect) {
        pin.addEventListener("click", () => onSelect(index));
        pin.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect(index);
          }
        });
      }
      map.append(pin);
    });
    return map;
  }

  window.Codex.townmap = { renderTownArea, KINDS, kindOf };
})();
