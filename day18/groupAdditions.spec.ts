import { isNumber } from './calc'
import { calcTokens } from './calcTokens'

const reverse = (s: string): string => s.split('').reverse().join('')

const addOpeningParen = (exp: string): string => {
	let rev = reverse(exp)
	let len = rev.length
	let parenCount = 0
	for (let i = 0; i < len; i++) {
		const c = rev[i]
		if (c === ')') parenCount++
		if (c === '(') parenCount++
		if (isNumber(c)) {
			rev = `${rev}(`
			i++
			len++
		}
	}
	return reverse(rev)
}
const addClosingParen = (exp: string): string => exp

const groupAdditions = (expression: string): string => {
	console.log(expression)
	let res = expression
	for (let i = 0; i < expression.length; i++) {
		if (res[i] === '+') {
			const left = addOpeningParen(res.substr(0, i - 1))
			const right = addClosingParen(res.substr(i + 2))
			console.log({ left, right })
			res = `${left} + ${right}`
		}
	}
	return res
}

describe('groupAdditions', () => {
	it.each([
		['1 + 2 * 3 + 4 * 5 + 6', '(1 + 2) * (3 + 4) * (5 + 6)', 231],
		//['1 + (2 * 3) + (4 * (5 + 6))', '((1 + (2 * 3)) + (4 * (5 + 6)))', 51],
		//['2 * 3 + (4 * 5)', '2 * (3 + (4 * 5))', 46],
		//['5 + (8 * 3 + 9 + 3 * 4 * 3)', '(5 + (8 * ((3 + 9) + 3) * 4 * 3))', 1445],
		//[
		//	'5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
		//		'5 * 9 * (7 * 3 * (3 + 9) * (3 + ((8 + 6) * 4)))',
		//		669060,
		//	],
		//	[
		//		'((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2',
		//		'(((((2 + 4) * 9) * (((6 + 9) * (8 + 6)) + 6)) + 2) + 4) * 2',
		//		23340,
		//	],
	])(`should group %s to %s and equal %d`, (expression, escaped, expected) => {
		expect(groupAdditions(expression)).toEqual(escaped)
		expect(calcTokens(groupAdditions(expression))).toEqual(expected)
	})
})
