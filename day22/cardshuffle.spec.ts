import { dealIntoNewStack } from './cardshuffle'

describe('Card Shuffle', () => {
	test('deal 10 cards into a new deck', () => {
		expect(dealIntoNewStack([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([
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
})
