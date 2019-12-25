import { compute } from '../intcode/intcode'
import { inputGenerator } from '../intcode/inputGenerator'

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

export type Position = [number, number]

const randomDirection = () =>
	directions[Math.floor(Math.random() * directions.length)]

const getOffsets = (map: string[][]) => {
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

	return {
		xOffset,
		yOffset,
		minX,
		maxX,
		minY,
		maxY,
	}
}

export const drawMap = async (map: string[][]): Promise<void> => {
	const { xOffset, yOffset, minX, maxX, minY, maxY } = getOffsets(map)

	const screen = [] as string[][]

	for (let y = minY; y <= maxY; y++) {
		const yPos = y - yOffset
		if (!screen[yPos]) screen[yPos] = []
		for (let x = minX; x <= maxX; x++) {
			const xPos = x - xOffset
			screen[yPos][xPos] = map[y][x] || ' '
		}
	}

	//process.stdout.write('\x1B[2J')
	const drawnMap = screen.map(col => col.join('')).join('\n')
	console.log(drawnMap)
}

export const toBitMap = (
	map: string[][],
	oxygenSystemPosition: Position,
): boolean[][] => {
	const { xOffset, yOffset, minX, maxX, minY, maxY } = getOffsets(map)

	const bitMap = [] as boolean[][]

	for (let y = minY; y <= maxY; y++) {
		const yPos = y - yOffset
		if (!bitMap[yPos]) bitMap[yPos] = []
		for (let x = minX; x <= maxX; x++) {
			const xPos = x - xOffset
			bitMap[yPos][xPos] = map[y][x] === '.'
		}
	}

	bitMap[oxygenSystemPosition[1]][oxygenSystemPosition[0]] = true

	return bitMap
}

const WALL = '▒'

const isUnknown = (map: string[][], pos: Position, dir: DIRECTION) => {
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

const isValid = (map: string[][], pos: Position, dir: DIRECTION) => {
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

const getNewDirection = (map: string[][], pos: Position) => {
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

export const findOxygenSystem = async (
	program: number[],
	map = [] as string[][],
) =>
	new Promise<{
		start: Position
		oxygenSystemPosition: Position
		map: boolean[][]
		usedMap: string[][]
		// eslint-disable-next-line no-async-promise-executor
	}>(async resolve => {
		let currentDirection = randomDirection()
		const direction = inputGenerator([randomDirection()])
		const start = Math.floor(Number.MAX_SAFE_INTEGER / 2)
		const pos = [start, start] as Position
		let oxygenSystemPosition = undefined
		await compute({
			program,
			input: async () => {
				currentDirection = await direction.take()
				return currentDirection
			},
			output: async out => {
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
						// await drawMap(map)
						// Change direction
						direction.push(getNewDirection(map, pos))
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
						// await drawMap(map)
						direction.push(getNewDirection(map, pos))
						return
					case STATUS.OXYGEN_SYSTEM_FOUND:
						if (map[pos[1]] === undefined) {
							map[pos[1]] = []
						}
						map[pos[1]][pos[0]] = '.'

						switch (currentDirection) {
							case DIRECTION.NORTH:
								oxygenSystemPosition = [pos[0], pos[1] - 1]
								break
							case DIRECTION.SOUTH:
								oxygenSystemPosition = [pos[0], pos[1] + 1]
								break
							case DIRECTION.WEST:
								oxygenSystemPosition = [pos[0] - 1, pos[1]]
								break
							case DIRECTION.EAST:
								oxygenSystemPosition = [pos[0] + 1, pos[1]]
								break
						}
						map[oxygenSystemPosition[1]][oxygenSystemPosition[0]] = 'x'
						// await drawMap(map)
						;(({ yOffset, xOffset }) => {
							const x = [
								oxygenSystemPosition[0] - xOffset,
								oxygenSystemPosition[1] - yOffset,
							] as Position
							resolve({
								start: [start - xOffset, start - yOffset],
								oxygenSystemPosition: x,
								map: toBitMap(map, x),
								usedMap: map,
							})
						})(getOffsets(map))
						return
				}
			},
		})
	})
