# Crystal Caravan Codex

A fan-made field guide for **Final Fantasy Crystal Chronicles** (GameCube), for first-time players and speedrunners alike.

**Live site: https://everydaysimpledev.github.io/Crystal-Caravan-Codex/**

- **Recipes & Shopping List** – pick the gear you want and get one combined list of scrolls, materials and gil. Lists can be shared with a link.
- **Items** – every weapon, armour piece, accessory, material, scroll and food, with missable warnings and exactly where to get each one.
- **Artifacts** – all 73 artifacts, a boss-reward drop calculator (dungeon, cycle, party size, bonus points) and a "where's my best chance" finder.
- **Bestiary** – monster and boss stats scaled to your cycle and party size, with resistances, drops, portraits and boss strategies.
- **Dungeons** – maps read from the game with real chest and drop odds, party-size spawns, Moogle Nests, hotspots, a bonus point helper and the Unknown element puzzle.
- **Towns, Tribes, Magic, World** – town maps and shops, tribe frame data, spell fusions and a damage calculator, a 3D world globe, miasma streams, Mog Stamps, diary entries and caravan encounters.
- **Caravan Tracker** – each member's artifacts and stats, missing artifacts and myrrh, saved in your browser with export/import.

The site is plain HTML, CSS and JavaScript – no build step. Open `index.html` straight from disk to try it locally.

## Layout

```
*.html                one file per page (they share the header and footer from core.js)
assets/css/codex.css  all styles; colours are CSS variables at the top
assets/js/core.js     shared helpers: navigation, page building, data loading, storage
assets/js/search.js   the site-wide search
assets/js/pages/      one script per page
assets/img/           sprites, portraits, maps and art
data/*.js             all game data – see data/README.md
```

## Fixing or adding data

All game data lives in `data/*.js`, and [`data/README.md`](data/README.md) describes every field – you don't need to touch any JavaScript to correct a number. When sources disagree, the **FFCC World Ultimania** wins and the other value goes in the entry's `notes`.

`data/stagemaps.js`, `townmaps.js`, `worldmap.js` and `globe-texture.js` (and their images) are generated from the game files by separate map-building scripts, so they shouldn't be edited by hand.

## Credits

Data from the FFCC World Ultimania, the Nintendo Power and Piggyback official guides, GameFAQs contributors and the FFCC speedrun community (including Linitaa's Ultimania translations). Maps and odds are read from the game's own files.

Final Fantasy Crystal Chronicles and all related names and images are © Square Enix. This is a non-commercial fan project.
