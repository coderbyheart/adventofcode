import { memoryGame } from './memoryGame'

describe('Day 15: Rambunctious Recitation', () => {
	describe('Part 1', () => {
		const numbers = [0, 3, 6]
		it.each([
			[1, 0],
			[2, 3],
			[3, 6],
			[4, 0],
			[5, 3],
			[6, 3],
			[7, 1],
			[8, 0],
			[9, 4],
			[10, 0],
			[2020, 436],
		])('the spoken number in turn %d should be %d', (turn, expected) =>
			expect(memoryGame(numbers, turn)).toEqual(expected),
		)
		it('should solve', () =>
			expect(memoryGame([0, 5, 4, 1, 10, 14, 7], 2020)).toEqual(203))
	})
	describe('Part 2', () => {
		// This takes 5 minutes
		it.skip('should solve', () =>
			expect(memoryGame([0, 5, 4, 1, 10, 14, 7], 2020)).toEqual(9007186))
	})
})
