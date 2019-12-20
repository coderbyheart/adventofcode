import { findPortals, Portal } from './findPortals'

export type Position = { x: number; y: number }

type LocationStatus = 'Start' | 'Valid' | 'Blocked' | 'Target'
type Location = {
	pos: Position
	path: Position[]
	status: LocationStatus
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

const isSafe = (maze: MazeString, visited: boolean[], pos: Position) => {
	const p = pos.y * maze.width + pos.x
	if (maze.maze[p] === undefined) return false
	if (visited[p]) return false
	if (maze.maze[p] !== Tile.PATH) return false
	return true
}

const equals = (a: Position, b: Position) => a.x === b.x && a.y === b.y

const status = (
	maze: MazeString,
	visited: boolean[],
	location: Position,
): LocationStatus => {
	if (!isSafe(maze, visited, location)) return 'Blocked'
	return 'Valid'
}

const createLocation = (
	maze: MazeString,
	visited: boolean[],
	location: Location,
) => (pos: Position): Location => ({
	pos: pos,
	path: [...location.path, location.pos],
	status: status(maze, visited, pos),
})

const exploreInDirection = (
	maze: MazeString,
	visited: boolean[],
	portals: Portal[],
	location: Location,
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
		visited[newLocation.pos.y * maze.width + newLocation.pos.x] = true
		// Is this a portal?
		const portal = portals.find(({ pos }) => equals(pos, newLocation.pos))
		if (portal) {
			// Is this the last portal
			if (portal.label === 'ZZ') {
				return {
					...newLocation,
					status: 'Target',
				}
			}
			const pair = portals.find(
				p => p !== portal && p.label === portal.label,
			) as Portal
			visited[pair.pos.y * maze.width + pair.pos.x] = true
			return {
				pos: pair.pos,
				path: [...location.path, location.pos],
				status: status(maze, visited, pair.pos),
			}
		}
	}

	return newLocation
}

type MazeString = {
	maze: string
	width: number
}

export const transportingMazeSolver = (maze: string): Location | undefined => {
	const width = maze.indexOf('\n')
	const mazeString: MazeString = {
		width,
		maze: maze.trimEnd().replace(/\n/g, ''),
	}
	const portals = findPortals(maze)
	const visited = [] as boolean[]

	const startPos = portals.find(({ label }) => label === 'AA') as Portal
	const queue = [
		{
			path: [],
			pos: startPos.pos,
			status: 'Start',
		},
	] as Location[]
	visited[startPos.pos.y * width + startPos.pos.x] = true

	while (queue.length > 0) {
		const location = queue.shift() as Location
		const e = exploreInDirection(mazeString, visited, portals, location)

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
