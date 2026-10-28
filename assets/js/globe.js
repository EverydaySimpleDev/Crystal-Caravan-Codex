/*
  The world as a globe you can spin.

  Uses three.js (loaded from cdnjs on the World page). The planet is a sphere
  wrapped in globe.webp, pins and regions come with a lat/lon in the same
  convention as that image:

      u = (lon + 180) / 360      v = (90 - lat) / 180

  Drag to rotate, scroll or pinch to zoom. Clicking a pin calls onPin(pin);
  clicking anywhere else on the land calls onRegion(id) for the region it falls in.
*/
(() => {
  const { placeIcon, hotspotBadges } = Codex;
  const MIASMA_ICON = "assets/img/world/miasma.png";
  const PIN_COLORS = {
    dungeon: 0xc0473b,
    town: 0x4f9a45,
    port: 0x3a7cc4,
    stream: 0x6b4a9a,
    other: 0x8a6a32,
  };
  const MIN_DISTANCE = 1.45;
  const MAX_DISTANCE = 4.2;
  const START_DISTANCE = 3.4;
  // Below this camera distance every label shows; further out only the hovered one does.
  const LABEL_DISTANCE = 2.5;

  /* Same mapping as three.js's SphereGeometry UVs, so pins land on the texture. */
  function toVector(THREE, lat, lon, radius = 1) {
    const phi = ((lon + 180) / 360) * Math.PI * 2;
    const theta = ((90 - lat) / 180) * Math.PI;
    return new THREE.Vector3(
      -Math.cos(phi) * Math.sin(theta) * radius,
      Math.cos(theta) * radius,
      Math.sin(phi) * Math.sin(theta) * radius,
    );
  }

  function toLatLon(point) {
    const p = point.clone().normalize();
    const theta = Math.acos(Math.max(-1, Math.min(1, p.y)));
    let phi = Math.atan2(p.z, -p.x);
    if (phi < 0) phi += Math.PI * 2;
    return {
      lat: 90 - (theta * 180) / Math.PI,
      lon: (phi * 180) / Math.PI - 180,
    };
  }

  /* Angle between two lat/lon points, in degrees. */
  function angularDistance(a, b) {
    const rad = Math.PI / 180;
    const cos =
      Math.sin(a.lat * rad) * Math.sin(b.lat * rad) +
      Math.cos(a.lat * rad) *
        Math.cos(b.lat * rad) *
        Math.cos((a.lon - b.lon) * rad);
    return Math.acos(Math.max(-1, Math.min(1, cos))) / rad;
  }

  function supported() {
    if (!window.THREE) return false;
    try {
      const canvas = document.createElement("canvas");
      return Boolean(
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl"),
      );
    } catch {
      return false;
    }
  }

  /*
    Builds the globe inside `container` and returns { select(id), destroy() }.
    `globe` is worldmap.globe; callbacks: onPin(pin), onRegion(id). `texture` is
    an optional data: URL to use instead of globe.image (needed when the page is
    opened from disk, where WebGL can't read image files).
  */
  function createGlobe(
    container,
    globe,
    { onPin, onRegion, selected = null, texture: textureUrl = null, hotspots = {} } = {},
  ) {
    const THREE = window.THREE;
    container.classList.add("globe");
    const width = () => container.clientWidth;
    const height = () => container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width(), height());
    container.append(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width() / height(), 0.1, 50);
    camera.position.set(0, 0, START_DISTANCE);

    scene.add(new THREE.HemisphereLight(0xfff4d6, 0x2a2550, 0.95));
    const sun = new THREE.DirectionalLight(0xffffff, 0.55);
    sun.position.set(-2, 2, 3);
    scene.add(sun);

    // Everything that turns with the planet hangs off this group.
    const world = new THREE.Group();
    scene.add(world);

    const texture = new THREE.TextureLoader().load(
      textureUrl ?? globe.image,
      () => render(),
    );
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(1, 96, 64),
      new THREE.MeshPhongMaterial({ map: texture, shininess: 6 }),
    );
    world.add(planet);

    // A soft halo so the planet doesn't look cut out of the page.
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.06, 48, 32),
      new THREE.MeshBasicMaterial({
        color: 0x7fc7ff,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide,
      }),
    );
    scene.add(halo);

    // Pins: a visible dot plus a larger invisible ball that's easier to click.
    const pinMeshes = [];
    const labels = [];
    for (const pin of globe.pins ?? []) {
      const position = toVector(THREE, pin.lat, pin.lon, 1.004);
      // Places with a world-map icon show it as an overlay (see updateLabels);
      // the rest get a coloured dot on the surface.
      // The game's own world-map card when the data has one, else the remaster sprite.
      const iconUrl =
        pin.icon ??
        (pin.kind === "dungeon" || pin.kind === "town"
          ? placeIcon(pin.id ?? pin.name)
          : pin.kind === "stream"
            ? MIASMA_ICON
            : null);
      if (!iconUrl) {
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(
            pin.kind === "stream" ? 0.009 : 0.012,
            12,
            8,
          ),
          new THREE.MeshBasicMaterial({
            color: PIN_COLORS[pin.kind] ?? PIN_COLORS.other,
          }),
        );
        dot.position.copy(position);
        world.add(dot);
      }
      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 8, 6),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      hit.position.copy(position);
      hit.userData.pin = pin;
      world.add(hit);
      pinMeshes.push(hit);

      const label = document.createElement("span");
      label.className = `globe-label kind-${pin.kind}`;
      label.textContent = pin.name;
      container.append(label);
      let icon = null;
      if (iconUrl) {
        // The icon, plus a dot per chalice element for dungeons with hotspots.
        icon = document.createElement("span");
        icon.className = `globe-icon kind-${pin.kind}`;
        const img = document.createElement("img");
        img.src = iconUrl;
        img.alt = "";
        icon.append(img);
        const badges = pin.kind === "dungeon" ? hotspotBadges(hotspots[pin.id]) : null;
        if (badges) icon.append(badges);
        container.append(icon);
      }
      labels.push({ label, icon, position, pin });
    }

    // Ring around the selected region.
    let ring = null;
    function drawRing(id) {
      if (ring) world.remove(ring);
      ring = null;
      const region = globe.regions?.find((r) => r.id === id);
      if (!region) return;
      const centre = toVector(THREE, region.lat, region.lon).normalize();
      const helper =
        Math.abs(centre.y) < 0.9
          ? new THREE.Vector3(0, 1, 0)
          : new THREE.Vector3(1, 0, 0);
      const a = new THREE.Vector3().crossVectors(centre, helper).normalize();
      const b = new THREE.Vector3().crossVectors(centre, a).normalize();
      const angle = (region.radius * Math.PI) / 180;
      const points = [];
      for (let i = 0; i <= 96; i++) {
        const t = (i / 96) * Math.PI * 2;
        points.push(
          centre
            .clone()
            .multiplyScalar(Math.cos(angle))
            .add(a.clone().multiplyScalar(Math.sin(angle) * Math.cos(t)))
            .add(b.clone().multiplyScalar(Math.sin(angle) * Math.sin(t)))
            .multiplyScalar(1.006),
        );
      }
      ring = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: 0xf5d98e }),
      );
      world.add(ring);
    }

    /*
      Turn the globe so a lat/lon faces the camera, keeping the map's north
      roughly up. With `animate` it swings round over a fraction of a second.
    */
    let turning = 0;
    function face(lat, lon, animate = false) {
      const target = toVector(THREE, lat, lon).normalize();
      const look = new THREE.Matrix4().lookAt(
        target,
        new THREE.Vector3(0, 0, 0),
        toVector(THREE, 90, 0),
      );
      const goal = new THREE.Quaternion().setFromRotationMatrix(look).invert();
      cancelAnimationFrame(turning);
      if (
        !animate ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        world.quaternion.copy(goal);
        return;
      }
      const start = world.quaternion.clone();
      const began = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - began) / 600);
        const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
        world.quaternion.copy(start).slerp(goal, eased);
        render();
        if (t < 1) turning = requestAnimationFrame(step);
      };
      turning = requestAnimationFrame(step);
    }
    const startRegion = globe.regions?.find((r) => r.id === selected);
    face(startRegion?.lat ?? 0, startRegion?.lon ?? 0);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hovered = null;

    function setPointer(event) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
    }

    function pinUnderPointer() {
      // Ignore pins on the far side: the planet has to be further away than the pin.
      const pinHit = raycaster.intersectObjects(pinMeshes)[0];
      const planetHit = raycaster.intersectObject(planet)[0];
      if (
        pinHit &&
        (!planetHit || pinHit.distance <= planetHit.distance + 0.03)
      )
        return pinHit.object.userData.pin;
      return null;
    }

    function updateLabels() {
      const showAll = camera.position.z < LABEL_DISTANCE;
      const toCamera = new THREE.Vector3();
      // Icons grow a little as you zoom in, so they stay readable but don't swamp the overview.
      const iconSize = Math.round(
        36 * Math.min(1.9, START_DISTANCE / camera.position.z),
      );
      for (const { label, icon, position, pin } of labels) {
        const worldPos = position.clone().applyQuaternion(world.quaternion);
        toCamera.copy(camera.position).sub(worldPos).normalize();
        const facing = worldPos.clone().normalize().dot(toCamera);
        const screen = worldPos.clone().project(camera);
        const x = ((screen.x + 1) / 2) * width();
        const y = ((1 - screen.y) / 2) * height();
        if (icon) {
          const iconVisible = facing > 0.15;
          icon.style.opacity = iconVisible
            ? String(Math.min(1, (facing - 0.15) * 5))
            : "0";
          const size = pin.kind === "stream" ? Math.round(iconSize * 0.7) : iconSize;
          icon.style.width = `${size}px`;
          icon.style.height = `${size}px`;
          icon.style.transform = `translate(${x}px, ${y}px) translate(-50%, -80%)`;
          icon.classList.toggle("hovered", pin === hovered);
        }
        const visible =
          facing > 0.25 &&
          pin.kind !== "stream" &&
          (showAll || pin === hovered);
        label.style.opacity = visible ? "1" : "0";
        if (!visible) continue;
        const lift = icon ? "translate(-50%, 35%)" : "translate(-50%, -150%)";
        label.style.transform = `translate(${x}px, ${y}px) ${lift}`;
      }
    }

    function render() {
      renderer.render(scene, camera);
      updateLabels();
    }

    // ----- Drag to rotate (with a little coasting), wheel / pinch to zoom -----
    let drag = null;
    let spin = { x: 0, y: 0 };
    let coasting = 0;
    const pointers = new Map();

    function rotateBy(dx, dy) {
      const speed = 0.005 * (camera.position.z / 2.9);
      const qy = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        dx * speed,
      );
      const qx = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        dy * speed,
      );
      world.quaternion.premultiply(qy).premultiply(qx);
    }

    function zoomTo(distance) {
      camera.position.z = Math.max(
        MIN_DISTANCE,
        Math.min(MAX_DISTANCE, distance),
      );
      render();
    }

    function coast() {
      if (drag || (Math.abs(spin.x) < 0.05 && Math.abs(spin.y) < 0.05)) {
        coasting = 0;
        return;
      }
      rotateBy(spin.x, spin.y);
      spin = { x: spin.x * 0.92, y: spin.y * 0.92 };
      render();
      coasting = requestAnimationFrame(coast);
    }

    const canvas = renderer.domElement;
    canvas.style.touchAction = "none";
    canvas.addEventListener("pointerdown", (event) => {
      canvas.setPointerCapture(event.pointerId);
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      cancelAnimationFrame(coasting);
      drag = { x: event.clientX, y: event.clientY, moved: 0, pinch: null };
    });
    canvas.addEventListener("pointermove", (event) => {
      if (pointers.has(event.pointerId))
        pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (drag && pointers.size === 2) {
        const [p1, p2] = [...pointers.values()];
        const gap = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (drag.pinch) zoomTo(camera.position.z * (drag.pinch / gap));
        drag.pinch = gap;
        drag.moved = 99;
        return;
      }
      if (drag) {
        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        drag.moved += Math.abs(dx) + Math.abs(dy);
        drag.x = event.clientX;
        drag.y = event.clientY;
        spin = { x: dx, y: dy };
        rotateBy(dx, dy);
        render();
        return;
      }
      setPointer(event);
      const pin = pinUnderPointer();
      if (pin !== hovered) {
        hovered = pin;
        canvas.style.cursor = pin ? "pointer" : "grab";
        render();
      }
    });
    const endDrag = (event) => {
      pointers.delete(event.pointerId);
      if (!drag) return;
      const wasClick = drag.moved < 6;
      if (pointers.size === 0) {
        const finished = drag;
        drag = null;
        if (wasClick) handleClick(event);
        else if (!finished.pinch) coasting = requestAnimationFrame(coast);
      }
    };
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        zoomTo(camera.position.z * (event.deltaY > 0 ? 1.08 : 1 / 1.08));
      },
      { passive: false },
    );

    function handleClick(event) {
      setPointer(event);
      const pin = pinUnderPointer();
      if (pin) {
        onPin?.(pin);
        return;
      }
      const hit = raycaster.intersectObject(planet)[0];
      if (!hit) return;
      const spot = toLatLon(world.worldToLocal(hit.point.clone()));
      // The region whose centre is closest, as long as the click is inside its radius.
      const region = (globe.regions ?? [])
        .map((r) => ({ r, d: angularDistance(spot, r) }))
        .filter(({ r, d }) => d <= r.radius * 1.15)
        .sort((x, y) => x.d - y.d)[0]?.r;
      if (region) onRegion?.(region.id);
    }

    const resize = new ResizeObserver(() => {
      renderer.setSize(width(), height());
      camera.aspect = width() / height();
      camera.updateProjectionMatrix();
      render();
    });
    resize.observe(container);

    drawRing(selected);
    render();

    return {
      select(id) {
        drawRing(id);
        const region = globe.regions?.find((r) => r.id === id);
        if (region) face(region.lat, region.lon, true);
        render();
      },
      destroy() {
        resize.disconnect();
        renderer.dispose();
        container.replaceChildren();
      },
    };
  }

  window.Codex.globe = { supported, createGlobe };
})();
