import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { sum } from "./util/sum.ts";
import { uniqueCombinations } from "./util/uniqueCombinations.ts";
import { manhattanDistance } from "./util/manhattanDistance.ts";

Deno.test("Day 11: Cosmic Expansion", async (t) => {
  await t.step("Part 1", async (t) => {
    await t.step("Example", () =>
      assertEquals(
        sum(
          galaxyPathes(
            expandPositions(
              galaxyPositions([
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
            expandPositions(
              galaxyPositions(
                (await Deno.readTextFile("./input/day11.txt")).split("\n")
              )
            )
          ).map(([, , length]) => length)
        ),
        10165598
      )
    );
  });

  await t.step("Part 2", async (t) => {
    await t.step("Example 1", () =>
      assertEquals(
        sum(
          galaxyPathes(
            expandPositions(
              galaxyPositions([
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
              10
            )
          ).map(([, , length]) => length)
        ),
        1030
      )
    );

    await t.step("Example 2", () =>
      assertEquals(
        sum(
          galaxyPathes(
            expandPositions(
              galaxyPositions([
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
              100
            )
          ).map(([, , length]) => length)
        ),
        8410
      )
    );

    await t.step("it should solve", async () =>
      assertEquals(
        sum(
          galaxyPathes(
            expandPositions(
              galaxyPositions(
                (await Deno.readTextFile("./input/day11.txt")).split("\n")
              ),
              1000000
            )
          ).map(([, , length]) => length)
        ),
        678728808158
      )
    );
  });

  await t.step("galaxyPositions()", () =>
    assertEquals(
      galaxyPositions([
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
        [0, 3],
        [1, 7],
        [2, 0],
        [4, 6],
        [5, 1],
        [6, 9],
        [8, 7],
        [9, 0],
        [9, 4],
      ]
    )
  );

  await t.step("expandPositions()", () =>
    assertEquals(
      expandPositions(
        galaxyPositions([
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
      ),
      galaxyPositions([
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
      ])
    )
  );
});

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

const expandPositions = (
  galaxies: Array<[number, number]>,
  amount = 1
): Array<[number, number]> => {
  const cols = galaxies.map(([, col]) => col).sort((a, b) => a - b);
  const left = cols[0];
  const right = cols[cols.length - 1];
  const colsWithOutGalaxies = [];
  for (let col = left; col < right; col++) {
    const galaxiesOnCol = galaxies.find(([, gcol]) => col === gcol);
    if (galaxiesOnCol === undefined) colsWithOutGalaxies.push(col);
  }
  const rows = galaxies.map(([row]) => row).sort((a, b) => a - b);
  const top = rows[0];
  const bottom = rows[rows.length - 1];
  const rowsWithoutGalaxies = [];
  for (let row = top; row < bottom; row++) {
    const galaxiesOnRow = galaxies.find(([grow]) => row === grow);
    if (galaxiesOnRow === undefined) rowsWithoutGalaxies.push(row);
  }

  const shifted: Array<[number, number]> = [...galaxies];
  // Shift by cols
  let colShift = 0;
  for (const col of colsWithOutGalaxies) {
    for (let g = 0; g < galaxies.length; g++) {
      // Move all galaxies right of col
      if (galaxies[g][1] > col + colShift) {
        galaxies[g][1] += Math.max(amount - 1, 1);
      }
    }
    // The next shifts are cumulative
    colShift += Math.max(amount - 1, 1);
  }
  // Shift by rows
  let rowShift = 0;
  for (const row of rowsWithoutGalaxies) {
    for (let g = 0; g < galaxies.length; g++) {
      // Move all galaxies bottom of col
      if (galaxies[g][0] > row + rowShift) {
        galaxies[g][0] += Math.max(amount - 1, 1);
      }
    }
    rowShift += Math.max(amount - 1, 1);
  }
  return shifted;
};
