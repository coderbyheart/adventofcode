import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";

Deno.test("Day 6: Wait For It", async (t) => {
  await t.step("Part 1", async (t) => {
    await t.step(`Solve the example`, () =>
      assertEquals(
        waysToWin([
          [7, 9],
          [15, 40],
          [30, 200],
        ]),
        288,
      ));
    await t.step(`Solve`, () =>
      assertEquals(
        waysToWin([
          [47, 282],
          [70, 1079],
          [75, 1147],
          [66, 1062],
        ]),
        281600,
      ));
  });
  await t.step("Part 2", async (t) => {
    await t.step(
      `Solve the example`,
      () => assertEquals(waysToWin([[71530, 940200]]), 71503),
    );
    await t.step(
      `Solve`,
      () => assertEquals(waysToWin([[47707566, 282107911471062]]), 33875953),
    );
  });
});

const waysToWin = (races: Array<[number, number]>): number => {
  const ways: Array<number> = [];

  for (const [time, distance] of races) {
    const winningTimes: Array<number> = [];
    let lastDistance = 0;
    for (let i = 1; i <= time; i++) {
      const currentDistance = i * (time - i);
      // Abort if distance is getting smaller and will no longer win
      if (currentDistance < lastDistance && currentDistance < distance) break;
      lastDistance = currentDistance;
      if (currentDistance > distance) winningTimes.push(i);
    }
    ways.push(winningTimes.length);
  }

  return ways.reduce(mul);
};

const mul = (total: number, n: number) => total * n;
