import { calcTokens } from './calcTokens'
import { groupAdditions } from './groupAdditions'

describe('groupAdditions', () => {
	it.each([
		['1 + 2', '(1 + 2)', 3],
		['1 + 2 * 3 + 4 * 5 + 6', '(1 + 2) * (3 + 4) * (5 + 6)', 231],
		['1 + (2 * 3) + (4 * (5 + 6))', '((1 + (2 * 3)) + (4 * ((5 + 6))))', 51],
		['2 * 3 + (4 * 5)', '2 * (3 + (4 * 5))', 46],
		['5 + (8 * 3 + 9 + 3 * 4 * 3)', '(5 + (8 * ((3 + 9) + 3) * 4 * 3))', 1445],
		[
			'5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
			'5 * 9 * (7 * 3 * (3 + 9) * (3 + ((8 + 6) * 4)))',
			669060,
		],
		[
			'((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2',
			'(((((2 + 4) * 9) * (((6 + 9) * (8 + 6)) + 6)) + 2) + 4) * 2',
			23340,
		],
	])(`should group %s to %s and equal %d`, (expression, escaped, expected) => {
		expect(groupAdditions(expression)).toEqual(escaped)
		expect(calcTokens(groupAdditions(expression))).toEqual(expected)
	})
})
