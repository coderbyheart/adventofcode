import { loader } from '../lib/loader'
import {
	leastCommon,
	leastCommonBitCriteria,
	mostCommon,
	mostCommonBitCriteria,
} from './common'

const example = [
	'00100',
	'11110',
	'10110',
	'10111',
	'10101',
	'01111',
	'00111',
	'11100',
	'10000',
	'11001',
	'00010',
	'01010',
]

const report = loader(3)('report')

describe('Day 3: Binary Diagnostic', () => {
	describe('Part 1', () => {
		it('should solve the example', () => {
			const gamma = mostCommon(example)
			const epsilon = leastCommon(example)
			expect(gamma).toEqual('10110')
			expect(epsilon).toEqual('01001')
			expect(parseInt(gamma, 2) * parseInt(epsilon, 2)).toEqual(198)
		})
		it('should solve the puzzle', () => {
			const gamma = mostCommon(report)
			const epsilon = leastCommon(report)
			expect(parseInt(gamma, 2) * parseInt(epsilon, 2)).toEqual(3309596)
		})
	})
	describe('Part 2', () => {
		it('should solve the example', () => {
			const oxygenGeneratorRating = mostCommonBitCriteria(example)
			expect(oxygenGeneratorRating).toEqual('10111')
			const co2ScrubberRating = leastCommonBitCriteria(example)
			expect(co2ScrubberRating).toEqual('01010')
			expect(
				parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2),
			).toEqual(230)
		})
		it('should solve the puzzle', () => {
			const oxygenGeneratorRating = mostCommonBitCriteria(report)
			const co2ScrubberRating = leastCommonBitCriteria(report)
			expect(
				parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2),
			).toEqual(2981085)
		})
	})
})
