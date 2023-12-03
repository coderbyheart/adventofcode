import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { sum } from "./util/sum.ts";

/**
 * Here is an example engine schematic:
 */
const schematics = [
  `467..114..`,
  `...*......`,
  `..35..633.`,
  `......#...`,
  `617*......`,
  `.....+.58.`,
  `..592.....`,
  `......755.`,
  `...$.*....`,
  `.664.598.1`,
];

Deno.test("Day 3: Gear Ratios", async (t) => {
  await t.step("Example", async (t) => {
    await t.step(
      "findPartNumbers()",
      () =>
        assertEquals(findPartNumbers(schematics), [
          { n: 467, s: ["*"] },
          { n: 114, s: [] },
          { n: 35, s: ["*"] },
          { n: 633, s: ["#"] },
          { n: 617, s: ["*"] },
          { n: 58, s: [] },
          { n: 592, s: ["+"] },
          { n: 755, s: ["*"] },
          { n: 664, s: ["$"] },
          { n: 598, s: ["*"] },
          { n: 1, s: [] },
        ]),
    );

    await t.step(`Calculate the example solution`, () =>
      assertEquals(
        sum(
          findPartNumbers(schematics)
            .filter(({ s }) => s.length > 0)
            .map(({ n }) => n),
        ),
        4361,
      ));
  });

  await t.step("Solution", async () => {
    const numbers = findPartNumbers(
      (await Deno.readTextFile("./input/day03.txt")).split("\n"),
    );
    assertEquals(
      sum(
        numbers.filter(({ s }) => s.length > 0)
          .map(({ n }) => n),
      ),
      529618,
    );
  });
});

/**
 * Find the part numbers in the schematics and the adjacent symbol(s)
 */
const findPartNumbers = (
  schematics: string[],
): { n: number; s: string[] }[] => {
  const numbers: { n: number; s: string[] }[] = [];
  let currentNumber: string[] = [];
  let adjacentSymbols: string[] = [];

  // Add parsed number with symbols to stash
  const addNumber = () => {
    if (currentNumber.length > 0) {
      numbers.push({
        n: parseInt(currentNumber.join("")),
        s: [...new Set(adjacentSymbols)],
      });
    }
    currentNumber = [];
    adjacentSymbols = [];
  };

  for (let row = 0; row < schematics.length; row++) {
    for (let col = 0; col < schematics[row].length; col++) {
      const c = schematics[row][col];
      if (/\d/.test(c)) { // Current symbol is a number
        currentNumber.push(c);
        const s = findAdjacentSymbols(schematics, row, col);
        if (s !== undefined) adjacentSymbols.push(...s);
      } else {
        addNumber();
      }
    }
  }
  addNumber();
  return numbers;
};

/**
 * Find adjacent symbols for a given field
 */
const findAdjacentSymbols = (
  schematics: string[],
  row: number,
  col: number,
): string[] =>
  [
    findSymbolAt(schematics, row, col - 1), // left
    findSymbolAt(schematics, row - 1, col - 1), // top left
    findSymbolAt(schematics, row - 1, col), // top
    findSymbolAt(schematics, row - 1, col + 1), // top right
    findSymbolAt(schematics, row, col + 1), // right
    findSymbolAt(schematics, row + 1, col + 1), // bottom right
    findSymbolAt(schematics, row + 1, col), // bottom
    findSymbolAt(schematics, row + 1, col - 1), // bottom left
  ].filter((s) => s !== undefined) as string[];

/**
 * Return the symbol at a given position
 */
const findSymbolAt = (
  schematics: string[],
  row: number,
  col: number,
): string | undefined => {
  if (col < 0) return undefined; // Outside of schematics
  if (row < 0) return undefined; // Outside of schematics
  const c = schematics[row]?.[col];
  if (/\d/.test(c)) return undefined; // a number
  if (c === ".") return undefined; // a dot, ignore
  return c;
};
