// Tribes: base stats, frame data and status durations.
// Edit the values freely (see data/README.md), but keep this first line of code and the final "};".
window.CODEX_DATA.tribes = {
  about:
    "The four playable tribes of Final Fantasy Crystal Chronicles (GameCube): base stats, equipment types, combat timings, magic modifiers, status-effect durations, favourite food, miasma damage rate and tribe-only perks. Timings come from the Ultimania p.219 tribe chart (translated by Linitaa, FFCC speedrun Discord). Every timing is stored as { frames, seconds }; the game runs at 30 fps, so seconds = frames / 30.",
  fps: 30,
  frameNote:
    "Frame counts are taken from the Ultimania chart; seconds = frames / 30, rounded to 2 decimals. Auto-attack values are cumulative: the frame on which each hit of the 3-hit combo lands, counted from the first A press. Speedrunners say the Ultimania auto-attack frames don't always match their own frame tests, so an alternative set measured by Wob is given in `autoAttack.alternateFrames`. Where a tribe has no male/female difference the value is in `all` and `male`/`female` are null (and the other way round). Status durations are how long an effect lasts when this tribe inflicts it on an enemy (Haste: when cast on yourself). In multiplayer fusions, the first caster sets the duration and the damage.",
  statusDurationsNote:
    "Duration of a status effect when this tribe causes it. Stun is presumably the stun that an auto-attack combo can cause (translator's note).",
  source:
    "Ultimania p.219 (translation: 'FFCC - Differences between tribes' sheet)",
  tribes: [
    {
      name: "Clavat",
      summary:
        "Balanced tribe and defense specialist. Moderate strength, good defense and good magic.",
      weapon: "Sword",
      armorPiece: "Shield",
      baseStats: {
        str: 6,
        def: 7,
        mag: 13,
      },
      autoAttack: {
        frames: {
          all: null,
          male: [
            {
              frames: 18,
              seconds: 0.6,
            },
            {
              frames: 30,
              seconds: 1,
            },
            {
              frames: 41,
              seconds: 1.37,
            },
          ],
          female: [
            {
              frames: 25,
              seconds: 0.83,
            },
            {
              frames: 37,
              seconds: 1.23,
            },
            {
              frames: 51,
              seconds: 1.7,
            },
          ],
        },
        alternateFrames: {
          male: [16, 28, 41],
          female: [15, 27, 42],
        },
        alternateSource: "Wob (FFCC speedrun community frame tests)",
      },
      defenseCommand:
        "Shield block: protects from attacks from the front only.",
      focusChargeFrames: {
        all: null,
        male: {
          frames: 19,
          seconds: 0.63,
        },
        female: {
          frames: 20,
          seconds: 0.67,
        },
      },
      castStartFrames: {
        frames: 12,
        seconds: 0.4,
      },
      casting: {
        extraFrames: {
          frames: 5,
          seconds: 0.17,
        },
        rangeBonus: 5,
      },
      statusDurations: {
        burn: {
          frames: 280,
          seconds: 9.33,
        },
        freeze: {
          frames: 105,
          seconds: 3.5,
        },
        paralysis: {
          frames: 175,
          seconds: 5.83,
        },
        stun: {
          frames: 35,
          seconds: 1.17,
        },
        slow: {
          frames: 350,
          seconds: 11.67,
        },
        stop: {
          frames: 175,
          seconds: 5.83,
        },
        haste: {
          frames: 1400,
          seconds: 46.67,
        },
        holyOnGhosts: {
          frames: 350,
          seconds: 11.67,
        },
        gravityOnFlyers: {
          frames: 245,
          seconds: 8.17,
        },
      },
      favoriteFood: "Striped Apple",
      miasmaDamageInterval: {
        frames: 40,
        seconds: 1.33,
      },
      grades: {
        castTime: "B",
        range: "B",
        statusDuration: "B",
        miasmaDamageFrequency: "C",
      },
      perks: [
        "Can reach higher defense than any other tribe thanks to the Gaia armor and the Chocobo Shield.",
      ],
      notes:
        "focusChargeFrames = frames between starting to hold A and the focus attack starting to charge. castStartFrames = frames between starting to hold A and starting to cast. `grades` (A = best) come from the community tips sheet in 'Online resources'. The Ultimania chart spells the favourite food 'Stripped apple'.",
    },
    {
      name: "Lilty",
      summary:
        "Strength specialist with the best defense of the four tribes, but the weakest magic and the slowest casting.",
      weapon: "Spear",
      armorPiece: "Gloves",
      baseStats: {
        str: 8,
        def: 8,
        mag: 10,
      },
      autoAttack: {
        frames: {
          all: [
            {
              frames: 25,
              seconds: 0.83,
            },
            {
              frames: 37,
              seconds: 1.23,
            },
            {
              frames: 51,
              seconds: 1.7,
            },
          ],
          male: null,
          female: null,
        },
        alternateFrames: {
          male: [15, 26, 40],
          female: [15, 26, 40],
        },
        alternateSource: "Wob (FFCC speedrun community frame tests)",
      },
      defenseCommand: "Guard: protects from attacks from the front only.",
      focusChargeFrames: {
        all: {
          frames: 19,
          seconds: 0.63,
        },
        male: null,
        female: null,
      },
      castStartFrames: {
        frames: 15,
        seconds: 0.5,
      },
      casting: {
        extraFrames: {
          frames: 15,
          seconds: 0.5,
        },
        rangeBonus: 0,
      },
      statusDurations: {
        burn: {
          frames: 200,
          seconds: 6.67,
        },
        freeze: {
          frames: 75,
          seconds: 2.5,
        },
        paralysis: {
          frames: 125,
          seconds: 4.17,
        },
        stun: {
          frames: 25,
          seconds: 0.83,
        },
        slow: {
          frames: 250,
          seconds: 8.33,
        },
        stop: {
          frames: 125,
          seconds: 4.17,
        },
        haste: {
          frames: 1000,
          seconds: 33.33,
        },
        holyOnGhosts: {
          frames: 250,
          seconds: 8.33,
        },
        gravityOnFlyers: {
          frames: 175,
          seconds: 5.83,
        },
      },
      favoriteFood: "Meat",
      miasmaDamageInterval: {
        frames: 35,
        seconds: 1.17,
      },
      grades: {
        castTime: "D",
        range: "C",
        statusDuration: "D",
        miasmaDamageFrequency: "D",
      },
      perks: [
        "Can reach higher strength than any other tribe thanks to the Longinus weapon.",
      ],
      notes:
        "Lilties take miasma damage most often (every 35 frames) and their status effects last the shortest time.",
    },
    {
      name: "Yuke",
      summary:
        "Magic specialist: highest magic, fastest casting, longest spell range and longest status durations, but the lowest strength and defense.",
      weapon: "Hammer",
      armorPiece: "Sallet",
      baseStats: {
        str: 5,
        def: 5,
        mag: 15,
      },
      autoAttack: {
        frames: {
          all: [
            {
              frames: 25,
              seconds: 0.83,
            },
            {
              frames: 37,
              seconds: 1.23,
            },
            {
              frames: 51,
              seconds: 1.7,
            },
          ],
          male: null,
          female: null,
        },
        alternateFrames: {
          male: [14, 27, 42],
          female: [14, 27, 43],
        },
        alternateSource: "Wob (FFCC speedrun community frame tests)",
      },
      defenseCommand:
        "Invincible for as long as A is held, but cannot move or act meanwhile.",
      focusChargeFrames: {
        all: {
          frames: 19,
          seconds: 0.63,
        },
        male: null,
        female: null,
      },
      castStartFrames: {
        frames: 10,
        seconds: 0.33,
      },
      casting: {
        extraFrames: {
          frames: 0,
          seconds: 0,
        },
        rangeBonus: 10,
      },
      statusDurations: {
        burn: {
          frames: 320,
          seconds: 10.67,
        },
        freeze: {
          frames: 120,
          seconds: 4,
        },
        paralysis: {
          frames: 200,
          seconds: 6.67,
        },
        stun: {
          frames: 40,
          seconds: 1.33,
        },
        slow: {
          frames: 400,
          seconds: 13.33,
        },
        stop: {
          frames: 200,
          seconds: 6.67,
        },
        haste: {
          frames: 1600,
          seconds: 53.33,
        },
        holyOnGhosts: {
          frames: 400,
          seconds: 13.33,
        },
        gravityOnFlyers: {
          frames: 280,
          seconds: 9.33,
        },
      },
      favoriteFood: "Star Carrot",
      miasmaDamageInterval: {
        frames: 50,
        seconds: 1.67,
      },
      grades: {
        castTime: "A",
        range: "A",
        statusDuration: "A",
        miasmaDamageFrequency: "A",
      },
      perks: [
        "Can enter Shella without a Shella Mark.",
        "Strange Liquid restores two hearts instead of one.",
      ],
      notes:
        "Yukes are the casting-time baseline (no extra frames added) and take miasma damage least often.",
    },
    {
      name: "Selkie",
      summary:
        "Speed specialist (apart from magic): the fastest focus-attack charge, with moderate stats.",
      weapon: "Racket",
      armorPiece: "Belt",
      baseStats: {
        str: 7,
        def: 6,
        mag: 12,
      },
      autoAttack: {
        frames: {
          all: null,
          male: [
            {
              frames: 24,
              seconds: 0.8,
            },
            {
              frames: 36,
              seconds: 1.2,
            },
            {
              frames: 51,
              seconds: 1.7,
            },
          ],
          female: [
            {
              frames: 25,
              seconds: 0.83,
            },
            {
              frames: 37,
              seconds: 1.23,
            },
            {
              frames: 51,
              seconds: 1.7,
            },
          ],
        },
        alternateFrames: {
          male: [14, 28, 38],
          female: [16, 29, 43],
        },
        alternateSource: "Wob (FFCC speedrun community frame tests)",
      },
      defenseCommand:
        "Dodge: brief invincibility when A is pressed, with a slight backwards movement.",
      focusChargeFrames: {
        all: {
          frames: 18,
          seconds: 0.6,
        },
        male: null,
        female: null,
      },
      castStartFrames: {
        frames: 10,
        seconds: 0.33,
      },
      casting: {
        extraFrames: {
          frames: 10,
          seconds: 0.33,
        },
        rangeBonus: 0,
      },
      statusDurations: {
        burn: {
          frames: 240,
          seconds: 8,
        },
        freeze: {
          frames: 90,
          seconds: 3,
        },
        paralysis: {
          frames: 150,
          seconds: 5,
        },
        stun: {
          frames: 30,
          seconds: 1,
        },
        slow: {
          frames: 300,
          seconds: 10,
        },
        stop: {
          frames: 150,
          seconds: 5,
        },
        haste: {
          frames: 1200,
          seconds: 40,
        },
        holyOnGhosts: {
          frames: 300,
          seconds: 10,
        },
        gravityOnFlyers: {
          frames: 210,
          seconds: 7,
        },
      },
      favoriteFood: "Fish",
      miasmaDamageInterval: {
        frames: 45,
        seconds: 1.5,
      },
      grades: {
        castTime: "C",
        range: "C",
        statusDuration: "C",
        miasmaDamageFrequency: "B",
      },
      perks: [
        "Not robbed of gil when talking to the inhabitants of Leuda.",
        "Can read the text stones in Conall Curach.",
        "Can play the jumping mini-game in Leuda.",
      ],
      notes:
        "The Ultimania chart gives the 3rd auto-attack hit as 51 frames for both genders (only hits 1 and 2 differ).",
    },
  ],
  autoAttackNote:
    "This part of the Ultimania chart is disputed: the frame number should be when the hit lands after pressing A, but community frame tests don't always match. `alternateFrames` are Wob's measurements (plain frame numbers, hits 1/2/3).",
  castingNote:
    "Each spell has its own base casting time. `casting.extraFrames` is how many frames this tribe adds on top of it (Yuke = base, nothing added; Lilty adds 15). `rangeBonus` is the chart's spell-range modifier ('Base' = 0); the chart gives no unit.",
  foods: [
    {
      name: "Meat",
      effect: "Strength +2",
      source: "GameFAQs guide",
    },
    {
      name: "Fish",
      effect: "Strength +2",
      source: "GameFAQs guide",
    },
    {
      name: "Gourd Potato",
      effect: "Defense +2",
      source: "GameFAQs guide",
    },
    {
      name: "Star Carrot",
      effect: "Defense +2",
      source: "GameFAQs guide",
    },
    {
      name: "Round Corn",
      effect: "Defense +2",
      source: "GameFAQs guide",
    },
    {
      name: "Striped Apple",
      effect: "Magic +2",
      source: "GameFAQs guide",
    },
    {
      name: "Rainbow Grapes",
      effect: "Magic +2",
      source: "GameFAQs guide",
    },
    {
      name: "Cherry Cluster",
      effect: "Magic +2",
      source: "GameFAQs guide",
    },
  ],
  foodNotes: [
    "Eating food restores health and gives a stat bonus. The community tips sheet says you still get the stat bonus even if your character dislikes the food, but the GameFAQs guide says disliked food may lower stats instead. (Sources disagree.)",
    "Stat bonuses from food last until the next screen transition.",
    "Health recovered is listed as 0.5–1.5, 2–2.5 and 3–5 hearts depending on the food (the community tips sheet gives the three ranges without saying which foods they apply to).",
    "The more often a character eats a food, the more they grow to like it; eating your least favourite food repeatedly eventually makes every food a favourite.",
  ],
};
