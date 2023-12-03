import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { sum } from "./util/sum.ts";

Deno.test("Day 2: Cube Conundrum", async (t) => {
  await t.step("Part 1", async (t) => {
    await t.step("it should solve the sample", async (t) => {
      for (
        const [game, possible] of [
          [`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green`, true],
          [
            `Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue`,
            true,
          ],
          [
            `Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red`,
            false,
          ],
          [
            `Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red`,
            false,
          ],
          [`Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`, true],
        ] as [string, boolean][]
      ) {
        await t.step(
          `Game ${game} should be possible: ${possible}`,
          () =>
            assertEquals(
              isPossibleGame({
                red: 12,
                green: 13,
                blue: 14,
              })(parseReveals(game)),
              possible,
            ),
        );
      }
    });

    await t.step(`solve the sample`, () =>
      assertEquals(
        sum(
          [
            `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green`,
            `Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue`,
            `Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red`,
            `Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red`,
            `Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
          ].map(parseReveals).filter(isPossibleGame({
            red: 12,
            green: 13,
            blue: 14,
          })).map(({ game }) => game),
        ),
        8,
      ));

    await t.step("it should solve", async () =>
      assertEquals(
        sum(
          (await Deno.readTextFile("./input/day02.txt"))
            .split("\n")
            .map(parseReveals).filter(isPossibleGame({
              red: 12,
              green: 13,
              blue: 14,
            })).map(({ game }) => game),
        ),
        2486,
      ));
  });

  await t.step(
    "parseReveals",
    () =>
      assertEquals(
        parseReveals(
          `Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red`,
        ),
        {
          game: 3,
          reveals: [
            { red: 20, blue: 6, green: 8 },
            { green: 13, red: 4, blue: 5 },
            { red: 1, green: 5 },
          ],
        },
      ),
  );
});

type Cubes = {
  red: number;
  green: number;
  blue: number;
};

type GameReveals = {
  game: number;
  reveals: Array<Cubes>;
};

/**
 * Determine whether the game could have been played with the given bag contents
 */
const isPossibleGame =
  (bagContents: Cubes) => ({ reveals }: GameReveals): boolean =>
    reveals.find((reveal) =>
      reveal.red > bagContents.red || reveal.blue > bagContents.blue ||
      reveal.green > bagContents.green
    ) === undefined;
false;

const gameIdRx = /Game (?<gameId>\d+)/;
const parseReveals = (line: string): GameReveals => {
  const [gameIdStr, revealsStr] = line.split(":", 2);
  return {
    game: parseInt(gameIdRx.exec(gameIdStr)?.groups?.gameId ?? "0", 10),
    reveals: revealsStr.trim().split(";").map<Cubes>((cubes) =>
      cubes.trim().split(",").reduce((colors, colorCount) => {
        const [count, color] = colorCount.trim().split(" ");
        return {
          [color]: parseInt(count, 10),
          ...colors,
        };
      }, {} as Cubes)
    ),
  };
};
