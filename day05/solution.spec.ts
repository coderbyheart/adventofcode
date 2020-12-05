import { loader } from '../lib/loader'
import { locateSeat } from './locateSeat'

const load = loader(5)
const input = load('input')

describe('Day 5: Binary Boarding', () => {
	describe('Part 1', () => {
		it.each([
			['FBFBBFFRLR', 44, 5],
			['BFFFBBFRRR', 70, 7],
			['FFFBBBFRRR', 14, 7],
			['BBFFBBFRLL', 102, 4],
		])('should solve the sample: %s is row %d, col %d', (passId, row, col) => {
			expect(locateSeat({ rows: 128, cols: 8 })(passId)).toEqual({
				row,
				col,
			})
		})
		it('should solve', () => {
			const l = locateSeat({ rows: 128, cols: 8 })
			expect(
				input
					.map((passId) => l(passId))
					.map(({ row, col }) => row * 8 + col)
					.sort((a, b) => a - b)
					.pop(),
			).toEqual(951)
		})
	})
})
