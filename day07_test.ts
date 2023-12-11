import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";

const example = [
  `32T3K 765`,
  `T55J5 684`,
  `KK677 28`,
  `QQQJA 483`,
  `KTJJT 220`,
];

Deno.test("Day 7: Camel Cards", async (t) => {
  await t.step("Example", async (t) => {
    await t.step(
      "it should solve the example",
      () => assertEquals(totalWinnings(example), 6440),
    );
  });

  await t.step("Solution", async (t) => {
    await t.step("it should solve", async (t) =>
      assertEquals(
        totalWinnings(
          (await Deno.readTextFile("./input/day07.txt")).split("\n"),
        ),
        251545216,
      ));
  });

  await t.step("handType()", async (t) => {
    for (
      const [hand, expectedType] of [
        ["AAAAA", HandType.FiveOfAKind],
        ["AA8AA", HandType.FourOfAKind],
        ["23332", HandType.FullHouse],
        ["TTT98", HandType.ThreeOfAKind],
        ["23432", HandType.TwoPair],
        ["A23A4", HandType.OnePair],
        ["23456", HandType.HighCard],
        [`32T3K`, HandType.OnePair],
        [`KTJJT`, HandType.TwoPair],
        [`KK677`, HandType.TwoPair],
        [`T55J5`, HandType.ThreeOfAKind],
        [`QQQJA`, HandType.ThreeOfAKind],
      ] as Array<[string, HandType]>
    ) {
      await t.step(
        `${hand} should be type ${expectedType}`,
        () => assertEquals(getHandType(hand), expectedType),
      );
    }
  });

  await t.step("compare()", async (t) => {
    await t.step(
      `33332 and 2AAAA are both four of a kind hands, but 33332 is stronger because its first card is stronger`,
      () => assertEquals(compareByCards("33332", "2AAAA"), 1),
    );
    await t.step(
      `77888 and 77788 are both a full house, but 77888 is stronger because its third card is stronger (and both hands have the same first and second card)`,
      () => assertEquals(compareByCards("77788", "77888"), -1),
    );
    await t.step(
      `T55J5 and QQQJA are both three of a kind. QQQJA has a stronger first card`,
      () => assertEquals(compareByCards("QQQJA", "T55J5"), 1),
    );
    await t.step(
      `KK677 and KTJJT are both two pair. Their first cards both have the same label, but the second card of KK677 is stronger (K vs T)`,
      () => assertEquals(compareByCards("KTJJT", "KK677"), -1),
    );
  });

  await t.step("rank()", () =>
    assertEquals(example.sort(byRankAndCards), [
      // 32T3K is the only one pair and the other hands are all a stronger type, so it gets rank 1.
      `32T3K 765`,
      // KK677 and KTJJT are both two pair. Their first cards both have the same label, but the second card of KK677 is stronger (K vs T), so KTJJT gets rank 2 and KK677 gets rank 3.
      `KTJJT 220`,
      `KK677 28`,
      // T55J5 and QQQJA are both three of a kind. QQQJA has a stronger first card, so it gets rank 5 and T55J5 gets rank 4.
      `T55J5 684`,
      `QQQJA 483`,
    ]));
});

const totalWinnings = (hands: string[]): number => {
  const rankedHands = hands.sort(byRankAndCards);
  return hands
    .map(parseHandBids)
    .reduce(
      (total, [hand, bidAmount]) =>
        total + (rankedHands.indexOf(`${hand} ${bidAmount}`) + 1) * bidAmount,
      0,
    );
};

const parseHandBids = (handBid: string): [string, number] => {
  const [hand, bid] = handBid.split(" ");
  return [hand, parseInt(bid, 10)];
};

const cardStrength = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

const byRankAndCards = (handBid1: string, handBid2: string) => {
  const [hand1] = parseHandBids(handBid1);
  const [hand2] = parseHandBids(handBid2);
  const handType1 = getHandType(hand1);
  const handType2 = getHandType(hand2);
  if (handType1 < handType2) return 1;
  if (handType1 > handType2) return -1;
  return compareByCards(hand1, hand2);
};

/**
 * Every hand is exactly one type. From strongest to weakest, they are:
 */
enum HandType {
  // Five of a kind, where all five cards have the same label: AAAAA
  FiveOfAKind = 0,
  // Four of a kind, where four cards have the same label and one card has a different label: AA8AA
  FourOfAKind = 1,
  // Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
  FullHouse = 2,
  // Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
  ThreeOfAKind = 3,
  // Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
  TwoPair = 4,
  // One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
  OnePair = 5,
  // High card, where all cards' labels are distinct: 23456
  HighCard = 6,
}

const getHandType = (hand: string): HandType => {
  if (isFiveOfAKind(hand)) return HandType.FiveOfAKind;
  if (isFourOfAKind(hand)) return HandType.FourOfAKind;
  if (isFullHouse(hand)) return HandType.FullHouse;
  if (isThreeOfAKind(hand)) return HandType.ThreeOfAKind;
  if (isTwoPair(hand)) return HandType.TwoPair;
  if (isOnePair(hand)) return HandType.OnePair;
  return HandType.HighCard;
};

const setSize = (hand: string): number => new Set(hand).size;
const isNOfAKind = (n: number) => (hand: string) => new Set(hand).size === n;
const isFiveOfAKind = isNOfAKind(1);
const isFourOfAKind = (hand: string): boolean => {
  const s = new Set(hand);
  if (s.size !== 2) return false;
  const [a, b] = s.values();
  const count = countCards(hand);
  return count(a) === 4 || count(b) === 4;
};
const isThreeOfAKind = (hand: string): boolean => {
  if (setSize(hand) !== 3) return false;
  return cardsInSets(hand)[0] === 3;
};
const isFullHouse = isNOfAKind(2);
const isTwoPair = (hand: string): boolean => {
  if (setSize(hand) !== 3) return false;
  const counts = cardsInSets(hand);
  return counts[0] === 2 && counts[1] === 2;
};
const isOnePair = isNOfAKind(4);

const countCards = (hand: string) => (card: string) =>
  hand.split("").filter((c) => c === card).length;

const desc = (a: number, b: number): number => b - a;

const cardsInSets = (hand: string): number[] => {
  const count = countCards(hand);
  return [...new Set(hand).values()].map(count).sort(desc);
};

const compareByCards = (hand1: string, hand2: string): number => {
  for (let i = 0; i < hand1.length; i++) {
    const c1 = hand1[i];
    const c2 = hand2[i];
    if (c1 === c2) continue;
    return compareCard(c1, c2);
  }
  return 0;
};

const compareCard = (card1: string, card2: string): number => {
  if (cardStrength.indexOf(card1) < cardStrength.indexOf(card2)) return 1;
  if (cardStrength.indexOf(card1) > cardStrength.indexOf(card2)) return -1;
  return 0;
};
