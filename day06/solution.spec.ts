import { countFish, progressDay } from './game'
import { toPopulation } from './toPopulation'

const example = [3, 4, 3, 1, 2]
const input = [
	1, 1, 1, 3, 3, 2, 1, 1, 1, 1, 1, 4, 4, 1, 4, 1, 4, 1, 1, 4, 1, 1, 1, 3, 3, 2,
	3, 1, 2, 1, 1, 1, 1, 1, 1, 1, 3, 4, 1, 1, 4, 3, 1, 2, 3, 1, 1, 1, 5, 2, 1, 1,
	1, 1, 2, 1, 2, 5, 2, 2, 1, 1, 1, 3, 1, 1, 1, 4, 1, 1, 1, 1, 1, 3, 3, 2, 1, 1,
	3, 1, 4, 1, 2, 1, 5, 1, 4, 2, 1, 1, 5, 1, 1, 1, 1, 4, 3, 1, 3, 2, 1, 4, 1, 1,
	2, 1, 4, 4, 5, 1, 3, 1, 1, 1, 1, 2, 1, 4, 4, 1, 1, 1, 3, 1, 5, 1, 1, 1, 1, 1,
	3, 2, 5, 1, 5, 4, 1, 4, 1, 3, 5, 1, 2, 5, 4, 3, 3, 2, 4, 1, 5, 1, 1, 2, 4, 1,
	1, 1, 1, 2, 4, 1, 2, 5, 1, 4, 1, 4, 2, 5, 4, 1, 1, 2, 2, 4, 1, 5, 1, 4, 3, 3,
	2, 3, 1, 2, 3, 1, 4, 1, 1, 1, 3, 5, 1, 1, 1, 3, 5, 1, 1, 4, 1, 4, 4, 1, 3, 1,
	1, 1, 2, 3, 3, 2, 5, 1, 2, 1, 1, 2, 2, 1, 3, 4, 1, 3, 5, 1, 3, 4, 3, 5, 1, 1,
	5, 1, 3, 3, 2, 1, 5, 1, 1, 3, 1, 1, 3, 1, 2, 1, 3, 2, 5, 1, 3, 1, 1, 3, 5, 1,
	1, 1, 1, 2, 1, 2, 4, 4, 4, 2, 2, 3, 1, 5, 1, 2, 1, 3, 3, 3, 4, 1, 1, 5, 1, 3,
	2, 4, 1, 5, 5, 1, 4, 4, 1, 4, 4, 1, 1, 2,
]

describe('Day 6: Lanternfish', () => {
	describe('Part 1', () => {
		it.each([
			[18, 26],
			[80, 5934],
		])('should solve the example', (days, expectedAmount) => {
			let population = toPopulation(example)
			for (let day = 1; day <= days; day++) {
				population = progressDay(population)
			}
			expect(countFish(population)).toEqual(expectedAmount)
		})
		it('should solve the puzzle', () => {
			let population = toPopulation(input)
			for (let day = 1; day <= 80; day++) {
				population = progressDay(population)
			}
			expect(countFish(population)).toEqual(372984)
		})
	})
})
