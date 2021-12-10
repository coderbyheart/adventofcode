export const openingBraces = ['(', '[', '{', '<']
export const closingBraces = [')', ']', '}', '>']
export const braces = [...openingBraces, ...closingBraces] as const
export type Brace = typeof braces[number]
export type Chunk = Brace

export class ParseError extends Error {
	public readonly chunk: Chunk
	public readonly position: number
	public readonly program: string
	constructor(
		message: string,
		chunk: Chunk,
		position: number,
		program: string,
	) {
		super(message)
		this.name = 'ParseError'
		this.chunk = chunk
		this.position = position
		this.program = program
	}
}

export const parseProgram = (
	program: string,
	index = 0,
	stack: Chunk[] = [],
): Chunk[] => {
	if (index >= program.length) return stack
	const chunk = program[index]
	if (!braces.includes(chunk))
		throw new Error(`Unexpected chunk ${chunk} at ${index}`)
	if (closingBraces.includes(chunk)) {
		const expectedOpeningBrace = openingBraces[closingBraces.indexOf(chunk)]
		if (stack[stack.length - 1] !== expectedOpeningBrace) {
			throw new ParseError(
				`${program}\nExpected ${expectedOpeningBrace} at ${index}, got ${chunk}`,
				chunk,
				index,
				program,
			)
		}
		stack.pop()
	} else {
		stack.push(chunk)
	}
	return parseProgram(program, ++index, stack)
}
