import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { sum } from "./util/sum.ts";

const card1 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`;
const card2 = `Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19`;
const card3 = `Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1`;
const card4 = `Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83`;
const card5 = `Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36`;
const card6 = `Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

Deno.test("Day 4: Scratchcards", async (t) => {
  await t.step("Part 1", async (t) => {
    await t.step("Example", async (t) => {
      for (const [card, expectedWinningNumbers, expectedPoints] of [
        [card1, [48, 83, 17, 86], 8],
        [card2, [32, 61], 2],
        [card3, [1, 21], 2],
        [card4, [84], 1],
        [card5, [], 0],
        [card6, [], 0],
      ] as [string, Array<number>, number][]) {
        await t.step(
          `card ${card} should have the winning numbers ${expectedWinningNumbers}`,
          () =>
            assertEquals(winningNumbers(card), new Set(expectedWinningNumbers))
        );

        await t.step(`card ${card} should score ${expectedPoints} points`, () =>
          assertEquals(cardScore(card), expectedPoints)
        );
      }

      await t.step("Sum of pile", () =>
        assertEquals(
          sum([card1, card2, card3, card4, card5, card6].map(cardScore)),
          13
        )
      );
    });

    await t.step("Solution", async () =>
      assertEquals(
        sum(
          (await Deno.readTextFile("./input/day04.txt"))
            .split("\n")
            .map(cardScore)
        ),
        28538
      )
    );
  });

  await t.step("Part 2", async (t) => {
    await t.step("Example", () =>
      assertEquals(play([card1, card2, card3, card4, card5, card6]).length, 30)
    );
    /*
    await t.step("Solution", async () =>
      assertEquals(
        play((await Deno.readTextFile("./input/day04.txt")).split("\n")).length,
        28538
      )
    );
    */
  });

  await t.step("parseCard()", () =>
    assertEquals(parseCard(card3), [
      new Set([1, 21, 53, 59, 44]),
      new Set([69, 82, 63, 72, 16, 21, 14, 1]),
    ])
  );
});

const winningNumbers = (cardInfo: string): Set<number> => {
  const [winningNumbers, cardNumbers] = parseCard(cardInfo);
  const winners = new Set<number>();
  for (const number of cardNumbers.values()) {
    if (winningNumbers.has(number)) winners.add(number);
  }
  return winners;
};
const cardScore = (cardInfo: string): number =>
  winningNumbers(cardInfo).size === 0
    ? 0
    : (1 * Math.pow(2, winningNumbers(cardInfo).size)) / 2;

type CardInfo = [Set<number>, Set<number>];
const parseCard = (cardInfo: string): CardInfo => {
  const [, winningNumbers, cardNumbers] =
    /^Card +\d+: ([\d ]+)+ \| ([\d ]+)+/.exec(cardInfo) ?? [];
  return [
    new Set(
      winningNumbers
        .trim()
        .replace(/ +/g, " ")
        .split(" ")
        .map((s) => parseInt(s, 10))
    ),
    new Set(
      cardNumbers
        .trim()
        .replace(/ +/g, " ")
        .split(" ")
        .map((s) => parseInt(s, 10))
    ),
  ];
};

const play = (pile: Array<string>): number[] => {
  const processed: number[] = [];
  const queue: number[] = pile.map((_, i) => i);
  do {
    const cardId = queue.shift() as number;
    // Add the current card to the process pile
    processed.push(cardId);
    // Add the card copies to the queue
    const winners = winningNumbers(pile.at(cardId) as string);
    for (let i = 0; i < winners.size; i++) {
      const nextCardId = cardId + i + 1;
      if (pile.at(nextCardId) !== undefined) {
        queue.push(nextCardId);
      }
    }
  } while (queue.length > 0);

  return processed;
};
