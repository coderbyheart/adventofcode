export enum Direction {
	N,
	E,
	S,
	W,
}
type Position = { x: number; y: number }

const instructionRx = /^(?<dir>N|S|E|W|L|R|F)(?<amount>[0-9]+)$/

const headingToDirection = (heading: number): Direction => {
	switch (heading % 360) {
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
			console.warn(`Unknown heading: ${heading % 360}`)
			return Direction.N
	}
}

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

export const navigate = (
	instructions: string[],
	startDirection = 90,
): Position => {
	const pos = { x: 0, y: 0 }
	const mv = move(pos)
	let heading = startDirection

	instructions.forEach((s) => {
		const m = instructionRx.exec(s)
		if (m === null) {
			console.warn(`Invalid instruction: ${s}!`)
		}
		const { dir, amount } = m?.groups as any
		const n = parseInt(amount, 10)
		switch (dir) {
			case 'N':
				mv(Direction.N, n)
				break
			case 'S':
				mv(Direction.S, n)
				break
			case 'E':
				mv(Direction.E, n)
				break
			case 'W':
				mv(Direction.W, n)
				break
			case 'L':
				heading -= n
				break
			case 'R':
				heading += n
				break
			case 'F':
				mv(headingToDirection(heading), n)
				break
		}
	})
	return pos
}
