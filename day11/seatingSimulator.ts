enum Tile {
	Empty = 'L',
	Occupied = '#',
}
export enum Direction {
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

/**
 * Determines whether a seat is occupied by going in direction dir from the start
 * row and col.
 * Optionally it will walk down the direction until it finds a seat to evaluate.
 */
export const isOccupied = (
	world: string[][],
	row: number,
	col: number,
	dir = Direction.NONE,
	walk = Direction.NONE,
): number => {
	switch (dir) {
		case Direction.NONE:
			if (row < 0) return 0
			if (row >= world.length) return 0
			if (col < 0) return 0
			if (col >= world[row].length) return 0
			if (world[row][col] === Tile.Occupied) return 1
			if (world[row][col] === Tile.Empty) return 0
			switch (walk) {
				case Direction.NONE:
					return 0
				case Direction.N:
					return isOccupied(world, row - 1, col, Direction.NONE, walk)
				case Direction.NE:
					return isOccupied(world, row - 1, col + 1, Direction.NONE, walk)
				case Direction.E:
					return isOccupied(world, row, col + 1, Direction.NONE, walk)
				case Direction.SE:
					return isOccupied(world, row + 1, col + 1, Direction.NONE, walk)
				case Direction.S:
					return isOccupied(world, row + 1, col, Direction.NONE, walk)
				case Direction.SW:
					return isOccupied(world, row + 1, col - 1, Direction.NONE, walk)
				case Direction.W:
					return isOccupied(world, row, col - 1, Direction.NONE, walk)
				case Direction.NW:
					return isOccupied(world, row - 1, col - 1, Direction.NONE, walk)
				default:
					console.error(`Unknown direction ${dir}.`)
					return 0
			}
		case Direction.N:
			return isOccupied(world, row - 1, col, Direction.NONE, walk)
		case Direction.NE:
			return isOccupied(world, row - 1, col + 1, Direction.NONE, walk)
		case Direction.E:
			return isOccupied(world, row, col + 1, Direction.NONE, walk)
		case Direction.SE:
			return isOccupied(world, row + 1, col + 1, Direction.NONE, walk)
		case Direction.S:
			return isOccupied(world, row + 1, col, Direction.NONE, walk)
		case Direction.SW:
			return isOccupied(world, row + 1, col - 1, Direction.NONE, walk)
		case Direction.W:
			return isOccupied(world, row, col - 1, Direction.NONE, walk)
		case Direction.NW:
			return isOccupied(world, row - 1, col - 1, Direction.NONE, walk)
		default:
			console.error(`Unknown direction ${dir}.`)
			return 0
	}
}

export const render = (world: string[][]): string =>
	world.map((s) => s.join('')).join('\n')

/**
 * All decisions are based on the number of occupied seats adjacent to a given
 * seat (one of the eight positions immediately up, down, left, right, or
 * diagonal from the seat). The following rules are applied to every seat
 * simultaneously:
 *
 * - If a seat is empty (L) and there are no occupied seats adjacent to it,
 *   the seat becomes occupied.
 * - If a seat is occupied (#) and four or more seats adjacent to it are also
 *   occupied, the seat becomes empty.
 * - Otherwise, the seat's state does not change.
 *
 * Floor (.) never changes; seats don't move, and nobody sits on the floor.
 */
export const part1rules = (current: string[][]): string[][] => {
	const next = []
	for (let row = 0; row < current.length; row++) {
		next[row] = [] as string[]
		for (let col = 0; col < current[0].length; col++) {
			let occupied = 0
			occupied += isOccupied(current, row, col, Direction.N)
			occupied += isOccupied(current, row, col, Direction.NE)
			occupied += isOccupied(current, row, col, Direction.E)
			occupied += isOccupied(current, row, col, Direction.SE)
			occupied += isOccupied(current, row, col, Direction.S)
			occupied += isOccupied(current, row, col, Direction.SW)
			occupied += isOccupied(current, row, col, Direction.W)
			occupied += isOccupied(current, row, col, Direction.NW)
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
 * Same as part one, but instead of considering just the eight immediately
 * adjacent seats, consider the first seat in each of those eight directions.
 *
 * Also, it now takes five or more visible occupied seats for an occupied seat
 * to become empty.
 */
export const part2rules = (current: string[][]): string[][] => {
	const next = []
	for (let row = 0; row < current.length; row++) {
		next[row] = [] as string[]
		for (let col = 0; col < current[0].length; col++) {
			let occupied = 0
			occupied += isOccupied(current, row, col, Direction.N, Direction.N)
			occupied += isOccupied(current, row, col, Direction.NE, Direction.NE)
			occupied += isOccupied(current, row, col, Direction.E, Direction.E)
			occupied += isOccupied(current, row, col, Direction.SE, Direction.SE)
			occupied += isOccupied(current, row, col, Direction.S, Direction.S)
			occupied += isOccupied(current, row, col, Direction.SW, Direction.SW)
			occupied += isOccupied(current, row, col, Direction.W, Direction.W)
			occupied += isOccupied(current, row, col, Direction.NW, Direction.NW)
			if (current[row][col] === Tile.Empty) {
				next[row][col] = occupied === 0 ? Tile.Occupied : current[row][col]
			} else if (current[row][col] === Tile.Occupied) {
				next[row][col] = occupied >= 5 ? Tile.Empty : current[row][col]
			} else {
				next[row][col] = current[row][col]
			}
		}
	}
	return next
}

export const occupied = (world: string[][]): number =>
	render(world)
		.split('')
		.filter((s) => s === '#').length

export const loadString = (world: string): string[][] =>
	world
		.split('\n')
		.map((s) => s.trim().split(''))
		.filter((s) => s.length > 0)

/**
 * Run until equilibrium is reached
 */
export const seatingSimulator = (
	world: string,
	rules: (world: string[][]) => string[][],
): string[][] => {
	const start = loadString(world)

	let prevOccupied = -1
	let occ = -1
	let gen = start
	do {
		prevOccupied = occ
		gen = rules(gen)
		occ = occupied(gen)
	} while (occ != prevOccupied)
	return gen
}
