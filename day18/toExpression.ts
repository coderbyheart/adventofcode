import { Token } from './tokenize'

export const toExpression = (token: Token): string => {
	switch (token.type) {
		case 'value':
			return `${token.value}`
		case 'op':
			return `${toExpression(token.left)} ${token.op} ${toExpression(
				token.right,
			)}`
		case 'group':
			return `(${toExpression(token.group)})`
		default:
			throw new Error(`Unexpected token ${token.type}`)
	}
}
