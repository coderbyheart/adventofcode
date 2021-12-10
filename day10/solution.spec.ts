import { loader } from '../lib/loader'
import { Brace, ParseError, parseProgram } from './parseProgram'

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

const scores: Record<Brace, number> = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137,
}

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
