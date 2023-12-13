import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { sum } from "./util/sum.ts";
import { uniqueCombinations } from "./util/uniqueCombinations.ts";
import { manhattanDistance } from "./util/manhattanDistance.ts";

Deno.test("Day 11: Cosmic Expansion", async (t) => {
  await t.step("Part 1", async (t) => {
    await t.step("Part 1", async (t) => {
      await t.step("Example", () =>
        assertEquals(
          sum(
            galaxyPathes(
              galaxyPositions(
                expand([
                  `...#......`,
                  `.......#..`,
                  `#.........`,
                  `..........`,
                  `......#...`,
                  `.#........`,
                  `.........#`,
                  `..........`,
                  `.......#..`,
                  `#...#.....`,
                ])
              )
            ).map(([, , length]) => length)
          ),
          374
        )
      );

      await t.step("it should solve", async () =>
        assertEquals(
          sum(
            galaxyPathes(
              galaxyPositions(
                expand(
                  (await Deno.readTextFile("./input/day11.txt")).split("\n")
                )
              )
            ).map(([, , length]) => length)
          ),
          10165598
        )
      );
    });

    await t.step("expand()", () =>
      assertEquals(
        expand([
          `...#......`,
          `.......#..`,
          `#.........`,
          `..........`,
          `......#...`,
          `.#........`,
          `.........#`,
          `..........`,
          `.......#..`,
          `#...#.....`,
        ]),
        [
          `....#........`,
          `.........#...`,
          `#............`,
          `.............`,
          `.............`,
          `........#....`,
          `.#...........`,
          `............#`,
          `.............`,
          `.............`,
          `.........#...`,
          `#....#.......`,
        ]
      )
    );
  });
  await t.step("rotate map", async (t) => {
    await t.step("rotateLeft()", () =>
      assertEquals(rotateLeft([`123`, `456`]), [`36`, `25`, `14`])
    );

    await t.step("rotateRight()", () =>
      assertEquals(rotateRight([`36`, `25`, `14`]), [`123`, `456`])
    );
  });
});

const rotateLeft = (map: Array<string>): Array<string> => {
  const res: Array<Array<string>> = [];
  const w = map[0].length;
  for (let col = 0; col < w; col++) {
    for (let row = 0; row < map.length; row++) {
      const i = w - col - 1;
      if (res[i] === undefined) res[i] = [];
      res[i][row] = map[row][col];
    }
  }

  return res.map((row) => row.join(""));
};

const rotateRight = (map: Array<string>): Array<string> =>
  rotateLeft(rotateLeft(rotateLeft(map)));

type Path = [from: [number, number], to: [number, number], length: number];

const galaxyPositions = (galaxy: Array<string>): Array<[number, number]> =>
  galaxy
    .reduce<Array<Array<[number, number]>>>(
      (galaxies, rowString, row) => [
        ...galaxies,
        rowString
          .split("")
          .reduce<Array<[number, number]>>(
            (galaxies, maybeGalaxy, col) =>
              isGalaxy(maybeGalaxy) ? [...galaxies, [row, col]] : galaxies,
            []
          ),
      ],
      []
    )
    .flat();

const galaxyPathes = (galaxies: Array<[number, number]>): Path[] =>
  uniqueCombinations<[number, number]>(2)(galaxies).map(([from, to]) => [
    from,
    to,
    manhattanDistance(from, to),
  ]);
const isGalaxy = (square: string): boolean => square === "#";

const expand = (map: Array<string>): Array<string> => {
  let galaxy = addEmptyRows(map);
  galaxy = rotateLeft(galaxy);
  galaxy = addEmptyRows(galaxy);
  galaxy = rotateRight(galaxy);
  return galaxy;
};

const addEmptyRows = (map: Array<string>): Array<string> => {
  const newMap: Array<string> = [];
  for (let i = 0; i < map.length; i++) {
    const s = new Set(map[i].split(""));
    newMap.push(map[i]);
    if (s.size === 1 && s.has(".")) {
      newMap.push(map[i]);
    }
  }

  return newMap;
};
