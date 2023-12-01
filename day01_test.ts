import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { calibrationValue } from "./day01.ts";

const sum = (numbers: Array<number>): number =>
  numbers.reduce((sum, number) => sum + number);

Deno.test("Day 1: Trebuchet?!", async (t) => {
  await t.step("calibrationValue()", async (t) => {
    for (const [line, expectedValue] of [
      ["1abc2", 12],
      ["pqr3stu8vwx", 38],
      ["a1b2c3d4e5f", 15],
      ["treb7uchet", 77],
    ] as [string, number][]) {
      await t.step(`from line ${line} calculate ${expectedValue}`, async () =>
        assertEquals(calibrationValue(line), expectedValue)
      );
    }
  });

  await t.step("it should solve the sample", () =>
    assertEquals(
      sum(
        ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"].map(
          calibrationValue
        )
      ),
      142
    )
  );

  await t.step("it should solve part 1", async () =>
    assertEquals(
      sum(
        (await Deno.readTextFile("./input/day01.1.txt"))
          .split("\n")
          .map(calibrationValue)
      ),
      55971
    )
  );
});
