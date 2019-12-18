export type Position = [number, number]

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

const hash = (keys: string[]) => (keys.length ? keys.join('') : '<nokeys>')

const isSafe = (
	map: Tile[][],
	visited: string[][][],
	keys: string[],
	pos: Position,
) => {
	if (map[pos[1]] === undefined) return false
	if (map[pos[1]][pos[0]] === undefined) return false
	if (map[pos[1]][pos[0]] === Tile.WALL) return false
	if (visited[pos[1]][pos[0]].includes(hash(keys))) return false
	return true
}

type Location = {
	pos: Position
	path: Position[]
	keys: string[]
	status: 'Start' | 'Valid' | 'Blocked' | 'Locked' | 'AllKeysFound'
}

const status = (
	map: Tile[][],
	visited: string[][][],
	keys: string[],
	location: Position,
) => {
	if (!isSafe(map, visited, keys, location)) return 'Blocked'
	return 'Valid'
}

const createLocation = (
	map: Tile[][],
	visited: string[][][],
	location: Location,
) => (pos: Position): Location => {
	const t = map[location.pos[1]][location.pos[0]]
	// Collect keys on the way
	const keys = [...location.keys]
	if (/[a-z]/.test(t)) {
		// Location is a key
		keys.push(t)
		const allKeys = map.flat().filter(s => /[a-z]/.test(s))
		const foundKeys = [...new Set(keys)]
		const allKeysFound = allKeys.reduce((allKeysFound, key) => {
			if (!allKeysFound) return false
			return foundKeys.includes(key)
		}, true)
		if (allKeysFound) {
			return {
				pos: pos,
				path: [...location.path, location.pos],
				status: 'AllKeysFound',
				keys: foundKeys,
			}
		}
	} else if (/[A-Z]/.test(t)) {
		// It's a door
		if (!location.keys.map(s => s.toUpperCase()).includes(t)) {
			return {
				pos: pos,
				path: [...location.path, location.pos],
				status: 'Locked',
				keys: [...new Set(keys)],
			}
		}
	}

	return {
		pos: pos,
		path: [...location.path, location.pos],
		status: status(map, visited, [...new Set(keys)], pos),
		keys: [...new Set(keys)],
	}
}

const exploreInDirection = (
	map: Tile[][],
	visited: string[][][],
	location: Location,
	direction: DIRECTION,
): Location => {
	let newLocation: Location
	const cl = createLocation(map, visited, location)
	switch (direction) {
		case DIRECTION.UP:
			newLocation = cl([location.pos[0], location.pos[1] - 1] as Position)
			break
		case DIRECTION.DOWN:
			newLocation = cl([location.pos[0], location.pos[1] + 1] as Position)
			break
		case DIRECTION.LEFT:
			newLocation = cl([location.pos[0] - 1, location.pos[1]] as Position)
			break
		case DIRECTION.RIGHT:
			newLocation = cl([location.pos[0] + 1, location.pos[1]] as Position)
			break
	}

	if (newLocation.status === 'Valid') {
		visited[newLocation.pos[1]][newLocation.pos[0]] = [
			...new Set([
				...visited[newLocation.pos[1]][newLocation.pos[0]],
				hash(location.keys),
			]),
		]
	}

	return newLocation
}

const collectAllKeys = (
	map: Tile[][],
	start: Position,
): Location | undefined => {
	const visited = [] as string[][][]
	for (let y = 0; y < map.length; y++) {
		visited[y] = []
		for (let x = 0; x < map[y].length; x++) {
			visited[y][x] = []
		}
	}

	const queue = [
		{
			path: [],
			keys: [],
			pos: start,
			status: 'Start',
		},
	] as Location[]

	while (queue.length > 0) {
		const location = queue.shift() as Location

		// Up
		const up = exploreInDirection(map, visited, location, DIRECTION.UP)
		if (up.status === 'AllKeysFound') {
			return up
		} else if (up.status === 'Valid') {
			queue.push(up)
		}

		// Right
		const right = exploreInDirection(map, visited, location, DIRECTION.RIGHT)
		if (right.status === 'AllKeysFound') {
			return right
		} else if (right.status === 'Valid') {
			queue.push(right)
		}

		// Down
		const down = exploreInDirection(map, visited, location, DIRECTION.DOWN)
		if (down.status === 'AllKeysFound') {
			return down
		} else if (down.status === 'Valid') {
			queue.push(down)
		}

		// Left
		const left = exploreInDirection(map, visited, location, DIRECTION.LEFT)
		if (left.status === 'AllKeysFound') {
			return left
		} else if (left.status === 'Valid') {
			queue.push(left)
		}
	}

	return undefined
}

export const solveDoorMaze = (map: Tile[][]): Location | undefined => {
	let startPoint = undefined
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (map[y][x] === Tile.START) {
				startPoint = [x, y] as Position
				map[y][x] = Tile.PATH
			}
		}
	}

	if (startPoint === undefined) {
		throw new Error('Map has no start point!')
	}

	//console.log(map.map(r => r.join('')).join('\n'), startPoint)

	return collectAllKeys(map, startPoint)
}
