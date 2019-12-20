import { distanceTo } from './distanceTo'
import { Position } from './transportingMazeSolver'

describe('distanceTo', () => {
	test.each([
		[{ x: 0, y: 0 }, { x: 0, y: 0 }, 0],
		[
			{ x: 0, y: 0 },
			{ x: 3, y: 3 },
			Math.sqrt(Math.pow(3, 2) + Math.pow(3, 2)),
		],
		[
			{ x: 0, y: 0 },
			{ x: -3, y: 3 },
			Math.sqrt(Math.pow(3, 2) + Math.pow(3, 2)),
		],
	])(`from %p to %p should be distance %i`, (from, to, distance) => {
		expect(distanceTo(from as Position, to as Position)).toEqual(distance)
	})
})
