import { loader } from '../lib/loader'
import { render } from './seatingSimulator'
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
			const stable = seatingSimulator(sample)
			expect(
				render(stable)
					.split('')
					.filter((s) => s === '#').length,
			).toEqual(37)
		})
		it('should solve the sample', () => {
			const stable = seatingSimulator(input.join('\n'))
			expect(
				render(stable)
					.split('')
					.filter((s) => s === '#').length,
			).toEqual(2164)
		})
	})
})
