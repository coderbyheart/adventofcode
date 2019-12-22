import {
	cardShuffle,
	parseActions,
	deckOf,
	positionInDeck,
} from './cardshuffle'
import * as fs from 'fs'
import * as path from 'path'

const actions = fs.readFileSync(
	path.resolve(process.cwd(), 'day22/input.txt'),
	'utf-8',
)

describe('Day 22: Part 1', () => {
	it('should solve the puzzle', () => {
		const deck = deckOf(10007)
		const shuffled = cardShuffle(parseActions(actions))(deck)
		expect(positionInDeck(shuffled)(2019)).toEqual(3749)
	})
})
