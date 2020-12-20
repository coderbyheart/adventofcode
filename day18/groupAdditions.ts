import { isNumber } from './calc'

const reverse = (s: string): string => s.split('').reverse().join('')

const addParen = (paren: '(' | ')', exp: string): string => {
	let parenCount = 0
	for (let i = exp.length - 1; i >= 0; i--) {
		const c = exp[i]
		if (['(', ')'].includes(c) && c !== paren) parenCount++
		if (c === paren) {
			parenCount--
			if (parenCount === 0) {
				return `${exp.substr(0, i)}${paren}${exp.substr(i)}`
			}
		}
		if (isNumber(c) && parenCount === 0) {
			return `${exp.substr(0, i)}${paren}${exp.substr(i)}`
		}
	}

	throw new Error(`Could not add parenthesis "${paren}" to "${exp}"!`)
}

const addOpeningParen = (exp: string): string => addParen('(', exp)

const addClosingParen = (exp: string): string =>
	reverse(addParen(')', reverse(exp)))

/**
 * Groups all aditions in the expression, e.g. `1 + 2 * 2` => `(1 + 2) * 3`
 **/
export const groupAdditions = (expression: string): string => {
	let res = expression
	for (let i = 0; i < res.length; i++) {
		if (res[i] === '+') {
			const l = res.substr(0, i - 1)
			const r = res.substr(i + 2)
			const left = addOpeningParen(l)
			const right = addClosingParen(r)
			res = `${left} + ${right}`
			i += 2
		}
	}
	return res
}
