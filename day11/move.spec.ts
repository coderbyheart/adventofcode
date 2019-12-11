import { DIRECTION, Position } from './paintRobot'
import { move } from './move'

describe('move', () => {
	it.each([
		[[0, 0], DIRECTION.LEFT, [-1, 0]],
		[[0, 0], DIRECTION.RIGHT, [1, 0]],
		[[0, 0], DIRECTION.UP, [0, -1]],
		[[0, 0], DIRECTION.DOWN, [0, 1]],
	])('should move the robot', (current, direction, expected) => {
		expect(move(current as Position, direction as DIRECTION)).toEqual(expected)
	})
})
