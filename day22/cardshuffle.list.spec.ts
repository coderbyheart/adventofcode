import {
	dealIntoNewStack,
	deckOf,
	Deck,
	walk,
	cut,
	deal,
	cardShuffle,
	parseActions,
} from './cardshuffle.list'

const collect = (deck: Deck) => {
	const result = []
	const walker = walk(deck)
	let c = walker.next()
	while (!c.done) {
		result.push(c.value)
		c = walker.next()
	}
	return result
}

describe('Card Shuffle', () => {
	test('deal 10 cards into a new deck', () => {
		expect(collect(dealIntoNewStack(deckOf(10)))).toEqual([
			9,
			8,
			7,
			6,
			5,
			4,
			3,
			2,
			1,
			0,
		])
	})
	test('cut 3', () => {
		expect(collect(cut(3)(deckOf(10)))).toEqual([3, 4, 5, 6, 7, 8, 9, 0, 1, 2])
	})
	test('cut -4', () => {
		expect(collect(cut(-4)(deckOf(10)))).toEqual([6, 7, 8, 9, 0, 1, 2, 3, 4, 5])
	})
	test('deal with increment 3', () => {
		expect(collect(deal(3)(deckOf(10)))).toEqual([0, 7, 4, 1, 8, 5, 2, 9, 6, 3])
	})
	test('Example 1', () => {
		expect(
			collect(
				cardShuffle([deal(7), dealIntoNewStack, dealIntoNewStack])(deckOf(10)),
			),
		).toEqual([0, 3, 6, 9, 2, 5, 8, 1, 4, 7])
	})
	test('Example 2', () => {
		expect(
			collect(cardShuffle([cut(6), deal(7), dealIntoNewStack])(deckOf(10))),
		).toEqual([3, 0, 7, 4, 1, 8, 5, 2, 9, 6])
	})
	test('Example 3', () => {
		expect(
			collect(cardShuffle([deal(7), deal(9), cut(-2)])(deckOf(10))),
		).toEqual([6, 3, 0, 7, 4, 1, 8, 5, 2, 9])
	})

	test('Example 4', () => {
		expect(
			collect(
				cardShuffle([
					dealIntoNewStack,
					cut(-2),
					deal(7),
					cut(8),
					cut(-4),
					deal(7),
					cut(3),
					deal(9),
					deal(3),
					cut(-1),
				])(deckOf(10)),
			),
		).toEqual([9, 2, 5, 8, 1, 4, 7, 0, 3, 6])
	})
	test('Example 4 (Text)', () => {
		expect(
			collect(
				cardShuffle(
					parseActions(`
                deal into new stack
                cut -2
                deal with increment 7
                cut 8
                cut -4
                deal with increment 7
                cut 3
                deal with increment 9
                deal with increment 3
                cut -1
            `),
				)(deckOf(10)),
			),
		).toEqual([9, 2, 5, 8, 1, 4, 7, 0, 3, 6])
	})
})
