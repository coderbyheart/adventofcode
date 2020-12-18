import {
	isNumber,
	isOpeningParenthesis,
	isOperator,
	isSpace,
	findClosing,
} from './calc'

type Noop = { type: 'noop' }
export type Value = { type: 'value'; value: number }
export type Group = { type: 'group'; group: Token }
export type Op = { type: 'op'; op: '+' | '*'; left: Token; right: Token }
export type Token = Noop | Value | Op | Group

const findNextToken = (expression: string): Token => {
	let i = 0
	let token: Token = { type: 'noop' }
	while (i < expression.length) {
		const c = expression[i]
		if (isNumber(c)) {
			if (token.type === 'op') {
				token.right = { type: 'value', value: parseInt(c, 10) }
			} else {
				token = { type: 'value', value: parseInt(c, 10) }
			}
			i++
		} else if (isSpace(c)) {
			// pass
			i++
		} else if (isOperator(c)) {
			token = {
				type: 'op',
				op: c as '+' | '*',
				left: token,
				right: { type: 'noop' },
			}
			i++
		} else if (isOpeningParenthesis(c)) {
			const closing = findClosing(expression, i)
			if (token.type === 'op') {
				token.right = {
					type: 'group',
					group: findNextToken(expression.substr(i + 1, closing - i - 1)),
				}
			} else {
				token = {
					type: 'group',
					group: findNextToken(expression.substr(i + 1, closing - i - 1)),
				}
			}

			i = closing + 1
		} else {
			throw new Error(`Unexpected token ${c} at position ${i}!`)
		}
	}
	return token
}

export const tokenize = (expression: string): Token => {
	const nextToken = findNextToken(expression)
	return nextToken
}
