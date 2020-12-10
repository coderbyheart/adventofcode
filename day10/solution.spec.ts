import { loader } from '../lib/loader'
import { countDifferences, stringUpAdapters } from './stringUpAdapters'
import { arrangeAdapters } from './arrangeAdapters'
import { countAdapterArrangements } from './countAdapterArrangements'
import { countRoutes } from './countRoutes'

const toInt = (s: string) => parseInt(s, 10)
const load = loader(10)
const sample = load('sample').map(toInt)
const sample2 = load('sample2').map(toInt)
const input = load('input').map(toInt)

describe('Day 10: Adapter Array', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			const adapters = stringUpAdapters(sample)
			expect(adapters).toEqual([1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, 22])
			const differences = countDifferences(adapters)
			expect(differences).toEqual({ 1: 7, 3: 5 })
		})
		it('should solve the seconds sample', () =>
			expect(countDifferences(stringUpAdapters(sample2))).toEqual({
				1: 22,
				3: 10,
			}))
		it('should solve the seconds sample', () =>
			expect(
				Object.values(countDifferences(stringUpAdapters(input))).reduce(
					(total, r) => total * r,
					1,
				),
			).toEqual(2482))
	})
	describe('Part 2', () => {
		it('should solve the sample', () => {
			const arr = arrangeAdapters(sample)
			expect(arr).toHaveLength(8)
			expect(arr).toContainEqual([1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, 22])
			expect(arr).toContainEqual([1, 4, 5, 6, 7, 10, 12, 15, 16, 19, 22])
			expect(arr).toContainEqual([1, 4, 5, 7, 10, 11, 12, 15, 16, 19, 22])
			expect(arr).toContainEqual([1, 4, 5, 7, 10, 12, 15, 16, 19, 22])
			expect(arr).toContainEqual([1, 4, 6, 7, 10, 11, 12, 15, 16, 19, 22])
			expect(arr).toContainEqual([1, 4, 6, 7, 10, 12, 15, 16, 19, 22])
			expect(arr).toContainEqual([1, 4, 7, 10, 11, 12, 15, 16, 19, 22])
			expect(arr).toContainEqual([1, 4, 7, 10, 12, 15, 16, 19, 22])
		})
		it('should solve the sample (using countAdapterArrangements)', () => {
			const arr = countAdapterArrangements(sample)
			expect(arr).toEqual(8)
		})
		it('should solve the sample (using countAdapterArrangements)', () =>
			expect(countAdapterArrangements(sample)).toEqual(8))

		it('should solve the second sample (using countAdapterArrangements)', () =>
			expect(countAdapterArrangements(sample2)).toEqual(19208))

		// The two above approaches were too slow
		it('should solve the second sample (using countWays)', () =>
			expect(countRoutes(sample2)).toEqual(19208))

		it('should solve', () => expect(countRoutes(input)).toEqual(96717311574016))
	})
})
