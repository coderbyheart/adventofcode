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
	/*
	describe('Part 2', () => {
		it('should solve the sample', () => {
			expect(countTrees(3,1)(sample)).toEqual(1)
		})
		it('should solve', () => {
			expect(countTrees(3,1)(input)).toEqual(747)
		})
	})
	*/
})
