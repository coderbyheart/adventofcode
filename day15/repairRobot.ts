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

export const drawMap = async (map: string[][]): Promise<void> => {
	process.stdout.write('\x1B[2J')

	const ys = (Object.keys(map).sort(
		(a, b) => parseInt(a, 10) - parseInt(b, 10),
	) as unknown) as number[]
	const minY = ys.shift() as number
	const maxY = ys.pop() as number

	let minX = 0
	let maxX = 0
	map.forEach(row => {
		const xs = (Object.keys(row).sort(
			(a, b) => parseInt(a, 10) - parseInt(b, 10),
		) as unknown) as number[]
		const rowMinX = xs.shift() as number
		const rowMaxX = xs.pop() as number
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
	for (let y = minY; y++; y <= maxY) {
		const yPos = y + yOffset
		if (!screen[yPos]) screen[yPos] = []
		for (let x = minX; x++; x <= maxX) {
			const xPos = x + xOffset
			screen[yPos][xPos] = map[y][x]
		}
	}

	console.log(screen.map(col => col.join('')).join('\n'))
}

export const repairRobot = async (
	program: number[],
	inLessThanNSteps = Infinity,
): Promise<number> => {
	let direction = randomDirection()
	let movementCount = 1
	let stop: () => void
	const map = [] as string[][]
	const pos = [0, 0]
	await compute({
		program,
		exit: exitFn => {
			stop = exitFn
		},
		input: async () => direction,
		output: async out => {
			if (movementCount > inLessThanNSteps) {
				console.log(
					`Movement count ${movementCount} is greater than max ${inLessThanNSteps}!`,
				)
				stop()
				return
			}
			if (map[pos[1]] === undefined) {
				map[pos[1]] = []
			}
			switch (out) {
				case STATUS.HIT_WALL:
					switch (direction) {
						case DIRECTION.NORTH:
							if (map[pos[1] - 1] === undefined) {
								map[pos[1] - 1] = []
							}
							map[pos[1] - 1][pos[0]] = '▒'
							break
						case DIRECTION.SOUTH:
							if (map[pos[1] + 1] === undefined) {
								map[pos[1] + 1] = []
							}
							map[pos[1] + 1][pos[0]] = '▒'
							break
						case DIRECTION.WEST:
							map[pos[1]][pos[0] - 1] = '▒'
							break
						case DIRECTION.EAST:
							map[pos[1]][pos[0] + 1] = '▒'
							break
					}
					direction = (() => {
						let nextDir = randomDirection()
						while (nextDir === direction) {
							nextDir = randomDirection()
						}
						return nextDir
					})()
					movementCount++
					return
				case STATUS.MOVED:
					if (map[pos[1]] === undefined) {
						map[pos[1]] = []
					}
					map[pos[1]][pos[0]] = '.'
					switch (direction) {
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
					map[pos[1]][pos[0]] = '▀'
					direction = randomDirection()
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
