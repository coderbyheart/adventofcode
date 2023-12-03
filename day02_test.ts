import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { sum } from "./util/sum.ts";

const game1 = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green`;
const game2 =
  `Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue`;
const game3 =
  `Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red`;
const game4 =
  `Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red`;
const game5 = `Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

Deno.test("Day 2: Cube Conundrum", async (t) => {
  await t.step("Part 1", async (t) => {
    await t.step("it should solve the sample", async (t) => {
      for (
        const [game, possible] of [
          [game1, true],
          [
            game2,
            true,
          ],
          [
            game3,
            false,
          ],
          [
            game4,
            false,
          ],
          [game5, true],
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
            game1,
            game2,
            game3,
            game4,
            game5,
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

  await t.step("Part 2", async (t) => {
    await t.step("Solve the example", async (t) => {
      for (
        const [game, expectedMinCubes] of [
          // In game 1, the game could have been played with as few as 4 red, 2 green, and 6 blue cubes. If any color had even one fewer cube, the game would have been impossible.
          [game1, {
            red: 4,
            green: 2,
            blue: 6,
          }],
          // Game 2 could have been played with a minimum of 1 red, 3 green, and 4 blue cubes.
          [game2, {
            red: 1,
            green: 3,
            blue: 4,
          }],
          // Game 3 must have been played with at least 20 red, 13 green, and 6 blue cubes.
          [
            game3,
            {
              red: 20,
              green: 13,
              blue: 6,
            },
          ],
          // Game 4 required at least 14 red, 3 green, and 15 blue cubes.
          [
            game4,
            {
              red: 14,
              green: 3,
              blue: 15,
            },
          ],
          // Game 5 needed no fewer than 6 red, 3 green, and 2 blue cubes in the bag.
          [game5, {
            red: 6,
            green: 3,
            blue: 2,
          }],
        ] as [string, Cubes][]
      ) {
        await t.step(
          `min cubes for game ${game} should be ${
            JSON.stringify(expectedMinCubes)
          }`,
          () =>
            assertEquals(
              minCubes(parseReveals(game)),
              expectedMinCubes,
            ),
        );
      }
    });

    /**
     * The power of the minimum set of cubes in game 1 is 48. In games 2-5 it was 12, 1560, 630, and 36, respectively.
     */
    await t.step(
      `Calculate power`,
      async (t) => {
        for (
          const [game, expectedPower] of [
            [game1, 48],
            [game2, 12],
            [game3, 1560],
            [game4, 630],
            [game5, 36],
          ] as Array<[string, number]>
        ) {
          await t.step(
            `The power of ${game} should equal ${expectedPower}`,
            () =>
              assertEquals(
                power(
                  minCubes(
                    parseReveals(
                      game,
                    ),
                  ),
                ),
                expectedPower,
              ),
          );
        }
      },
    );

    await t.step(
      `Adding up these five powers produces the sum 2286.`,
      () =>
        assertEquals(
          sum(
            [
              game1,
              game2,
              game3,
              game4,
              game5,
            ].map(parseReveals).map(minCubes).map(power),
          ),
          2286,
        ),
    );

    await t.step("it should solve", async () =>
      assertEquals(
        sum(
          (await Deno.readTextFile("./input/day02.txt"))
            .split("\n")
            .map(parseReveals).map(minCubes).map(power),
        ),
        87984,
      ));
  });

  await t.step(
    "parseReveals",
    () =>
      assertEquals(
        parseReveals(
          game3,
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

/**
 * Find the maximum number of cubes needed for each color
 */
const minCubes = ({ reveals }: GameReveals): Cubes => ({
  red: reveals.reduce((min, { red }) => Math.max(red ?? min, min), 0),
  blue: reveals.reduce((min, { blue }) => Math.max(blue ?? min, min), 0),
  green: reveals.reduce((min, { green }) => Math.max(green ?? min, min), 0),
});

/**
 * The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together.
 */
const power = ({ red, green, blue }: Cubes): number => red * green * blue;
