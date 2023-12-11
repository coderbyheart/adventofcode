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

  await t.step("Part 2", async (t) => {
    await t.step("Example", async (t) => {
      await t.step("it should solve the example", () =>
        assertEquals(
          ghostNavigate([
            `LR`,
            ``,
            `11A = (11B, XXX)`,
            `11B = (XXX, 11Z)`,
            `11Z = (11B, XXX)`,
            `22A = (22B, XXX)`,
            `22B = (22C, 22C)`,
            `22C = (22Z, 22Z)`,
            `22Z = (22B, 22B)`,
            `XXX = (XXX, XXX)`,
          ]),
          6,
        ));
    });

    await t.step("it should solve", async () =>
      assertEquals(
        ghostNavigate(
          (await Deno.readTextFile("./input/day08.txt")).split("\n"),
        ),
        8245452805243,
      ));
  });
});

/**
 * Note: this looks like a synchronization problem which could be solved with LCM (there was a planetary rotation task in a previous year)
 */
const ghostNavigate = (map: string[]): number => {
  const [instructions, network] = parseMap(map);
  const startNodes = Object.keys(network).filter((k) => k.endsWith("A"));
  const stepsFromStartNode: number[] = [];
  for (const startNode of startNodes) {
    let steps = 0;
    let currentNode = startNode;
    do {
      const step = instructions[steps++ % instructions.length];
      currentNode = network[currentNode][step === "L" ? 0 : 1];
    } while (!currentNode.endsWith("Z"));
    stepsFromStartNode.push(steps);
  }
  return lcmForList(stepsFromStartNode);
};

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

// Euclidean algorithm to calculate least common multiple: https://www.idomaths.com/hcflcm.php
const gcd = (a: number, b: number): number => (b == 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number): number => (a / gcd(a, b)) * b;
const lcmForList = (ns: number[]) => ns.reduce(lcm, 1);
