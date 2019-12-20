type Position = {
	x: number
	y: number
}

type POI = {
	letter: string
	pos: Position
}

type Maze = {
	maze: string
	width: number
}

type Location = {
	pos: Position
	pois: POI[]
	distance: number
	status: 'Start' | 'Valid' | 'Blocked' | 'Target'
}

type Connection = {
	from: POI
	to?: POI
	path?: Location
}

export enum Tile {
	START = '@',
	PATH = '.',
	WALL = '#',
}

export enum DIRECTION {
	UP,
	DOWN,
	LEFT,
	RIGHT,
}

const isSafe = (map: Maze, visited: boolean[], pos: Position) => {
	const p = pos.y * map.width + pos.x
	if (map.maze[p] === undefined) return false
	if (map.maze[p] === Tile.WALL) return false
	if (visited[p]) return false
	return true
}

const status = (map: Maze, visited: boolean[], location: Position) => {
	if (!isSafe(map, visited, location)) return 'Blocked'
	return 'Valid'
}

const createLocation = (map: Maze, visited: boolean[], location: Location) => (
	pos: Position,
): Location => {
	const p = pos.y * map.width + pos.x
	const t = map.maze[p]
	const pois = [...location.pois]
	if (/[A-Z]/i.test(t)) {
		// Door/Key?
		pois.push({
			letter: t,
			pos,
		})
	}
	return {
		pos: pos,
		pois,
		status: status(map, visited, pos),
		distance: location.distance + 1,
	}
}

const exploreInDirection = (
	map: Maze,
	visited: boolean[],
	target: POI,
	location: Location,
	direction: DIRECTION,
): Location => {
	let newLocation: Location
	const cl = createLocation(map, visited, location)
	switch (direction) {
		case DIRECTION.UP:
			newLocation = cl({ x: location.pos.x, y: location.pos.y - 1 } as Position)
			break
		case DIRECTION.DOWN:
			newLocation = cl({ x: location.pos.x, y: location.pos.y + 1 } as Position)
			break
		case DIRECTION.LEFT:
			newLocation = cl({ x: location.pos.x - 1, y: location.pos.y } as Position)
			break
		case DIRECTION.RIGHT:
			newLocation = cl({ x: location.pos.x + 1, y: location.pos.y } as Position)
			break
	}

	if (newLocation.status === 'Valid') {
		const p = newLocation.pos.y * map.width + newLocation.pos.x
		if (map.maze[p] === target.letter) {
			return {
				...newLocation,
				status: 'Target',
			}
		}
		visited[newLocation.pos.y * map.width + newLocation.pos.x] = true
	}

	return newLocation
}

const equals = (a: Position, b: Position) => a.x === b.x && a.y === b.y

type POIPath = {
	poi: POI
	path: Location[]
}

const shortestPathToFinalKey = (
	map: Maze,
	start: POIPath,
	target: POI,
	connections: Connection[],
	collectedKeys: string[] = [],
): POIPath | undefined => {
	if (start.poi.letter === target.letter) {
		return start
	}

	const reachableKeys = connections
		.filter(({ from }) => equals(from.pos, start.poi.pos)) // reachable from here
		.filter(({ to }) => /[a-z]/.test(to?.letter ?? '')) // is a key
		.filter(({ to }) => !collectedKeys.includes((to as POI).letter)) // not already collected
		.filter(({ path }) => {
			const doorsInPath = path?.pois.filter(({ letter }) =>
				/[A-Z]/.test(letter),
			)
			const lockedDoors = doorsInPath?.filter(
				({ letter }) => !collectedKeys.includes(letter.toLowerCase()),
			)
			return lockedDoors?.length === 0 ?? false
		})
		.sort(
			({ path: p1 }, { path: p2 }) =>
				(p1?.distance ?? Number.MAX_SAFE_INTEGER) -
				(p2?.distance ?? Number.MAX_SAFE_INTEGER),
		)

	const nextKey = reachableKeys.shift()
	if (nextKey) {
		return shortestPathToFinalKey(
			map,
			{
				poi: nextKey.to as POI,
				path: [...start.path, nextKey.path as Location],
			},
			target,
			connections,
			[...collectedKeys, nextKey?.to?.letter as string],
		)
	}

	return undefined
}

const findShortestPath = (
	map: Maze,
	start: POI,
	target: POI,
): Location | undefined => {
	const visited = [] as boolean[]

	const queue = [
		{
			pois: [],
			pos: start.pos,
			status: 'Start',
			distance: 0,
		},
	] as Location[]

	while (queue.length > 0) {
		const location = queue.shift() as Location

		// Up
		const up = exploreInDirection(map, visited, target, location, DIRECTION.UP)
		if (up.status === 'Target') {
			return up
		} else if (up.status === 'Valid') {
			queue.push(up)
		}

		// Right
		const right = exploreInDirection(
			map,
			visited,
			target,
			location,
			DIRECTION.RIGHT,
		)
		if (right.status === 'Target') {
			return right
		} else if (right.status === 'Valid') {
			queue.push(right)
		}

		// Down
		const down = exploreInDirection(
			map,
			visited,
			target,
			location,
			DIRECTION.DOWN,
		)
		if (down.status === 'Target') {
			return down
		} else if (down.status === 'Valid') {
			queue.push(down)
		}

		// Left
		const left = exploreInDirection(
			map,
			visited,
			target,
			location,
			DIRECTION.LEFT,
		)
		if (left.status === 'Target') {
			return left
		} else if (left.status === 'Valid') {
			queue.push(left)
		}
	}

	return undefined
}

const solveDoorMaze2 = (maze: string) => {
	const width = maze.trim().indexOf('\n')
	const mazeString = maze
		.split('\n')
		.map(s => s.trim())
		.join('')
	const map = { maze: mazeString, width }

	// Find start
	const startPos = mazeString.indexOf('@')
	const start: POI = {
		letter: '@',
		pos: {
			x: startPos % width,
			y: Math.floor(startPos / width),
		},
	}

	// Find all keys
	const keys = mazeString.split('').reduce((keys, char, index) => {
		if (/[a-z]/.test(char)) {
			keys.push({
				letter: char,
				pos: {
					x: index % width,
					y: Math.floor(index / width),
				},
			})
		}
		return keys
	}, [] as POI[])

	// Calculate distances between start and keys
	const startToKeys = keys
		.filter(({ letter }) => /[a-z]/.test(letter))
		.map(
			key =>
				({
					from: start,
					to: key,
					path: findShortestPath(map, start, key),
				} as Connection),
		)

	// Calculate distances between keys
	const keysToKeys = keys
		.map(key =>
			keys
				.filter(otherKey => otherKey !== key)
				.map(
					otherKey =>
						({
							from: key,
							to: otherKey,
							path: findShortestPath(map, key, otherKey),
						} as Connection),
				),
		)
		.flat()

	const doorLetters = mazeString.split('').filter(s => /[A-Z]/.test(s))

	const finalKey = keys
		.filter(({ letter }) => /[a-z]/.test(letter))
		.find(({ letter }) => !doorLetters.includes(letter)) as POI

	const res = shortestPathToFinalKey(
		map,
		{
			poi: start,
			path: [],
		},
		finalKey,
		[...startToKeys, ...keysToKeys],
	)

	console.dir(res, { depth: 10 })
	console.log(res?.path.reduce((total, p) => total + p.distance, 0))
}

/*
solveDoorMaze2(
    `
#########
#b.A.@.a#
#########
`)
*/

solveDoorMaze2(
	`
    ########################
    #f.D.E.e.C.b.A.@.a.B.c.#
    ######################.#
    #d.....................#
    ########################
`,
)
