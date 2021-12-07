import { loader } from '../lib/loader'
import { moveCrabs, moveCrabsWithIncreasingFuelCosts } from './moveCrabs'

const example = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]
const input = loader(7)('input')[0]
	.split(',')
	.map((s) => parseInt(s, 10))

describe('Day 7: The Treachery of Whales', () => {
	describe('Part 1', () => {
		it('should solve the example', () => expect(moveCrabs(example)).toEqual(37))
		it('should solve the puzzle', () =>
			expect(moveCrabs(input)).toEqual(344297))
	})
	describe('Part 2', () => {
		it('should solve the example', () =>
			expect(moveCrabsWithIncreasingFuelCosts(example)).toEqual(168))
		it('should solve the puzzle', () =>
			expect(moveCrabsWithIncreasingFuelCosts(input)).toEqual(97164301))
	})
})
