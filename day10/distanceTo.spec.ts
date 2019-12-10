import { distanceTo } from './distanceTo'

describe('distanceTo', () => {
	test.each([
		[[0, 0], [0, 0], 0],
		[[0, 0], [3, 3], Math.sqrt(Math.pow(3, 2) + Math.pow(3, 2))],
		[[0, 0], [-3, 3], Math.sqrt(Math.pow(3, 2) + Math.pow(3, 2))],
	])(`from %p to %p should be distance %i`, (from, to, distance) => {
		expect(
			distanceTo(from as [number, number], to as [number, number]),
		).toEqual(distance)
	})
})
