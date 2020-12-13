import { loadString } from '../lib/loader'
import { findShuttle } from './findShuttle'
import { findTime } from './findTime'

const sample = `939
7,13,x,x,59,x,31,19`
const input = `1003240
19,x,x,x,x,x,x,x,x,41,x,x,x,37,x,x,x,x,x,787,x,x,x,x,x,x,x,x,x,x,x,x,13,x,x,x,x,x,x,x,x,x,23,x,x,x,x,x,29,x,571,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17`

describe('Day 13: Shuttle Search', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			const { bus, waitTime } = findShuttle(loadString(sample))
			expect(bus * waitTime).toEqual(295)
		})
		it('should solve', () => {
			const { bus, waitTime } = findShuttle(loadString(input))
			expect(bus * waitTime).toEqual(3997)
		})
	})
	describe('Part 2', () => {
		it('should solve the sample', () =>
			expect(findTime(loadString(sample)[1])).toEqual(1068781))
		it('should solve', () =>
			expect(findTime(loadString(input)[1])).toEqual(500033211739354))
	})
})
