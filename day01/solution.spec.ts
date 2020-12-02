import { loader } from '../lib/loader'
import { findEntriesWithSum } from './findEntriesWithSum'

const load = loader(1)
const sample = load('sample')
const input = load('input')

const toInt = (s: string) => parseInt(s, 10)
const mul = (total: number, n: number) => n * total

describe('Day 1: Report Repair', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			expect(
				findEntriesWithSum(2)(sample.map(toInt), 2020).reduce(mul, 1),
			).toEqual(1721 * 299)
		})
		it('should solve', () => {
			expect(
				findEntriesWithSum(2)(input.map(toInt), 2020).reduce(mul, 1),
			).toEqual(982464)
		})
	})
	describe('Part 2', () => {
		it('should solve the sample', () => {
			expect(
				findEntriesWithSum(3)(sample.map(toInt), 2020).reduce(mul, 1),
			).toEqual(979 * 366 * 675)
		})
		it('should solve', () => {
			expect(
				findEntriesWithSum(3)(input.map(toInt), 2020).reduce(mul, 1),
			).toEqual(162292410)
		})
	})
})
