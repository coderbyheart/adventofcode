type ActiveCube = [number, number, number]

export const loadSeed = (seed: string[]): ActiveCube[] =>
	seed.reduce(
		(cubes, line, y) => [
			...cubes,
			...(line
				.split('')
				.map((s, x) => {
					if (s === '#') return [x, y, 0]
					return undefined
				})
				.filter((c) => c !== undefined) as ActiveCube[]),
		],
		[] as ActiveCube[],
	)

const unique = <T>(v: T, k: number, arr: T[]) => arr.indexOf(v) === k

export const printCubes = (cubes: ActiveCube[]): void => {
	const zs = cubes
		.sort(([, , z1], [, , z2]) => z1 - z2)
		.map(([, , z]) => z)
		.filter(unique)
	const xs = cubes
		.sort(([x1], [x2]) => x1 - x2)
		.map(([x]) => x)
		.filter(unique)
	const ys = cubes
		.sort(([, y1], [, y2]) => y1 - y2)
		.map(([, y]) => y)
		.filter(unique)

	const width = xs[xs.length - 1] - xs[0]
	const xOffset = -xs[0]
	const height = ys[ys.length - 1] - ys[0]
	const yOffset = -ys[0]

	for (const z of zs) {
		console.log('')
		console.log(`z=${z}`)
		const cubesOnLayer = cubes.filter(([, , cubeZ]) => cubeZ === z)
		const space = [] as string[][]
		for (let y = 0; y <= height; y++) {
			space[y] = []
			for (let x = 0; x <= width; x++) {
				space[y][x] = '.'
			}
		}
		for (const cube of cubesOnLayer) {
			space[cube[1] + yOffset][cube[0] + xOffset] = '#'
		}
		console.log(space.map((s) => s.join('')).join('\n'))
	}
}

const equal = (a: ActiveCube) => (b: ActiveCube) =>
	a[0] === b[0] && a[1] === b[1] && a[2] === b[2]

const notEqual = (a: ActiveCube) => (b: ActiveCube) => !equal(a)(b)

const neighbor = (a: ActiveCube) => (b: ActiveCube) =>
	Math.max(
		Math.abs(a[0] - b[0]),
		Math.abs(a[1] - b[1]),
		Math.abs(a[2] - b[2]),
	) === 1

const countActiveNeighbours = (cube: ActiveCube, world: ActiveCube[]): number =>
	world.filter(notEqual(cube)).filter(neighbor(cube)).length

// Return all the cubes around the given cube
const expand = (cube: ActiveCube): ActiveCube[] => {
	const [x, y, z] = cube
	return [
		// Front slice
		[x - 1, y + 1, z - 1],
		[x, y + 1, z - 1],
		[x + 1, y + 1, z - 1],
		[x - 1, y, z - 1],
		[x, y, z - 1],
		[x + 1, y, z - 1],
		[x - 1, y - 1, z - 1],
		[x, y - 1, z - 1],
		[x + 1, y - 1, z - 1],
		// Center slice
		[x - 1, y + 1, z],
		[x, y + 1, z],
		[x + 1, y + 1, z],
		[x - 1, y, z],
		//[x, y, z], // Do not return the cube itself
		[x + 1, y, z],
		[x - 1, y - 1, z],
		[x, y - 1, z],
		[x + 1, y - 1, z],
		// Back slice
		[x - 1, y + 1, z + 1],
		[x, y + 1, z + 1],
		[x + 1, y + 1, z + 1],
		[x - 1, y, z + 1],
		[x, y, z + 1],
		[x + 1, y, z + 1],
		[x - 1, y - 1, z + 1],
		[x, y - 1, z + 1],
		[x + 1, y - 1, z + 1],
	] as ActiveCube[]
}

const containsCube = (world: ActiveCube[]) => ([x, y, z]: ActiveCube) =>
	world.find(([wx, wy, wz]) => wx === x && wy === y && wz === z) !== undefined

const containsNotCube = (world: ActiveCube[]) => (cube: ActiveCube) =>
	!containsCube(world)(cube)

export const cycle = (seed: ActiveCube[]): ActiveCube[] => {
	const iteration: ActiveCube[] = []
	for (const cube of seed) {
		const activeNeighbors = countActiveNeighbours(cube, seed)
		// If a cube is active and exactly 2 or 3 of its neighbors are also active,
		// the cube remains active. Otherwise, the cube becomes inactive.
		const [x, y, z] = cube
		if (activeNeighbors === 2 || activeNeighbors === 3) {
			// console.log(`Cube ${cube} stays active (${activeNeighbors} neighbors)`)
			iteration.push([x, y, z])
		} else {
			// console.log( `Cube ${cube} becomes inactive (${activeNeighbors} neighbors)`, )
		}

		// If a cube is inactive but exactly 3 of its neighbors are active,
		// the cube becomes active. Otherwise, the cube remains inactive.
		const notInSeed = containsNotCube(seed)
		const notInIteration = containsNotCube(iteration)
		const inactiveAround = expand(cube).filter(notInSeed).filter(notInIteration)
		for (const inactiveCube of inactiveAround) {
			const activeNeighbors = countActiveNeighbours(inactiveCube, seed)
			if (activeNeighbors === 3) {
				// console.log( `Cube ${inactiveCube} becomes active (${activeNeighbors} neighbors)`, )
				iteration.push(inactiveCube)
			}
		}
	}
	return iteration
}
