import { loader } from '../lib/loader'
import { locateSeat } from './locateSeat'

const load = loader(5)
const input = load('input')

const l = locateSeat({ rows: 128, cols: 8 })

describe('Day 5: Binary Boarding', () => {
	describe('Part 1', () => {
		it.each([
			['FBFBBFFRLR', 44, 5],
			['BFFFBBFRRR', 70, 7],
			['FFFBBBFRRR', 14, 7],
			['BBFFBBFRLL', 102, 4],
		])('should solve the sample: %s is row %d, col %d', (passId, row, col) => {
			expect(l(passId)).toEqual({
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
	describe('Part 2', () => {
		expect(
			input
				.map((passId) => l(passId))
				.map(({ row, col }) => row * 8 + col)
				.sort((a, b) => a - b)
				.find((id, k, arr) => {
					if (arr[k - 1] === undefined) return false
					if (arr[k + 1] === undefined) return false
					if (id - arr[k - 1] == 2) return true
					return false
				}) - 1,
		).toEqual(653)
	})
})
