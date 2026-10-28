# Crystal Caravan Codex – data files

Every page on the site reads its content from the files in this folder.
To fix a typo or add missing info you only edit these files – no code changes.

Each file is JSON wrapped in one line of JavaScript, e.g. `data/enemies.js`:

    window.CODEX_DATA.enemies = { ...plain JSON... };

The wrapper lets the pages load the data even when you open them straight
from disk (browsers block reading .json files that way). Leave the first and
last lines alone and edit the JSON in between as normal.

Unless an entry says otherwise, the data describes the **original GameCube
release** (NTSC-U). Remastered Edition differences belong in a `notes` field.

## General rules

- **IDs** are lowercase slugs: letters and digits, with anything else turned into a single
  `-`. Example: `"Daemon's Court"` → `"daemons-court"`, `"Mage Masher"` → `"mage-masher"`.
  Whenever one file points at another (an enemy's location, a recipe's
  material), it uses the **name** exactly as spelled in the target file. The site
  slugifies the name to find the target.
- Use `null` for "unknown". Use `[]` for "there are none". Don't make up values.
- `source` fields name where a fact came from (e.g. `"Ultimania"`,
  `"GameFAQs guide"`, `"Nintendo Power guide"`, `"in-game"`, `"decomp"`).
  When sources disagree, prefer the **FFCC World Ultimania** and mention the other
  value in `notes`.
- Cycles are `1`, `2`, `3`. Player counts are `1`–`4`.

## Dungeon IDs (use these exact names)

| id                 | name               |
| ------------------ | ------------------ |
| river-belle-path   | River Belle Path   |
| mushroom-forest    | Mushroom Forest    |
| mine-of-cathuriges | Mine of Cathuriges |
| goblin-wall        | Goblin Wall        |
| moschet-manor      | Moschet Manor      |
| tida               | Tida               |
| veo-lu-sluice      | Veo Lu Sluice      |
| daemons-court      | Daemon's Court     |
| selepation-cave    | Selepation Cave    |
| kilanda            | Kilanda            |
| conall-curach      | Conall Curach      |
| rebena-te-ra       | Rebena Te Ra       |
| lynari-desert      | Lynari Desert      |
| mount-vellenge     | Mount Vellenge     |
| nest-of-memories   | Nest of Memories   |

---

## enemies.js

```json
{
  "scaling": {
    "note": "Base stats are 1 player, cycle 1 (Ultimania).",
    "cycleHp": { "1": 1, "2": 1.5, "3": 2.5 },
    "cycleStats": { "1": 1, "2": 1.25, "3": 1.75 },
    "playersHp": { "1": 1, "2": 1.25, "3": 1.5, "4": 1.75 }
  },
  "resistanceKey": { "0": "...", "1": "...", "2": "...", "3": "..." },
  "enemies": [
    {
      "name": "Abaddon",
      "variant": null,
      "boss": false,
      "type": "Flying",
      "hp": 32,
      "str": 6,
      "def": 5,
      "mag": 6,
      "resist": {
        "fire": 1,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": ["Gravity"],
      "locations": [{ "dungeon": "Tida", "cycles": [2, 3] }],
      "drops": [
        {
          "item": "Jagged Scythe",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": [{ "name": "Bite", "notes": null }],
      "notes": null,
      "source": "Guides and extra resources"
    }
  ]
}
```

`variant` separates enemies that share a name but have different stats
(e.g. `"Mushroom Forest"` for Carrion Worm). `chance` is a whole-number percentage
when a source states one, otherwise `null`. Bosses use `"boss": true` and have a `tips` list of strategy bullets.

## items.js

```json
{
  "equipment": [
    {
      "name": "Bastard Sword",
      "slot": "weapon",
      "subtype": "Sword",
      "tribe": "Clavat",
      "stats": { "str": 18, "def": null, "mag": null },
      "effect": null,
      "recipe": {
        "scroll": "Bastard Sword Scroll",
        "materials": [{ "item": "Iron", "qty": 1 }],
        "gil": 300
      },
      "sellPrice": null,
      "obtain": "Craft",
      "notes": null
    }
  ],
  "scrolls": [
    {
      "name": "Bastard Sword Scroll",
      "makes": "Bastard Sword",
      "tribe": "Clavat",
      "category": "Weapon",
      "materials": [{ "item": "Iron", "qty": 1 }],
      "gil": 300,
      "smith": "Any blacksmith",
      "found": [{ "where": "Goblin Wall", "how": "Chest", "cycles": [1] }],
      "buy": null,
      "sell": null,
      "notes": null
    }
  ],
  "materials": [
    {
      "name": "Iron",
      "rank": "basic",
      "buy": 250,
      "sell": 62,
      "found": [{ "where": "Marr's Pass", "how": "Shop", "cycles": null }],
      "usedIn": ["Bastard Sword"],
      "notes": null
    }
  ],
  "consumables": [
    {
      "name": "Phoenix Down",
      "category": "Misc",
      "effect": "...",
      "found": [],
      "notes": null
    }
  ],
  "shops": [
    {
      "town": "Marr's Pass",
      "vendor": "Merchant",
      "stock": [{ "item": "Iron", "price": 250, "condition": null }]
    }
  ]
}
```

`slot` is one of `weapon`, `armor`, `shield`, `gloves`, `helm`, `belt`,
`accessory`. `tribe` is `Clavat`, `Lilty`, `Yuke`, `Selkie` or `All`.
`category` on consumables is one of `Magicite`, `Seed`, `Food`, `Misc`.

## artifacts.js

```json
{
  "artifacts": [
    {
      "name": "Shuriken",
      "jpName": null,
      "category": "Strength",
      "effect": "Strength +1",
      "stat": { "str": 1, "def": 0, "mag": 0, "hearts": 0, "slots": 0 },
      "spell": null,
      "sources": [
        {
          "type": "Boss",
          "where": "River Belle Path",
          "cycles": [1],
          "detail": "Sets 1, 7",
          "chance": null
        }
      ],
      "notes": null
    }
  ]
}
```

`category` is one of `Strength`, `Defense`, `Magic`, `Heart`, `Command Slot`,
`Magicite`. `spell` is set for ring-type artifacts (e.g. `"Fire"`).
`sources[].type` is `Boss`, `Chest`, `Enemy`, `Cactuar` or `Event`.

## dungeons.js

```json
{
  "bonusConditions": [
    { "name": "Pick up items", "values": { "river-belle-path": 5, "...": 0 } }
  ],
  "rewardSetRules": {
    "note": "Which reward set is unlocked by cycle and points tier",
    "table": {
      "1": { "1": "always", "2": "A", "3": "B", "4": "C" },
      "2": { "3": "always", "4": "A", "5": "B", "6": "C" },
      "3": { "5": "always", "6": "A", "7": "B", "8": "C" }
    }
  },
  "dungeons": [
    {
      "id": "river-belle-path",
      "name": "River Belle Path",
      "order": 1,
      "firstYear": 1,
      "boss": "Giant Crab",
      "element": "Water",
      "region": "...",
      "description": "Short spoiler-light summary.",
      "tips": ["..."],
      "enemies": { "1": ["Goblin"], "2": ["Goblin"], "3": ["Goblin"] },
      "tiers": {
        "A": [95, 102, 116, 127],
        "B": [119, 128, 146, 160],
        "C": [149, 160, 182, 200]
      },
      "rewardSets": [
        ["Buckler", "Dragon's Whisker", "Moogle Pocket", "Shuriken"]
      ],
      "notes": null
    }
  ]
}
```

`rewardSets` always has 8 entries (set 1 … set 8). `tiers` arrays are
`[1P, 2P, 3P, 4P]`.

Chest contents, monster drops and the dungeon maps aren't in this file. They
come from `stagemaps.js`.

## Extra fields worth knowing about

- **enemies.js**: Ultimania bosses also have `resist.physical` and `stunChance`, the % chance a 3-hit combo stuns them.
- **items.js**: the eight generic weapon scrolls (e.g. "Mighty Weapon Scroll") make a different weapon per tribe. Their `makes` is a list instead of a string. Scroll names always end in " Scroll". Some entries also have `gender`, `focusAttack` and `source`.
- **artifacts.js**: `routeYear` is the year the Ultimania's 13-year all-artifacts route picks that artifact up. Boss `sources` have one entry per dungeon per cycle.
- **dungeons.js**: the tier thresholds come from the bonus point table that matches the Ultimania route. Where the Nintendo Power guide gives different numbers, they're in that dungeon's `notes`.

## tribes.js, magic.js, world.js

See each file – they are small and the shape is easy to read. Keep any new
fields consistent with the entries already there.
