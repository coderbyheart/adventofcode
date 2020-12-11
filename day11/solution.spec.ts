import { loader } from '../lib/loader'
import { occupied, part1rules, part2rules } from './seatingSimulator'
import { seatingSimulator } from './seatingSimulator'

const load = loader(11)
const sample = `
L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`

const input = load('input')

describe('Day 11: Seating System', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			const stable = seatingSimulator(sample, part1rules)
			expect(occupied(stable)).toEqual(37)
		})
		it('should solve the sample', () => {
			const stable = seatingSimulator(input.join('\n'), part1rules)
			expect(occupied(stable)).toEqual(2164)
		})
	})
	describe('Part 2', () => {
		it('should solve the sample', () => {
			const stable = seatingSimulator(sample, part2rules)
			expect(occupied(stable)).toEqual(26)
		})
		it('should solve the sample', () => {
			const stable = seatingSimulator(input.join('\n'), part2rules)
			expect(occupied(stable)).toEqual(1974)
		})
	})
})
