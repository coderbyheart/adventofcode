import { dealIntoNewStack, cut, deal, cardShuffle } from './cardshuffle'

const testDeck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

describe('Card Shuffle', () => {
	test('deal 10 cards into a new deck', () => {
		expect(dealIntoNewStack([...testDeck])).toEqual([
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
		expect(cut(3)([...testDeck])).toEqual([3, 4, 5, 6, 7, 8, 9, 0, 1, 2])
	})
	test('cut -4', () => {
		expect(cut(-4)([...testDeck])).toEqual([6, 7, 8, 9, 0, 1, 2, 3, 4, 5])
	})
	test('deal with increment 3', () => {
		expect(deal(3)([...testDeck])).toEqual([0, 7, 4, 1, 8, 5, 2, 9, 6, 3])
	})
	test('Example 1', () => {
		expect(
			cardShuffle([deal(7), dealIntoNewStack, dealIntoNewStack])([...testDeck]),
		).toEqual([0, 3, 6, 9, 2, 5, 8, 1, 4, 7])
	})
	test('Example 2', () => {
		expect(
			cardShuffle([cut(6), deal(7), dealIntoNewStack])([...testDeck]),
		).toEqual([3, 0, 7, 4, 1, 8, 5, 2, 9, 6])
	})
	test('Example 3', () => {
		expect(cardShuffle([deal(7), deal(9), cut(-2)])([...testDeck])).toEqual([
			6,
			3,
			0,
			7,
			4,
			1,
			8,
			5,
			2,
			9,
		])
	})
	test('Example 4', () => {
		expect(
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
			])([...testDeck]),
		).toEqual([9, 2, 5, 8, 1, 4, 7, 0, 3, 6])
	})
})
