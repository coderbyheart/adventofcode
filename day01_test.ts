import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { calibrationValue, twoNumbers } from "./day01.ts";

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
      await t.step(`from line ${line} calculate ${expectedValue}`, () =>
        assertEquals(calibrationValue(line), expectedValue)
      );
    }
  });

  await t.step("Part 1", async (t) => {
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

    await t.step("it should solve", async () =>
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

  await t.step("Part 2", async (t) => {
    await t.step("twoNumbers()", async (t) => {
      for (const [line, expectedLine] of [
        ["two1nine", "29"],
        ["eightwothree", "83"],
        ["abcone2threexyz", "13"],
        ["xtwone3four", "24"],
        ["4nineeightseven2", "42"],
        ["zoneight234", "14"],
        ["7pqrstsixteen", "76"],
      ]) {
        await t.step(`it should convert ${line} to ${expectedLine}`, () =>
          assertEquals(twoNumbers(line), expectedLine)
        );
      }

      for (const [line, expectedValue] of [
        ["two1nine", 29],
        ["eightwothree", 83],
        ["abcone2threexyz", 13],
        ["xtwone3four", 24],
        ["4nineeightseven2", 42],
        ["zoneight234", 14],
        ["7pqrstsixteen", 76],
      ] as [string, number][]) {
        await t.step(
          `it should find in ${line} the real first and last digit ${expectedValue}`,
          () => assertEquals(calibrationValue(twoNumbers(line)), expectedValue)
        );
      }
    });

    await t.step("it should solve sample", () =>
      assertEquals(
        sum(
          [
            "two1nine",
            "eightwothree",
            "abcone2threexyz",
            "xtwone3four",
            "4nineeightseven2",
            "zoneight234",
            "7pqrstsixteen",
          ]
            .map(twoNumbers)
            .map(calibrationValue)
        ),
        281
      )
    );

    await t.step("it should solve", async () =>
      assertEquals(
        sum(
          (await Deno.readTextFile("./input/day01.1.txt"))
            .split("\n")
            .map(twoNumbers)
            .map(calibrationValue)
        ),
        54719
      )
    );
  });
});
