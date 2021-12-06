import { countFish, progressDay } from './game'
import { Population, toPopulation } from './toPopulation'

describe('Game', () => {
	describe('progressDay()', () => {
		it.each([
			[{}, {}],
			// So, suppose you have a lanternfish with an internal timer value of 3:
			// After one day, its internal timer would become 2.
			[{ 3: 1 }, { 2: 1 }],
			// After another day, its internal timer would become 1.
			[{ 2: 1 }, { 1: 1 }],
			// After another day, its internal timer would become 0.
			[{ 1: 1 }, { 0: 1 }],
			// After another day, its internal timer would reset to 6, and it would create a new lanternfish with an internal timer of 8.
			[{ 0: 1 }, { 6: 1, 8: 1 }],
			// After another day, the first lanternfish would have an internal timer of 5, and the second lanternfish would have an internal timer of 7.
			[
				{ 6: 1, 8: 1 },
				{ 5: 1, 7: 1 },
			],
		])(
			'should advance the day by one and calculate the new population from %j => %j',
			(population, expectedPopulation) =>
				expect(progressDay(population as Population)).toEqual(
					expectedPopulation,
				),
		)
		// Longer example
		let p: Population = toPopulation([3, 4, 3, 1, 2])
		it.each([
			[[2, 3, 2, 0, 1]],
			[[1, 2, 1, 6, 0, 8]],
			[[0, 1, 0, 5, 6, 7, 8]],
			[[6, 0, 6, 4, 5, 6, 7, 8, 8]],
			[[5, 6, 5, 3, 4, 5, 6, 7, 7, 8]],
			[[4, 5, 4, 2, 3, 4, 5, 6, 6, 7]],
			[[3, 4, 3, 1, 2, 3, 4, 5, 5, 6]],
			[[2, 3, 2, 0, 1, 2, 3, 4, 4, 5]],
			[[1, 2, 1, 6, 0, 1, 2, 3, 3, 4, 8]],
			[[0, 1, 0, 5, 6, 0, 1, 2, 2, 3, 7, 8]],
			[[6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 7, 8, 8, 8]],
			[[5, 6, 5, 3, 4, 5, 6, 0, 0, 1, 5, 6, 7, 7, 7, 8, 8]],
			[[4, 5, 4, 2, 3, 4, 5, 6, 6, 0, 4, 5, 6, 6, 6, 7, 7, 8, 8]],
			[[3, 4, 3, 1, 2, 3, 4, 5, 5, 6, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8]],
			[[2, 3, 2, 0, 1, 2, 3, 4, 4, 5, 2, 3, 4, 4, 4, 5, 5, 6, 6, 7]],
			[[1, 2, 1, 6, 0, 1, 2, 3, 3, 4, 1, 2, 3, 3, 3, 4, 4, 5, 5, 6, 8]],
			[[0, 1, 0, 5, 6, 0, 1, 2, 2, 3, 0, 1, 2, 2, 2, 3, 3, 4, 4, 5, 7, 8]],
			[
				[
					6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8,
					8, 8, 8,
				],
			],
		])('should calculate the new population to be %j', (expectedPopulation) => {
			p = progressDay(p)
			return expect(p).toEqual(toPopulation(expectedPopulation))
		})
	})
	describe('countFish', () => {
		it('should count the fish in a population', () =>
			expect(countFish({ 6: 1, 8: 1, 0: 3 })).toEqual(5))
	})
})
