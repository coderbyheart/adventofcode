import { compute } from '../intcode/intcode'

enum STATUS {
	HIT_WALL = 0,
	MOVED = 1,
	OXYGEN_SYSTEM_FOUND = 2,
}

enum DIRECTION {
	NORTH = 1,
	SOUTH = 2,
	WEST = 3,
	EAST = 4,
}

const directions = [
	DIRECTION.NORTH,
	DIRECTION.SOUTH,
	DIRECTION.WEST,
	DIRECTION.EAST,
]

const randomDirection = () =>
	directions[Math.floor(Math.random() * directions.length)]

export const drawMap = async (
	map: string[][],
	movementCount: number,
	inLessThanNSteps: number,
): Promise<void> => {
	const ys = Object.keys(map)
		.map(s => parseInt(s, 10))
		.sort((a, b) => a - b)
	const minY = ys[0]
	const maxY = ys[ys.length - 1]

	let minX = Number.MAX_SAFE_INTEGER
	let maxX = 0
	Object.values(map).forEach(row => {
		const xs = Object.keys(row)
			.map(s => parseInt(s, 10))
			.sort((a, b) => a - b)
		const rowMinX = xs[0]
		const rowMaxX = xs[xs.length - 1]
		if (minX > rowMinX) {
			minX = rowMinX
		}
		if (maxX < rowMaxX) {
			maxX = rowMaxX
		}
	})

	const yOffset = Math.abs(Math.min(minY))
	const xOffset = Math.abs(Math.min(minX))

	const screen = [] as string[][]

	for (let y = minY; y <= maxY; y++) {
		const yPos = y - yOffset
		if (!screen[yPos]) screen[yPos] = []
		for (let x = minX; x <= maxX; x++) {
			const xPos = x - xOffset
			screen[yPos][xPos] = map[y][x] || ' '
		}
	}

	process.stdout.write('\x1B[2J')
	const drawnMap = screen.map(col => col.join('')).join('\n')
	console.log(drawnMap)
	console.log({ movementCount, inLessThanNSteps })
	await new Promise(resolve => setTimeout(resolve, 10))
}

type Taker = (value: number) => void
const inputGenerator = (inp: number[], takers: Taker[] = []) => ({
	take: async () => {
		const i = inp.shift()
		if (i !== undefined) {
			return Promise.resolve(i)
		}
		return new Promise<number>(resolve => {
			takers.push(resolve)
		})
	},
	push: (value: number) => {
		const taker = takers.shift()
		if (taker) {
			taker(value)
		} else {
			inp.push(value)
		}
	},
	inputs: inp,
})

const WALL = '▒'

const isUnknown = (map: string[][], pos: [number, number], dir: DIRECTION) => {
	switch (dir) {
		case DIRECTION.NORTH:
			return (
				map[pos[1] - 1] === undefined || map[pos[1] - 1][pos[0]] === undefined
			)
		case DIRECTION.SOUTH:
			return (
				map[pos[1] + 1] === undefined || map[pos[1] + 1][pos[0]] === undefined
			)
		case DIRECTION.WEST:
			return map[pos[1]] === undefined || map[pos[1]][pos[0] - 1] === undefined
		case DIRECTION.EAST:
			return map[pos[1]] === undefined || map[pos[1]][pos[0] + 1] === undefined
	}
}

const isValid = (map: string[][], pos: [number, number], dir: DIRECTION) => {
	switch (dir) {
		case DIRECTION.NORTH:
			return (
				map[pos[1] - 1] === undefined ||
				map[pos[1] - 1][pos[0]] === undefined ||
				map[pos[1] - 1][pos[0]] !== WALL
			)
		case DIRECTION.SOUTH:
			return (
				map[pos[1] + 1] === undefined ||
				map[pos[1] + 1][pos[0]] === undefined ||
				map[pos[1] + 1][pos[0]] !== WALL
			)
		case DIRECTION.WEST:
			return (
				map[pos[1]] === undefined ||
				map[pos[1]][pos[0] - 1] === undefined ||
				map[pos[1]][pos[0] - 1] !== WALL
			)
		case DIRECTION.EAST:
			return (
				map[pos[1]] === undefined ||
				map[pos[1]][pos[0] + 1] === undefined ||
				map[pos[1]][pos[0] + 1] !== WALL
			)
	}
}

const getNewDirection = (map: string[][], pos: [number, number]) => {
	// Prefer unknown locations
	const unknownDirection = directions.find(direction =>
		isUnknown(map, pos, direction),
	)
	if (unknownDirection) return unknownDirection
	let newDirection
	do {
		newDirection = randomDirection()
	} while (!isValid(map, pos, newDirection))
	return newDirection
}

const getArrow = (direction: DIRECTION) => {
	switch (direction) {
		case DIRECTION.NORTH:
			return '↑'
		case DIRECTION.SOUTH:
			return '↓'
		case DIRECTION.WEST:
			return '←'
		case DIRECTION.EAST:
			return '→'
	}
}

export const repairRobot = async (
	program: number[],
	inLessThanNSteps = Infinity,
): Promise<number> => {
	let currentDirection = randomDirection()
	const direction = inputGenerator([randomDirection()])
	let movementCount = 1
	let stop: () => void
	const map = [] as string[][]
	const pos = [
		Math.floor(Number.MAX_SAFE_INTEGER / 2),
		Math.floor(Number.MAX_SAFE_INTEGER / 2),
	] as [number, number]
	await compute({
		program,
		exit: exitFn => {
			stop = exitFn
		},
		input: async () => {
			currentDirection = await direction.take()
			return currentDirection
		},
		output: async out => {
			if (movementCount > inLessThanNSteps) {
				stop()
				return
			}
			if (map[pos[1]] === undefined) {
				map[pos[1]] = []
			}
			switch (out) {
				case STATUS.HIT_WALL:
					switch (currentDirection) {
						case DIRECTION.NORTH:
							if (map[pos[1] - 1] === undefined) {
								map[pos[1] - 1] = []
							}
							map[pos[1] - 1][pos[0]] = WALL
							break
						case DIRECTION.SOUTH:
							if (map[pos[1] + 1] === undefined) {
								map[pos[1] + 1] = []
							}
							map[pos[1] + 1][pos[0]] = WALL
							break
						case DIRECTION.WEST:
							map[pos[1]][pos[0] - 1] = WALL
							break
						case DIRECTION.EAST:
							map[pos[1]][pos[0] + 1] = WALL
							break
					}
					// await drawMap(map, movementCount, inLessThanNSteps)
					// Change direction
					direction.push(getNewDirection(map, pos))
					movementCount++
					return
				case STATUS.MOVED:
					if (map[pos[1]] === undefined) {
						map[pos[1]] = []
					}
					map[pos[1]][pos[0]] = '.'
					switch (currentDirection) {
						case DIRECTION.NORTH:
							pos[1] -= 1
							break
						case DIRECTION.SOUTH:
							pos[1] += 1
							break
						case DIRECTION.WEST:
							pos[0] -= 1
							break
						case DIRECTION.EAST:
							pos[0] += 1
							break
					}
					if (map[pos[1]] === undefined) {
						map[pos[1]] = []
					}
					map[pos[1]][pos[0]] = getArrow(currentDirection)
					// await drawMap(map, movementCount, inLessThanNSteps)
					direction.push(getNewDirection(map, pos))
					movementCount++
					return
				case STATUS.OXYGEN_SYSTEM_FOUND:
					stop()
					return
			}
		},
	})
	return movementCount
}
