import { loader } from '../lib/loader'
import { calc, calcTokens } from './calcTokens'
import { tokenize } from './tokenize'

const load = loader(18)
const input = load('input')

describe('Day 18: Operation Order', () => {
	describe('calc', () => {
		it.each([
			['1 + 2', 3],
			['3 * 3', 9],
			['1 + 2 + 3', 6],
			['1 + 2 * 3', 9],
			['1 + 2 * 3 + 4 * 5 + 6', 71],
			['(2 * 3)', 6],
			['1 + (2 * 3)', 7],
			['1 + (2 * 3) + 4', 11],
			['(2 * 3) + (3 * 4)', 18],
			['1 + (2 * 3) + (4 * (5 + 6))', 51],
			['2 * 3 + (4 * 5)', 26],
			['5 + (8 * 3 + 9 + 3 * 4 * 3)', 437],
			['5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', 12240],
			['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', 13632],
		])('%s = %d', (expression, expected) =>
			expect(calcTokens(expression)).toEqual(expected),
		)
	})

	describe('Part 1', () => {
		it('should solve', () =>
			expect(input.map(calcTokens).reduce((total, n) => total + n, 0)).toEqual(
				7293529867931,
			))
	})

	describe.skip('Part 2', () => {
		describe('calc (addition is evaluated before multiplication)', () => {
			it.each([
				['1 + 2 * 3 + 4 * 5 + 6', 231],
				['1 + (2 * 3) + (4 * (5 + 6))', 51],
				['2 * 3 + (4 * 5)', 46],
				['5 + (8 * 3 + 9 + 3 * 4 * 3)', 1445],
				['5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', 669060],
				['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', 23340],
			])('%s = %d', (expression, expected) =>
				expect(calc(tokenize(expression))).toEqual(expected),
			)
		})
	})
})
