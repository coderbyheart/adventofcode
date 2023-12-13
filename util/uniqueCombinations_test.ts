import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { uniqueCombinations } from "./uniqueCombinations.ts";

const seq = [2, 3, 5, 7];

Deno.test("uniqueCombinations()", async (t) => {
  for (
    const [length, items, expected] of [
      [0, seq, []],
      [1, seq, [[2], [3], [5], [7]]],
      [
        2,
        seq,
        [
          [2, 3],
          [2, 5],
          [2, 7],
          [3, 5],
          [3, 7],
          [5, 7],
        ],
      ],
      [
        3,
        seq,
        [
          [2, 3, 5],
          [2, 3, 7],
          [2, 5, 7],
          [3, 5, 7],
        ],
      ],
      [4, seq, [[2, 3, 5, 7]]],
      [5, seq, []],
    ] as any
  ) {
    await t.step(
      `combinations of length ${length}`,
      () => assertEquals(uniqueCombinations(length)(items), expected),
    );
  }
});
