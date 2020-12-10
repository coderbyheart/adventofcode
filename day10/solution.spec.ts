import { loader } from '../lib/loader'
import { countDifferences, stringUpAdapters } from './stringUpAdapters'

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
})
