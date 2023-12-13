import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";

Deno.test("Day 11: Cosmic Expansion", async (t) => {
  await t.step(
    "rotate map",
    async (t) => {
      await t.step("rotateLeft()", () =>
        assertEquals(
          rotateLeft([
            `123`,
            `456`,
          ]),
          [
            `36`,
            `25`,
            `14`,
          ],
        ));

      await t.step("rotateRight()", () =>
        assertEquals(
          rotateRight([
            `36`,
            `25`,
            `14`,
          ]),
          [
            `123`,
            `456`,
          ],
        ));
    },
  );
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
