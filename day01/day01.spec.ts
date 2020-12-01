import { loader } from '../lib/loader'
import { findEntriesWithSum } from './findEntriesWithSum'

const load = loader(1)

const toInt = (s: string) => parseInt(s, 10)
const mul = (total: number, n: number) => n * total

describe('Day 01: Expenses Report', () => {
	it('should solve the sample', () => {
		const sample = load('sample')
		expect(findEntriesWithSum(sample.map(toInt), 2020)).toEqual([1721, 299])
	})
	it('should solve part 1', () => {
		const part1 = load('step1')
		expect(findEntriesWithSum(part1.map(toInt), 2020).reduce(mul, 1)).toEqual(
			982464,
		)
	})
})
