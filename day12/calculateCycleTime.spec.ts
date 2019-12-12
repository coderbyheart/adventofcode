import { Position3D } from './moonMotionSimulator'
import { calculateCycleTime } from './calculateCycleTime'

describe('Calculate the cycle time of the system', () => {
	test('Example 1', () => {
		expect(
			calculateCycleTime([
				[-1, 0, 2],
				[2, -10, -7],
				[4, -8, 8],
				[3, 5, -1],
			] as Position3D[]),
		).toEqual(2772)
	})
	test('Example 2', () => {
		expect(
			calculateCycleTime([
				[-8, -10, 0],
				[5, 5, 10],
				[2, -7, 3],
				[9, -8, -3],
			] as Position3D[]),
		).toEqual(4686774924)
	})
})
