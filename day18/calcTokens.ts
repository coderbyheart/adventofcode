import { Token, tokenize } from './tokenize'

export const calc = (token: Token): number => {
	switch (token.type) {
		case 'op':
			switch (token.op) {
				case '*':
					return calc(token.left) * calc(token.right)
				case '+':
					return calc(token.left) + calc(token.right)
				default:
					throw new Error(`Unexpected operation ${token.op}!`)
			}
		case 'value':
			return token.value
		case 'group':
			return calc(token.group)
		default:
			throw new Error(`Unexpected type ${token.type}`)
	}
}

/**
 * Calculate the expresssion using the tokenizer
 */
export const calcTokens = (expression: string): number =>
	calc(tokenize(expression))
