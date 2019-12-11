import { Position, DIRECTION } from './paintRobot'

export const move = (point: Position, direction: DIRECTION): Position => {
	switch (direction) {
		case DIRECTION.UP:
			return [point[0], point[1] - 1]
		case DIRECTION.DOWN:
			return [point[0], point[1] + 1]
		case DIRECTION.LEFT:
			return [point[0] - 1, point[1]]
		case DIRECTION.RIGHT:
			return [point[0] + 1, point[1]]
	}
}
