import { calculateTotalEnergyOfSystem } from './calculateTotalEnergyOfSystem'
import { moonMotionSimulator } from './moonMotionSimulator'
import { calculateCycleTime } from './calculateCycleTime'

describe('Day 12: Part 1', () => {
	it('should calculate the solution', () => {
		expect(
			calculateTotalEnergyOfSystem(
				moonMotionSimulator(
					[
						[-16, -1, -12],
						[0, -4, -17],
						[-11, 11, 0],
						[2, 2, -6],
					],
					1000,
				),
			),
		).toEqual(5517)
	})
})

describe('Day 12: Part 2', () => {
	it('should calculate the solution', () => {
		expect(
			calculateCycleTime([
				[-16, -1, -12],
				[0, -4, -17],
				[-11, 11, 0],
				[2, 2, -6],
			]),
		).toEqual(303070460651184)
	})
})
