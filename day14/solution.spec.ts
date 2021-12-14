import { loader } from '../lib/loader'
import { countingPairInsertion } from './countingPairInsertion'
import { countPairs } from './countPairs'
import { pairInsertion } from './pairInsertion'
import { parseRule } from './parseRule'

const exampleRules = [
	'CH -> B',
	'HH -> N',
	'CB -> H',
	'NH -> C',
	'HB -> C',
	'HC -> B',
	'HN -> C',
	'NN -> C',
	'BH -> H',
	'NC -> B',
	'NB -> B',
	'BN -> B',
	'BB -> N',
	'BC -> B',
	'CC -> N',
	'CN -> C',
].map(parseRule)

const exampleTemplate = `NNCB`

const rules = loader(14)('rules').map(parseRule)
const template = `VNVVKSNNFPBBBVSCVBBC`

describe('Day 14: Extended Polymerization', () => {
	describe('Part 1', () => {
		const countElements = (sequence: string): Record<string, number> =>
			sequence.split('').reduce(
				(count, el) => ({
					...count,
					[el]: (count?.[el] ?? 0) + 1,
				}),
				{} as Record<string, number>,
			)

		it('should solve the example', () => {
			let input = exampleTemplate
			for (let step = 0; step < 10; step++) {
				input = pairInsertion(input, exampleRules)
			}
			const count = countElements(input)
			expect(count['B']).toEqual(1749)
			expect(count['C']).toEqual(298)
			expect(count['H']).toEqual(161)
			expect(count['N']).toEqual(865)
		})
		it('should solve the puzzle', () => {
			let input = template
			for (let step = 0; step < 10; step++) {
				input = pairInsertion(input, rules)
			}
			const count = countElements(input)
			const sorted = Object.entries(count).sort(([, c1], [, c2]) => c2 - c1)
			expect(sorted[0][1] - sorted[sorted.length - 1][1]).toEqual(2621)
		})
	})

	/**
	 * Part 2 no longer works with the implementation from part 1, because of
	 * the exponential growth, so I switched to an implementation that keeps
	 * track of the number of pairs and elements instead.
	 */
	describe('Part 2', () => {
		it('should solve the puzzle', () => {
			let input = countPairs(exampleTemplate)
			for (let step = 0; step < 10; step++) {
				input = countingPairInsertion(input, exampleRules)
			}
			const count = input.elements
			expect(count['B']).toEqual(1749)
			expect(count['C']).toEqual(298)
			expect(count['H']).toEqual(161)
			expect(count['N']).toEqual(865)
		})
		it('should solve the puzzle', () => {
			let input = countPairs(template)
			for (let step = 0; step < 40; step++) {
				input = countingPairInsertion(input, rules)
			}
			const count = input.elements
			const sorted = Object.entries(count).sort(([, c1], [, c2]) => c2 - c1)
			expect(sorted[0][1] - sorted[sorted.length - 1][1]).toEqual(2843834241366)
		})
	})
})
