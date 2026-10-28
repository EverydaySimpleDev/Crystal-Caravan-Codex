// World: years, towns, miasma streams, events and encounters.
// Edit the values freely (see data/README.md), but keep this first line of code and the final "};".
window.CODEX_DATA.world = {
  "about": "The world of Final Fantasy Crystal Chronicles (GameCube): general rules for myrrh, years and cycles, a year-by-year guide, regions, miasma streams and chalice elements, ferries, towns and their services, family jobs, world-map caravan encounters, side quests and events, missable items, and Mog grooming. `suggestedDungeons` is a suggested route, not a hard limit (only Year 1 is restricted). `missable` is true/false when a source says so, and null when it's unknown. Spoiler-light.",
  "rules": [
    {
      "text": "Each year you collect three drops of myrrh, then return home to Tipa for the myrrh festival and a new year begins.",
      "source": "Guides and extra resources; GameFAQs guide"
    },
    {
      "text": "After you take myrrh from a tree, five more drops must be collected elsewhere before that tree can be harvested again. Each harvest raises that dungeon to its next cycle, with stronger monsters and different items.",
      "source": "Guides and extra resources"
    },
    {
      "text": "You can replay a dungeon whose tree has no myrrh. You still get artifacts and items, but no year passes.",
      "source": "GameFAQs guide"
    },
    {
      "text": "The third drop of myrrh each year always sends you back to Tipa, which changes the year and the miasma stream elements.",
      "source": "Guides and extra resources"
    },
    {
      "text": "Miasma streams change element every year in the order Water → Fire → Wind → Earth. Change the Crystal Chalice's element at a hotspot to match the stream.",
      "source": "Guides and extra resources"
    },
    {
      "text": "Putting the chalice on an element hotspot inside a dungeon lets you leave the dungeon right away.",
      "source": "Guides and extra resources"
    },
    {
      "text": "Bonus conditions are re-rolled if you go back to the world map and enter the dungeon again.",
      "source": "Guides and extra resources"
    },
    {
      "text": "Keep a free inventory slot before finishing a dungeon: reward materials and scrolls can't be collected with a full inventory.",
      "source": "Guides and extra resources"
    },
    {
      "text": "Make characters with every family job on your memory card (even if you don't play them) to open all the family houses in Tipa. Family production goes up by year's end once you speak with that character's father (not needed for the Alchemist).",
      "source": "Guides and extra resources; GameFAQs guide"
    },
    {
      "text": "Secret items (found with Examine in each town) refill after every drop of myrrh.",
      "source": "Guides and extra resources"
    },
    {
      "text": "Saving after a dungeon is wise: some random caravan encounters can take an item or most of your gil. Carrying food lowers the chance of losing a crafting material in these encounters.",
      "source": "Guides and extra resources"
    }
  ],
  "years": [
    {
      "year": 1,
      "goals": [
        "Collect three drops of myrrh.",
        "Learn the basics in River Belle Path.",
        "Change the chalice to Water to cross the first miasma stream."
      ],
      "suggestedDungeons": [
        "River Belle Path",
        "Mushroom Forest",
        "Mine of Cathuriges"
      ],
      "towns": [
        "Tipa",
        "Port Tipa",
        "Marr's Pass",
        "Jegon River (East)"
      ],
      "notes": "Only these three dungeons can be visited in Year 1; it works as a tutorial year. Talk to your family in Tipa every year. You don't need the second level of the Mine of Cathuriges until cycle 2.",
      "source": "Guides and extra resources"
    },
    {
      "year": 2,
      "goals": [
        "Collect three drops of myrrh.",
        "Get a Shella Mark in Veo Lu Sluice if you are not a Yuke."
      ],
      "suggestedDungeons": [
        "Goblin Wall",
        "Veo Lu Sluice",
        "Tida"
      ],
      "towns": [
        "Alfitaria",
        "Shella"
      ],
      "notes": "Clearing Veo Lu Sluice early leads to the fastest finish. The GameFAQs guide does Moschet Manor in Year 2 and Veo Lu Sluice in Year 3 instead. Goblin Wall is the best dungeon to replay this year.",
      "source": "Guides and extra resources"
    },
    {
      "year": 3,
      "goals": [
        "Collect three drops of myrrh.",
        "Cross the Jegon River to reach the Plains of Fum.",
        "Get Mythril weapons and armor ready."
      ],
      "suggestedDungeons": [
        "Moschet Manor",
        "Daemon's Court",
        "Selepation Cave"
      ],
      "towns": [
        "Jegon River (West)",
        "Fields of Fum"
      ],
      "notes": "From Year 3 the ferry can take you across the Jegon River. The Year 1 dungeons reach cycle 2 around now. Selepation Cave and the Mine of Cathuriges (cycle 2) are good places to farm Mythril.",
      "source": "Guides and extra resources"
    },
    {
      "year": 4,
      "goals": [
        "Collect three drops of myrrh.",
        "Have the Water element before crossing the Jegon River for Conall Curach and Rebena Te Ra."
      ],
      "suggestedDungeons": [
        "Kilanda",
        "Conall Curach",
        "Rebena Te Ra"
      ],
      "towns": [],
      "notes": "Kilanda is reached by ferry from Jegon River (East) for 500 gil. There is no Water hotspot across the river, so bring the Water element with you or pay the ferry twice. Cut Mog's hair before Kilanda. None of these dungeons is required.",
      "source": "Guides and extra resources"
    },
    {
      "year": 5,
      "goals": [
        "Get the Unknown (???) chalice element in Lynari Desert.",
        "Refill the Jegon River by casting Life on the pump flowers in Veo Lu Sluice (or wait until Year 8).",
        "Finish the story at Mount Vellenge."
      ],
      "suggestedDungeons": [
        "Lynari Desert",
        "Veo Lu Sluice",
        "Mount Vellenge",
        "Nest of Memories"
      ],
      "towns": [
        "Leuda",
        "Mag Mell"
      ],
      "notes": "The Jegon River dries up in Year 5, cutting off part of the map. The ferry moves to Port Tipa: Lynari Isle costs 300 gil. Mount Vellenge needs the Unknown element. From Year 8 on, the Veo Lu Sluice step can be skipped.",
      "source": "Guides and extra resources"
    },
    {
      "year": 8,
      "goals": [
        "The Jegon River refills by itself; Veo Lu Sluice no longer needs to be revisited."
      ],
      "suggestedDungeons": [],
      "towns": [],
      "notes": "Only matters if you wait until Year 8 or later before tackling Mount Vellenge.",
      "source": "Guides and extra resources"
    }
  ],
  "regions": [
    {
      "name": "Tipa Peninsula",
      "towns": [
        "Tipa",
        "Port Tipa"
      ],
      "dungeons": [
        "River Belle Path",
        "Goblin Wall"
      ]
    },
    {
      "name": "Iron Mine Downs",
      "towns": [
        "Marr's Pass",
        "Jegon River (East)"
      ],
      "dungeons": [
        "Mushroom Forest",
        "Mine of Cathuriges"
      ]
    },
    {
      "name": "Vale of Alfitaria",
      "towns": [
        "Alfitaria"
      ],
      "dungeons": [
        "Tida",
        "Moschet Manor"
      ]
    },
    {
      "name": "Veo Lu",
      "towns": [
        "Shella"
      ],
      "dungeons": [
        "Veo Lu Sluice"
      ]
    },
    {
      "name": "Plains of Fum",
      "towns": [
        "Fields of Fum",
        "Jegon River (West)"
      ],
      "dungeons": [
        "Daemon's Court",
        "Selepation Cave"
      ]
    },
    {
      "name": "Kilanda Islands",
      "towns": [],
      "dungeons": [
        "Kilanda"
      ]
    },
    {
      "name": "Rebena Plains",
      "towns": [],
      "dungeons": [
        "Conall Curach",
        "Rebena Te Ra"
      ]
    },
    {
      "name": "Lynari Isle",
      "towns": [
        "Leuda"
      ],
      "dungeons": [
        "Lynari Desert"
      ]
    },
    {
      "name": "The Abyss",
      "towns": [
        "Mag Mell"
      ],
      "dungeons": [
        "Mount Vellenge",
        "Nest of Memories"
      ]
    }
  ],
  "miasmaStreams": {
    "note": "Element needed to cross each miasma stream. The pattern repeats every 4 years: Year 5 is the same as Year 1, Year 6 as Year 2, and so on.",
    "streams": [
      {
        "code": "EL01",
        "connects": [
          "Tipa Peninsula",
          "Iron Mine Downs"
        ],
        "elements": {
          "1": "Water",
          "2": "Fire",
          "3": "Wind",
          "4": "Earth"
        }
      },
      {
        "code": "EL02",
        "connects": [
          "Iron Mine Downs",
          "Vale of Alfitaria"
        ],
        "elements": {
          "1": "Earth",
          "2": "Water",
          "3": "Fire",
          "4": "Wind"
        }
      },
      {
        "code": "EL03",
        "connects": [
          "Vale of Alfitaria",
          "Veo Lu"
        ],
        "elements": {
          "1": "Wind",
          "2": "Earth",
          "3": "Water",
          "4": "Fire"
        }
      },
      {
        "code": "EL04",
        "connects": [
          "Plains of Fum",
          "Rebena Plains"
        ],
        "elements": {
          "1": "Fire",
          "2": "Wind",
          "3": "Earth",
          "4": "Water"
        }
      },
      {
        "code": "EL05",
        "connects": [
          "Rebena Plains",
          "The Abyss"
        ],
        "elements": {
          "1": "Unknown",
          "2": "Unknown",
          "3": "Unknown",
          "4": "Unknown"
        },
        "notes": "Needs the Unknown (???) element from Lynari Desert. The GameFAQs map chart labels it 'Gold'."
      }
    ],
    "source": "GameFAQs guide",
    "cycleYears": 4,
    "verified": "world.cft flashStreamAttrib picks each stream's element with switch (year & 3) – four cases, so it loops every 4 years. The four cases match the guide's Year 1–4 chart exactly."
  },
  "chaliceElements": [
    {
      "name": "Fire",
      "bonus": "Resist Fire +1",
      "hotspots": [
        "Mine of Cathuriges",
        "Goblin Wall",
        "Moschet Manor"
      ]
    },
    {
      "name": "Water",
      "bonus": "Resist Ice +1",
      "hotspots": [
        "River Belle Path",
        "Mushroom Forest",
        "Moschet Manor"
      ]
    },
    {
      "name": "Wind",
      "bonus": "Resist Lightning +1",
      "hotspots": [
        "River Belle Path",
        "Tida",
        "Selepation Cave"
      ]
    },
    {
      "name": "Earth",
      "bonus": "Resist Poison/Stone +1",
      "hotspots": [
        "Goblin Wall",
        "Tida",
        "Lynari Desert"
      ]
    },
    {
      "name": "Unknown",
      "bonus": "Lets you pass any miasma stream, but gives no resistance.",
      "hotspots": [
        "Lynari Desert"
      ],
      "notes": "Shown as '???' in game; the GameFAQs guide calls it the Holy element. Unlocked by solving a puzzle in Lynari Desert (Gurdy's verses are hints)."
    }
  ],
  "ferries": {
    "note": "Ferryman Tristan. Prices are base prices from the resources sheet (a second price in brackets is listed for both Jegon River routes, without explanation). The GameFAQs guide gives 50 gil to cross the Jegon River.",
    "routes": [
      {
        "stop": "Port Tipa",
        "price": 100,
        "availableFromYear": null,
        "notes": "From Year 5 the ferry runs from Port Tipa to Lynari Isle (300 gil) and the Kilanda Islands."
      },
      {
        "stop": "Jegon River (East)",
        "price": 100,
        "availableFromYear": null,
        "notes": "Listed as 100 (50)."
      },
      {
        "stop": "Jegon River (West)",
        "price": 100,
        "availableFromYear": 3,
        "notes": "Listed as 100 (50). Crossing the river is possible from Year 3."
      },
      {
        "stop": "Kilanda",
        "price": 500,
        "availableFromYear": 4,
        "notes": "Leaving Kilanda you can choose either side of the Jegon River."
      },
      {
        "stop": "Lynari Isle (Leuda)",
        "price": 300,
        "availableFromYear": 5,
        "notes": "Price from the Year 5 walkthrough (Port Tipa → Lynari Isle)."
      }
    ],
    "discounts": "Give Tristan a Kilanda Sulfur for a 20% discount and a Cactus Flower for 50%. With both, he later offers a lifetime Ferry Pass for 50,000 gil.",
    "source": "Guides and extra resources"
  },
  "towns": [
    {
      "name": "Tipa",
      "type": "town",
      "region": "Tipa Peninsula",
      "description": "Your home village and the base for your adventure. Your family lives here, and the myrrh festival is held at the end of each year.",
      "services": [
        "Family",
        "Family houses (Miller, Merchant, Fisherman, Farmer, Blacksmith, Tailor, Alchemist, Rancher)",
        "Blacksmith (family)",
        "Tailor (family)",
        "Merchant (family)",
        "Moogle Nest",
        "Secret item"
      ],
      "notes": "Family houses only open if your memory card has a character with that job. Talk to your family every year. The first Mog Stamp and the Stamp Card come from this Moogle Nest.",
      "source": "GameFAQs guide; Guides and extra resources"
    },
    {
      "name": "Port Tipa",
      "type": "location",
      "region": "Tipa Peninsula",
      "description": "A small harbour near Tipa where Mog teaches the basics.",
      "services": [
        "Moogle Nest",
        "Ferry (from Year 5)"
      ],
      "notes": "In Year 5 the ferry moves here and sails to Lynari Isle and the Kilanda Islands.",
      "source": "GameFAQs guide"
    },
    {
      "name": "Marr's Pass",
      "type": "town",
      "region": "Iron Mine Downs",
      "description": "Lilty crossroads town, once a center of Liltian blacksmithing.",
      "services": [
        "Merchant (materials and scrolls)",
        "Weapon blacksmith",
        "Armor blacksmith",
        "Moogle Nest",
        "Secret item (well)"
      ],
      "notes": "Te Odow, a Selkie peddler, appears here in odd years only. Cecil starts the Love Letter sidequest.",
      "source": "GameFAQs guide; Guides and extra resources"
    },
    {
      "name": "Jegon River (East)",
      "type": "location",
      "region": "Iron Mine Downs",
      "description": "Ferry pier on the east bank of the Jegon River.",
      "services": [
        "Ferry"
      ],
      "notes": "Ferry to the west bank from Year 3 and to the Kilanda Islands from Year 4. The river dries up in Year 5.",
      "source": "GameFAQs guide; Guides and extra resources"
    },
    {
      "name": "Alfitaria",
      "type": "town",
      "region": "Vale of Alfitaria",
      "description": "Large castle town with a huge crystal, once ruled by Lilties.",
      "services": [
        "Blacksmith (weapons and armor)",
        "Merchant (Meat, Fish, Spring Water, Milk)",
        "Selkie peddler (every other year)",
        "Moogle Nest",
        "Secret item"
      ],
      "notes": "Lord Knocfelna starts the princess sidequest here. Game data lists the Selkie peddler here as the even-year stock.",
      "source": "GameFAQs guide; FFCC Notes"
    },
    {
      "name": "Shella",
      "type": "town",
      "region": "Veo Lu",
      "description": "Citadel of the Yukes. Non-Yukes need a Shella Mark to cross the bridge in.",
      "services": [
        "Accessory blacksmith",
        "Merchant (Strange Liquid, Shella Mark)",
        "Scroll merchant (accessory scrolls)",
        "Moogle Nest",
        "Secret item"
      ],
      "notes": "Shella Marks are found in Veo Lu Sluice or bought here (50 gil once inside). Never throw your Mark away: the bridge disappears every time you leave. Talk to De Nam for the Pen Pal sidequest. The locals explain how to refill the Jegon River.",
      "source": "GameFAQs guide; Guides and extra resources"
    },
    {
      "name": "Jegon River (West)",
      "type": "location",
      "region": "Plains of Fum",
      "description": "West bank of the Jegon River.",
      "services": [
        "Ferry",
        "Moogle Nest"
      ],
      "notes": null,
      "source": "GameFAQs guide"
    },
    {
      "name": "Fields of Fum",
      "type": "town",
      "region": "Plains of Fum",
      "description": "Clavat farming town. No blacksmith.",
      "services": [
        "Fruit and vegetable merchant",
        "Selkie peddler (Years 3, 5, 7)",
        "Cow seller (500 gil, sent to your family)",
        "Cow race mini-game",
        "Moogle Nest",
        "Secret item"
      ],
      "notes": "Buying a cow is useful if your family are Ranchers.",
      "source": "GameFAQs guide; Guides and extra resources"
    },
    {
      "name": "Leuda",
      "type": "town",
      "region": "Lynari Isle",
      "description": "Selkie village by the sea.",
      "services": [
        "Materials merchant",
        "Scroll merchant (weapon and Mythril scrolls)",
        "Selkie jump mini-game",
        "Moogle Nest",
        "Secret item",
        "Ferry"
      ],
      "notes": "Unless you are a Selkie, most Selkies here steal 1–10 gil each time you talk to them (children are safe). Cut Mog's hair here before Lynari Desert.",
      "source": "GameFAQs guide"
    },
    {
      "name": "Mag Mell",
      "type": "town",
      "region": "The Abyss",
      "description": "The only settlement in the Abyss, full of sleeping carbuncles in cocoons.",
      "services": [
        "Moogle Nest"
      ],
      "notes": "One carbuncle talks if you visit once a year over several years.",
      "source": "GameFAQs guide; Guides and extra resources"
    }
  ],
  "families": [
    {
      "job": "Miller",
      "description": "Send Wheat Seeds; they eventually send back Flour.",
      "source": "GameFAQs guide"
    },
    {
      "job": "Merchant",
      "description": "Your father runs a shop. Stock grows with family production: first Alloy, Fish, Iron, Meat, Milk and Spring Water, later Mythril, Gold, Silver and shards, then Magma Rock, Chilly Gel and Thunderball, and finally Ultimite and Dark Sphere.",
      "source": "GameFAQs guide"
    },
    {
      "job": "Fisherman",
      "description": "Sends fish every year; more with a better relationship.",
      "source": "GameFAQs guide"
    },
    {
      "job": "Farmer",
      "description": "Send Wheat Seeds for Bannock; after a few years they also send Wheat.",
      "source": "GameFAQs guide"
    },
    {
      "job": "Blacksmith",
      "description": "Forges weapons and armor at home. Better relationship unlocks Mythril, then Diamond gear, then the Greatest Weapon.",
      "source": "GameFAQs guide"
    },
    {
      "job": "Tailor",
      "description": "Makes accessories. Starts with Clockwork and the Crafts; the best relationship unlocks the Ring of Invincibility.",
      "source": "GameFAQs guide"
    },
    {
      "job": "Alchemist",
      "description": "Sends one scroll a year based on your relationship, from worst to best: Iron Armor, Warrior's Weapon, Flame Armor, Clockwork, Mythril Armor, Frost Craft, Lightning Craft, Master's Weapon, Ring of Light, Diamond Armor, Ring of Invincibility, Greatest Weapon.",
      "source": "GameFAQs guide"
    },
    {
      "job": "Rancher",
      "description": "Sends meat each year and later milk. Cows bought in the Fields of Fum can be sent home.",
      "source": "GameFAQs guide"
    }
  ],
  "familiesNote": "Your family sends a letter and a gift after each dungeon. Sending back gifts related to their job improves the relationship, which raises family production and gives better discounts.",
  "events": [
    {
      "name": "Meeting Sol Racht and Stiltzkin",
      "type": "story",
      "where": "World map, near Tipa",
      "when": "Year 1, first departure",
      "what": "The Alfitaria caravan led by Sol Racht greets you. Stiltzkin the moogle gives a combat lesson and you receive your Moogle.",
      "choices": null,
      "missable": false,
      "notes": null,
      "source": "GameFAQs guide"
    },
    {
      "name": "Sol Racht's tales",
      "type": "caravan encounter",
      "where": "World map",
      "when": "Various years",
      "what": "Sol Racht and the Alfitaria caravan share news: monsters that attacked them from behind (a flan, a goblin, a dark flan after Daemon's Court) and rumours about the Black Knight.",
      "choices": null,
      "missable": null,
      "notes": null,
      "source": "Guides and extra resources; GameFAQs guide"
    },
    {
      "name": "Sol Racht's gifts",
      "type": "caravan encounter",
      "where": "World map",
      "when": null,
      "what": "Sol Racht's caravan gives you a Star Carrot or a Striped Apple.",
      "choices": null,
      "missable": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Alfitaria caravan passes by",
      "type": "caravan encounter",
      "where": "World map",
      "when": null,
      "what": "The proud Alfitaria caravan marches past you.",
      "choices": null,
      "missable": null,
      "notes": null,
      "source": "Guides and extra resources; GameFAQs guide"
    },
    {
      "name": "Marr's Pass caravan",
      "type": "caravan encounter",
      "where": "World map",
      "when": "Various years",
      "what": "Scenes with the Lilty caravan from Marr's Pass: found overturned after an attack, chasing monsters, sharing spare weapons or monster bounty, and arguing with the Alfitaria caravan.",
      "choices": null,
      "missable": null,
      "notes": null,
      "source": "Guides and extra resources; GameFAQs guide"
    },
    {
      "name": "Rolf Wood",
      "type": "caravan encounter",
      "where": "World map",
      "when": null,
      "what": "A Lilty of the Marr's Pass caravan. Scenes include asking about your myrrh (gives a Marr Sword), chasing a monster that got away, a tale of a phantom city in a volcanic cavern, and giving you a piece of Jade.",
      "choices": null,
      "missable": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Striped Brigands",
      "type": "caravan encounter",
      "where": "World map",
      "when": "Various years",
      "what": "A band of thieves. They may steal an item, fail because one falls asleep, plot their next job while you eavesdrop, or surround you and demand money.",
      "choices": "When they demand money: hand over a lot of gil, or run them over.",
      "missable": null,
      "notes": "Save after dungeons; these scenes can cost you an item or most of your gil.",
      "source": "Guides and extra resources; GameFAQs guide"
    },
    {
      "name": "Gurdy",
      "type": "caravan encounter",
      "where": "World map",
      "when": "Various years",
      "what": "A lone traveller with no caravan. Each meeting ends with a short verse; the verses are hints for the Lynari Desert puzzle. In one scene a package never arrived.",
      "choices": "Give Gurdy 1000 gil to help (with Sheula), or not. In one Rolf Wood scene you can choose 'Help him.'",
      "missable": null,
      "notes": "Note down his verses.",
      "source": "Guides and extra resources; GameFAQs guide"
    },
    {
      "name": "Fields of Fum caravan",
      "type": "caravan encounter",
      "where": "World map",
      "when": "Various years",
      "what": "The Clavat caravan from Fum (Sheula, Andy, Lulie): shares a meal and gives you a Cherry Cluster, offers Gold or Ogre Fangs for sale, and shares farming tips.",
      "choices": null,
      "missable": null,
      "notes": null,
      "source": "Guides and extra resources; GameFAQs guide"
    },
    {
      "name": "Leuda caravan",
      "type": "caravan encounter",
      "where": "World map",
      "when": "Various years",
      "what": "Dah Yis and Hana Kohl, the Selkie couple from Leuda: bickering, nonchalant greetings, haggling over goods, and a dance on the road.",
      "choices": null,
      "missable": null,
      "notes": null,
      "source": "Guides and extra resources; GameFAQs guide"
    },
    {
      "name": "Amidatty of Shella",
      "type": "caravan encounter",
      "where": "World map",
      "when": "Various years",
      "what": "The Yuke caravan from Shella. Amidatty offers to trade an Iron Shard for a chunk of Gold, sells 'Yukish Wisdom' about monsters (Flan, Orc King, Cockatrice) and lectures you about a loaf of bannock.",
      "choices": "Trade or decline; buy Yukish Wisdom or not.",
      "missable": null,
      "notes": null,
      "source": "Guides and extra resources; GameFAQs guide"
    },
    {
      "name": "Two caravanners run by",
      "type": "caravan encounter",
      "where": "World map",
      "when": null,
      "what": "Two members of a crystal caravan rush past.",
      "choices": null,
      "missable": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "The Princess (A Royal Pain)",
      "type": "side quest",
      "where": "Alfitaria, Marr's Pass, Jegon River (East), Fields of Fum, Leuda",
      "when": "Spans several years; collect a drop of myrrh between most steps",
      "what": "Lord Knocfelna of Alfitaria tells you about the princess. Follow her trail through Te Odow (Marr's Pass, odd years only), Fiona at Jegon River (East), the Fields of Fum and Leuda, then return to Alfitaria.",
      "choices": null,
      "missable": null,
      "notes": "Reward: 100,000 gil. The GameFAQs guide says the final scene comes around Year 6.",
      "source": "Guides and extra resources; GameFAQs guide"
    },
    {
      "name": "Love Letter",
      "type": "side quest",
      "where": "Marr's Pass, Leuda, Tida",
      "when": null,
      "what": "Talk to old Cecil in Marr's Pass and Leu Tipa in Leuda, then search a lone tree near the start of Tida's second area. Show the letter to both, then check the tree again.",
      "choices": null,
      "missable": null,
      "notes": "Reward: updated Leuda merchant stock.",
      "source": "Guides and extra resources"
    },
    {
      "name": "Pen Pal",
      "type": "side quest",
      "where": "Shella, Conall Curach",
      "when": null,
      "what": "Talk to De Nam (a Selkie near Shella's accessory blacksmith). After he sends you 9 letters, a Sahagin in Conall Curach's 3rd area drops his Worn Bandanna.",
      "choices": null,
      "missable": null,
      "notes": "Reward: Worn Bandanna.",
      "source": "Guides and extra resources"
    },
    {
      "name": "The Ferryman",
      "type": "side quest",
      "where": "Kilanda, Lynari Desert, Jegon River ferry",
      "when": "From Year 4",
      "what": "Bring Tristan a Kilanda Sulfur (chest near the boss in Kilanda; guaranteed in cycle 3) and a Cactus Flower (from a cactus in Lynari Desert) for fare discounts, then buy a lifetime Ferry Pass.",
      "choices": null,
      "missable": null,
      "notes": "20% off with one item, 50% with both; Ferry Pass costs 50,000 gil and makes the ferry free.",
      "source": "Guides and extra resources"
    },
    {
      "name": "The Unknown Element",
      "type": "story",
      "where": "Lynari Desert",
      "when": "Year 5",
      "what": "Cast Thunder, Gravity, Fire, Blizzard and then Holy on five things in the desert, in order, to make the Unknown chalice element's hotspot appear.",
      "choices": null,
      "missable": false,
      "notes": "Gurdy's verses are the hints.",
      "source": "Guides and extra resources; GameFAQs guide",
      "link": "dungeons.html?d=lynari-desert#unknown-element"
    },
    {
      "name": "Refilling the Jegon River",
      "type": "story",
      "where": "Veo Lu Sluice",
      "when": "Year 5–7",
      "what": "Cast Life on all six pump flowers in the dried-up Veo Lu Sluice to refill the Jegon River.",
      "choices": null,
      "missable": false,
      "notes": "Optional: the river refills by itself in Year 8.",
      "source": "Guides and extra resources; GameFAQs guide"
    },
    {
      "name": "Not Quite Asleep (Requiem for a Dream)",
      "type": "town event",
      "where": "Mag Mell",
      "when": "Once per year over 6 years",
      "what": "One carbuncle in Mag Mell only snores at first. Visit it in later years to hear its whole story, which mentions travellers named Leon and Hurdy.",
      "choices": null,
      "missable": null,
      "notes": "The GameFAQs guide says it talks from the next year's visit and then over four more years.",
      "source": "Guides and extra resources; GameFAQs guide"
    },
    {
      "name": "The Black Knight's story",
      "type": "story",
      "where": "World map",
      "when": "After the 16th drop of myrrh",
      "what": "Rumours of the Black Knight run through many caravan encounters. A final scene plays after your 16th drop of myrrh.",
      "choices": null,
      "missable": null,
      "notes": null,
      "source": "GameFAQs guide"
    },
    {
      "name": "Daemon's Court bridge bomb",
      "type": "dungeon event",
      "where": "Daemon's Court / Conall Curach",
      "when": null,
      "what": "Destroying the Bomb on the wooden bridge in Daemon's Court twice opens a new path with extra loot in Conall Curach.",
      "choices": null,
      "missable": null,
      "notes": null,
      "source": "Guides and extra resources"
    },
    {
      "name": "Cow race",
      "type": "mini-game",
      "where": "Fields of Fum",
      "when": null,
      "what": "Race cows in the Fields of Fum.",
      "choices": null,
      "missable": false,
      "notes": null,
      "source": "Guides and extra resources; GameFAQs guide"
    },
    {
      "name": "Selkie jump",
      "type": "mini-game",
      "where": "Leuda",
      "when": null,
      "what": "Selkie characters only. Press the button combinations shown while jumping; rolling left or right doubles the points. Prizes: 500+ Bronze, 1,000+ Iron, 2,000+ Mythril, 4,000+ Orichalcum.",
      "choices": null,
      "missable": false,
      "notes": "Points per combo: A/B = 1, AA/BB = 2, AB/BA = 3, AAB/BBA = 4, ABBA/BAAB = 5, ABABA/BABAB = 6. The 4,000+ prize and the 6-point combo are only in the GameFAQs guide.",
      "source": "GameFAQs guide; Guides and extra resources"
    },
    {
      "name": "Mog Stamps",
      "type": "collectible",
      "where": "Moogle Nests",
      "when": null,
      "what": "Collect Mog Stamps from moogle nests in towns and dungeons. Completing stamp sets unlocks maps for the Blazin' Caravans GBA mini-game.",
      "choices": null,
      "missable": false,
      "notes": "23 stamps in total (GameFAQs guide).",
      "source": "GameFAQs guide; Guides and extra resources"
    }
  ],
  "encounters": [
    {
      "who": "Crystal Caravan",
      "scene": "Two Crystal Caravan members run past.",
      "reward": null,
      "choices": null
    },
    {
      "who": "Sol Racht",
      "scene": "Tells you about the Black Knight.",
      "reward": null,
      "choices": null
    },
    {
      "who": "Sol Racht",
      "scene": "A flan attacked his caravan from behind.",
      "reward": null,
      "choices": null
    },
    {
      "who": "Sol Racht",
      "scene": "A goblin attacked his caravan from behind.",
      "reward": null,
      "choices": null
    },
    {
      "who": "Sol Racht",
      "scene": "The Marr's Pass caravan was attacked by the Black Knight; a boy wants revenge for his father.",
      "reward": null,
      "choices": null
    },
    {
      "who": "Sol Racht",
      "scene": "His caravan gives you food.",
      "reward": "Star Carrot",
      "choices": null
    },
    {
      "who": "Sol Racht",
      "scene": "His caravan gives you food.",
      "reward": "Striped Apple",
      "choices": null
    },
    {
      "who": "Alfitaria caravan",
      "scene": "Passes by.",
      "reward": null,
      "choices": null
    },
    {
      "who": "Marr's Pass caravan",
      "scene": "Lilties run after a monster.",
      "reward": null,
      "choices": null
    },
    {
      "who": "Rolf Wood",
      "scene": "Asks whether you've had any luck finding myrrh.",
      "reward": "Marr Sword (+22 Strength)",
      "choices": null
    },
    {
      "who": "Rolf Wood",
      "scene": "Chasing a monster that got away.",
      "reward": null,
      "choices": null
    },
    {
      "who": "Rolf Wood",
      "scene": "Tells you about a phantom city hidden in a volcanic cavern.",
      "reward": null,
      "choices": null
    },
    {
      "who": "Rolf Wood",
      "scene": "Gives you a gift.",
      "reward": "Jade",
      "choices": null
    },
    {
      "who": "Rolf Wood and Gurdy",
      "scene": "Gurdy needs help.",
      "reward": null,
      "choices": "Help him."
    },
    {
      "who": "Striped Brigands",
      "scene": "Steal an item from your caravan.",
      "reward": null,
      "choices": null
    },
    {
      "who": "Striped Brigands",
      "scene": "Try to stall you and steal an item, but fail because one falls asleep.",
      "reward": null,
      "choices": null
    },
    {
      "who": "Striped Brigands",
      "scene": "Discuss their next job while you eavesdrop.",
      "reward": null,
      "choices": null
    },
    {
      "who": "Striped Brigands",
      "scene": "Demand money.",
      "reward": null,
      "choices": "Give them a lot of gil, or run them over."
    },
    {
      "who": "Amidatty",
      "scene": "Asks to trade an Iron Shard for a chunk of Gold.",
      "reward": "Gold",
      "choices": "Trade or decline."
    },
    {
      "who": "Amidatty",
      "scene": "Sells Yukish Wisdom about the Flan.",
      "reward": null,
      "choices": "Buy or decline."
    },
    {
      "who": "Amidatty",
      "scene": "Sells Yukish Wisdom about the Orc King.",
      "reward": null,
      "choices": "Buy or decline."
    },
    {
      "who": "Amidatty",
      "scene": "Sells Yukish Wisdom about the Cockatrice.",
      "reward": null,
      "choices": "Buy or decline."
    },
    {
      "who": "Fields of Fum caravan",
      "scene": "Passes by.",
      "reward": null,
      "choices": null
    },
    {
      "who": "Sheula, Andy and Lulie (Fum)",
      "scene": "Invite you to eat with them.",
      "reward": "Cherry Cluster",
      "choices": null
    },
    {
      "who": "Sheula (Fum)",
      "scene": "Offers to sell you Gold.",
      "reward": null,
      "choices": "Buy or decline."
    },
    {
      "who": "Sheula (Fum)",
      "scene": "Offers to sell you Ogre Fangs.",
      "reward": null,
      "choices": "Buy or decline."
    },
    {
      "who": "Andy (Fum)",
      "scene": "Tells you the secret to growing crops.",
      "reward": null,
      "choices": null
    },
    {
      "who": "Sheula and Gurdy",
      "scene": "Argue about a package that never arrived.",
      "reward": null,
      "choices": "Give Gurdy 1000 gil to help, or not."
    },
    {
      "who": "Dah Yis and Hana Kohl (Leuda)",
      "scene": "The Selkie couple fight with each other.",
      "reward": null,
      "choices": null
    }
  ],
  "encountersNote": "Checklist of random caravan scenes on the world map (from the 'Random Caravan Side Events' list in Guides and extra resources). Which scenes you see depends on the year and on chance.",
  "missables": [
    {
      "name": "Shiny Shard",
      "consequence": "Can't make Gold Armor if missed.",
      "when": "Before cycle 3",
      "source": "Guides and extra resources; FFCC Notes"
    },
    {
      "name": "Novice's Weapon",
      "consequence": "Collector's item only.",
      "when": "Before cycle 3",
      "source": "Guides and extra resources; FFCC Notes"
    },
    {
      "name": "Bronze Armor",
      "consequence": "Collector's item only.",
      "when": "Before cycle 3",
      "source": "Guides and extra resources; FFCC Notes"
    },
    {
      "name": "Gold Armor",
      "consequence": "Can't be crafted without the Shiny Shard.",
      "when": "Before cycle 3",
      "source": "Guides and extra resources; FFCC Notes"
    },
    {
      "name": "Iron Shield",
      "consequence": "Collector's item only.",
      "when": "Before cycle 3",
      "source": "Guides and extra resources; FFCC Notes"
    },
    {
      "name": "Bronze Gloves",
      "consequence": "Collector's item only.",
      "when": "Before cycle 3",
      "source": "Guides and extra resources; FFCC Notes"
    },
    {
      "name": "Bronze Sallet",
      "consequence": "Collector's item only.",
      "when": "Before cycle 3",
      "source": "Guides and extra resources; FFCC Notes"
    },
    {
      "name": "Bronze Belt",
      "consequence": "Collector's item only.",
      "when": "Before cycle 3",
      "source": "Guides and extra resources; FFCC Notes"
    },
    {
      "name": "Eyewear Techniques",
      "consequence": "Replaced by Designer Glasses.",
      "when": "Before cycle 3",
      "source": "Guides and extra resources; FFCC Notes"
    },
    {
      "name": "Soul of the Lion",
      "consequence": null,
      "when": "Before cycle 3",
      "source": "FFCC Notes"
    },
    {
      "name": "Veo Lu Sluice dry-pool chests",
      "consequence": "Eight extra chests (the guides mention frost armors and rare artifacts) are only reachable while the sluice is dry: from Year 5 until Year 8 or until you fix the pumps. They can never be reached again after that.",
      "when": "Year 5 until the river refills",
      "source": "Guides and extra resources; GameFAQs guide"
    }
  ],
  "missablesNote": "Items listed as 'Cycle 3 missable' stop appearing once the dungeons that give them reach cycle 3. Some random world-map caravan encounters also stop happening as the story moves on, so travel the world map often to see them all; the sources don't say exactly which ones.",
  "mogGrooming": {
    "note": "Paint Mog or cut his fur at a Moogle Nest. Effects last for 2 dungeon runs. Mog's colour is linked to the magic and the single-player GBA radar listed below.",
    "colors": [
      {
        "color": "None",
        "magic": "Random",
        "radar": "Area Map"
      },
      {
        "color": "Red",
        "magic": "Fire",
        "radar": "Monster Locator"
      },
      {
        "color": "Blue",
        "magic": "Blizzard",
        "radar": "Chest Locator"
      },
      {
        "color": "Green",
        "magic": "Thunder",
        "radar": "Scouter"
      }
    ],
    "hotDungeons": [
      "Kilanda",
      "Lynari Desert"
    ],
    "coldDungeons": [
      "Tida",
      "Veo Lu Sluice",
      "Selepation Cave",
      "Conall Curach",
      "Rebena Te Ra",
      "Mount Vellenge"
    ],
    "hotNote": "Cut Mog's hair before hot dungeons.",
    "source": "Guides and extra resources; GameFAQs guide"
  },
  "mogStamps": {
    "about": "Moogle Nests hide a moogle who stamps your Stamp Card (you receive the card along with your first stamp) the first time you visit each nest. Collecting the stamps unlocks Blazin' Caravans, a Game Boy Advance multiplayer racing mini-game.",
    "card": "23 stamps on one card, laid out in four rows (1–6, 7–11, 12–17, 18–23) of an irregular grid; one slot in the second row is blank. The GameFAQs guide says each stamp belongs to a set, but neither source spells out which stamps form which set.",
    "sets": [
      {
        "name": "Full card",
        "stamps": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23
        ],
        "reward": "Blazin' Caravans (GBA multiplayer mini-game). One guide says it unlocks once every stamp is collected, GameFAQs says completing a set unlocks it, and the side-quest table lists the reward as Blazin' Caravans maps."
      }
    ],
    "stamps": [
      {
        "number": 1,
        "name": null,
        "where": "Moschet Manor",
        "kind": "dungeon",
        "dungeonId": "moschet-manor",
        "how": "In the middle room on the left side of the manor, circle the big table on its west side until you can examine a hole between a chair and the table.",
        "notes": null
      },
      {
        "number": 2,
        "name": null,
        "where": "The Mine of Cathuriges",
        "kind": "dungeon",
        "dungeonId": "mine-of-cathuriges",
        "how": "Near the end of the mine, follow a mine-cart track off to the left (west) to its dead end and examine it.",
        "notes": null
      },
      {
        "number": 3,
        "name": null,
        "where": "Tida",
        "kind": "dungeon",
        "dungeonId": "tida",
        "how": "Examine the crack in the ruined, deserted house across the chasm north of the entrance, reached by looping right, over the small bridge and past the vine-covered pedestal door.",
        "notes": null
      },
      {
        "number": 4,
        "name": null,
        "where": "The Goblin Wall",
        "kind": "dungeon",
        "dungeonId": "goblin-wall",
        "how": "In the first area, hit the skull switch on the upper level to open the gated alcove at the far left, then examine the back of that alcove.",
        "notes": null
      },
      {
        "number": 5,
        "name": null,
        "where": "Port Tipa",
        "kind": "town",
        "dungeonId": null,
        "how": "Head down the path from the entrance to a cave/hole in plain view and go inside.",
        "notes": "GameFAQs: this is where you get your second stamp."
      },
      {
        "number": 6,
        "name": null,
        "where": "The Mushroom Forest",
        "kind": "dungeon",
        "dungeonId": "mushroom-forest",
        "how": "Ride the mushroom platform up to the treasure-chest ledge at the far top right, then examine the mushroom wall to the right of the chest.",
        "notes": null
      },
      {
        "number": 7,
        "name": null,
        "where": "Mount Vellenge",
        "kind": "dungeon",
        "dungeonId": "mount-vellenge",
        "how": "Take the left path before the second area; past the second dark crystal, examine the right-hand wall under a stone bridge/overpass.",
        "notes": null
      },
      {
        "number": 8,
        "name": null,
        "where": "Mag Mell",
        "kind": "town",
        "dungeonId": null,
        "how": "Walk around behind the big cocoon (first left, then right at the next split) until you can examine a small hidden hole.",
        "notes": null
      },
      {
        "number": 9,
        "name": null,
        "where": "Lynari Desert",
        "kind": "dungeon",
        "dungeonId": "lynari-desert",
        "how": "From an opening on the north side of the far west of the first area, follow the path south to a dead end; the nest is in the alcove behind the chest and breakable cacti.",
        "notes": null
      },
      {
        "number": 10,
        "name": null,
        "where": "Conall Curach",
        "kind": "dungeon",
        "dungeonId": "conall-curach",
        "how": "In the second area, take the south branch of the four-way split to the big open area at the end and examine a small hole behind the tree.",
        "notes": "GameFAQs calls this dungeon \"Conall Church\"."
      },
      {
        "number": 11,
        "name": null,
        "where": "Daemon's Court",
        "kind": "dungeon",
        "dungeonId": "daemons-court",
        "how": "Go around the left side of the central fortress to its back wall without climbing stairs, and examine the wall under the steps on the right.",
        "notes": null
      },
      {
        "number": 12,
        "name": null,
        "where": "The Fields of Fum",
        "kind": "town",
        "dungeonId": null,
        "how": "From the entrance follow the southern road (hugging the right side) to a small wooden door set into the ground.",
        "notes": null
      },
      {
        "number": 13,
        "name": null,
        "where": "Rebena Te Ra",
        "kind": "dungeon",
        "dungeonId": "rebena-te-ra",
        "how": "In the second area, solve the floor and switch puzzles in the northeast, bring the key back to the pedestal, then examine the well-like hole just east of where the paths meet.",
        "notes": null
      },
      {
        "number": 14,
        "name": null,
        "where": "Alfitaria",
        "kind": "town",
        "dungeonId": null,
        "how": "Cross the bridge, go right to the end of town, take the stairs down and follow the canal path west to its end.",
        "notes": null
      },
      {
        "number": 15,
        "name": null,
        "where": "Shella",
        "kind": "town",
        "dungeonId": null,
        "how": "Past the first bridge, examine the tree stump behind the house next to the two merchants.",
        "notes": null
      },
      {
        "number": 16,
        "name": null,
        "where": "Marr's Pass",
        "kind": "town",
        "dungeonId": null,
        "how": "Take the wooden steps down on the left (west) side of town and examine the small hole in the wall.",
        "notes": null
      },
      {
        "number": 17,
        "name": null,
        "where": "Selepation Cave",
        "kind": "dungeon",
        "dungeonId": "selepation-cave",
        "how": "From the second area, take the middle path back out to the first area and follow it south to the stairs near two chests that lead down to the hole.",
        "notes": null
      },
      {
        "number": 18,
        "name": null,
        "where": "Tipa",
        "kind": "town",
        "dungeonId": null,
        "how": "Walk around behind the town crystal and examine the small door there.",
        "notes": "Your first stamp and the Stamp Card come from here (ask \"What's a Mog Stamp?\")."
      },
      {
        "number": 19,
        "name": null,
        "where": "West Jegon River",
        "kind": "town",
        "dungeonId": null,
        "how": "After taking the ferry to the west bank, look for the hole in the hillside by the sign near the entrance, through an opening in the fence.",
        "notes": null
      },
      {
        "number": 20,
        "name": null,
        "where": "River Belle Path",
        "kind": "dungeon",
        "dungeonId": "river-belle-path",
        "how": "Examine the round stone/boulder against the wall at a dead end beside a chest to reveal the hole.",
        "notes": "Guides disagree on directions: GameFAQs says the far right of the north wall, another guide says far left up a long dead-end path (marked \"C\" on its map), a third says southeast past the bridge after the first door."
      },
      {
        "number": 21,
        "name": null,
        "where": "Leuda",
        "kind": "town",
        "dungeonId": null,
        "how": "On the top level, go west/northwest to the pink tent, slip behind it and climb the small hill to a door behind the house.",
        "notes": null
      },
      {
        "number": 22,
        "name": null,
        "where": "Kilanda",
        "kind": "dungeon",
        "dungeonId": "kilanda",
        "how": "After crossing the first bridge (raised with the pot), head east; the nest hides behind the chest.",
        "notes": "Only the side-quest table describes this one."
      },
      {
        "number": 23,
        "name": null,
        "where": "Veo Lu Sluice",
        "kind": "dungeon",
        "dungeonId": "veo-lu-sluice",
        "how": "At the boss gate, go north around the pool and then east along a dead end against the wall/cliff and examine it.",
        "notes": null
      }
    ],
    "source": "GameFAQs FFCC walkthrough (Moogle Nests section and walkthrough; stamp numbering follows its card), a second fan guide's \"[952] Moogle Stamps\" section, and a fan side-quest table (\"Moogle Nest Locations\") in Guides and extra resources.txt."
  }
};
