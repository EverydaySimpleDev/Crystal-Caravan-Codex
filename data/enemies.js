// Bestiary: monster stats, resistances, drops and attacks.
// Edit the values freely (see data/README.md), but keep this first line of code and the final "};".
window.CODEX_DATA.enemies = {
  "scaling": {
    "note": "Base stats are 1 player, cycle 1 (Ultimania).",
    "cycleHp": {
      "1": 1,
      "2": 1.5,
      "3": 2.5
    },
    "cycleStats": {
      "1": 1,
      "2": 1.25,
      "3": 1.75
    },
    "playersHp": {
      "1": 1,
      "2": 1.25,
      "3": 1.5,
      "4": 1.75
    }
  },
  "resistanceKey": {
    "0": "Weak: tier-1 spells (Fire/Blizzard/Thunder) can inflict their status; Gravity removes 1/2 HP; Slow/Stop/Holy take effect.",
    "1": "Requires tier-2+ spells (-ra/-ga, magic strikes) to inflict status; Gravity removes 1/4 HP.",
    "2": "Immune to the status effect but still takes damage; Gravity removes 1/10 HP.",
    "3": "Immune to both damage and status effect."
  },
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
      "weak": [
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "Tida",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Conall Curach",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Jagged Scythe",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": "Flying enemy. Use Gravity to bring down (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Ahriman",
      "variant": null,
      "boss": false,
      "type": "Flying",
      "hp": 10,
      "str": 4,
      "def": 2,
      "mag": 4,
      "resist": {
        "fire": 0,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire",
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "Mushroom Forest",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Flying enemy. Use Gravity to bring down (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Antlion",
      "variant": null,
      "boss": true,
      "type": null,
      "hp": 250,
      "str": null,
      "def": null,
      "mag": null,
      "resist": {
        "physical": 2,
        "fire": 2,
        "blizzard": 2,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 2,
        "holy": 0
      },
      "stunChance": null,
      "immune": [
        "Thunder"
      ],
      "weak": [],
      "locations": [
        {
          "dungeon": "Lynari Desert",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Desert Fang",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        },
        {
          "item": "Hero's Weapon",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        }
      ],
      "attacks": [
        {
          "name": "Mandible Swipe",
          "notes": null
        },
        {
          "name": "Stone Breath",
          "notes": null
        },
        {
          "name": "Laser",
          "notes": null
        },
        {
          "name": "Leg Attack",
          "notes": null
        }
      ],
      "tips": [
        "Open with Gravity for a big hit (it only works once), then switch to Blizzaga, which also freezes nearby Scorpions.",
        "Never stand in front of it; its pincer snap takes several hearts, so stay at its sides or back.",
        "Its sand breath can petrify but only fires in one direction, giving you a window to charge a spell.",
        "Back away when it plunges its pincers into the ground, and sidestep the two blue lasers it fires at low HP.",
        "Thunder, Slow and Stop are useless; aim for at least eight hearts and high Magic, especially on later cycles with more Scorpions."
      ],
      "notes": "Fight also includes: Scorpion. Resources sheet lists Gravity resistance 1 (in-game data: 2).",
      "source": "Guides and extra resources; in-game resistance data; GameFAQs guide"
    },
    {
      "name": "Armstrong",
      "variant": null,
      "boss": true,
      "type": null,
      "hp": 160,
      "str": 5,
      "def": 4,
      "mag": 4,
      "resist": {
        "physical": 2,
        "fire": 1,
        "blizzard": 2,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 2,
        "holy": 0
      },
      "stunChance": 5,
      "immune": [
        "Thunder"
      ],
      "weak": [],
      "locations": [
        {
          "dungeon": "Tida",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Dweomer Spore",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        },
        {
          "item": "Brigandology",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        }
      ],
      "attacks": [
        {
          "name": "Swipe",
          "notes": null
        },
        {
          "name": "Needles",
          "notes": null
        },
        {
          "name": "Slow Cloud",
          "notes": null
        },
        {
          "name": "Poison Cloud",
          "notes": null
        },
        {
          "name": "Cannon Shot",
          "notes": null
        },
        {
          "name": "Cannon Shot (Stop)",
          "notes": "Cycle 2"
        },
        {
          "name": "Cannon Shot (Curse)",
          "notes": "Cycle 3"
        }
      ],
      "tips": [
        "Higher Fire tiers are key: Firaga hits very hard, Fira is decent, and plain Fire barely scratches it; Holy also works well.",
        "Fire spells also wipe out the spell-casting Skeletons that rise up, so clear them whenever they appear.",
        "Stay at mid range: too far invites its cannon shots and too close triggers its swipe.",
        "When it inhales, move to its side or back to avoid the poison gas, and back off from the purple cloud that inflicts Slow.",
        "Keep moving to dodge its needle spray; the cannon adds Stop on cycle 2 and Curse on cycle 3."
      ],
      "notes": "Fight also includes: Skeleton Mage.",
      "source": "Ultimania; Guides and extra resources"
    },
    {
      "name": "Bat",
      "variant": null,
      "boss": false,
      "type": "Flying",
      "hp": 5,
      "str": 4,
      "def": 2,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 2,
        "thunder": 2,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire",
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "Mine of Cathuriges",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Goblin Wall",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Behemoth",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 72,
      "str": 8,
      "def": 5,
      "mag": 6,
      "resist": {
        "fire": 1,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 2,
        "holy": 0
      },
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Conall Curach",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Blazer Beetle",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 32,
      "str": 6,
      "def": 5,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 0,
        "thunder": 0,
        "slow": 0,
        "stop": 0,
        "gravity": 1,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire",
        "Blizzard",
        "Thunder"
      ],
      "locations": [
        {
          "dungeon": "Selepation Cave",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Kilanda",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Hard Shell",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Bomb",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 12,
      "str": 4,
      "def": 2,
      "mag": 4,
      "resist": {
        "fire": 3,
        "blizzard": 0,
        "thunder": 0,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [
        "Fire"
      ],
      "weak": [
        "Blizzard",
        "Thunder"
      ],
      "locations": [
        {
          "dungeon": "Mine of Cathuriges",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Tida",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Daemon's Court",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Explodes when defeated (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Cactuar",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 6,
      "def": 5,
      "mag": 6,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 0
      },
      "immune": [
        "Thunder"
      ],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Lynari Desert",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Needle",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Carrion Worm",
      "variant": "Mushroom Forest",
      "boss": false,
      "type": null,
      "hp": 24,
      "str": 4,
      "def": 2,
      "mag": 4,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 2,
        "holy": 0
      },
      "immune": [
        "Thunder"
      ],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Mushroom Forest",
          "cycles": [
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Carrion Worm",
      "variant": "Tida",
      "boss": false,
      "type": null,
      "hp": 24,
      "str": 5,
      "def": 3,
      "mag": 5,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 2,
        "holy": 0
      },
      "immune": [
        "Thunder"
      ],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Tida",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Worm Antenna",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": "Resources sheet lists Slow 0 / Stop 0; GameFAQs (Nintendo Power) and in-game resistance data give 3.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Cave Worm",
      "variant": null,
      "boss": true,
      "type": null,
      "hp": 200,
      "str": 7,
      "def": 5,
      "mag": 3,
      "resist": {
        "physical": 2,
        "fire": 2,
        "blizzard": 3,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 2,
        "holy": 0
      },
      "stunChance": 2,
      "immune": [
        "Blizzard"
      ],
      "weak": [],
      "locations": [
        {
          "dungeon": "Selepation Cave",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Wind Crystal",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        },
        {
          "item": "Earth Armor",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        }
      ],
      "attacks": [
        {
          "name": "Sandstorm Breath",
          "notes": null
        },
        {
          "name": "Beam",
          "notes": null
        },
        {
          "name": "Inhale",
          "notes": null
        },
        {
          "name": "Body Slam",
          "notes": null
        }
      ],
      "tips": [
        "Kill the Electric Jellyfish first, but use magic on them, because hitting them with your weapon shocks you.",
        "Its attacks have limited reach, so the back of the arena is a safe place to cure.",
        "When its mouth flaps open, move to the side to avoid the sand breath or the Slow bubble.",
        "Its Inhale does no damage, so let it pull you in and attack with weapon combos or focus attacks.",
        "Magic is weak here (it is immune to Blizzard), so rely on physical attacks; at low HP, stay away when it rears up for a five-heart body slam.",
        "From cycle 2 its attack and defense rise sharply, so bring more hearts and a strong weapon."
      ],
      "notes": "Fight also includes: Electric Jellyfish.",
      "source": "Ultimania; Guides and extra resources"
    },
    {
      "name": "Cerberus",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 32,
      "str": 6,
      "def": 5,
      "mag": 6,
      "resist": {
        "fire": 2,
        "blizzard": 0,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 1,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Goblin Wall",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Rebena Te Ra",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Cerberus's Fang",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Chimera",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 48,
      "str": 6,
      "def": 5,
      "mag": 7,
      "resist": {
        "fire": 2,
        "blizzard": 2,
        "thunder": 2,
        "slow": 0,
        "stop": 0,
        "gravity": 2,
        "holy": 0
      },
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Lynari Desert",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Mount Vellenge",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [
        {
          "item": "Chimera's Horn",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Cockatrice",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 18,
      "str": 5,
      "def": 4,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 2,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Mine of Cathuriges",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Selepation Cave",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Cockatrice Scale",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Coeurl",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 20,
      "str": 4,
      "def": 3,
      "mag": 5,
      "resist": {
        "fire": 2,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 3,
        "holy": 0
      },
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Moschet Manor",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Daemon's Court",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Kilanda",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Coeurl's Whisker",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Dark Flan",
      "variant": null,
      "boss": false,
      "type": "Undead",
      "hp": 20,
      "str": 6,
      "def": 4,
      "mag": 3,
      "resist": {
        "fire": 0,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire",
        "Holy"
      ],
      "locations": [
        {
          "dungeon": "Conall Curach",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Invincible until Holy is used (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Dark Hedgehog",
      "variant": null,
      "boss": false,
      "type": "Undead",
      "hp": 15,
      "str": 4,
      "def": 2,
      "mag": 4,
      "resist": {
        "fire": 2,
        "blizzard": 2,
        "thunder": 2,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Holy"
      ],
      "locations": [
        {
          "dungeon": "River Belle Path",
          "cycles": [
            3
          ]
        },
        {
          "dungeon": "Mushroom Forest",
          "cycles": [
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Invincible until Holy is used (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Death Knight",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 48,
      "str": 12,
      "def": 10,
      "mag": 12,
      "resist": {
        "fire": 1,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 2,
        "holy": 0
      },
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Mount Vellenge",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Dragon Zombie",
      "variant": null,
      "boss": true,
      "type": "Undead",
      "hp": 120,
      "str": null,
      "def": null,
      "mag": null,
      "resist": {
        "physical": 2,
        "fire": 1,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 3,
        "holy": 0
      },
      "stunChance": null,
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Conall Curach",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Dragon's Fang",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        },
        {
          "item": "Lunar Weapon",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        }
      ],
      "attacks": [
        {
          "name": "Gust Breath",
          "notes": null
        },
        {
          "name": "Beam of Light",
          "notes": "Petrifies (Stone)"
        },
        {
          "name": "Poison Gas",
          "notes": null
        }
      ],
      "tips": [
        "Bring Holy: it is the only spell that does full damage while the dragon is transparent, and it makes the dragon visible again.",
        "Weapons barely work on it, but tier-3 Fire, Blizzard or Thunder hit hard while it is visible.",
        "When it inhales green gas, run to the far side of the platform to escape the poison breath.",
        "Sidestep its straight-line tornado and petrifying laser, and wiggle the stick to break free if you are turned to stone.",
        "Kill Stone Sahagins as soon as they appear; on later cycles they show up more often.",
        "Equip Cure and a Phoenix Down; in multiplayer, fuse Holyra for faster damage."
      ],
      "notes": "Fight also includes: Sahagin, Stone Sahagin. Resources sheet lists Gravity resistance 2 (in-game data: 3).",
      "source": "Guides and extra resources; in-game resistance data; GameFAQs guide"
    },
    {
      "name": "Electric Jellyfish",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 12,
      "str": 4,
      "def": 2,
      "mag": 4,
      "resist": {
        "fire": 1,
        "blizzard": 0,
        "thunder": 3,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [
        "Thunder"
      ],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Goblin Wall",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Selepation Cave",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Shocks you when hit with main weapon (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Electric Scorpion",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 6,
      "def": 5,
      "mag": 6,
      "resist": {
        "fire": 2,
        "blizzard": 0,
        "thunder": 3,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [
        "Thunder"
      ],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Lynari Desert",
          "cycles": [
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Shocks you when hit with main weapon (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Flan",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 10,
      "str": 4,
      "def": 2,
      "mag": 3,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Goblin Wall",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Flan",
      "variant": "Conall Curach",
      "boss": false,
      "type": null,
      "hp": 20,
      "str": 6,
      "def": 5,
      "mag": 6,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 1,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Conall Curach",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Gargoyle",
      "variant": null,
      "boss": false,
      "type": "Flying/Stone",
      "hp": 5,
      "str": 4,
      "def": 16,
      "mag": 4,
      "resist": {
        "fire": 3,
        "blizzard": 3,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 3
      },
      "immune": [
        "Fire",
        "Blizzard",
        "Thunder"
      ],
      "weak": [
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "Moschet Manor",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Rebena Te Ra",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Flying enemy. Use gravity to bring down (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Ghost",
      "variant": null,
      "boss": false,
      "type": "Ghost",
      "hp": 20,
      "str": 5,
      "def": 4,
      "mag": 6,
      "resist": {
        "fire": 1,
        "blizzard": 3,
        "thunder": 0,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [
        "Blizzard"
      ],
      "weak": [
        "Thunder",
        "Holy"
      ],
      "locations": [
        {
          "dungeon": "Goblin Wall",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Conall Curach",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Rebena Te Ra",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "White Silk",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Giant Crab",
      "variant": null,
      "boss": true,
      "type": null,
      "hp": 160,
      "str": 4,
      "def": 3,
      "mag": 2,
      "resist": {
        "physical": 2,
        "fire": 1,
        "blizzard": 2,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 2,
        "holy": 0
      },
      "stunChance": 5,
      "immune": [
        "Thunder"
      ],
      "weak": [],
      "locations": [
        {
          "dungeon": "River Belle Path",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Ancient Sword",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        }
      ],
      "attacks": [
        {
          "name": "Crush",
          "notes": "Physical, power 2, shock Lv1"
        },
        {
          "name": "Left Hook",
          "notes": "Physical, power 2, knockback Lv1"
        },
        {
          "name": "Thunder Shot",
          "notes": "Magic, power 5, paralysis Lv2"
        },
        {
          "name": "Slow Bubble",
          "notes": "Inflicts Slow Lv1"
        },
        {
          "name": "Thundara",
          "notes": "Magic, power 1x3, paralysis Lv2. Used after its claws break (GameFAQs)."
        },
        {
          "name": "Thundaga",
          "notes": "Magic, power 8, paralysis Lv2. Cycle 3 (replaces Thunder/Thundara)."
        }
      ],
      "tips": [
        "When it backs off to charge Thunder, sidestep or retreat, then use the opening to hit it from the side or behind.",
        "Fire and Holy work best (Fira or Blizzara fusions are ideal); Thunder, Slow and Stop are useless against it.",
        "Its slow-moving bubbles inflict Slow, so steer around them, and keep moving to avoid its leaping body crash.",
        "Deal with any Mu that pops up while the crab is busy charging, not while it can punish you.",
        "Once its claws break it upgrades to Thundara; on cycle 3 it casts near arena-wide Thundaga, so run far away and bring thunder resistance."
      ],
      "notes": "Fight also includes: Mu.",
      "source": "Ultimania; Guides and extra resources; GameFAQs guide"
    },
    {
      "name": "Gigan Toad",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 24,
      "str": 5,
      "def": 3,
      "mag": 5,
      "resist": {
        "fire": 0,
        "blizzard": 3,
        "thunder": 1,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 0
      },
      "immune": [
        "Blizzard"
      ],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Veo Lu Sluice",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Toad Oil",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Gigan Toad",
      "variant": "Conall Curach",
      "boss": false,
      "type": null,
      "hp": 32,
      "str": 6,
      "def": 6,
      "mag": 6,
      "resist": {
        "fire": 0,
        "blizzard": 3,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [
        "Blizzard"
      ],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Conall Curach",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Toad Oil",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": "In-game resistance data dump shows Slow 3 / Stop 3; resources sheet and GameFAQs give 0.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Gigas",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 60,
      "str": 5,
      "def": 4,
      "mag": 5,
      "resist": {
        "fire": 0,
        "blizzard": 3,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 2,
        "holy": 0
      },
      "immune": [
        "Blizzard"
      ],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Selepation Cave",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Gigas Claw",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Gigas Lord",
      "variant": null,
      "boss": true,
      "type": null,
      "hp": 120,
      "str": 5,
      "def": 4,
      "mag": 3,
      "resist": {
        "physical": 2,
        "fire": 1,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 2,
        "holy": 0
      },
      "stunChance": 5,
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Moschet Manor",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Lord's Robe",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        },
        {
          "item": "Legendary Shield",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        }
      ],
      "attacks": [
        {
          "name": "Punch",
          "notes": null
        },
        {
          "name": "Pounce",
          "notes": "Runs up and jumps onto players (GameFAQs)"
        },
        {
          "name": "Frost Breath",
          "notes": null
        },
        {
          "name": "Flex Heal",
          "notes": "Heals itself and Maggie to full while Maggie is on the field (GameFAQs)"
        }
      ],
      "tips": [
        "Hit the Gigas Lord once to make Maggie appear, then take her out quickly: he can heal both of them to full while she is on the field.",
        "Fire and Holy work best, and Fira or Firaga can hit him and Maggie together; Thunder, Slow and Stop are wasted.",
        "When he inhales for his breath attack, move to his side or back, and keep moving to dodge his running pounce.",
        "Keep Cure ready, as a single breath or swipe can take several hearts.",
        "One reader found relentless melee works too, since constant hits keep him too busy to heal; retreat a short way to cure.",
        "From cycle 2 Maggie casts Stop, which can leave you helpless in front of him, so remove her as early as possible."
      ],
      "notes": "Jack Moschet transformed; fought together with Maggie. Resources sheet lists Thunder resistance 3 and Thunder immunity (Ultimania and in-game data: 2).",
      "source": "Ultimania; Guides and extra resources; GameFAQs guide"
    },
    {
      "name": "Goblin",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 12,
      "str": 4,
      "def": 2,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 0,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire",
        "Thunder"
      ],
      "locations": [
        {
          "dungeon": "River Belle Path",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Goblin Wall",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Goblin",
      "variant": "Mace",
      "boss": false,
      "type": null,
      "hp": 18,
      "str": 4,
      "def": 2,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 0,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire",
        "Thunder"
      ],
      "locations": [
        {
          "dungeon": "River Belle Path",
          "cycles": [
            3
          ]
        },
        {
          "dungeon": "Goblin Wall",
          "cycles": [
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Goblin",
      "variant": "Spear",
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 4,
      "def": 2,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 0,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire",
        "Thunder"
      ],
      "locations": [
        {
          "dungeon": "River Belle Path",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Goblin Wall",
          "cycles": [
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Goblin Chieftain",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 24,
      "str": 4,
      "def": 3,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 1,
        "slow": 1,
        "stop": 1,
        "gravity": 1,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "River Belle Path",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Goblin Wall",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Goblin King",
      "variant": null,
      "boss": true,
      "type": null,
      "hp": 80,
      "str": 4,
      "def": 3,
      "mag": 5,
      "resist": {
        "physical": 2,
        "fire": 2,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 3,
        "holy": 0
      },
      "stunChance": 5,
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Goblin Wall",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Cursed Crook",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        }
      ],
      "attacks": [
        {
          "name": "Rod",
          "notes": "Physical, power 1, knockback Lv1"
        },
        {
          "name": "Fira",
          "notes": "Magic, power 1x3, burn Lv2. Cycle 2+ per Guides and extra resources."
        },
        {
          "name": "Thundara",
          "notes": "Magic, power 1x3, paralysis Lv2"
        },
        {
          "name": "Biora",
          "notes": "Magic, power 1, poison Lv2"
        },
        {
          "name": "Slowga",
          "notes": "Inflicts Slow Lv2. Cycle 2+ per Guides and extra resources."
        },
        {
          "name": "Teleport",
          "notes": "Per Guides and extra resources"
        }
      ],
      "tips": [
        "Defeat the four Goblins first and use their two keys to open the door into the real fight.",
        "He has very little HP, so charged focus attacks and Holy (or tier-2/3 fusions) finish him quickly; Slow and Stop do nothing.",
        "When he charges Thunder, close in with a focus attack; when he charges the green poison cloud, get behind him.",
        "After he teleports, move to where his HP bar is heading and have a focus attack ready, since he sometimes teleports twice.",
        "From cycle 2 he casts the wider Fira and Thundara, so bring fire and thunder resistance."
      ],
      "notes": "Fight also includes: Goblin, Goblin (Spear). Resources sheet and in-game resistance data give Gravity resistance 2 (Ultimania: 3).",
      "source": "Ultimania; Guides and extra resources"
    },
    {
      "name": "Goblin Mage",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 12,
      "str": 2,
      "def": 2,
      "mag": 4,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 0,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire",
        "Thunder"
      ],
      "locations": [
        {
          "dungeon": "River Belle Path",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Goblin Wall",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Golem",
      "variant": null,
      "boss": true,
      "type": null,
      "hp": 160,
      "str": 4,
      "def": 4,
      "mag": 3,
      "resist": {
        "physical": 2,
        "fire": 2,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 2,
        "holy": 0
      },
      "stunChance": 2,
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Veo Lu Sluice",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Green Sphere",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        }
      ],
      "attacks": [
        {
          "name": "Rocket Punch",
          "notes": null
        },
        {
          "name": "Blue Laser - Cross",
          "notes": "Freezes"
        },
        {
          "name": "Red Laser - Ring",
          "notes": "Burns"
        },
        {
          "name": "Spin Attack",
          "notes": "Cycle 3"
        }
      ],
      "tips": [
        "Kill the Flans whenever they show up, since their attacks slow you and they keep coming.",
        "When it fires its fists, stand between them or sidestep, because they travel in straight lines but hit hard.",
        "The blue lasers freeze you; once it is below half HP and starts spinning a red laser, run away before the ring of fire bursts.",
        "Avoid its blue gas, which inflicts Slow, and bring Clear in case it catches you.",
        "Fire, Blizzard, Thunder and Gravity all do moderate damage; Blizzaga fused from the dungeon's Ice Magicite is a solid choice, or attack physically from behind.",
        "On cycle 3, retreat when it points its fists to the sides, as a damaging spin attack follows."
      ],
      "notes": "Fight also includes: Water Flan.",
      "source": "Ultimania; Guides and extra resources"
    },
    {
      "name": "Gremlin",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 12,
      "str": 4,
      "def": 2,
      "mag": 2,
      "resist": {
        "fire": 2,
        "blizzard": 0,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Mushroom Forest",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Tida",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Moschet Manor",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Griffin",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 32,
      "str": 5,
      "def": 4,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 2,
        "slow": 1,
        "stop": 3,
        "gravity": 2,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "River Belle Path",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Veo Lu Sluice",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Griffin's Wing",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Hedgehog Pie",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 12,
      "str": 4,
      "def": 2,
      "mag": 4,
      "resist": {
        "fire": 2,
        "blizzard": 0,
        "thunder": 0,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Blizzard",
        "Thunder"
      ],
      "locations": [
        {
          "dungeon": "River Belle Path",
          "cycles": [
            1,
            2
          ]
        },
        {
          "dungeon": "Mushroom Forest",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Hell Plant",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 12,
      "str": 4,
      "def": 2,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Mushroom Forest",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Tida",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Ice Ahriman",
      "variant": null,
      "boss": false,
      "type": "Flying",
      "hp": 20,
      "str": 6,
      "def": 2,
      "mag": 5,
      "resist": {
        "fire": 0,
        "blizzard": 3,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 0
      },
      "immune": [
        "Blizzard"
      ],
      "weak": [
        "Fire",
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "Mushroom Forest",
          "cycles": [
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Flying enemy. Use Gravity to bring down (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Ice Bomb",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 5,
      "def": 3,
      "mag": 5,
      "resist": {
        "fire": 0,
        "blizzard": 3,
        "thunder": 0,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [
        "Blizzard"
      ],
      "weak": [
        "Fire",
        "Thunder"
      ],
      "locations": [
        {
          "dungeon": "Mine of Cathuriges",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Veo Lu Sluice",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Conall Curach",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Explodes when defeated (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Iron Giant",
      "variant": null,
      "boss": true,
      "type": null,
      "hp": 200,
      "str": null,
      "def": null,
      "mag": null,
      "resist": {
        "physical": 2,
        "fire": 2,
        "blizzard": 2,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 3,
        "holy": 0
      },
      "stunChance": null,
      "immune": [
        "Thunder"
      ],
      "weak": [],
      "locations": [
        {
          "dungeon": "Kilanda",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Red Eye",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        },
        {
          "item": "Celestial Weapon",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        }
      ],
      "attacks": [
        {
          "name": "Sword Projectile",
          "notes": null
        },
        {
          "name": "Sword Slam",
          "notes": null
        },
        {
          "name": "Sword Swipe",
          "notes": null
        },
        {
          "name": "Ground Shockwave",
          "notes": null
        },
        {
          "name": "Charge",
          "notes": null
        },
        {
          "name": "Gravity spell",
          "notes": "Cycle 2+"
        }
      ],
      "tips": [
        "Defeating the sword-carrying Goblins in the dungeon leaves it with fewer swords in the fight.",
        "Plain 1-2-3 weapon combos are the fastest way to wear it down; Thunder, Gravity, Slow and Stop do nothing.",
        "Back off when it raises its fist for an electric ground slam or raises its sword for a shockwave.",
        "Sidestep the large spinning purple disc from its sword swipe, as it hits very hard.",
        "From cycle 2, when it has no sword it casts a huge Gravity spell, so run as far away as you can."
      ],
      "notes": "Fight also includes: Goblin Mage. Resources sheet lists Gravity resistance 2 (in-game data: 3).",
      "source": "Guides and extra resources; in-game resistance data; GameFAQs guide"
    },
    {
      "name": "Killer Bee",
      "variant": null,
      "boss": false,
      "type": "Flying",
      "hp": 6,
      "str": 5,
      "def": 2,
      "mag": 5,
      "resist": {
        "fire": 0,
        "blizzard": 2,
        "thunder": 2,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire",
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "Daemon's Court",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Selepation Cave",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Flying enemy. Use Gravity to bring down (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Lamia",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 6,
      "def": 6,
      "mag": 6,
      "resist": {
        "fire": 2,
        "blizzard": 0,
        "thunder": 1,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Kilanda",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Lynari Desert",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Lava Ahriman",
      "variant": null,
      "boss": false,
      "type": "Flying",
      "hp": 20,
      "str": 6,
      "def": 2,
      "mag": 5,
      "resist": {
        "fire": 3,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 0
      },
      "immune": [
        "Fire"
      ],
      "weak": [
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "Kilanda",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Flying enemy. Use Gravity to bring down (GameFAQs guide). GameFAQs guide lists HP 24, Strength 5, Defense 3.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Lava Mu",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 18,
      "str": 6,
      "def": 4,
      "mag": 2,
      "resist": {
        "fire": 3,
        "blizzard": 0,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [
        "Fire"
      ],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Kilanda",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Lich",
      "variant": null,
      "boss": true,
      "type": "Ghost",
      "hp": 200,
      "str": null,
      "def": null,
      "mag": null,
      "resist": {
        "physical": 2,
        "fire": 3,
        "blizzard": 3,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 0
      },
      "stunChance": null,
      "immune": [
        "Fire",
        "Blizzard",
        "Thunder"
      ],
      "weak": [
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "Rebena Te Ra",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Ethereal Orb",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        },
        {
          "item": "Dark Weapon",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        },
        {
          "item": "Forbidden Tome",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        }
      ],
      "attacks": [
        {
          "name": "Meteor",
          "notes": null
        },
        {
          "name": "Black Sphere Explosion",
          "notes": null
        },
        {
          "name": "Thunder spell",
          "notes": null
        },
        {
          "name": "Shockwave",
          "notes": "Stuns. Cycle 2+"
        }
      ],
      "tips": [
        "It starts shielded, so hit both switches with Fire, Blizzard or Thunder to drop the barrier.",
        "Open with Gravity for a huge chunk of its HP; it only works once, after which it resists Gravity too.",
        "After that, use Holy: it is immune to Fire, Blizzard and Thunder, and Holy also makes it solid for weapon hits.",
        "If the barrier comes back up, hit the switches again and clear the Skeletons before resuming.",
        "Run far away when a blue halo appears, as the lightning storm that follows covers a huge area.",
        "From cycle 2 it fires yellow shockwaves that knock you down, so dodge them to avoid being set up for follow-up attacks."
      ],
      "notes": "Fight also includes: Skeleton.",
      "source": "Guides and extra resources; in-game resistance data; GameFAQs guide"
    },
    {
      "name": "Lizard Captain",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 5,
      "def": 4,
      "mag": 5,
      "resist": {
        "fire": 2,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 1,
        "holy": 0
      },
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Selepation Cave",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "GameFAQs guide lists Magic 3.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Lizard Mage",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 2,
      "def": 3,
      "mag": 5,
      "resist": {
        "fire": 2,
        "blizzard": 0,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Veo Lu Sluice",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Selepation Cave",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Lizard Skirmisher",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 18,
      "str": 5,
      "def": 4,
      "mag": 2,
      "resist": {
        "fire": 2,
        "blizzard": 0,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Daemon's Court",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Lizard Skirmisher",
      "variant": "Gold",
      "boss": false,
      "type": null,
      "hp": 18,
      "str": 5,
      "def": 4,
      "mag": 2,
      "resist": {
        "fire": 2,
        "blizzard": 0,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Daemon's Court",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Lizard Soldier",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 18,
      "str": 5,
      "def": 4,
      "mag": 2,
      "resist": {
        "fire": 2,
        "blizzard": 0,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Daemon's Court",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Lizard Warrior",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 30,
      "str": 5,
      "def": 4,
      "mag": 2,
      "resist": {
        "fire": 2,
        "blizzard": 0,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Daemon's Court",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Lizard Wizard",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 18,
      "str": 2,
      "def": 4,
      "mag": 5,
      "resist": {
        "fire": 2,
        "blizzard": 0,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Daemon's Court",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Lizardman",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 5,
      "def": 3,
      "mag": 2,
      "resist": {
        "fire": 2,
        "blizzard": 0,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Veo Lu Sluice",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Selepation Cave",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Lizardman",
      "variant": "Mace",
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 5,
      "def": 3,
      "mag": 2,
      "resist": {
        "fire": 2,
        "blizzard": 0,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Selepation Cave",
          "cycles": [
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "GameFAQs guide lists HP 18.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Lizardman",
      "variant": "Spear",
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 5,
      "def": 3,
      "mag": 2,
      "resist": {
        "fire": 2,
        "blizzard": 0,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Veo Lu Sluice",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Selepation Cave",
          "cycles": [
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "GameFAQs guide lists HP 18.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Lizardman King",
      "variant": null,
      "boss": true,
      "type": null,
      "hp": 160,
      "str": null,
      "def": null,
      "mag": null,
      "resist": {
        "physical": 2,
        "fire": 3,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 2,
        "holy": 0
      },
      "stunChance": null,
      "immune": [
        "Fire"
      ],
      "weak": [],
      "locations": [
        {
          "dungeon": "Daemon's Court",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "King's Scale",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        }
      ],
      "attacks": [
        {
          "name": "Spear Lunge",
          "notes": null
        },
        {
          "name": "Arrow Spray",
          "notes": null
        },
        {
          "name": "Swipe",
          "notes": null
        },
        {
          "name": "Defend",
          "notes": null
        },
        {
          "name": "Fire spell",
          "notes": "Cycle 2+"
        },
        {
          "name": "Ice spell",
          "notes": "Cycle 3"
        }
      ],
      "tips": [
        "Kill the Coeurls and Lizard Skirmisher first, as they will hound you for the whole fight.",
        "It is immune to Fire, and Slow and Stop do nothing, so bring Blizzard, Thunder or Holy instead.",
        "Keep your distance from its spear lunge, and stay out of its front to dodge the arrow spray.",
        "Stand on the red corner switches to send saw blades through the sand; they hurt the king, but they can hurt you too.",
        "From cycle 2 it adds a fire spell, then an ice spell on cycle 3; both are easy to dodge if you keep moving."
      ],
      "notes": "Fight also includes: Lizard Skirmisher, Coeurl.",
      "source": "Guides and extra resources; in-game resistance data; GameFAQs guide"
    },
    {
      "name": "Maggie",
      "variant": null,
      "boss": true,
      "type": null,
      "hp": 50,
      "str": 4,
      "def": 3,
      "mag": 4,
      "resist": {
        "physical": 0,
        "fire": 2,
        "blizzard": 1,
        "thunder": 1,
        "slow": 3,
        "stop": 3,
        "gravity": 2,
        "holy": 0
      },
      "stunChance": 15,
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Moschet Manor",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": [
        {
          "name": "Double Slash",
          "notes": "Physical, power 1x2"
        },
        {
          "name": "Slowga",
          "notes": null
        },
        {
          "name": "Stop",
          "notes": "Cycle 2+ (Guides and extra resources, GameFAQs)"
        }
      ],
      "tips": [
        "She appears once you first hit the Gigas Lord, and removing her stops him from healing them both to full.",
        "She has no visible HP bar; keep hitting her until she retreats to the southwest door and leaves the fight.",
        "Dodge her Slowga, as being slowed lets the Gigas Lord catch you.",
        "From cycle 2 she also casts Stop, which makes defeating her quickly even more important."
      ],
      "notes": "Ultimania No.106 ミセスモキート (Mrs. Moschet / Maggie Moschet). Fights alongside the Gigas Lord; leaves the battle when her HP is depleted. Resources sheet and in-game data give Gravity resistance 1 (Ultimania: 2); resources sheet also lists Thunder immunity.",
      "source": "Ultimania; Guides and extra resources; GameFAQs guide"
    },
    {
      "name": "Magic Plant",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 18,
      "str": 5,
      "def": 4,
      "mag": 6,
      "resist": {
        "fire": 2,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 2,
        "holy": 0
      },
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Tida",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Conall Curach",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Malboro",
      "variant": null,
      "boss": true,
      "type": null,
      "hp": 160,
      "str": 3,
      "def": 3,
      "mag": 4,
      "resist": {
        "physical": 2,
        "fire": 2,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 2,
        "holy": 0
      },
      "stunChance": 2,
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Mushroom Forest",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Malboro Seed",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        }
      ],
      "attacks": [
        {
          "name": "Root Whip",
          "notes": "Physical, power 1x3"
        },
        {
          "name": "Inhale",
          "notes": "Pulls characters and the chalice"
        },
        {
          "name": "Bad Breath",
          "notes": "Magic, power 1, poison Lv1"
        },
        {
          "name": "Cursera",
          "notes": "Inflicts Curse Lv2"
        },
        {
          "name": "Slowga",
          "notes": "Inflicts Slow Lv2"
        },
        {
          "name": "Blizzaga",
          "notes": "Magic, power 8, freeze Lv2. Cycle 2+ per Guides and extra resources."
        }
      ],
      "tips": [
        "Kill the Hell Plants first so they can't harass you during the fight.",
        "Keep moving to dodge the vines that erupt from the ground, and step out of the targeted area when it charges its dark cloud.",
        "Its Inhale is harmless while you carry the chalice, but a chalice left on the ground gets dragged away and leaves you in the miasma.",
        "Fire and Holy hurt it most; fusing Fire with the Novice's Sword gives a strong Flametongue focus attack.",
        "The back of the arena is the safest spot to cure, and bring Clear for its Slowga and Curse.",
        "From cycle 2 it adds Blizzaga, which freezes on contact, so pack Clear and ice resistance."
      ],
      "notes": "Fight also includes: Hell Plant, Stone Plant. Resources sheet and in-game resistance data give Fire resistance 1 (Ultimania: 2).",
      "source": "Ultimania; Guides and extra resources"
    },
    {
      "name": "Memiroa",
      "variant": null,
      "boss": true,
      "type": null,
      "hp": null,
      "str": null,
      "def": null,
      "mag": null,
      "resist": {
        "physical": 2,
        "fire": 2,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 3,
        "holy": 3
      },
      "stunChance": null,
      "immune": [
        "Gravity",
        "Holy"
      ],
      "weak": [],
      "locations": [
        {
          "dungeon": "Nest of Memories",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": [
        {
          "name": "Claw Slam/Vacuum",
          "notes": null
        },
        {
          "name": "Red Laser",
          "notes": "Burns"
        },
        {
          "name": "Blue Laser",
          "notes": "Freezes"
        },
        {
          "name": "Black/White Lasers",
          "notes": null
        }
      ],
      "tips": [
        "Bring Phoenix Downs and lots of memories; casting Cure on the memory bubbles that appear turns them into Ultracite.",
        "Ultracite instantly casts a powerful spell, including an Invincibility shield that lets you attack freely for about a minute.",
        "While the lower body is out, a white circle marks an incoming laser blast: get out of it, and avoid the shattering ice it leaves.",
        "Against the upper body, keep moving to dodge the black laser, twin pink lasers and white blast, each worth several hearts.",
        "Without Invincibility, slip in for two or three hits between its wings after it attacks, then retreat and cure early.",
        "It is immune to Gravity and Holy."
      ],
      "notes": "Final boss (Raem's final form; the GameFAQs guide calls this fight \"Raem\"). HP unknown.",
      "source": "Guides and extra resources; in-game resistance data; GameFAQs guide"
    },
    {
      "name": "Meteor Parasite",
      "variant": null,
      "boss": true,
      "type": null,
      "hp": 450,
      "str": null,
      "def": null,
      "mag": null,
      "resist": {
        "physical": 2,
        "fire": 2,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 3,
        "holy": 3
      },
      "stunChance": null,
      "immune": [
        "Gravity",
        "Holy"
      ],
      "weak": [],
      "locations": [
        {
          "dungeon": "Mount Vellenge",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": [
        {
          "name": "Parasite Swipe",
          "notes": "Form 1"
        },
        {
          "name": "Poison Gas",
          "notes": "Form 1"
        },
        {
          "name": "Ground Explosion",
          "notes": "Forms 2 and 3; a pink circle appears under a player, then explodes (GameFAQs)"
        },
        {
          "name": "Laser Beam",
          "notes": "Form 2; fired from the meteor while the Parasite hides"
        },
        {
          "name": "Bullet Hail",
          "notes": "Form 3"
        }
      ],
      "tips": [
        "Only the small swinging tentacle takes damage; it is immune to Gravity and Holy, and it shifts to a new form after every 150 damage.",
        "Bring tier-2 or tier-3 spells, Cure, Clear and several Phoenix Downs, and favour solid Strength and Defense.",
        "The side tentacles are dangerous: freeze and kill one with Blizzara, but don't bother killing both since they respawn.",
        "In forms 2 and 3, run as soon as a pink circle appears beneath you, then go back in for a short combo once it explodes.",
        "When it retreats into the meteor to fire lasers, hug the meteor, hide behind a floor bump, or stand far back.",
        "Against form 3's bullet hail, keep moving or shelter in a corner where a tentacle respawns."
      ],
      "notes": "Three forms; changes form after every 150 damage (GameFAQs). Only the small tentacle is vulnerable. Fight also includes: Tentacle (Dark), Tentacle (Fire), Tentacle (Ice), Tentacle (Lightning). Mount Vellenge has no cycles; the resources sheet's cycle columns describe the forms.",
      "source": "Guides and extra resources; in-game resistance data; GameFAQs guide"
    },
    {
      "name": "Mimic",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 20,
      "str": 6,
      "def": 5,
      "mag": 6,
      "resist": {
        "fire": 3,
        "blizzard": 3,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 3,
        "holy": 3
      },
      "immune": [
        "Magic"
      ],
      "weak": [],
      "locations": [
        {
          "dungeon": "Rebena Te Ra",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Not listed in the per-cycle dungeon enemy list in Guides and extra resources.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Minion",
      "variant": "Blue",
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 11,
      "def": 9,
      "mag": 2,
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
      "weak": [],
      "locations": [
        {
          "dungeon": "Nest of Memories",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Appears during the Raem fight.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Minion",
      "variant": "Blue Magic",
      "boss": false,
      "type": null,
      "hp": 24,
      "str": 2,
      "def": 9,
      "mag": 11,
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
      "weak": [],
      "locations": [
        {
          "dungeon": "Nest of Memories",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Minion",
      "variant": "Red",
      "boss": false,
      "type": null,
      "hp": 24,
      "str": 12,
      "def": 9,
      "mag": 2,
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
      "weak": [],
      "locations": [
        {
          "dungeon": "Nest of Memories",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "GameFAQs guide lists Magic 12. Appears during the Raem fight. GameFAQs guide: defeat the Red Minion first; if both Minions are defeated two more appear.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Monstrous Minion",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 120,
      "str": 12,
      "def": 9,
      "mag": 12,
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
      "weak": [
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "Nest of Memories",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "GameFAQs guide lists Magic 2.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Mu",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 10,
      "str": 4,
      "def": 2,
      "mag": 4,
      "resist": {
        "fire": 0,
        "blizzard": 0,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire",
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "River Belle Path",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Nightmare",
      "variant": null,
      "boss": false,
      "type": "Ghost",
      "hp": 30,
      "str": 6,
      "def": 4,
      "mag": 6,
      "resist": {
        "fire": 1,
        "blizzard": 1,
        "thunder": 1,
        "slow": 3,
        "stop": 3,
        "gravity": 1,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Holy"
      ],
      "locations": [
        {
          "dungeon": "Rebena Te Ra",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Fiend's Claw",
          "chance": null,
          "cycles": null,
          "notes": null
        },
        {
          "item": "Devil's Claw",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": "Ghost. Use Holy to make vulnerable (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Ochu",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 40,
      "str": 5,
      "def": 3,
      "mag": 5,
      "resist": {
        "fire": 0,
        "blizzard": 2,
        "thunder": 2,
        "slow": 0,
        "stop": 0,
        "gravity": 2,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Mushroom Forest",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Moschet Manor",
          "cycles": [
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "GameFAQs guide lists Strength 11, Defense 9, Magic 2.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Ogre",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 48,
      "str": 5,
      "def": 2,
      "mag": 2,
      "resist": {
        "fire": 1,
        "blizzard": 1,
        "thunder": 0,
        "slow": 1,
        "stop": 3,
        "gravity": 2,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Thunder"
      ],
      "locations": [
        {
          "dungeon": "Mine of Cathuriges",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Ogre Fang",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": "Resources sheet lists Slow 0; GameFAQs (Nintendo Power) and in-game resistance data give 1.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Ogre",
      "variant": "Kilanda",
      "boss": false,
      "type": null,
      "hp": 48,
      "str": 6,
      "def": 5,
      "mag": 2,
      "resist": {
        "fire": 1,
        "blizzard": 1,
        "thunder": 0,
        "slow": 1,
        "stop": 3,
        "gravity": 2,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Thunder"
      ],
      "locations": [
        {
          "dungeon": "Kilanda",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Ogre Fang",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": "Resources sheet lists Slow 0; GameFAQs (Nintendo Power) and in-game resistance data give 1.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Orc",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 16,
      "str": 4,
      "def": 2,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Mine of Cathuriges",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Orc",
      "variant": "Mace",
      "boss": false,
      "type": null,
      "hp": 16,
      "str": 4,
      "def": 2,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Mine of Cathuriges",
          "cycles": [
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Orc",
      "variant": "Spear",
      "boss": false,
      "type": null,
      "hp": 20,
      "str": 4,
      "def": 2,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Mine of Cathuriges",
          "cycles": [
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Orc King",
      "variant": null,
      "boss": true,
      "type": null,
      "hp": 160,
      "str": 5,
      "def": 4,
      "mag": 3,
      "resist": {
        "physical": 2,
        "fire": 1,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 2,
        "holy": 0
      },
      "stunChance": 5,
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Mine of Cathuriges",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Orc Belt",
          "chance": null,
          "cycles": null,
          "notes": "Boss reward item (material/scroll listed for this boss's reward sets)."
        }
      ],
      "attacks": [
        {
          "name": "Hammer",
          "notes": "Physical, power 2"
        },
        {
          "name": "Rod",
          "notes": "Physical, power 1, knockback Lv1"
        },
        {
          "name": "Explosion",
          "notes": "Physical, power 3, knockback Lv2"
        },
        {
          "name": "Spin",
          "notes": "Physical, power 1, knockback Lv1"
        },
        {
          "name": "Self-Destruct",
          "notes": "Physical, power 6, knockback Lv1"
        }
      ],
      "tips": [
        "Punish him while he casts his fire spell, either by rushing in with combos or by casting Blizzara from range.",
        "Standing too close draws his hammer smash and spin; the spin leaves him dizzy, which is a great time to strike.",
        "Defeat the Orcs that come out of the mine doors quickly so they don't distract you.",
        "When he glows yellow below about 25% HP he is about to self-destruct: finish him with fast combos, or cure up and flee to a far corner.",
        "On cycles 2 and 3 he and his Orcs are Hasted, so stay at range with strong magic such as Holy and just survive the explosion."
      ],
      "notes": "Fight also includes: Orc, Orc (Mace), Orc (Spear). Guides and extra resources also lists a Fire spell.",
      "source": "Ultimania; Guides and extra resources"
    },
    {
      "name": "Orc Mage",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 16,
      "str": 2,
      "def": 2,
      "mag": 4,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Mine of Cathuriges",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Practice Goblin",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 12,
      "str": 4,
      "def": 2,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 0,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire",
        "Thunder"
      ],
      "locations": [],
      "drops": [],
      "attacks": null,
      "notes": "Tutorial enemy fought at Port Tipa; not found in any dungeon.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Raem",
      "variant": null,
      "boss": true,
      "type": null,
      "hp": 300,
      "str": null,
      "def": null,
      "mag": null,
      "resist": {
        "physical": 2,
        "fire": 2,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 3,
        "holy": 3
      },
      "stunChance": null,
      "immune": [
        "Gravity",
        "Holy"
      ],
      "weak": [],
      "locations": [
        {
          "dungeon": "Nest of Memories",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": [
        {
          "name": "Bubbles",
          "notes": "Blue bubbles freeze, red burn, purple paralyze (GameFAQs)"
        },
        {
          "name": "Laser Explosion",
          "notes": "Used once Raem is below 150 HP (GameFAQs)"
        },
        {
          "name": "Wings",
          "notes": "Crushes players near its wings"
        },
        {
          "name": "Head Shake",
          "notes": "Knocks back players attacking its face (GameFAQs)"
        }
      ],
      "tips": [
        "Its face is the weak spot; it has 300 HP and each weapon hit does about 1 damage, so expect a long fight.",
        "Kill the Red Minion and leave the Blue one alone, because killing both just brings two new ones.",
        "Avoid the homing bubbles from its wings (blue freezes, red burns, purple paralyzes) and stay clear of the wings, which slam shut.",
        "Get in a short combo, back off when it shakes its head, and cure to full whenever you take damage.",
        "Below 150 HP it fires side lasers that leave a deadly blaze, so stay close to its face or well clear of the beams.",
        "It is immune to Gravity and Holy; a reader recommends ranged spells or focus attacks from just outside its bump range."
      ],
      "notes": "First fight in the Nest of Memories. Fight also includes: Minion (Blue), Minion (Red).",
      "source": "Guides and extra resources; in-game resistance data; GameFAQs guide"
    },
    {
      "name": "Rock Scorpion",
      "variant": null,
      "boss": false,
      "type": "Stone",
      "hp": 6,
      "str": 6,
      "def": 16,
      "mag": 6,
      "resist": {
        "fire": 3,
        "blizzard": 3,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 3
      },
      "immune": [
        "Fire",
        "Blizzard",
        "Thunder"
      ],
      "weak": [
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "Lynari Desert",
          "cycles": [
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Sahagin",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 18,
      "str": 5,
      "def": 4,
      "mag": 5,
      "resist": {
        "fire": 0,
        "blizzard": 2,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Selepation Cave",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Conall Curach",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Sahagin Lord",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 30,
      "str": 7,
      "def": 6,
      "mag": 7,
      "resist": {
        "fire": 1,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 2,
        "holy": 0
      },
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Conall Curach",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Sand Sahagin",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 18,
      "str": 6,
      "def": 6,
      "mag": 6,
      "resist": {
        "fire": 2,
        "blizzard": 0,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Lynari Desert",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Scorpion",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 6,
      "def": 5,
      "mag": 6,
      "resist": {
        "fire": 2,
        "blizzard": 0,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Lynari Desert",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Shade",
      "variant": null,
      "boss": false,
      "type": "Ghost",
      "hp": 25,
      "str": 11,
      "def": 7,
      "mag": 11,
      "resist": {
        "fire": 1,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 3,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Holy"
      ],
      "locations": [
        {
          "dungeon": "Mount Vellenge",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Ghost. Use Holy to make vulnerable (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Shade",
      "variant": "Mace",
      "boss": false,
      "type": "Ghost",
      "hp": 25,
      "str": 11,
      "def": 7,
      "mag": 11,
      "resist": {
        "fire": 1,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 3,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Holy"
      ],
      "locations": [
        {
          "dungeon": "Mount Vellenge",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Ghost. Use Holy to make vulnerable (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Shade",
      "variant": "Spear",
      "boss": false,
      "type": "Ghost",
      "hp": 25,
      "str": 11,
      "def": 7,
      "mag": 11,
      "resist": {
        "fire": 1,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 3,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Holy"
      ],
      "locations": [
        {
          "dungeon": "Mount Vellenge",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Ghost. Use Holy to make vulnerable (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Skeleton",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 5,
      "def": 3,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Tida",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Rebena Te Ra",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Skeleton",
      "variant": "Mace",
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 5,
      "def": 3,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Tida",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Rebena Te Ra",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Skeleton",
      "variant": "Spear",
      "boss": false,
      "type": null,
      "hp": 18,
      "str": 5,
      "def": 3,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Tida",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Rebena Te Ra",
          "cycles": [
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Skeleton Mage",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 2,
      "def": 3,
      "mag": 5,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Tida",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Lynari Desert",
          "cycles": [
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "GameFAQs guide lists Strength 5, Magic 2.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Skeleton Mage",
      "variant": "Fire",
      "boss": false,
      "type": null,
      "hp": 9,
      "str": 2,
      "def": 4,
      "mag": 4,
      "resist": {
        "fire": 0,
        "blizzard": 3,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 3,
        "holy": 3
      },
      "immune": [
        "Blizzard",
        "Thunder"
      ],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Rebena Te Ra",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Skeleton Mage",
      "variant": "Ice",
      "boss": false,
      "type": null,
      "hp": 9,
      "str": 2,
      "def": 4,
      "mag": 4,
      "resist": {
        "fire": 3,
        "blizzard": 0,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 3,
        "holy": 3
      },
      "immune": [
        "Fire",
        "Thunder"
      ],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Rebena Te Ra",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Skeleton Mage",
      "variant": "Lightning",
      "boss": false,
      "type": null,
      "hp": 9,
      "str": 2,
      "def": 4,
      "mag": 4,
      "resist": {
        "fire": 3,
        "blizzard": 3,
        "thunder": 0,
        "slow": 3,
        "stop": 3,
        "gravity": 3,
        "holy": 3
      },
      "immune": [
        "Fire",
        "Blizzard"
      ],
      "weak": [
        "Thunder"
      ],
      "locations": [
        {
          "dungeon": "Rebena Te Ra",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Skeleton Mage",
      "variant": "Rebena Te Ra",
      "boss": false,
      "type": null,
      "hp": 18,
      "str": 2,
      "def": 4,
      "mag": 6,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Rebena Te Ra",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Snow Mu",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 18,
      "str": 6,
      "def": 4,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 3,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [
        "Blizzard"
      ],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Conall Curach",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Sonic Bat",
      "variant": null,
      "boss": false,
      "type": "Flying",
      "hp": 6,
      "str": 4,
      "def": 2,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 2,
        "thunder": 2,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire",
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "Selepation Cave",
          "cycles": [
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Flying enemy. Use gravity to bring down (GameFAQs guide). The per-cycle enemy list in Guides and extra resources only lists it in Selepation Cave cycle 3.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Sphere",
      "variant": null,
      "boss": false,
      "type": "Flying",
      "hp": 18,
      "str": 12,
      "def": 7,
      "mag": 12,
      "resist": {
        "fire": 2,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "Mount Vellenge",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Flying enemy. Use gravity to bring down (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Stone Hedgehog",
      "variant": null,
      "boss": false,
      "type": "Stone",
      "hp": 8,
      "str": 4,
      "def": 16,
      "mag": 4,
      "resist": {
        "fire": 3,
        "blizzard": 3,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 0
      },
      "immune": [
        "Fire",
        "Blizzard",
        "Thunder"
      ],
      "weak": [
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "River Belle Path",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Mushroom Forest",
          "cycles": [
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Stone Plant",
      "variant": null,
      "boss": false,
      "type": "Stone",
      "hp": 8,
      "str": 4,
      "def": 16,
      "mag": 2,
      "resist": {
        "fire": 3,
        "blizzard": 3,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 3
      },
      "immune": [
        "Fire",
        "Blizzard",
        "Thunder"
      ],
      "weak": [
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "Mushroom Forest",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Tida",
          "cycles": [
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "GameFAQs guide lists HP 18, Strength 2, Defense 4, Magic 6.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Stone Sahagin",
      "variant": null,
      "boss": false,
      "type": "Stone",
      "hp": 8,
      "str": 6,
      "def": 16,
      "mag": 6,
      "resist": {
        "fire": 3,
        "blizzard": 3,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 3
      },
      "immune": [
        "Fire",
        "Blizzard",
        "Thunder"
      ],
      "weak": [
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "Conall Curach",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "GameFAQs guide lists Magic 2.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Tentacle",
      "variant": "Dark",
      "boss": false,
      "type": null,
      "hp": 48,
      "str": 12,
      "def": 9,
      "mag": 12,
      "resist": {
        "fire": 1,
        "blizzard": 1,
        "thunder": 1,
        "slow": 3,
        "stop": 3,
        "gravity": 3,
        "holy": 0
      },
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Mount Vellenge",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Appears during the Meteor Parasite fight. GameFAQs guide calls it Tentacle (Poison).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Tentacle",
      "variant": "Fire",
      "boss": false,
      "type": null,
      "hp": 48,
      "str": 12,
      "def": 9,
      "mag": 12,
      "resist": {
        "fire": 3,
        "blizzard": 0,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 2,
        "holy": 0
      },
      "immune": [
        "Fire"
      ],
      "weak": [
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Mount Vellenge",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Appears during the Meteor Parasite fight.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Tentacle",
      "variant": "Ice",
      "boss": false,
      "type": null,
      "hp": 48,
      "str": 12,
      "def": 9,
      "mag": 12,
      "resist": {
        "fire": 0,
        "blizzard": 3,
        "thunder": 1,
        "slow": 0,
        "stop": 0,
        "gravity": 2,
        "holy": 0
      },
      "immune": [
        "Blizzard"
      ],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Mount Vellenge",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Appears during the Meteor Parasite fight.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Tentacle",
      "variant": "Lightning",
      "boss": false,
      "type": null,
      "hp": 48,
      "str": 12,
      "def": 9,
      "mag": 12,
      "resist": {
        "fire": 1,
        "blizzard": 1,
        "thunder": 3,
        "slow": 0,
        "stop": 0,
        "gravity": 2,
        "holy": 0
      },
      "immune": [
        "Thunder"
      ],
      "weak": [],
      "locations": [
        {
          "dungeon": "Mount Vellenge",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Appears during the Meteor Parasite fight.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Thunder Bomb",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 5,
      "def": 3,
      "mag": 5,
      "resist": {
        "fire": 0,
        "blizzard": 0,
        "thunder": 3,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [
        "Thunder"
      ],
      "weak": [
        "Fire",
        "Blizzard"
      ],
      "locations": [
        {
          "dungeon": "Mine of Cathuriges",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Conall Curach",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Explodes when defeated (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Tiny Worm",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 12,
      "str": 4,
      "def": 2,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 1,
        "thunder": 3,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 0
      },
      "immune": [
        "Thunder"
      ],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Mushroom Forest",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Tonberry",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 24,
      "str": 12,
      "def": 10,
      "mag": 12,
      "resist": {
        "fire": 1,
        "blizzard": 1,
        "thunder": 1,
        "slow": 3,
        "stop": 3,
        "gravity": 3,
        "holy": 0
      },
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Mount Vellenge",
          "cycles": [
            1
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Tonberry Chef",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 15,
      "str": 4,
      "def": 3,
      "mag": 4,
      "resist": {
        "fire": 1,
        "blizzard": 1,
        "thunder": 1,
        "slow": 3,
        "stop": 3,
        "gravity": 1,
        "holy": 0
      },
      "immune": [],
      "weak": [],
      "locations": [
        {
          "dungeon": "Moschet Manor",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Yellow Feather",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Vampire Bat",
      "variant": null,
      "boss": false,
      "type": "Flying/Ghost",
      "hp": 20,
      "str": 6,
      "def": 2,
      "mag": 2,
      "resist": {
        "fire": 0,
        "blizzard": 2,
        "thunder": 2,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire",
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "Rebena Te Ra",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Ghost. Use Holy to make vulnerable (GameFAQs guide).",
      "source": "Guides and extra resources"
    },
    {
      "name": "Water Flan",
      "variant": null,
      "boss": false,
      "type": null,
      "hp": 14,
      "str": 5,
      "def": 3,
      "mag": 3,
      "resist": {
        "fire": 0,
        "blizzard": 3,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 0
      },
      "immune": [
        "Blizzard"
      ],
      "weak": [
        "Fire"
      ],
      "locations": [
        {
          "dungeon": "Veo Lu Sluice",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Wraith",
      "variant": null,
      "boss": false,
      "type": "Ghost",
      "hp": 20,
      "str": 6,
      "def": 4,
      "mag": 4,
      "resist": {
        "fire": 0,
        "blizzard": 0,
        "thunder": 0,
        "slow": 0,
        "stop": 0,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Magic",
        "Holy"
      ],
      "locations": [
        {
          "dungeon": "Mine of Cathuriges",
          "cycles": [
            2,
            3
          ]
        },
        {
          "dungeon": "Daemon's Court",
          "cycles": [
            1,
            2,
            3
          ]
        },
        {
          "dungeon": "Rebena Te Ra",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [],
      "attacks": null,
      "notes": "Ghost. Use Holy to make vulnerable (GameFAQs guide). The per-cycle enemy list in Guides and extra resources does not list it in Daemon's Court.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Zu",
      "variant": null,
      "boss": false,
      "type": "Flying",
      "hp": 48,
      "str": 7,
      "def": 3,
      "mag": 7,
      "resist": {
        "fire": 0,
        "blizzard": 2,
        "thunder": 2,
        "slow": 3,
        "stop": 3,
        "gravity": 0,
        "holy": 0
      },
      "immune": [],
      "weak": [
        "Fire",
        "Gravity"
      ],
      "locations": [
        {
          "dungeon": "Lynari Desert",
          "cycles": [
            1,
            2,
            3
          ]
        }
      ],
      "drops": [
        {
          "item": "Zu's Beak",
          "chance": null,
          "cycles": null,
          "notes": null
        }
      ],
      "attacks": null,
      "notes": "Flying enemy. Use Gravity to bring down (GameFAQs guide).",
      "source": "Guides and extra resources"
    }
  ]
};
