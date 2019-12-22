import { cardShuffle, parseActions } from './cardshuffle'
import * as fs from 'fs'
import * as path from 'path'

const actions = fs.readFileSync(
	path.resolve(process.cwd(), 'day22/input.txt'),
	'utf-8',
)

describe('Day 21: Part 1', () => {
	it('should solve the puzzle', async () => {
		const deck = []
		for (let i = 0; i < 10007; i++) {
			deck.push(i)
		}
		const shuffled = cardShuffle(parseActions(actions))(deck)
		expect(shuffled.indexOf(2019)).toEqual(3749)
	})
})
