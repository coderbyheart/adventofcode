import * as chalk from 'chalk'

type World = {
	width: number
	surface: boolean[]
}

type Position = {
	x: number
	y: number
}

const isBugThisIteration = (world: World) => ({ x, y }: Position) => {
	if (x < 0) return false
	if (x > world.width - 1) return false
	if (y < 0) return false
	if (y > world.surface.length / world.width - 1) return false
	return world.surface[y * world.width + x]
}

const updateLocation = (world: World) => ({ x, y }: Position): boolean => {
	let numAdjacent = 0
	const isBug = isBugThisIteration(world)
	const isInfested = isBug({ x, y })
	// top
	if (isBug({ x, y: y - 1 })) {
		numAdjacent++
	}
	// right
	if (isBug({ x: x + 1, y })) {
		numAdjacent++
	}
	// bottom
	if (isBug({ x, y: y + 1 })) {
		numAdjacent++
	}
	// left
	if (isBug({ x: x - 1, y })) {
		numAdjacent++
	}
	if (isInfested) {
		return numAdjacent === 1
	} else {
		return numAdjacent === 1 || numAdjacent === 2
	}
}

export const biodiversity = (world: World): number =>
	world.surface.reduce(
		(biodiversity, b, i) => biodiversity + (b ? Math.pow(2, i) : 0),
		0,
	)

export const drawSurface = (world: World, iteration: number, clear = false) => {
	if (clear) process.stdout.write('\x1B[2J')
	for (let i = 0; i < world.surface.length / world.width; i++) {
		console.log(
			world.surface
				.slice(i * world.width, i * world.width + world.width)
				.map(b => (b ? chalk.red('█') : chalk.gray('▒')))
				.join(''),
		)
	}
	console.log(`${iteration}: ${biodiversity(world)}`)
}

export const simulateBacteriasOnSurface = (world: World): number => {
	let updated = world.surface
	const seenBds = [] as number[]
	let bd = -1
	while (!seenBds.includes(bd)) {
		seenBds.push(bd)
		const u = updateLocation({
			surface: updated,
			width: world.width,
		})
		updated = updated.map((_, i) =>
			u({ x: i % world.width, y: Math.floor(i / world.width) }),
		)
		bd = biodiversity({
			surface: updated,
			width: world.width,
		})
	}
	return bd
}

export const toSurface = (s: string): boolean[] =>
	s
		.split('\n')
		.map(s => s.trim())
		.map(s => s.split(''))
		.flat()
		.map(s => (s === '#' ? true : false))
