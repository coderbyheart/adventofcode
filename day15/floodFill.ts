import * as chalk from 'chalk'

export enum Tile {
	WALL = 0,
	FLOODABLE = 1,
	FLOODED = 2,
}

const isFloodableThisIteration = (
	map: Tile[][],
	flooded: boolean[][],
	[fromX, fromY]: [number, number],
) => ([x, y]: [number, number]) =>
	map[y][x] === Tile.FLOODABLE &&
	flooded[y][x] === false &&
	flooded[fromY][fromX] === false

const flood = (map: Tile[][], flooded: boolean[][]) => ([x, y]: [
	number,
	number,
]): boolean => {
	let numFlooded = 0
	const isFloodable = isFloodableThisIteration(map, flooded, [x, y])
	// top
	if (isFloodable([x, y - 1])) {
		map[y - 1][x] = Tile.FLOODED
		flooded[y - 1][x] = true
		numFlooded++
	}
	// right
	if (isFloodable([x + 1, y])) {
		map[y][x + 1] = Tile.FLOODED
		flooded[y][x + 1] = true
		numFlooded++
	}
	// bottom
	if (isFloodable([x, y + 1])) {
		map[y + 1][x] = Tile.FLOODED
		flooded[y + 1][x] = true
		numFlooded++
	}
	// left
	if (isFloodable([x - 1, y])) {
		map[y][x - 1] = Tile.FLOODED
		flooded[y][x - 1] = true
		numFlooded++
	}
	return numFlooded > 0
}

export const drawMap = async (
	map: Tile[][],
	iteration: number,
	clear = false,
) => {
	if (clear) process.stdout.write('\x1B[2J')
	console.log(
		map
			.map(row =>
				row
					.map(
						t =>
							({
								[Tile.FLOODED]: chalk.blueBright('▒'),
								[Tile.WALL]: chalk.white('▒'),
								[Tile.FLOODABLE]: ' ',
							}[t]),
					)
					.join(''),
			)
			.join('\n'),
	)
	console.log(iteration)
	await new Promise(resolve => setTimeout(resolve, 25))
}

export const floodFill = async (
	map: Tile[][],
	onIteration?: (map: Tile[][], iteration: number) => Promise<void>,
): Promise<number> => {
	let iteration = 0

	let flooded: boolean[][]
	let floodedInIteration = 0

	do {
		flooded = map.map(row => row.map(() => false))

		const f = flood(map, flooded)

		for (let y = 0; y < map.length; y++) {
			for (let x = 0; x < map[0].length; x++) {
				switch (map[y][x]) {
					case Tile.FLOODABLE:
					case Tile.WALL:
						break
					case Tile.FLOODED:
						f([x, y])
				}
			}
		}
		floodedInIteration = flooded.flat().filter(f => f).length
		if (floodedInIteration) {
			iteration++
			if (onIteration) {
				await onIteration(map, iteration)
			}
		}
	} while (floodedInIteration)

	return iteration
}
