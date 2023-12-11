import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { toNumber } from "./util/toNumber.ts";

Deno.test("Day 5: If You Give A Seed A Fertilizer", async (t) => {
  await t.step("Part 1", async (t) => {
    await t.step("Example", async (t) => {
      await t.step("Map example", async (t) => {
        // Consider again the example seed-to-soil map:
        const seedToSoil = seedMap([
          /*
            The first line has a destination range start of 50, a source range start of 98, and a range length of 2. This line means that the source range starts at 98 and contains two values: 98 and 99. The destination range is the same length, but it starts at 50, so its two values are 50 and 51.
            */
          `50 98 2`,
          /*
            The second line means that the source range starts at 50 and contains 48 values: 50, 51, ..., 96, 97. This corresponds to a destination range starting at 52 and also containing 48 values: 52, 53, ..., 98, 99.
            */
          `52 50 48`,
        ]);
        for (
          const [seed, soil] of [
            // With this information, you know that seed number 98 corresponds to soil number 50 and that seed number 99 corresponds to soil number 51.
            [98, 50],
            [99, 51],
            // So, seed number 53 corresponds to soil number 55.
            [53, 55],
            // Any source numbers that aren't mapped correspond to the same destination number. So, seed number 10 corresponds to soil number 10.
            [10, 10],
            // With this map, you can look up the soil number required for each initial seed number:
            [79, 81],
            [14, 14],
            [55, 57],
            [13, 13],
          ]
        ) {
          await t.step(
            `Seed number ${seed} corresponds to soil number ${soil}`,
            () => assertEquals(seedToSoil(seed), soil),
          );
        }
      });

      await t.step("Almanac example", async () => {
        const example = almanac(
          (await Deno.readTextFile("./input/day05.example.txt")).split("\n"),
        );

        /*
        Using these maps, find the lowest location number that corresponds to any of the initial seeds. To do this, you'll need to convert each seed number through other categories until you can find its corresponding location number. In this example, the corresponding types are:
        */
        assertEquals(example, new Set([82, 43, 86, 35]));

        // So, the lowest location number in this example is 35.
        assertEquals(lowest(example), 35);
      });
    });

    await t.step("Solution", async () => {
      const solution = almanac(
        (await Deno.readTextFile("./input/day05.txt")).split("\n"),
      );
      assertEquals(lowest(solution), 403695602);
    });
  });

  await t.step("Part 2", async (t) => {
    await t.step("Example", async () => {
      const example = lowestSeedRange(
        (await Deno.readTextFile("./input/day05.example.txt")).split("\n"),
      );
      assertEquals(example, 46);
    });
    /**
     * FIXME: Completes after ~5 minutes
     * This should be optimizable by
     * - combining all the maps into one final map
     * - reverting the algorithm to start at the lowest positions until a matching seed is found.
    await t.step("Solution", async () => {
      const solution = lowestSeedRange(
        (await Deno.readTextFile("./input/day05.txt")).split("\n")
      );
      assertEquals(solution, 219529182);
    });
     */
  });
});

const lowest = (numbers: Set<number>) => Math.min(...numbers.values());

const rangeRx =
  /^(?<destRangeStart>\d+) (?<sourceRangeStart>\d+) (?<rangeLength>\d+)$/;

const seedMap = (ranges: string[]) => {
  // Parse the lines
  const r = ranges
    .map(
      (range) =>
        Object.values(rangeRx.exec(range)?.groups ?? {}).map((s) =>
          parseInt(s, 10)
        ) as [number, number, number],
    )
    .map(([destRangeStart, sourceRangeStart, rangeLength]) => ({
      destRangeStart,
      sourceRangeStart,
      // Calculate the end of the range
      sourceRangeEnd: sourceRangeStart + rangeLength,
      rangeLength,
    }));
  return (seed: number): number => {
    // find a matching range
    const range = r.find(
      ({ sourceRangeStart, sourceRangeEnd }) =>
        sourceRangeStart <= seed && sourceRangeEnd >= seed,
    );
    if (range === undefined) return seed;
    return seed + range.destRangeStart - range.sourceRangeStart;
  };
};

const almanac = (almanac: string[]) => {
  // Get the seeds from the first line
  const seeds = almanac[0].split(":")[1].trim().split(" ").map(toNumber);

  // Read in all the map ranges
  const maps = almanacToMaps(almanac);

  return mapSeeds(seeds, maps);
};

const lowestSeedRange = (almanac: string[]): number => {
  // Get the seed pairs from the first line
  const seedPairs = almanac[0]
    .split(":")[1]
    .trim()
    .matchAll(/(\d+ \d+)+/g);

  // Read in all the map ranges
  const maps = almanacToMaps(almanac);

  let lowest = Number.MAX_SAFE_INTEGER;
  for (const pair of seedPairs) {
    const [start, length] = pair[0].split(" ").map(toNumber);
    for (let i = start; i < start + length; i++) {
      lowest = Math.min(
        maps.reduce((mapped, seedMap) => seedMap(mapped), i),
        lowest,
      );
    }
  }

  return lowest;
};

// Pass each seed through each map
const mapSeeds = (
  seeds: number[],
  maps: Array<(seed: number) => number>,
): Set<number> =>
  new Set<number>(
    seeds.map((seed) =>
      maps.reduce((mapped, seedMap) => seedMap(mapped), seed)
    ),
  );

/**
 * Parses the almanac to maps
 */
const almanacToMaps = (almanac: string[]): Array<(seed: number) => number> => {
  const mapRanges: Array<Array<string>> = [[]];
  let i = 0;
  // Skip first three lines
  for (const line of almanac.slice(3)) {
    if (line === "") continue; // Ignore blank lines
    if (rangeRx.test(line) === false) {
      // Use non-range line to start a new map
      mapRanges[++i] = [];
      continue;
    }
    mapRanges[i].push(line);
  }

  // Convert to maps
  return mapRanges.map(seedMap);
};
