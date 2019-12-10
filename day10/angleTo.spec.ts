import { angleTo } from './angleTo'

describe('angleTo', () => {
	test.each([
		[[0, 0], [0, 0], 0],
		[[0, 0], [3, 3], 45],
		[[0, 0], [-3, 3], 135],
	])(`from %p to %p should calculate angle %i`, (from, to, angle) => {
		expect(angleTo(from as [number, number], to as [number, number])).toEqual(
			angle,
		)
	})
})
