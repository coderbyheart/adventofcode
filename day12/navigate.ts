export enum Direction {
	N,
	E,
	S,
	W,
}
type Position = { x: number; y: number }

const instructionRx = /^(?<dir>N|S|E|W|L|R|F)(?<amount>[0-9]+)$/

/**
 * Translates the heading to a direction
 *
 * Note: Turn instructions are only given in 90 degree steps.
 */
const headingToDirection = (headingInDegrees: number): Direction => {
	switch (headingInDegrees % 360) {
		case 0:
			return Direction.N
		case 90:
		case -270:
			return Direction.E
		case -90:
		case 270:
			return Direction.W
		case 180:
		case -180:
			return Direction.S
		default:
			console.warn(`Unknown heading: ${headingInDegrees % 360}`)
			return Direction.N
	}
}

/**
 * Move the given position in the given direction.
 * pos is modified in place.
 */
const move = (pos: Position) => (dir: Direction, n: number) => {
	switch (dir) {
		case Direction.N:
			pos.y -= n
			break
		case Direction.S:
			pos.y += n
			break
		case Direction.E:
			pos.x += n
			break
		case Direction.W:
			pos.x -= n
			break
	}
}

/**
 * Convert degrees to radians
 */
const degreesToRadians = (deg: number): number => (deg * Math.PI) / 180

/**
 * Rotate the given position for the given angle around 0,0
 * pos is modified in place.
 */
const rotate = (pos: Position) => (angleInDegrees: number) => {
	const s = Math.sin(degreesToRadians(angleInDegrees))
	const c = Math.cos(degreesToRadians(angleInDegrees))

	const newX = pos.x * c - pos.y * s
	const newY = pos.x * s + pos.y * c

	pos.x = Math.round(newX)
	pos.y = Math.round(newY)
}

/**
 * Implements the relative navigation where instructions are applied relative
 * to the waypoint
 */
export const navigateRelative = (
	instructions: string[],
	waypoint: Position,
): Position => {
	const shipPosition = { x: 0, y: 0 }
	navigate({
		instructions,
		moveTo: move(waypoint),
		changeDir: rotate(waypoint),
		forward: (n: number) => {
			shipPosition.x += waypoint.x * n
			shipPosition.y += waypoint.y * n
		},
	})
	return shipPosition
}

/**
 * Implements the absolute navigation where instructions are applied to the ship
 */
export const navigateAbsolute = (
	instructions: string[],
	shipHeading = 90,
): Position => {
	const shipPosition = { x: 0, y: 0 }
	const moveShip = move(shipPosition)
	navigate({
		instructions,
		forward: (n: number) => moveShip(headingToDirection(shipHeading), n),
		moveTo: moveShip,
		changeDir: (n: number) => {
			shipHeading += n
		},
	})
	return shipPosition
}

const navigate = ({
	instructions,
	moveTo,
	changeDir,
	forward,
}: {
	instructions: string[]
	moveTo: (dir: Direction, amount: number) => void
	changeDir: (amount: number) => void
	forward: (amount: number) => void
}): void => {
	instructions.forEach((s) => {
		const m = instructionRx.exec(s)
		if (m === null) {
			console.warn(`Invalid instruction: ${s}!`)
		}
		const { dir, amount } = m?.groups as any
		const n = parseInt(amount, 10)
		switch (dir) {
			case 'N':
				moveTo(Direction.N, n)
				break
			case 'S':
				moveTo(Direction.S, n)
				break
			case 'E':
				moveTo(Direction.E, n)
				break
			case 'W':
				moveTo(Direction.W, n)
				break
			case 'L':
				changeDir(-n)
				break
			case 'R':
				changeDir(n)
				break
			case 'F':
				forward(n)
				break
		}
	})
}
