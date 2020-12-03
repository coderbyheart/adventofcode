import { loader } from '../lib/loader'
import { countTrees } from './countTrees'

const load = loader(3)
const sample = load('sample')
const input = load('input')

describe('Day 3: Toboggan Trajectory', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			expect(countTrees({ down: 1, right: 3 })(sample)).toEqual(7)
		})
		it('should solve', () => {
			expect(countTrees({ down: 1, right: 3 })(input)).toEqual(274)
		})
	})
	describe('Part 2', () => {
		const slopes = [
			{ right: 1, down: 1 },
			{ right: 3, down: 1 },
			{ right: 5, down: 1 },
			{ right: 7, down: 1 },
			{ right: 1, down: 2 },
		]
		const mul = (prod: number, n: number) => prod * n
		it('should solve the sample', () => {
			expect(slopes.map((s) => countTrees(s)(sample)).reduce(mul, 1)).toEqual(
				336,
			)
		})
		it('should solve', () => {
			expect(slopes.map((s) => countTrees(s)(input)).reduce(mul, 1)).toEqual(
				6050183040,
			)
		})
	})
})
