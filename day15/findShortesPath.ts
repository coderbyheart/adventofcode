import { DIRECTION } from '../day11/paintRobot'
import { Position } from './repairRobot'

const isSafe = (map: boolean[][], visited: boolean[][], pos: Position) => {
	if (map[pos[1]] === undefined) return false
	if (map[pos[1]][pos[0]] === undefined) return false
	if (!map[pos[1]][pos[0]]) return false
	if (visited[pos[1]][pos[0]]) return false
	return true
}

const equals = (a: Position, b: Position) => a[0] === b[0] && a[1] === b[1]

type Location = {
	pos: Position
	path: Position[]
	status: 'Start' | 'Valid' | 'Blocked' | 'Target'
}

const status = (
	map: boolean[][],
	visited: boolean[][],
	to: Position,
	location: Position,
) => {
	if (!isSafe(map, visited, location)) return 'Blocked'
	if (equals(location, to)) return 'Target'
	return 'Valid'
}

const createLocation = (
	map: boolean[][],
	visited: boolean[][],
	to: Position,
	location: Location,
) => (pos: Position): Location => ({
	pos: pos,
	path: [...location.path, location.pos],
	status: status(map, visited, to, pos),
})

const exploreInDirection = (
	map: boolean[][],
	visited: boolean[][],
	to: Position,
	location: Location,
	direction: DIRECTION,
): Location => {
	let newLocation: Location
	const cl = createLocation(map, visited, to, location)
	switch (direction) {
		case DIRECTION.UP:
			newLocation = cl([location.pos[0], location.pos[1] - 1] as [
				number,
				number,
			])
			break
		case DIRECTION.DOWN:
			newLocation = cl([location.pos[0], location.pos[1] + 1] as [
				number,
				number,
			])
			break
		case DIRECTION.LEFT:
			newLocation = cl([location.pos[0] - 1, location.pos[1]] as [
				number,
				number,
			])
			break
		case DIRECTION.RIGHT:
			newLocation = cl([location.pos[0] + 1, location.pos[1]] as [
				number,
				number,
			])
			break
	}

	if (newLocation.status === 'Valid') {
		visited[newLocation.pos[1]][newLocation.pos[0]] = true
	}

	return newLocation
}

export const findShortestPath = (
	map: boolean[][],
	from: Position,
	to: Position,
) => {
	const visited = [] as boolean[][]
	for (let y = 0; y < map.length; y++) {
		visited[y] = []
		for (let x = 0; x < map[y].length; x++) {
			visited[y][x] = false
		}
	}

	const queue = [
		{
			path: [],
			pos: from,
			status: 'Start',
		},
	] as Location[]

	while (queue.length > 0) {
		const location = queue.shift() as Location

		// Up
		const up = exploreInDirection(map, visited, to, location, DIRECTION.UP)
		if (up.status === 'Target') {
			return up.path
		} else if (up.status === 'Valid') {
			queue.push(up)
		}

		// Right
		const right = exploreInDirection(
			map,
			visited,
			to,
			location,
			DIRECTION.RIGHT,
		)
		if (right.status === 'Target') {
			return right.path
		} else if (right.status === 'Valid') {
			queue.push(right)
		}

		// Down
		const down = exploreInDirection(map, visited, to, location, DIRECTION.DOWN)
		if (down.status === 'Target') {
			return down.path
		} else if (down.status === 'Valid') {
			queue.push(down)
		}

		// Left
		const left = exploreInDirection(map, visited, to, location, DIRECTION.LEFT)
		if (left.status === 'Target') {
			return left.path
		} else if (left.status === 'Valid') {
			queue.push(left)
		}
	}

	return []
}
