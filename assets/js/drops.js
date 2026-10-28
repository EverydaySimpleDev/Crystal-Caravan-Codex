/*
  Boss reward ("end of dungeon artifact") odds.

  How the game does it:
    - Every dungeon has 8 reward sets of 4 items.
    - The dungeon's cycle decides which 4 sets are in play, and your bonus
      points decide how many of those 4 are unlocked (see rewardSetRules in
      dungeons.json).
    - One unlocked set is picked at random, each with equal weight, and you
      choose an item from it.

  So the chance of being offered an item = (unlocked sets containing it) /
  (number of unlocked sets). This matches the percentages in the Ultimania
  artifact chart (100% / 50% / 33% / 25%).
*/
(() => {
  const TIER_KEYS = ["A", "B", "C"];

  /* Which set numbers (1-8) a cycle can award, and what each one needs. */
  function setsForCycle(rules, cycle) {
    const row = rules.table[String(cycle)] ?? {};
    return Object.entries(row).map(([setNumber, requirement]) => ({
      set: Number(setNumber),
      requirement,
    }));
  }

  /* Points needed to unlock a requirement ("always" or a tier letter). */
  function pointsNeeded(dungeon, requirement, players) {
    if (requirement === "always") return 0;
    const thresholds = dungeon.tiers?.[requirement];
    return thresholds ? thresholds[players - 1] ?? null : null;
  }

  /*
    Everything the calculator needs for one situation.
    Returns each candidate set with whether it's unlocked, plus the per-item odds.
  */
  function rewardOdds(dungeon, rules, { cycle, players, points }) {
    const sets = setsForCycle(rules, cycle).map(({ set, requirement }) => {
      const needed = pointsNeeded(dungeon, requirement, players);
      const unlocked = needed !== null && points >= needed;
      return { set, requirement, needed, unlocked, items: dungeon.rewardSets?.[set - 1] ?? [] };
    });

    const unlocked = sets.filter((s) => s.unlocked);
    const setChance = unlocked.length ? 1 / unlocked.length : 0;

    const itemChances = new Map();
    for (const s of unlocked) {
      // An item listed twice in the same set doesn't make that set more likely.
      for (const item of new Set(s.items)) {
        itemChances.set(item, (itemChances.get(item) ?? 0) + setChance);
      }
    }

    return {
      sets: sets.map((s) => ({ ...s, chance: s.unlocked ? setChance : 0 })),
      items: [...itemChances.entries()]
        .map(([item, chance]) => ({ item, chance }))
        .sort((a, b) => b.chance - a.chance || a.item.localeCompare(b.item)),
    };
  }

  /*
    For one item, list every dungeon/cycle/points band where a boss can give it,
    best odds first. Each band is "score at least X (and below the next tier)".
  */
  function bestPlacesFor(itemName, dungeons, rules, players = 1) {
    const results = [];
    for (const dungeon of dungeons) {
      if (!dungeon.rewardSets?.length) continue;
      for (const cycle of [1, 2, 3]) {
        const bands = scoreBands(dungeon, rules, cycle, players);
        for (const band of bands) {
          const odds = rewardOdds(dungeon, rules, { cycle, players, points: band.min });
          const hit = odds.items.find((i) => i.item === itemName);
          if (hit) {
            results.push({ dungeon, cycle, min: band.min, max: band.max, chance: hit.chance });
          }
        }
      }
    }
    return results.sort((a, b) => b.chance - a.chance || a.min - b.min || a.cycle - b.cycle);
  }

  /* The distinct point ranges for a dungeon/cycle: 0+, tier A+, tier B+, tier C+. */
  function scoreBands(dungeon, rules, cycle, players) {
    const starts = setsForCycle(rules, cycle)
      .map(({ requirement }) => pointsNeeded(dungeon, requirement, players))
      .filter((v) => v !== null);
    const unique = [...new Set(starts)].sort((a, b) => a - b);
    return unique.map((min, i) => ({ min, max: i + 1 < unique.length ? unique[i + 1] - 1 : null }));
  }

  /* A chest that lists several items picks one at random. */
  function chestChance(items) {
    return items?.length ? 1 / items.length : 0;
  }

  window.Codex.drops = {
    TIER_KEYS,
    setsForCycle,
    pointsNeeded,
    rewardOdds,
    bestPlacesFor,
    scoreBands,
    chestChance,
  };
})();
