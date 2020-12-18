const isNumber = (s: string): boolean => /^[0-9]$/.test(s)
const isSpace = (s: string): boolean => /^ $/.test(s)
const isOperator = (s: string): boolean => /^[+*]$/.test(s)
const isOpeningParenthesis = (s: string): boolean => /^\($/.test(s)
const isClosingParenthesis = (s: string): boolean => /^\)$/.test(s)

const findClosing = (expr: string, start: number) => {
	let level = 0
	for (let i = start; i < expr.length; i++) {
		if (isOpeningParenthesis(expr[i])) level++
		if (isClosingParenthesis(expr[i])) level--
		if (level === 0) return i
	}
	throw new Error(
		`Could not find closing paranthesis in ${expr}, starting at ${start}`,
	)
}

export const calc = (expr: string): number => {
	let a = 0
	let op = ''
	let b = 0
	let pos = 0
	for (let i = 0; i < expr.length; i++) {
		const e = expr[i]
		if (isNumber(e)) {
			if (pos === 0) {
				a = parseInt(`${a}${e}`, 10)
			} else {
				b = parseInt(`${b}${e}`, 10)
			}
		} else if (isOperator(e)) {
			pos = ++pos % 2
			if (pos === 0) {
				a = calc(`${a} ${op} ${b}`)
				b = 0
				pos++
			}
			op = e
		} else if (isSpace(e)) {
			// Pass
		} else if (isOpeningParenthesis(e)) {
			const closingPos = findClosing(expr, i)
			const res = calc(expr.substr(i + 1, closingPos - 1 - i))
			if (pos === 0) a = res
			else b = res
			i = closingPos
			if (closingPos >= expr.length - 1 && pos === 0) return a
		} else {
			throw new Error(`Unexpected character "${e}" at pos ${i}!`)
		}
	}

	switch (op) {
		case '*':
			return a * b
		case '+':
			return a + b
		default:
			throw new Error(`Unexpected operator "${op}"!`)
	}
}
