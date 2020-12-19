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

const findNextToken = (expression: string, groupAdditions: boolean): Token => {
	let i = 0
	let token: Token = { type: 'noop' }
	while (i < expression.length) {
		const c = expression[i]
		if (isNumber(c)) {
			if (
				groupAdditions &&
				token.type === 'group' &&
				token.group.type === 'op' &&
				token.group.op === '+'
			) {
				token.group.right = { type: 'value', value: parseInt(c, 10) }
			} else if (token.type === 'op') {
				token.right = { type: 'value', value: parseInt(c, 10) }
			} else {
				token = { type: 'value', value: parseInt(c, 10) }
			}
			i++
		} else if (isSpace(c)) {
			// pass
			i++
		} else if (isOperator(c)) {
			if (groupAdditions && c === '+') {
				console.dir(token)
				if (token.type === 'op' && token.right.type === 'value') {
					token.right = {
						type: 'group',
						group: {
							type: 'op',
							op: '+',
							left: token.right,
							right: token,
						},
					}
				} else {
					token = {
						type: 'group',
						group: {
							type: 'op',
							op: '+',
							left: token,
							right: { type: 'noop' },
						},
					}
				}
			} else {
				token = {
					type: 'op',
					op: c as '+' | '*',
					left: token,
					right: { type: 'noop' },
				}
			}
			i++
		} else if (isOpeningParenthesis(c)) {
			const closing = findClosing(expression, i)
			if (token.type === 'op') {
				token.right = {
					type: 'group',
					group: findNextToken(
						expression.substr(i + 1, closing - i - 1),
						groupAdditions,
					),
				}
			} else {
				token = {
					type: 'group',
					group: findNextToken(
						expression.substr(i + 1, closing - i - 1),
						groupAdditions,
					),
				}
			}

			i = closing + 1
		} else {
			throw new Error(`Unexpected token ${c} at position ${i}!`)
		}
	}
	return token
}

export const tokenize = (expression: string, groupAdditions = false): Token => {
	const nextToken = findNextToken(expression, groupAdditions)
	return nextToken
}
