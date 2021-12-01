import { loader } from '../lib/loader'
import { depthChanges, slidingDepthChanges } from './depthChanges'

const input = loader(1)('input').map((s) => parseInt(s, 10))

describe('Day 1: Sonar Sweep', () => {
	describe('Part 1', () => {
		it('should solve the example', () =>
			expect(
				depthChanges([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]),
			).toEqual(7))
		it('should solve the puzzle', () =>
			expect(depthChanges(input)).toEqual(1374))
	})
	describe('Part 2', () => {
		it('should solve the example', () =>
			expect(
				slidingDepthChanges(3)([
					199, 200, 208, 210, 200, 207, 240, 269, 260, 263,
				]),
			).toEqual(5))
		it('should solve the puzzle', () =>
			expect(slidingDepthChanges(3)(input)).toEqual(1418))
	})
})
