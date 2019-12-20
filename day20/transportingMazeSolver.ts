import { findPortals, Portal } from './findPortals'

export type Position = { x: number; y: number }

type LocationStatus = 'Start' | 'Valid' | 'Blocked' | 'Target'
export type Location = {
	pos: Position
	path: Position[]
	status: LocationStatus
	level: number
}

export enum Tile {
	PATH = '.',
	WALL = '#',
	PORTAL = '@',
}

export enum DIRECTION {
	UP,
	DOWN,
	LEFT,
	RIGHT,
}

const START = 'AA'
const END = 'ZZ'

type Visited = {
	[key: number]: {
		[key: number]: boolean
	}
}

const isSafe = (
	maze: MazeString,
	visited: Visited,
	pos: Position,
	level: number,
) => {
	const p = pos.y * maze.width + pos.x
	if (maze.maze[p] === undefined) return false
	if (visited[level][p]) return false
	if (maze.maze[p] !== Tile.PATH) return false
	return true
}

const equals = (a: Position, b: Position) => a.x === b.x && a.y === b.y

const status = (
	maze: MazeString,
	visited: Visited,
	pos: Position,
	level: number,
): LocationStatus => {
	if (!isSafe(maze, visited, pos, level)) return 'Blocked'
	return 'Valid'
}

const createLocation = (
	maze: MazeString,
	visited: Visited,
	location: Location,
) => (pos: Position): Location => ({
	level: location.level,
	pos: pos,
	path: [...location.path, location.pos],
	status: status(maze, visited, pos, location.level),
})

const exploreInDirection = (
	maze: MazeString,
	visited: Visited,
	portals: Portal[],
	location: Location,
	// whether to apply recursive rules
	recursive = false,
) => (direction: DIRECTION): Location => {
	let newLocation: Location
	const cl = createLocation(maze, visited, location)
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
		visited[newLocation.level][
			newLocation.pos.y * maze.width + newLocation.pos.x
		] = true
		// Is this a portal?
		const portal = portals.find(({ pos }) => equals(pos, newLocation.pos))
		if (portal) {
			const pair = portals.find(
				p => p !== portal && p.label === portal.label,
			) as Portal
			if (recursive) {
				// When you enter the maze, you are at the outermost level (0);
				// when at the outermost level, only the outer labels AA and ZZ
				// function (as the start and end, respectively); all other outer
				// labeled tiles are effectively walls. At any other level,
				// AA and ZZ count as walls, but the other outer labeled tiles
				// bring you one level outward.
				if (location.level === 0) {
					// Outermost level
					if (portal.label === END) {
						// ZZ is accessible
						return {
							...newLocation,
							status: 'Target',
						}
					}
					// Outer portals are walls at outermost level
					if (portal.isOuter) {
						return {
							...newLocation,
							status: 'Blocked',
						}
					} else {
						// Inner portal takes you one level deeper
						if (visited[newLocation.level + 1] === undefined) {
							visited[newLocation.level + 1] = []
						}
						visited[newLocation.level + 1][
							pair.pos.y * maze.width + pair.pos.x
						] = true
						return {
							pos: pair.pos,
							path: [...location.path, location.pos, portal.pos],
							status: 'Valid',
							level: newLocation.level + 1,
						}
					}
				} else {
					// Other level
					if ([START, END].includes(portal.label)) {
						// Start and end are not accessible
						return {
							...newLocation,
							status: 'Blocked',
						}
					}
					if (portal.isOuter) {
						// Outer portal takes you one level up
						visited[newLocation.level - 1][
							pair.pos.y * maze.width + pair.pos.x
						] = true
						return {
							pos: pair.pos,
							path: [...location.path, location.pos, portal.pos],
							status: 'Valid',
							level: newLocation.level - 1,
						}
					} else {
						// Inner portal takes you one level deeper
						if (visited[newLocation.level + 1] === undefined) {
							visited[newLocation.level + 1] = []
						}
						visited[newLocation.level + 1][
							pair.pos.y * maze.width + pair.pos.x
						] = true
						return {
							pos: pair.pos,
							path: [...location.path, location.pos, portal.pos],
							status: 'Valid',
							level: newLocation.level + 1,
						}
					}
				}
			} else {
				// Is this the last portal
				if (portal.label === END) {
					return {
						...newLocation,
						status: 'Target',
					}
				}
				visited[newLocation.level][pair.pos.y * maze.width + pair.pos.x] = true
				return {
					pos: pair.pos,
					path: [...location.path, location.pos, portal.pos],
					status: 'Valid',
					level: newLocation.level,
				}
			}
		}
	}

	return newLocation
}

export type MazeString = {
	maze: string
	width: number
}

export const transportingMazeSolver = (
	maze: string,
	recursive = false,
): Location | undefined => {
	const width = maze.indexOf('\n')
	const mazeString: MazeString = {
		width,
		maze: maze.trimEnd().replace(/\n/g, ''),
	}
	const portals = findPortals(maze)
	const visited = [] as Visited
	visited[0] = []

	const startPos = portals.find(({ label }) => label === START) as Portal
	const queue = [
		{
			path: [],
			pos: startPos.pos,
			status: 'Start',
			level: 0,
		},
	] as Location[]
	visited[0][startPos.pos.y * width + startPos.pos.x] = true

	while (queue.length > 0) {
		const location = queue.shift() as Location
		const e = exploreInDirection(
			mazeString,
			visited,
			portals,
			location,
			recursive,
		)

		// Up
		const up = e(DIRECTION.UP)
		if (up.status === 'Target') {
			return up
		} else if (up.status === 'Valid') {
			queue.push(up)
		}

		// Right
		const right = e(DIRECTION.RIGHT)
		if (right.status === 'Target') {
			return right
		} else if (right.status === 'Valid') {
			queue.push(right)
		}

		// Down
		const down = e(DIRECTION.DOWN)
		if (down.status === 'Target') {
			return down
		} else if (down.status === 'Valid') {
			queue.push(down)
		}

		// Left
		const left = e(DIRECTION.LEFT)
		if (left.status === 'Target') {
			return left
		} else if (left.status === 'Valid') {
			queue.push(left)
		}
	}

	return undefined
}

const split = (s: string, length: number) => {
	const ret = []
	for (let offset = 0, strLen = s.length; offset < strLen; offset += length) {
		ret.push(s.slice(offset, length + offset))
	}
	return ret
}

export const drawSolution = (maze: string, finalLocation: Location) => {
	const width = maze.indexOf('\n')
	const mapAsString = maze.trimEnd().replace(/\n/g, '')
	let solution = mapAsString
	finalLocation.path.forEach(p => {
		solution =
			solution.substr(0, p.y * width + p.x) +
			'@' +
			solution.substr(p.y * width + p.x + 1)
	})
	console.log(split(solution, width).join('\n'))
}
