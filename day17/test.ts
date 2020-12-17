import { loadString } from '../lib/loader'

type Cube = [number, number, number, boolean]

const seed = loadString(`.#.
..#
###`)

const cubes = seed.reduce(
	(cubes, line, y) => [
		...cubes,
		...line.split('').map((s, x) => {
			if (s === '#') return [x, y, 0, true] as Cube
			return [x, y, 0, false] as Cube
		}),
	],
	[] as Cube[],
)

const unique = <T>(v: T, k: number, arr: T[]) => arr.indexOf(v) === k

const printCubes = (cubes: Cube[]) => {
	const layers = cubes
		.sort(([, , z1], [, , z2]) => z2 - z1)
		.map(([, , z]) => z)
		.filter(unique)
	for (const z of layers) {
		console.log('')
		console.log(`z=${z}`)
		const cubesOnLayer = cubes.filter(([, , cubeZ]) => cubeZ === z)
		const width = cubesOnLayer.reduce(
			(width, [x]) => (x > width ? x : width),
			0,
		)
		const height = cubesOnLayer.reduce(
			(height, [, y]) => (y > height ? y : height),
			0,
		)
		const space = [] as string[][]
		for (let y = 0; y <= height; y++) {
			space[y] = []
			for (let x = 0; x <= width; x++) {
				space[y][x] = ' '
			}
		}
		for (const cube of cubesOnLayer) {
			space[cube[1]][cube[0]] = cube[3] ? '#' : '.'
		}
		console.log(space.map((s) => s.join('')).join('\n'))
	}
}

const equal = (a: Cube) => (b: Cube) =>
	a[0] === b[0] && a[1] === b[1] && a[2] === b[2]

const notEqual = (a: Cube) => (b: Cube) => !equal(a)(b)

const isActive = ([, , , active]: Cube) => active

const neighbor = (a: Cube) => (b: Cube) =>
	Math.max(
		Math.abs(a[0] - b[0]),
		Math.abs(a[1] - b[1]),
		Math.abs(a[2] - b[2]),
	) === 1

const countActiveNeighbours = (cube: Cube, world: Cube[]): number =>
	world.filter(notEqual(cube)).filter(isActive).filter(neighbor(cube)).length

// Extend the world so that each active cube has inactive neighbours around
const extend = (world: Cube[]): Cube[] =>
	world.filter(isActive).reduce((newCubes, cube) => {
		const [x, y, z] = cube
		const neighbors = [
			// Front slice
			[x - 1, y + 1, z - 1, false],
			[x, y + 1, z - 1, false],
			[x + 1, y + 1, z - 1, false],
			[x - 1, y, z - 1, false],
			[x, y, z - 1, false],
			[x + 1, y, z - 1, false],
			[x - 1, y - 1, z - 1, false],
			[x, y - 1, z - 1, false],
			[x + 1, y - 1, z - 1, false],
			// Center slice
			[x - 1, y + 1, z, false],
			[x, y + 1, z, false],
			[x + 1, y + 1, z, false],
			[x - 1, y, z, false],
			// [x, y, z, false],
			[x + 1, y, z, false],
			[x - 1, y - 1, z, false],
			[x, y - 1, z, false],
			[x + 1, y - 1, z, false],
			// Back slice
			[x - 1, y + 1, z + 1, false],
			[x, y + 1, z + 1, false],
			[x + 1, y + 1, z + 1, false],
			[x - 1, y, z + 1, false],
			[x, y, z + 1, false],
			[x + 1, y, z + 1, false],
			[x - 1, y - 1, z + 1, false],
			[x, y - 1, z + 1, false],
			[x + 1, y - 1, z + 1, false],
		] as Cube[]
		return neighbors.filter(
			([x, y, z]) =>
				[...world, ...newCubes].find(
					([wx, wy, wz]) => wx === x && wy === y && wz === z,
				) === undefined,
		)
	}, [] as Cube[])

const cycle = (cubes: Cube[]): Cube[] =>
	[...cubes, ...extend(cubes)].map((cube) => {
		const activeNeighbors = countActiveNeighbours(cube, cubes)
		// If a cube is active and exactly 2 or 3 of its neighbors are also active,
		// the cube remains active. Otherwise, the cube becomes inactive.
		const [x, y, z] = cube
		if (isActive(cube)) {
			if (activeNeighbors === 2 || activeNeighbors === 3) {
				console.log(`Cube ${cube} stays active (${activeNeighbors} neighbors)`)
				return [x, y, z, true]
			}
			console.log(
				`Cube ${cube} becomes inactive (${activeNeighbors} neighbors)`,
			)
			return [x, y, z, false]
		}
		// If a cube is inactive but exactly 3 of its neighbors are active,
		// the cube becomes active. Otherwise, the cube remains inactive.
		if (!isActive(cube)) {
			if (activeNeighbors === 3) return [x, y, z, true]
			return [x, y, z, false]
		}
		return [...cube]
	})

printCubes(cubes)
console.log(`Cycle 1`)
printCubes(cycle(cubes))
