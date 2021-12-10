import { parseProgram } from './parseProgram'

const matchingBrace: Record<string, string> = {
	'(': ')',
	'[': ']',
	'{': '}',
	'<': '>',
}

export const completeProgram = (program: string): string[] => {
	const stack = parseProgram(program)
	if (stack.length === 0) return []
	return stack.reverse().map((openingBrace) => matchingBrace[openingBrace])
}
