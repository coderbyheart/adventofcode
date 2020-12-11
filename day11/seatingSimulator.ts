enum Tile {
	Empty = 'L',
	Occupied = '#',
}
enum Direction {
	N,
	NE,
	E,
	SE,
	S,
	SW,
	W,
	NW,
	NONE,
}

const is = (
	world: string[][],
	row: number,
	col: number,
	state: Tile,
	dir = Direction.NONE,
): boolean => {
	switch (dir) {
		case Direction.NONE:
			if (row < 0) return false
			if (row >= world.length) return false
			if (col < 0) return false
			if (col >= world[row].length) return false
			return world[row][col] === state
		case Direction.N:
			return is(world, row - 1, col, state)
		case Direction.NE:
			return is(world, row - 1, col + 1, state)
		case Direction.E:
			return is(world, row, col + 1, state)
		case Direction.SE:
			return is(world, row + 1, col + 1, state)
		case Direction.S:
			return is(world, row + 1, col, state)
		case Direction.SW:
			return is(world, row + 1, col - 1, state)
		case Direction.W:
			return is(world, row, col - 1, state)
		case Direction.NW:
			return is(world, row - 1, col - 1, state)
		default:
			console.error(`Unknown direction ${dir}.`)
			return false
	}
}

export const render = (world: string[][]): string =>
	world.map((s) => s.join('')).join('\n')

const iteration = (current: string[][]): string[][] => {
	const next = []
	for (let row = 0; row < current.length; row++) {
		next[row] = [] as string[]
		for (let col = 0; col < current[0].length; col++) {
			let occupied = 0
			occupied += is(current, row, col, Tile.Occupied, Direction.N) ? 1 : 0
			occupied += is(current, row, col, Tile.Occupied, Direction.NE) ? 1 : 0
			occupied += is(current, row, col, Tile.Occupied, Direction.E) ? 1 : 0
			occupied += is(current, row, col, Tile.Occupied, Direction.SE) ? 1 : 0
			occupied += is(current, row, col, Tile.Occupied, Direction.S) ? 1 : 0
			occupied += is(current, row, col, Tile.Occupied, Direction.SW) ? 1 : 0
			occupied += is(current, row, col, Tile.Occupied, Direction.W) ? 1 : 0
			occupied += is(current, row, col, Tile.Occupied, Direction.NW) ? 1 : 0
			if (current[row][col] === Tile.Empty) {
				next[row][col] = occupied === 0 ? Tile.Occupied : current[row][col]
			} else if (current[row][col] === Tile.Occupied) {
				next[row][col] = occupied >= 4 ? Tile.Empty : current[row][col]
			} else {
				next[row][col] = current[row][col]
			}
		}
	}
	return next
}

/**
 * Run until equilibrium is reached
 */
export const seatingSimulator = (world: string): string[][] => {
	const start = world
		.split('\n')
		.map((s) => s.trim().split(''))
		.filter((s) => s.length > 0)

	let prevOccupied = -1
	let occ = -1
	let gen = start
	do {
		prevOccupied = occ
		gen = iteration(gen)
		occ = render(gen)
			.split('')
			.filter((s) => s === '#').length
	} while (occ != prevOccupied)
	return gen
}
