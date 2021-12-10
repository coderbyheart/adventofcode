import { loader } from '../lib/loader'
import { completeProgram } from './completeProgram'
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

const incompleteScores: Record<Brace, number> = {
	')': 1,
	']': 2,
	'}': 3,
	'>': 4,
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
	describe('Part 2', () => {
		const scoreCompletions = (programs: string[]) => {
			const scores: number[] = []
			for (const program of programs) {
				try {
					const stack = parseProgram(program)
					if (stack.length > 0) {
						const completion = completeProgram(program)
						// Program is incomplete
						let programScore = 0
						for (const brace of completion) {
							programScore = programScore * 5 + incompleteScores[brace]
						}
						scores.push(programScore)
					}
				} catch {
					// Ignore
				}
			}
			return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)]
		}
		it('should solve the example', () => {
			expect(scoreCompletions(example)).toEqual(288957)
		})
		it('should solve the example', () => {
			expect(scoreCompletions(input)).toEqual(3583341858)
		})
	})
})
