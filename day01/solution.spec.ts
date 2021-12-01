import { loader } from '../lib/loader'
import { depthChanges } from './depthChanges'

describe('Day 1: Sonar Sweep', () => {
	describe('Part 1', () => {
		it('should solve the example', () =>
			expect(
				depthChanges([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]),
			).toEqual(7))
		it('should solve the puzzle', () =>
			expect(
				depthChanges(loader(1)('part1').map((s) => parseInt(s, 10))),
			).toEqual(1374))
	})
})
