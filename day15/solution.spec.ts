import { loader } from '../lib/loader'
import { lowestRisk } from './navigateCave'

const example = [
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
].map((s) => s.split('').map((s) => parseInt(s, 10)))

const input = loader(15)('input').map((s) =>
	s.split('').map((s) => parseInt(s, 10)),
)

describe('Day 15: Chiton', () => {
	describe('Part 1', () => {
		it('should solve the example', () =>
			expect(lowestRisk(example)).toEqual(40))
		it('should solve the puzzle', () => expect(lowestRisk(input)).toEqual(748))
	})
})
