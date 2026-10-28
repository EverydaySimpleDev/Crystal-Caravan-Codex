// Dungeons: monsters and chests per cycle, bonus points and boss reward sets.
// Edit the values freely (see data/README.md), but keep this first line of code and the final "};".
window.CODEX_DATA.dungeons = {
  "bonusConditions": [
    {
      "name": "Pick up items",
      "values": {
        "river-belle-path": 5,
        "mushroom-forest": 5,
        "mine-of-cathuriges": 5,
        "goblin-wall": 4,
        "tida": 3,
        "moschet-manor": 8,
        "veo-lu-sluice": 7,
        "daemons-court": 5,
        "selepation-cave": 3,
        "kilanda": 5,
        "conall-curach": 2,
        "rebena-te-ra": 3,
        "lynari-desert": 3
      }
    },
    {
      "name": "Pick up money",
      "values": {
        "river-belle-path": 7,
        "mushroom-forest": 7,
        "mine-of-cathuriges": 7,
        "goblin-wall": 7,
        "tida": 5,
        "moschet-manor": 10,
        "veo-lu-sluice": 10,
        "daemons-court": 7,
        "selepation-cave": 5,
        "kilanda": 7,
        "conall-curach": 4,
        "rebena-te-ra": 5,
        "lynari-desert": 5
      }
    },
    {
      "name": "Defeat enemies with spell fusion",
      "values": {
        "river-belle-path": 5,
        "mushroom-forest": 5,
        "mine-of-cathuriges": 5,
        "goblin-wall": 5,
        "tida": 4,
        "moschet-manor": 7,
        "veo-lu-sluice": 6,
        "daemons-court": 5,
        "selepation-cave": 5,
        "kilanda": 6,
        "conall-curach": 5,
        "rebena-te-ra": 5,
        "lynari-desert": 5
      }
    },
    {
      "name": "Defeat enemies with focus attacks",
      "values": {
        "river-belle-path": 5,
        "mushroom-forest": 5,
        "mine-of-cathuriges": 5,
        "goblin-wall": 5,
        "tida": 4,
        "moschet-manor": 7,
        "veo-lu-sluice": 6,
        "daemons-court": 5,
        "selepation-cave": 5,
        "kilanda": 6,
        "conall-curach": 5,
        "rebena-te-ra": 5,
        "lynari-desert": 5
      }
    },
    {
      "name": "Defeat enemies with spells",
      "values": {
        "river-belle-path": 5,
        "mushroom-forest": 5,
        "mine-of-cathuriges": 5,
        "goblin-wall": 5,
        "tida": 4,
        "moschet-manor": 7,
        "veo-lu-sluice": 6,
        "daemons-court": 5,
        "selepation-cave": 5,
        "kilanda": 6,
        "conall-curach": 5,
        "rebena-te-ra": 5,
        "lynari-desert": 5
      }
    },
    {
      "name": "Open treasure chests",
      "values": {
        "river-belle-path": 15,
        "mushroom-forest": 10,
        "mine-of-cathuriges": 8,
        "goblin-wall": 8,
        "tida": 8,
        "moschet-manor": 15,
        "veo-lu-sluice": 20,
        "daemons-court": 10,
        "selepation-cave": 9,
        "kilanda": 17,
        "conall-curach": 5,
        "rebena-te-ra": 7,
        "lynari-desert": 10
      }
    },
    {
      "name": "Inflict damage",
      "values": {
        "river-belle-path": 1,
        "mushroom-forest": 1,
        "mine-of-cathuriges": 1,
        "goblin-wall": 1,
        "tida": 1,
        "moschet-manor": 1,
        "veo-lu-sluice": 1,
        "daemons-court": 1,
        "selepation-cave": 1,
        "kilanda": 1,
        "conall-curach": 1,
        "rebena-te-ra": 1,
        "lynari-desert": 1
      }
    },
    {
      "name": "Take physical damage",
      "values": {
        "river-belle-path": 2,
        "mushroom-forest": 2,
        "mine-of-cathuriges": 2,
        "goblin-wall": 2,
        "tida": 2,
        "moschet-manor": 2,
        "veo-lu-sluice": 2,
        "daemons-court": 2,
        "selepation-cave": 2,
        "kilanda": 2,
        "conall-curach": 2,
        "rebena-te-ra": 2,
        "lynari-desert": 2
      }
    },
    {
      "name": "Take magical damage",
      "values": {
        "river-belle-path": 10,
        "mushroom-forest": 10,
        "mine-of-cathuriges": 7,
        "goblin-wall": 10,
        "tida": 4,
        "moschet-manor": 10,
        "veo-lu-sluice": 6,
        "daemons-court": 6,
        "selepation-cave": 6,
        "kilanda": 6,
        "conall-curach": 5,
        "rebena-te-ra": 5,
        "lynari-desert": 6
      }
    },
    {
      "name": "Avoid damage",
      "values": {
        "river-belle-path": -1,
        "mushroom-forest": -1,
        "mine-of-cathuriges": -1,
        "goblin-wall": -1,
        "tida": -1,
        "moschet-manor": -1,
        "veo-lu-sluice": -1,
        "daemons-court": -1,
        "selepation-cave": -1,
        "kilanda": -1,
        "conall-curach": -1,
        "rebena-te-ra": -1,
        "lynari-desert": -1
      }
    },
    {
      "name": "Don't cast spells",
      "values": {
        "river-belle-path": -5,
        "mushroom-forest": -5,
        "mine-of-cathuriges": -5,
        "goblin-wall": -5,
        "tida": -5,
        "moschet-manor": -5,
        "veo-lu-sluice": -5,
        "daemons-court": -5,
        "selepation-cave": -5,
        "kilanda": -5,
        "conall-curach": -5,
        "rebena-te-ra": -5,
        "lynari-desert": -5
      }
    },
    {
      "name": "Don't use focus attacks",
      "values": {
        "river-belle-path": -5,
        "mushroom-forest": -5,
        "mine-of-cathuriges": -5,
        "goblin-wall": -5,
        "tida": -5,
        "moschet-manor": -5,
        "veo-lu-sluice": -5,
        "daemons-court": -5,
        "selepation-cave": -5,
        "kilanda": -5,
        "conall-curach": -5,
        "rebena-te-ra": -5,
        "lynari-desert": -5
      }
    },
    {
      "name": "Don't use physical attacks",
      "values": {
        "river-belle-path": -5,
        "mushroom-forest": -5,
        "mine-of-cathuriges": -5,
        "goblin-wall": -5,
        "tida": -5,
        "moschet-manor": -5,
        "veo-lu-sluice": -5,
        "daemons-court": -5,
        "selepation-cave": -5,
        "kilanda": -5,
        "conall-curach": -5,
        "rebena-te-ra": -5,
        "lynari-desert": -5
      }
    },
    {
      "name": "Don't heal yourself",
      "values": {
        "river-belle-path": -2,
        "mushroom-forest": -2,
        "mine-of-cathuriges": -2,
        "goblin-wall": -2,
        "tida": -2,
        "moschet-manor": -2,
        "veo-lu-sluice": -2,
        "daemons-court": -2,
        "selepation-cave": -2,
        "kilanda": -2,
        "conall-curach": -2,
        "rebena-te-ra": -2,
        "lynari-desert": -2
      }
    },
    {
      "name": "Don't pick anything up",
      "values": {
        "river-belle-path": -1,
        "mushroom-forest": -1,
        "mine-of-cathuriges": -1,
        "goblin-wall": -1,
        "tida": -1,
        "moschet-manor": -1,
        "veo-lu-sluice": -1,
        "daemons-court": -1,
        "selepation-cave": -1,
        "kilanda": -1,
        "conall-curach": -1,
        "rebena-te-ra": -1,
        "lynari-desert": -1
      }
    }
  ],
  "rewardSetRules": {
    "note": "Which reward set is unlocked by cycle and bonus-point tier (A/B/C thresholds per dungeon and player count). The boss reward is picked at random among all sets unlocked for that cycle.",
    "table": {
      "1": {
        "1": "always",
        "2": "A",
        "3": "B",
        "4": "C"
      },
      "2": {
        "3": "always",
        "4": "A",
        "5": "B",
        "6": "C"
      },
      "3": {
        "5": "always",
        "6": "A",
        "7": "B",
        "8": "C"
      }
    }
  },
  "dungeons": [
    {
      "id": "river-belle-path",
      "name": "River Belle Path",
      "order": 1,
      "firstYear": 1,
      "boss": "Giant Crab",
      "element": null,
      "region": "Tipa Peninsula",
      "description": "A short riverside path just outside Tipa and the first dungeon of the journey. It works as a gentle tutorial for combat and bonus goals.",
      "tips": [
        "A tutorial-level dungeon: practise attacks, magic and Focus Attacks here.",
        "Quick to clear, so it is a good place to farm artifacts and gil.",
        "Set the Chalice to Water to cross the Miasma Stream out of the Tipa Peninsula."
      ],
      "enemies": {
        "1": [
          "Goblin",
          "Goblin Chieftain",
          "Hedgehog Pie",
          "Mu"
        ],
        "2": [
          "Goblin",
          "Goblin Chieftain",
          "Goblin Mage",
          "Griffin",
          "Hedgehog Pie",
          "Mu",
          "Stone Hedgehog"
        ],
        "3": [
          "Dark Hedgehog",
          "Goblin",
          "Goblin Chieftain",
          "Goblin Mage",
          "Griffin",
          "Mu",
          "Stone Hedgehog"
        ]
      },
      "tiers": {
        "A": [
          95,
          102,
          116,
          127
        ],
        "B": [
          119,
          128,
          146,
          160
        ],
        "C": [
          149,
          160,
          182,
          200
        ]
      },
      "rewardSets": [
        [
          "Buckler",
          "Dragon's Whisker",
          "Moogle Pocket",
          "Shuriken"
        ],
        [
          "Mage Masher",
          "Maneater",
          "Moogle Pocket",
          "Silver Spectacles"
        ],
        [
          "Buckler",
          "Double Axe",
          "Iron",
          "Kris"
        ],
        [
          "Ice Brand",
          "Iron",
          "Silver Bracer",
          "Silver Spectacles"
        ],
        [
          "Loaded Dice",
          "Mage's Staff",
          "Mythril",
          "Wonder Bangle"
        ],
        [
          "Black Hood",
          "Flametongue",
          "Legendary Weapon",
          "Sasuke's Blade"
        ],
        [
          "Dragon's Whisker",
          "Orichalcum",
          "Shuriken",
          "Silver Spectacles"
        ],
        [
          "Ancient Sword",
          "Mage Masher",
          "Maneater",
          "Save the Queen"
        ]
      ],
      "notes": null,
      "hotspots": {
        "Water": 2,
        "Wind": 1
      }
    },
    {
      "id": "mushroom-forest",
      "name": "Mushroom Forest",
      "order": 2,
      "firstYear": 1,
      "boss": "Malboro",
      "element": null,
      "region": "Iron Mine Downs",
      "description": "A forest of giant mushrooms in the Iron Mine Downs, with bouncy mushrooms that launch you to new areas. It has more enemies than River Belle Path, including flying ones.",
      "tips": [
        "Take down Flying-type monsters with Gravity.",
        "You can skip monsters you do not need to defeat.",
        "Bounce on the small mushrooms to reach new areas.",
        "A great dungeon to repeat early in the game."
      ],
      "enemies": {
        "1": [
          "Ahriman",
          "Gremlin",
          "Hedgehog Pie",
          "Hell Plant",
          "Tiny Worm"
        ],
        "2": [
          "Ahriman",
          "Gremlin",
          "Hedgehog Pie",
          "Hell Plant",
          "Ice Ahriman",
          "Ochu",
          "Stone Plant",
          "Tiny Worm"
        ],
        "3": [
          "Ahriman",
          "Carrion Worm",
          "Dark Hedgehog",
          "Gremlin",
          "Hedgehog Pie",
          "Hell Plant",
          "Ice Ahriman",
          "Ochu",
          "Stone Hedgehog",
          "Stone Plant",
          "Tiny Worm"
        ]
      },
      "tiers": {
        "A": [
          108,
          116,
          132,
          145
        ],
        "B": [
          135,
          145,
          165,
          181
        ],
        "C": [
          169,
          182,
          207,
          227
        ]
      },
      "rewardSets": [
        [
          "Shuriken",
          "Dragon's Whisker",
          "Buckler",
          "Earth Pendant"
        ],
        [
          "Flametongue",
          "Mage Masher",
          "Silver Spectacles",
          "Moogle Pocket"
        ],
        [
          "Maneater",
          "Sage's Staff",
          "Buckler",
          "Earth Pendant"
        ],
        [
          "Double Axe",
          "Silver Bracer",
          "Black Hood",
          "Moogle Pocket"
        ],
        [
          "Sasuke's Blade",
          "Cat's Bell",
          "Wonder Bangle",
          "Ancient Potion"
        ],
        [
          "Green Beret",
          "Mage's Staff",
          "Wonder Bangle",
          "Orichalcum"
        ],
        [
          "Double Axe",
          "Silver Bracer",
          "Moogle Pocket",
          "Diamond Armor"
        ],
        [
          "Ashura",
          "Cat's Bell",
          "Earth Pendant",
          "Malboro Seed"
        ]
      ],
      "notes": null,
      "hotspots": {
        "Water": 3
      }
    },
    {
      "id": "mine-of-cathuriges",
      "name": "Mine of Cathuriges",
      "order": 3,
      "firstYear": 1,
      "boss": "Orc King",
      "element": null,
      "region": "Iron Mine Downs",
      "description": "A dark, abandoned mine where you push a mine cart through the first part, then cross tracks above the miasma. It is a step up in difficulty from the first two dungeons.",
      "tips": [
        "Hit the cart to move it, but make sure it goes the right way.",
        "Hit Bombs to damage the enemies around them.",
        "Cycle 2 is one of the best places to hunt for Mythril.",
        "Bring decent Strength and Defense for the Orc King."
      ],
      "enemies": {
        "1": [
          "Bomb",
          "Ogre",
          "Orc",
          "Orc Mage"
        ],
        "2": [
          "Bat",
          "Bomb",
          "Cockatrice",
          "Ice Bomb",
          "Ogre",
          "Orc",
          "Orc Mage",
          "Thunder Bomb",
          "Wraith"
        ],
        "3": [
          "Bat",
          "Bomb",
          "Cockatrice",
          "Ice Bomb",
          "Ogre",
          "Orc",
          "Orc Mage",
          "Thunder Bomb",
          "Wraith"
        ]
      },
      "tiers": {
        "A": [
          116,
          125,
          142,
          156
        ],
        "B": [
          145,
          156,
          178,
          195
        ],
        "C": [
          181,
          196,
          222,
          244
        ]
      },
      "rewardSets": [
        [
          "Shuriken",
          "Dragon's Whisker",
          "Buckler",
          "Earth Pendant"
        ],
        [
          "Loaded Dice",
          "Mage Masher",
          "Silver Spectacles",
          "Moogle Pocket"
        ],
        [
          "Maneater",
          "Rune Bell",
          "Buckler",
          "Earth Pendant"
        ],
        [
          "Double Axe",
          "Silver Bracer",
          "Black Hood",
          "Moogle Pocket"
        ],
        [
          "Sasuke's Blade",
          "Cat's Bell",
          "Wonder Bangle",
          "Legendary Weapon"
        ],
        [
          "Green Beret",
          "Mage's Staff",
          "Wonder Bangle",
          "Orichalcum"
        ],
        [
          "Kaiser Knuckles",
          "Faerie Ring",
          "Ultimate Pocket",
          "Orc Belt"
        ],
        [
          "Onion Sword",
          "Winged Cap",
          "Earth Pendant",
          "Murasame"
        ]
      ],
      "notes": "Tier thresholds follow the bonus-point table, which matches the Ultimania route; the Nintendo Power guide transcription gives A = 118/125/142/156, B = 148/158/178/195, C = 185/198/222/244.",
      "hotspots": {
        "Fire": 2
      }
    },
    {
      "id": "goblin-wall",
      "name": "Goblin Wall",
      "order": 4,
      "firstYear": 2,
      "boss": "Goblin King",
      "element": null,
      "region": "Tipa Peninsula",
      "description": "A goblin stronghold built into the cliffs, with dark areas and many connecting passages. The enemies are mostly goblins, jellyfish and flans.",
      "tips": [
        "Don't use physical attacks against Electric Jellyfish.",
        "The layout is a bit confusing, but side passages lead back to the main path.",
        "The best dungeon to repeat in Year Two."
      ],
      "enemies": {
        "1": [
          "Bat",
          "Electric Jellyfish",
          "Flan",
          "Goblin",
          "Goblin Chieftain",
          "Goblin Mage"
        ],
        "2": [
          "Bat",
          "Cerberus",
          "Electric Jellyfish",
          "Flan",
          "Ghost",
          "Goblin",
          "Goblin Chieftain",
          "Goblin Mage"
        ],
        "3": [
          "Bat",
          "Cerberus",
          "Electric Jellyfish",
          "Flan",
          "Ghost",
          "Goblin",
          "Goblin Chieftain",
          "Goblin Mage"
        ]
      },
      "tiers": {
        "A": [
          110,
          119,
          135,
          148
        ],
        "B": [
          138,
          148,
          169,
          185
        ],
        "C": [
          172,
          186,
          211,
          232
        ]
      },
      "rewardSets": [
        [
          "Double Axe",
          "Earth Pendant",
          "Sparkling Bracer",
          "Winged Cap"
        ],
        [
          "Earth Pendant",
          "Kaiser Knuckles",
          "Sparkling Bracer",
          "Wonder Wand"
        ],
        [
          "Ashura",
          "Faerie Ring",
          "Helm of Arai",
          "Moogle Pocket"
        ],
        [
          "Dark Matter",
          "Fang Charm",
          "Moogle Pocket",
          "Sparkling Bracer"
        ],
        [
          "Ancient Potion",
          "Helm of Arai",
          "Mjollnir",
          "Red Slippers"
        ],
        [
          "Engetsurin",
          "Helm of Arai",
          "Noah's Lute",
          "Orichalcum"
        ],
        [
          "Candy Ring",
          "Diamond Belt",
          "Fang Charm",
          "Wonder Bangle"
        ],
        [
          "Cursed Crook",
          "Galatyn",
          "Green Beret",
          "Sparkling Bracer"
        ]
      ],
      "notes": null,
      "hotspots": {
        "Earth": 1,
        "Fire": 1
      }
    },
    {
      "id": "moschet-manor",
      "name": "Moschet Manor",
      "order": 5,
      "firstYear": 2,
      "boss": "Gigas Lord",
      "element": null,
      "region": "Vale of Alfitaria",
      "description": "A small mansion built around one central hub room. Instead of following a path, you clear out specific enemies to make the boss appear.",
      "tips": [
        "Defeat the Tonberry Chefs and the boss fight starts in the hub room.",
        "The gimmicks are a pain in single-player mode, but the dungeon itself is not hard.",
        "Gigas Lord is best handled by going full-on offense."
      ],
      "enemies": {
        "1": [
          "Coeurl",
          "Gargoyle",
          "Gremlin",
          "Tonberry Chef"
        ],
        "2": [
          "Coeurl",
          "Gargoyle",
          "Gremlin",
          "Tonberry Chef"
        ],
        "3": [
          "Coeurl",
          "Gargoyle",
          "Gremlin",
          "Ochu",
          "Tonberry Chef"
        ]
      },
      "tiers": {
        "A": [
          84,
          91,
          103,
          113
        ],
        "B": [
          105,
          113,
          129,
          141
        ],
        "C": [
          132,
          142,
          161,
          177
        ]
      },
      "rewardSets": [
        [
          "Flametongue",
          "Rune Staff",
          "Buckler",
          "Chocobo Pocket"
        ],
        [
          "Green Beret",
          "Red Slippers",
          "Silver Spectacles",
          "Earth Pendant"
        ],
        [
          "Fang Charm",
          "Book of Light",
          "Black Hood",
          "Moon Pendant"
        ],
        [
          "Kaiser Knuckles",
          "Faerie Ring",
          "Helm of Arai",
          "Chocobo Pocket"
        ],
        [
          "Ice Brand",
          "Sage's Staff",
          "Chocobo Pocket",
          "Moon Pendant"
        ],
        [
          "Masquerade",
          "Mage's Staff",
          "Wonder Bangle",
          "Orichalcum"
        ],
        [
          "Power Wristband",
          "Chocobo Pocket",
          "Legendary Weapon",
          "Lord's Robe"
        ],
        [
          "Gekkabijin",
          "Candy Ring",
          "Chocobo Pocket",
          "Legendary Shield"
        ]
      ],
      "notes": "Boss appears together with Maggie (GameFAQs guide: \"Gigas Lord & Maggie\"). firstYear: the GameFAQs guide and the Ultimania route visit it in Year 2; another guide lists it under Year 3.",
      "hotspots": {
        "Water": 1,
        "Fire": 1
      }
    },
    {
      "id": "tida",
      "name": "Tida",
      "order": 6,
      "firstYear": 2,
      "boss": "Armstrong",
      "element": null,
      "region": "Vale of Alfitaria",
      "description": "The ruins of a village that fell to the miasma after its caravan never returned. Spider webs and narrow streets make it easy to get trapped.",
      "tips": [
        "It is easy to get hemmed in by enemies on the narrow paths.",
        "A good second choice for grinding after Goblin Wall."
      ],
      "enemies": {
        "1": [
          "Bomb",
          "Carrion Worm",
          "Gremlin",
          "Hell Plant",
          "Skeleton Mage"
        ],
        "2": [
          "Abaddon",
          "Bomb",
          "Carrion Worm",
          "Gremlin",
          "Hell Plant",
          "Magic Plant",
          "Skeleton",
          "Skeleton Mage",
          "Stone Plant"
        ],
        "3": [
          "Abaddon",
          "Bomb",
          "Carrion Worm",
          "Gremlin",
          "Hell Plant",
          "Magic Plant",
          "Skeleton",
          "Skeleton Mage",
          "Stone Plant"
        ]
      },
      "tiers": {
        "A": [
          155,
          167,
          190,
          208
        ],
        "B": [
          193,
          208,
          237,
          260
        ],
        "C": [
          241,
          260,
          295,
          325
        ]
      },
      "rewardSets": [
        [
          "Twisted Headband",
          "Dragon's Whisker",
          "Silver Spectacles",
          "Chocobo Pocket"
        ],
        [
          "Shuriken",
          "Kris",
          "Sparkling Bracer",
          "Moogle Pocket"
        ],
        [
          "Maneater",
          "Silver Bracer",
          "Elven Mantle",
          "Chocobo Pocket"
        ],
        [
          "Power Wristband",
          "Cat's Bell",
          "Sparkling Bracer",
          "Sasuke's Blade"
        ],
        [
          "Giant's Glove",
          "Flametongue",
          "Wonder Bangle",
          "Ancient Potion"
        ],
        [
          "Rune Bell",
          "Gold Hairpin",
          "Wonder Bangle",
          "Orichalcum"
        ],
        [
          "Power Wristband",
          "Silver Bracer",
          "Chocobo Pocket",
          "Legendary Weapon"
        ],
        [
          "Green Beret",
          "Cat's Bell",
          "Brigandology",
          "Dweomer Spore"
        ]
      ],
      "notes": "The randomizer reward-set document labels the Tida boss \"Wild Abaddon\"; both walkthroughs name it Armstrong. Tier thresholds follow the bonus-point table, which matches the Ultimania route; the Nintendo Power guide transcription gives B = 193/206/237/260.",
      "hotspots": {
        "Wind": 1,
        "Earth": 2
      }
    },
    {
      "id": "veo-lu-sluice",
      "name": "Veo Lu Sluice",
      "order": 7,
      "firstYear": 3,
      "boss": "Golem",
      "element": null,
      "region": "Veo Lu",
      "description": "A water sluice full of switches and keys near the Yuke town of Shella. Its flooded lower areas open up later in the story.",
      "tips": [
        "Use the switches and keys to proceed.",
        "The puzzles are frustrating in single-player mode.",
        "When the Jegon River dries up (Year 5), the flooded areas open and reveal extra chests.",
        "On the story revisit, cast Life on the Pump Flowers."
      ],
      "enemies": {
        "1": [
          "Gigan Toad",
          "Griffin",
          "Ice Bomb",
          "Lizard Mage",
          "Lizardman",
          "Water Flan"
        ],
        "2": [
          "Gigan Toad",
          "Griffin",
          "Ice Bomb",
          "Lizard Mage",
          "Lizardman",
          "Water Flan"
        ],
        "3": [
          "Gigan Toad",
          "Griffin",
          "Ice Bomb",
          "Lizard Mage",
          "Lizardman",
          "Water Flan"
        ]
      },
      "tiers": {
        "A": [
          92,
          99,
          112,
          123
        ],
        "B": [
          115,
          124,
          140,
          154
        ],
        "C": [
          143,
          155,
          176,
          193
        ]
      },
      "rewardSets": [
        [
          "Ice Brand",
          "Silver Bracer",
          "Buckler",
          "Ring of Blizzard"
        ],
        [
          "Green Beret",
          "Sage's Staff",
          "Silver Spectacles",
          "Moon Pendant"
        ],
        [
          "Fang Charm",
          "Cat's Bell",
          "Elven Mantle",
          "Moon Pendant"
        ],
        [
          "Shuriken",
          "Faerie Ring",
          "Sparkling Bracer",
          "Ring of Blizzard"
        ],
        [
          "Heavy Armband",
          "Wonder Wand",
          "Rat's Tail",
          "Moon Pendant"
        ],
        [
          "Loaded Dice",
          "Noah's Lute",
          "Ring of Blizzard",
          "Orichalcum"
        ],
        [
          "Green Beret",
          "Winged Cap",
          "Diamond Helm",
          "Green Sphere"
        ],
        [
          "Fang Charm",
          "Candy Ring",
          "Taotie Motif",
          "Diamond Armor"
        ]
      ],
      "notes": "firstYear: the GameFAQs guide and the Ultimania route first visit it in Year 3; another guide lists it under Year 2. Tier thresholds follow the bonus-point table, which matches the Ultimania route; the Nintendo Power guide transcription gives A = 108/116/132/145, B = 135/145/165/181, C = 169/182/207/227.",
      "hotspots": {}
    },
    {
      "id": "daemons-court",
      "name": "Daemon's Court",
      "order": 8,
      "firstYear": 3,
      "boss": "Lizardman King",
      "element": null,
      "region": null,
      "description": "A fortress held by lizardmen who attack in large groups. It is the first dungeon that is a real challenge.",
      "tips": [
        "It is easy to get surrounded, so advance with care.",
        "Defeating the Bomb on top of the bridge has a lasting effect.",
        "Back off to heal; enemies here come in groups of six or seven."
      ],
      "enemies": {
        "1": [
          "Bomb",
          "Coeurl",
          "Killer Bee",
          "Lizard Skirmisher",
          "Lizard Soldier",
          "Lizard Warrior",
          "Lizard Wizard",
          "Wraith"
        ],
        "2": [
          "Bomb",
          "Coeurl",
          "Killer Bee",
          "Lizard Skirmisher",
          "Lizard Soldier",
          "Lizard Warrior",
          "Lizard Wizard",
          "Wraith"
        ],
        "3": [
          "Bomb",
          "Coeurl",
          "Killer Bee",
          "Lizard Skirmisher",
          "Lizard Soldier",
          "Lizard Warrior",
          "Lizard Wizard",
          "Wraith"
        ]
      },
      "tiers": {
        "A": [
          103,
          111,
          126,
          138
        ],
        "B": [
          128,
          138,
          157,
          172
        ],
        "C": [
          160,
          173,
          197,
          216
        ]
      },
      "rewardSets": [
        [
          "Loaded Dice",
          "Winged Cap",
          "Buckler",
          "Chocobo Pocket"
        ],
        [
          "Shuriken",
          "Wonder Wand",
          "Silver Spectacles",
          "Moon Pendant"
        ],
        [
          "Maneater",
          "Candy Ring",
          "Rat's Tail",
          "Chocobo Pocket"
        ],
        [
          "Double Axe",
          "Dragon's Whisker",
          "Sparkling Bracer",
          "Moon Pendant"
        ],
        [
          "Giant's Glove",
          "Rune Bell",
          "Wonder Bangle",
          "Moon Pendant"
        ],
        [
          "Ogrekiller",
          "Dark Matter",
          "Chocobo Pocket",
          "Orichalcum"
        ],
        [
          "Flametongue",
          "Kris",
          "Diamond Gloves",
          "King's Scale"
        ],
        [
          "Ice Brand",
          "Red Slippers",
          "Aegis",
          "Diamond Shield"
        ]
      ],
      "notes": "Tier thresholds follow the bonus-point table, which matches the Ultimania route; the Nintendo Power guide transcription gives C = 160/172/197/216.",
      "hotspots": {}
    },
    {
      "id": "selepation-cave",
      "name": "Selepation Cave",
      "order": 9,
      "firstYear": 3,
      "boss": "Cave Worm",
      "element": null,
      "region": null,
      "description": "A huge cave \"where the wind is born\", with many routes and tough enemies in small groups. A short route to the boss skips most of the cave.",
      "tips": [
        "The layout is confusing, with many different routes.",
        "Rare materials are easy to collect here.",
        "Hit both purple tubes with one Focus Attack to open the gate.",
        "The Cave Worm takes time to learn how to defeat."
      ],
      "enemies": {
        "1": [
          "Blazer Beetle",
          "Cockatrice",
          "Electric Jellyfish",
          "Gigas",
          "Killer Bee",
          "Lizard Captain",
          "Lizard Mage",
          "Lizardman",
          "Sahagin"
        ],
        "2": [
          "Blazer Beetle",
          "Cockatrice",
          "Electric Jellyfish",
          "Gigas",
          "Killer Bee",
          "Lizard Captain",
          "Lizard Mage",
          "Lizardman",
          "Sahagin",
          "Sonic Bat"
        ],
        "3": [
          "Blazer Beetle",
          "Cockatrice",
          "Electric Jellyfish",
          "Gigas",
          "Killer Bee",
          "Lizard Captain",
          "Lizard Mage",
          "Lizardman",
          "Sahagin",
          "Sonic Bat"
        ]
      },
      "tiers": {
        "A": [
          158,
          170,
          193,
          212
        ],
        "B": [
          197,
          212,
          241,
          265
        ],
        "C": [
          246,
          266,
          302,
          332
        ]
      },
      "rewardSets": [
        [
          "Ogrekiller",
          "Dragon's Whisker",
          "Buckler",
          "Chocobo Pocket"
        ],
        [
          "Ashura",
          "Rune Bell",
          "Silver Spectacles",
          "Ring of Thunder"
        ],
        [
          "Kaiser Knuckles",
          "Mage Masher",
          "Sparkling Bracer",
          "Moon Pendant"
        ],
        [
          "Power Wristband",
          "Rune Staff",
          "Teddy Bear",
          "Ring of Thunder"
        ],
        [
          "Sasuke's Blade",
          "Kris",
          "Black Hood",
          "Diamond Armor"
        ],
        [
          "Twisted Headband",
          "Gold Hairpin",
          "Moon Pendant",
          "Orichalcum"
        ],
        [
          "Loaded Dice",
          "Sage's Staff",
          "Ring of Thunder",
          "Wind Crystal"
        ],
        [
          "Ogrekiller",
          "Wonder Wand",
          "Earth Armor",
          "Ring of Protection"
        ]
      ],
      "notes": "Tier thresholds follow the bonus-point table, which matches the Ultimania route; the Nintendo Power guide transcription gives A = 170/179/199/218, C = 248/266/303/332.",
      "hotspots": {
        "Wind": 1
      }
    },
    {
      "id": "kilanda",
      "name": "Kilanda",
      "order": 10,
      "firstYear": 4,
      "boss": "Iron Giant",
      "element": null,
      "region": "Kilanda Islands",
      "description": "A hot volcano island reached by boat; you can only leave by boat as well. The boss gets harder or easier depending on which enemies you defeated on the way.",
      "tips": [
        "Reach it for 500 gil by boat from Jegon River (East).",
        "Cut Mog's hair before you go, because of the heat.",
        "Not a difficult dungeon to clear."
      ],
      "enemies": {
        "1": [
          "Blazer Beetle",
          "Coeurl",
          "Lamia",
          "Lava Ahriman",
          "Lava Mu",
          "Ogre"
        ],
        "2": [
          "Blazer Beetle",
          "Coeurl",
          "Lamia",
          "Lava Ahriman",
          "Lava Mu",
          "Ogre"
        ],
        "3": [
          "Blazer Beetle",
          "Coeurl",
          "Lamia",
          "Lava Ahriman",
          "Lava Mu",
          "Ogre"
        ]
      },
      "tiers": {
        "A": [
          102,
          110,
          125,
          137
        ],
        "B": [
          127,
          137,
          156,
          171
        ],
        "C": [
          159,
          172,
          195,
          214
        ]
      },
      "rewardSets": [
        [
          "Engetsurin",
          "Book of Light",
          "Drill",
          "Moon Pendant"
        ],
        [
          "Power Wristband",
          "Kris",
          "Drill",
          "Star Pendant"
        ],
        [
          "Green Beret",
          "Silver Bracer",
          "Main Gauche",
          "Ring of Fire"
        ],
        [
          "Fang Charm",
          "Cat's Bell",
          "Drill",
          "Ring of Fire"
        ],
        [
          "Mjollnir",
          "Red Slippers",
          "Chicken Knife",
          "Star Pendant"
        ],
        [
          "Flametongue",
          "Mage's Staff",
          "Ring of Fire",
          "Orichalcum"
        ],
        [
          "Twisted Headband",
          "Wonder Wand",
          "Legendary Weapon",
          "Red Eye"
        ],
        [
          "Masamune",
          "Rune Bell",
          "Main Gauche",
          "Celestial Weapon"
        ]
      ],
      "notes": null,
      "hotspots": {}
    },
    {
      "id": "conall-curach",
      "name": "Conall Curach",
      "order": 11,
      "firstYear": 4,
      "boss": "Dragon Zombie",
      "element": null,
      "region": "Rebena Plains",
      "description": "A huge swamp crossed on rickety Selkie bridges, with over twenty chests and many tough enemies. It is long and easy to get lost in.",
      "tips": [
        "A long, spread-out dungeon.",
        "Don't bother defeating every enemy.",
        "Hunt for the Ring of Cure artifact.",
        "Take the Water element with you when you cross the Jegon River."
      ],
      "enemies": {
        "1": [
          "Abaddon",
          "Behemoth",
          "Dark Flan",
          "Flan",
          "Ghost",
          "Gigan Toad",
          "Ice Bomb",
          "Magic Plant",
          "Sahagin",
          "Sahagin Lord",
          "Snow Mu",
          "Stone Sahagin",
          "Thunder Bomb"
        ],
        "2": [
          "Abaddon",
          "Behemoth",
          "Dark Flan",
          "Flan",
          "Ghost",
          "Gigan Toad",
          "Ice Bomb",
          "Magic Plant",
          "Sahagin",
          "Sahagin Lord",
          "Snow Mu",
          "Stone Sahagin",
          "Thunder Bomb"
        ],
        "3": [
          "Abaddon",
          "Behemoth",
          "Dark Flan",
          "Flan",
          "Ghost",
          "Gigan Toad",
          "Ice Bomb",
          "Magic Plant",
          "Sahagin",
          "Sahagin Lord",
          "Snow Mu",
          "Stone Sahagin",
          "Thunder Bomb"
        ]
      },
      "tiers": {
        "A": [
          193,
          208,
          237,
          260
        ],
        "B": [
          240,
          260,
          295,
          324
        ],
        "C": [
          301,
          325,
          370,
          406
        ]
      },
      "rewardSets": [
        [
          "Giant's Glove",
          "Gobbie Pocket",
          "Rat's Tail",
          "Sage's Staff"
        ],
        [
          "Flametongue",
          "Gold Hairpin",
          "Ring of Cure",
          "Teddy Bear"
        ],
        [
          "Ice Brand",
          "Star Pendant",
          "Wonder Wand",
          "Wonder Bangle"
        ],
        [
          "Loaded Dice",
          "Rat's Tail",
          "Ring of Cure",
          "Rune Bell"
        ],
        [
          "Gold Hairpin",
          "Ogrekiller",
          "Star Pendant",
          "Teddy Bear"
        ],
        [
          "Kris",
          "Orichalcum",
          "Ring of Cure",
          "Sasuke's Blade"
        ],
        [
          "Dragon's Fang",
          "Lunar Weapon",
          "Red Slippers",
          "Twisted Headband"
        ],
        [
          "Diamond Armor",
          "Engetsurin",
          "Ring of Life",
          "Tome of Ultima"
        ]
      ],
      "notes": "Tier thresholds follow the bonus-point table, which matches the Ultimania route; the Nintendo Power guide transcription gives A = 183/198/237/260, B = 249/268/303/324, C = 301/325/369/406.",
      "hotspots": {}
    },
    {
      "id": "rebena-te-ra",
      "name": "Rebena Te Ra",
      "order": 12,
      "firstYear": 4,
      "boss": "Lich",
      "element": null,
      "region": "Rebena Plains",
      "description": "A ruined city that is a maze of switches, chests and undead enemies. It has some of the hardest puzzles in the game.",
      "tips": [
        "Plenty of gimmicks and lots of running around.",
        "Keep Holy ready for the Ghosts and Wraiths.",
        "The gimmicks are a pain in single-player mode.",
        "Take the Water element with you when you cross the Jegon River."
      ],
      "enemies": {
        "1": [
          "Cerberus",
          "Gargoyle",
          "Ghost",
          "Mimic",
          "Nightmare",
          "Skeleton",
          "Skeleton Mage",
          "Vampire Bat",
          "Wraith"
        ],
        "2": [
          "Cerberus",
          "Gargoyle",
          "Ghost",
          "Mimic",
          "Nightmare",
          "Skeleton",
          "Skeleton Mage",
          "Vampire Bat",
          "Wraith"
        ],
        "3": [
          "Cerberus",
          "Gargoyle",
          "Ghost",
          "Mimic",
          "Nightmare",
          "Skeleton",
          "Skeleton Mage",
          "Vampire Bat",
          "Wraith"
        ]
      },
      "tiers": {
        "A": [
          149,
          160,
          182,
          200
        ],
        "B": [
          186,
          200,
          228,
          250
        ],
        "C": [
          232,
          250,
          284,
          312
        ]
      },
      "rewardSets": [
        [
          "Main Gauche",
          "Mjollnir",
          "Sage's Staff",
          "Star Pendant"
        ],
        [
          "Black Hood",
          "Flametongue",
          "Gobbie Pocket",
          "Mage's Staff"
        ],
        [
          "Chicken Knife",
          "Ice Brand",
          "Star Pendant",
          "Wonder Wand"
        ],
        [
          "Gobbie Pocket",
          "Helm of Arai",
          "Loaded Dice",
          "Rune Bell"
        ],
        [
          "Elven Mantle",
          "Kris",
          "Masquerade",
          "Star Pendant"
        ],
        [
          "Gobbie Pocket",
          "Noah's Lute",
          "Ogrekiller",
          "Orichalcum"
        ],
        [
          "Dark Weapon",
          "Engetsurin",
          "Ethereal Orb",
          "Red Slippers"
        ],
        [
          "Drill",
          "Forbidden Tome",
          "Ribbon",
          "Twisted Headband"
        ]
      ],
      "notes": "Tier thresholds follow the bonus-point table, which matches the Ultimania route; the Nintendo Power guide transcription gives A = 149/160/181/200.",
      "hotspots": {}
    },
    {
      "id": "lynari-desert",
      "name": "Lynari Desert",
      "order": 13,
      "firstYear": 5,
      "boss": "Antlion",
      "element": null,
      "region": "Lynari Isle",
      "description": "A wide, hot desert on Lynari Isle with the hardest puzzle in the game. Solving it unlocks the Chalice element you need for the final area.",
      "tips": [
        "Take the ferry from Port Tipa to Lynari Isle (300 gil).",
        "Solve four riddles to get the ??? element for the Chalice.",
        "Cut Mog's hair before you go, because of the heat.",
        "The Antlion is a big threat, so come prepared."
      ],
      "enemies": {
        "1": [
          "Cactuar",
          "Chimera",
          "Lamia",
          "Sand Sahagin",
          "Scorpion",
          "Zu"
        ],
        "2": [
          "Cactuar",
          "Chimera",
          "Electric Scorpion",
          "Lamia",
          "Rock Scorpion",
          "Sand Sahagin",
          "Scorpion",
          "Skeleton Mage",
          "Zu"
        ],
        "3": [
          "Cactuar",
          "Chimera",
          "Electric Scorpion",
          "Lamia",
          "Rock Scorpion",
          "Sand Sahagin",
          "Scorpion",
          "Skeleton Mage",
          "Zu"
        ]
      },
      "tiers": {
        "A": [
          144,
          156,
          177,
          194
        ],
        "B": [
          180,
          195,
          221,
          243
        ],
        "C": [
          226,
          244,
          277,
          304
        ]
      },
      "rewardSets": [
        [
          "Main Gauche",
          "Masquerade",
          "Star Pendant",
          "Sage's Staff"
        ],
        [
          "Black Hood",
          "Flametongue",
          "Gobbie Pocket",
          "Noah's Lute"
        ],
        [
          "Chicken Knife",
          "Gobbie Pocket",
          "Ice Brand",
          "Wonder Wand"
        ],
        [
          "Heavy Armband",
          "Helm of Arai",
          "Rune Bell",
          "Star Pendant"
        ],
        [
          "Dark Matter",
          "Elven Mantle",
          "Hero's Weapon",
          "Loaded Dice"
        ],
        [
          "Kris",
          "Ogrekiller",
          "Orichalcum",
          "Wonder Bangle"
        ],
        [
          "Desert Fang",
          "Engetsurin",
          "Gobbie Pocket",
          "Red Slippers"
        ],
        [
          "Diamond Armor",
          "Sun Pendant",
          "Tome of Ultima",
          "Twisted Headband"
        ]
      ],
      "notes": "Lynari also has three breakable cacti per cycle (Cactus Flower) that are not chests; the Ultimania route lists an artifact from one of them.",
      "hotspots": {
        "Earth": 4,
        "Unknown": 1
      },
      "puzzle": {
        "id": "unknown-element",
        "title": "Unlocking the Unknown element",
        "summary": "Cast five spells on five things in Area 1, in this order. Each one plays a short cut-scene when it works. The last one turns a pink flower into a chalice hotspot for the Unknown element (shown as ??? in game).",
        "reward": "The Unknown element lets the chalice pass every miasma stream, whatever its element – and it's the only way past the stream into the Abyss. It gives no elemental resistance. Once you have it, don't change the chalice element again.",
        "when": "Year 5 onwards",
        "steps": [
          {
            "spell": "Thunder",
            "target": "The big cactus",
            "where": "Head north from the start to the top-left of Area 1, below the corridor to Area 2. Of the cacti there, cast it on the biggest one (marker 1)."
          },
          {
            "spell": "Gravity",
            "target": "The old tent",
            "where": "Follow the north wall east to the old tent in the north-east of the area (marker 2)."
          },
          {
            "spell": "Fire",
            "target": "The mushroom-shaped rock",
            "where": "Go south from the tent along the east edge until you can examine a rock shaped like a mushroom (marker 3)."
          },
          {
            "spell": "Blizzard",
            "target": "Three rocks, smallest first",
            "where": "Go back to the big cactus. Three rocks sit just south of it – cast on the smallest (4a), then the middle one (4b), then the largest (4c). Any other order starts this step over."
          },
          {
            "spell": "Holy",
            "target": "The pink flower",
            "where": "Head to the south-west, just below the Moogle Nest mound. A clear pink flower has appeared – cast Holy on it and it becomes the Unknown hotspot (marker 5)."
          }
        ],
        "notes": [
          "Holy is a fusion: Life + an attack spell. If you can't cast it, pick up a Life magicite and come back.",
          "The flower only appears after the first four spells – that's why the order matters.",
          "Gurdy's poems during the story are the in-game hints for this puzzle.",
          "The fan sheet labels the result 'Unknown element'; the GameFAQs guide calls it the Holy element and its map chart 'Gold' – they're all the same."
        ],
        "source": "GameFAQs guide (Lynari Desert walkthrough); Guides and extra resources (Unknown Element sidequest); object positions and order from the desert_0 script",
        "mapHint": "Each step is a purple numbered marker on the Area 1 map below, joined by a dotted line in solving order. Positions come from the game's own script."
      }
    },
    {
      "id": "mount-vellenge",
      "name": "Mount Vellenge",
      "order": 14,
      "firstYear": 5,
      "boss": "Meteor Parasite",
      "element": "???",
      "region": "The Abyss",
      "description": "The final dungeon, where the meteor rests. Enemies are at their strongest here.",
      "tips": [
        "The ??? element is required to enter.",
        "This is the last dungeon of the story, so be ready.",
        "The enemies are the strongest in the game."
      ],
      "enemies": {
        "1": [
          "Chimera",
          "Death Knight",
          "Shade",
          "Sphere",
          "Tentacle",
          "Tonberry"
        ],
        "2": [],
        "3": []
      },
      "tiers": null,
      "rewardSets": [],
      "notes": "No cycles and no boss reward sets. Chest and enemy data are stored under cycle \"1\". The ??? element is called the Holy element in the GameFAQs guide. Artifacts found in its chests only help in the final fight.",
      "hotspots": {}
    },
    {
      "id": "nest-of-memories",
      "name": "Nest of Memories",
      "order": 15,
      "firstYear": 5,
      "boss": "Raem",
      "element": null,
      "region": "The Abyss",
      "description": "The final area, reached after Mount Vellenge. Your collected memories matter here.",
      "tips": [
        "The more memories you have, the better (the GameFAQs guide recommends 80+).",
        "Re-read your diary before going in.",
        "Minions are tough; defeat them with magic."
      ],
      "enemies": {
        "1": [
          "Minion",
          "Monstrous Minion"
        ],
        "2": [],
        "3": []
      },
      "chests": {
        "1": [],
        "2": [],
        "3": []
      },
      "tiers": null,
      "rewardSets": [],
      "notes": "No cycles, chests or boss reward sets. Enemy data is stored under cycle \"1\".",
      "hotspots": {}
    }
  ]
};
