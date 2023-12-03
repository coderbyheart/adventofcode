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
  await t.step("Part 1", async (t) => {
    await t.step("Example", async (t) => {
      await t.step(
        "findPartNumbers()",
        () =>
          assertEquals(findPartNumbers(schematics), [
            { n: 467, s: [{ s: "*", col: 3, row: 1 }] },
            { n: 35, s: [{ s: "*", col: 3, row: 1 }] },
            { n: 633, s: [{ s: "#", col: 6, row: 3 }] },
            { n: 617, s: [{ s: "*", col: 3, row: 4 }] },
            { n: 592, s: [{ s: "+", col: 5, row: 5 }] },
            { n: 755, s: [{ s: "*", col: 5, row: 8 }] },
            { n: 664, s: [{ s: "$", col: 3, row: 8 }] },
            { n: 598, s: [{ s: "*", col: 5, row: 8 }] },
          ]),
      );

      await t.step(`Calculate the example solution`, () =>
        assertEquals(
          sum(
            findPartNumbers(schematics)
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
          numbers
            .map(({ n }) => n),
        ),
        529618,
      );
    });
  });

  /**
   * A gear is any * symbol that is adjacent to exactly two part numbers.
   * Its gear ratio is the result of multiplying those two numbers together.
   *
   * In this schematic, there are two gears. The first is in the top left;
   * it has part numbers 467 and 35, so its gear ratio is 16345. The second
   * gear is in the lower right; its gear ratio is 451490.
   *
   * Adding up all of the gear ratios produces 467835.
   */
  await t.step("Part 2", async (t) => {
    await t.step(`Solve example`, () =>
      assertEquals(
        sum(
          findGears(schematics).map(([g1, g2]) => g1 * g2),
        ),
        467835,
      ));

    await t.step("Solution", async () =>
      assertEquals(
        sum(
          findGears(
            (await Deno.readTextFile("./input/day03.txt")).split("\n"),
          ).map(([g1, g2]) => g1 * g2),
        ),
        77509019,
      ));
  });
});

/**
 * Find the part numbers in the schematics and the adjacent symbol(s)
 *
 * TODO: refactor to search for symbols first and then numbers. This will make the code work better for part 2.
 */
const findPartNumbers = (
  schematics: string[],
): { n: number; s: Symbol[] }[] => {
  const numbers: { n: number; s: Symbol[] }[] = [];
  let currentNumber: string[] = [];
  let adjacentSymbols: Symbol[] = [];

  // Add parsed number with symbols to stash
  const addNumber = () => {
    if (currentNumber.length > 0) {
      numbers.push({
        n: parseInt(currentNumber.join("")),
        s: adjacentSymbols
          // Remove duplicate symbols
          .reduce<Symbol[]>(uniqueSymbols, []),
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
  return numbers.filter(({ s }) => s.length > 0);
};

type Symbol = { s: string; col: number; row: number };

/**
 * Find adjacent symbols for a given field
 */
const findAdjacentSymbols = (
  schematics: string[],
  row: number,
  col: number,
): Symbol[] =>
  [
    findSymbolAt(schematics, row, col - 1), // left
    findSymbolAt(schematics, row - 1, col - 1), // top left
    findSymbolAt(schematics, row - 1, col), // top
    findSymbolAt(schematics, row - 1, col + 1), // top right
    findSymbolAt(schematics, row, col + 1), // right
    findSymbolAt(schematics, row + 1, col + 1), // bottom right
    findSymbolAt(schematics, row + 1, col), // bottom
    findSymbolAt(schematics, row + 1, col - 1), // bottom left
  ].filter<Symbol>((s): s is Symbol => s?.s !== undefined);

/**
 * Return the symbol at a given position
 */
const findSymbolAt = (
  schematics: string[],
  row: number,
  col: number,
): Symbol | undefined => {
  if (col < 0) return undefined; // Outside of schematics
  if (row < 0) return undefined; // Outside of schematics
  const c = schematics[row]?.[col];
  if (/\d/.test(c)) return undefined; // a number
  if (c === ".") return undefined; // a dot, ignore
  return {
    s: c,
    col,
    row,
  };
};

const findGears = (schematics: string[]) => {
  const parts = findPartNumbers(schematics);
  // From the known part numbers
  return parts
    // ... find the symbols with "*"
    .filter(({ s }) => s.find(({ s }) => s === "*"))
    // ... and extract the symbol
    .map(
      ({ s }) => s,
    )
    .flat()
    // Remove duplicates
    .reduce<Symbol[]>(uniqueSymbols, [])
    .reduce<Array<[number, number]>>(
      (gears, symbol) => {
        // Find the part numbers with this symbol
        const matchingParts = parts.filter(({ s }) =>
          s.find(({ col, row }) => col === symbol.col && row === symbol.row)
        );
        return matchingParts.length === 2
          ? [...gears, matchingParts.map(({ n }) => n) as [number, number]]
          : gears;
      },
      [],
    );
};

const uniqueSymbols = (symbols: Symbol[], symbol: Symbol) => {
  if (
    symbols.find(({ col, row }) => col === symbol.col && row === symbol.row) ===
      undefined
  ) {
    return [...symbols, symbol];
  }
  return symbols;
};
