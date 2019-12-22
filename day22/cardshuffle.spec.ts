import { dealIntoNewStack, cut, deal } from './cardshuffle'

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
})
