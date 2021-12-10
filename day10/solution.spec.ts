import { loader } from '../lib/loader'

const openingBraces = ['(', '[', '{', '<']
const closingBraces = [')', ']', '}', '>']
const braces = [...openingBraces, ...closingBraces] as const
type Brace = typeof braces[number]
type Chunk = Brace

const scores: Record<Brace, number> = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137,
}

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
): void => {
	if (index >= program.length) return
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

describe('parseProgram()', () => {
	it.each([
		['()'],
		['[]'],
		['([])'],
		['{()()()}'],
		['<([{}])>'],
		['[<>({}){}[([])<>]]'],
		['(((((((((())))))))))'],
	])('should parse program %s', (program) => {
		parseProgram(program)
	})
	it.each([['(]'], ['{()()()>'], ['(((()))}'], ['<([]){()}[{}])']])(
		'should fail to parse program %s',
		(program) => expect(() => parseProgram(program)).toThrow(),
	)
})

const example = [
	'[({(<(())[]>[[{[]{<()<>>',
	'[(()[<>])]({[<{<<[]>>(',
	'{([(<{}[<>[]}>{[]{[(<()>',
	'(((({<>}<{<{<>}{[]{[]{}',
	'[[<[([]))<([[{}[[()]]]',
	'[{[{({}]{}}([{[{{{}}([]',
	'{<[[]]>}<{[{[{[]{()[[[]',
	'[<(<(<(<{}))><([]([]()',
	'<{([([[(<>()){}]>(<<{{',
	'<{([{{}}[<[[[<>{}]]]>[]]',
]

const input = loader(10)('input')

describe('Day 10: Syntax Scoring', () => {
	describe('Part 1', () => {
		it('should solve the example', () => {
			let score = 0
			for (const program of example) {
				try {
					parseProgram(program)
				} catch (err) {
					score += scores[(err as ParseError).chunk]
				}
			}
			expect(score).toEqual(26397)
		})
		it('should solve the puzzle', () => {
			let score = 0
			for (const program of input) {
				try {
					parseProgram(program)
				} catch (err) {
					score += scores[(err as ParseError).chunk]
				}
			}
			expect(score).toEqual(367227)
		})
	})
})
