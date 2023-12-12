import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { sum } from "./util/sum.ts";
import { toNumber } from "./util/toNumber.ts";

const example = [`0 3 6 9 12 15`, `1 3 6 10 15 21`, `10 13 16 21 30 45`];

Deno.test("Day 9: Mirage Maintenance", async (t) => {
  await t.step("Part 1", async (t) => {
    await t.step("Example", async (t) => {
      await t.step("it should solve the example", () =>
        assertEquals(sum(example.map(predict)), 114)
      );
    });
    await t.step("it should solve", async () =>
      assertEquals(
        sum(
          (await Deno.readTextFile("./input/day09.txt"))
            .split("\n")
            .map(predict)
        ),
        1901217887
      )
    );
  });
});

const predict = (report: string): number => {
  // Calculate the sequences until all are 0
  const sequences: Array<Array<number>> = [report.split(" ").map(toNumber)];
  do {
    sequences.push(diff(sequences[sequences.length - 1]));
  } while (!allZero(sequences[sequences.length - 1]));
  // Predict by filling up from the bottom
  sequences[sequences.length - 1].push(0); // Add 0 to bottom
  for (let i = sequences.length - 2; i >= 0; i--) {
    const sequence = sequences[i];
    const left = sequence[sequence.length - 1];
    const below = sequences[i + 1][sequences[i + 1].length - 1];
    sequences[i].push(left + below);
  }
  return sequences[0].pop() as number;
};

const allZero = (readings: Array<number>): boolean => {
  const s = new Set(readings);
  return s.size === 1 && s.has(0);
};

const diff = (readings: Array<number>): Array<number> =>
  readings.slice(1).map((r, i) => r - readings[i]);
