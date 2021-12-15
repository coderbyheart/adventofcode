import { loader } from '../lib/loader'
import { lowestRisk } from './navigateCave'
import { toMap } from './toMap'
import { wrap } from './wrap'

const example = toMap([
	'1163751742',
	'1381373672',
	'2136511328',
	'3694931569',
	'7463417111',
	'1319128137',
	'1359912421',
	'3125421639',
	'1293138521',
	'2311944581',
])

const input = toMap(loader(15)('input'))

describe('Day 15: Chiton', () => {
	describe('Part 1', () => {
		it('should solve the example', () =>
			expect(lowestRisk(example)).toEqual(40))
		it('should solve the puzzle', () => expect(lowestRisk(input)).toEqual(748))
	})
	describe('Part 2', () => {
		it('should solve the example', () =>
			expect(lowestRisk(wrap(example))).toEqual(315))
		it('should solve the puzzle', () =>
			expect(lowestRisk(wrap(input))).toEqual(3045))
	})
})
