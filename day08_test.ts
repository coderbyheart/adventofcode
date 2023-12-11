import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";

const example1 = [
  `RL`,
  ``,
  `AAA = (BBB, CCC)`,
  `BBB = (DDD, EEE)`,
  `CCC = (ZZZ, GGG)`,
  `DDD = (DDD, DDD)`,
  `EEE = (EEE, EEE)`,
  `GGG = (GGG, GGG)`,
  `ZZZ = (ZZZ, ZZZ)`,
];

const example2 = [
  `LLR`,
  ``,
  `AAA = (BBB, BBB)`,
  `BBB = (AAA, ZZZ)`,
  `ZZZ = (ZZZ, ZZZ)`,
];

Deno.test("Day 8: Haunted Wasteland", async (t) => {
  await t.step("Part 1", async (t) => {
    await t.step("Example", async (t) => {
      await t.step(
        "it should solve the first example",
        () => assertEquals(navigate(example1), 2),
      );
      await t.step(
        "it should solve the second example",
        () => assertEquals(navigate(example2), 6),
      );
    });

    await t.step("it should solve", async () =>
      assertEquals(
        navigate((await Deno.readTextFile("./input/day08.txt")).split("\n")),
        12599,
      ));
  });
});

const navigate = (map: string[]): number => {
  let steps = 0;
  let currentNode = "AAA";
  const [instructions, network] = parseMap(map);
  do {
    const step = instructions[steps++ % instructions.length];
    currentNode = network[currentNode][step === "L" ? 0 : 1];
  } while (currentNode !== "ZZZ");
  return steps;
};

const parseMap = (
  map: string[],
): [string, Record<string, [string, string]>] => [
  map[0],
  map.slice(2).reduce((network, node) => {
    const { nodeId, left, right } =
      /^(?<nodeId>\w+) = \((?<left>\w+), (?<right>\w+)\)$/.exec(node)?.groups ??
        {};
    return {
      ...network,
      [nodeId]: [left, right],
    };
  }, {}),
];
