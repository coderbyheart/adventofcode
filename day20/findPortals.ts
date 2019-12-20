import { Position, Tile, MazeString } from './transportingMazeSolver'
import { distanceTo } from './distanceTo'

export type Portal = {
	label: string
	pos: Position
	isOuter: boolean
}

type PortalPart = { pos: Position; letter: string; isPortalFor?: Position }

const isOuterPortal = (maze: MazeString, pos: Position): boolean => {
	// Outside left
	if (pos.x === 2) return true
	// Outside right
	if (pos.x === maze.width - 3) return true
	// Outside top
	if (pos.y === 2) return true
	// Outside bottom
	if (pos.y === Math.floor(maze.maze.length / maze.width) - 2) return true
	return false
}

/**
 * Determins if a coordinate is the entry of a portal,
 * because it has a path tile ('.') as neighbour
 */
const isPortalEntry = (
	maze: string,
	width: number,
	x: number,
	y: number,
): number => {
	// Right
	const right = y * width + x + 1
	if (maze[right] === Tile.PATH) return right
	// Left
	const left = y * width + x + -1
	if (maze[left] === Tile.PATH) return left
	// Up
	const up = (y - 1) * width + x
	if (maze[up] === Tile.PATH) return up
	// Down
	const down = (y + 1) * width + x
	if (maze[down] === Tile.PATH) return down
	return 0
}

export const findPortals = (maze: string): Portal[] => {
	const width = maze.indexOf('\n')
	const mapAsString = maze.trimEnd().replace(/\n/g, '')

	// Find all the letters in the map
	const letters = mapAsString.split('').reduce((letters, p, i) => {
		if (/[A-Z]/.test(p)) {
			const y = Math.floor(i / width)
			const entry = isPortalEntry(mapAsString, width, i % width, y)
			letters.push({
				pos: {
					x: i % width,
					y,
				},
				letter: p,
				isPortalFor:
					entry !== 0
						? ({
								x: entry % width,
								y: Math.floor(entry / width),
						  } as Position)
						: undefined,
			})
		}
		return letters
	}, [] as PortalPart[])

	// Portals are two letters with distance of 1
	const portals = letters
		.filter(({ isPortalFor }) => isPortalFor)
		.reduce((portals, letter) => {
			const pair = letters.find(
				l => distanceTo(letter.pos, l.pos) === 1,
			) as PortalPart
			let label = ''
			if (pair.pos.x < letter.pos.x) {
				label = `${pair.letter}${letter.letter}`
			} else if (pair.pos.x > letter.pos.x) {
				label = `${letter.letter}${pair.letter}`
			} else if (pair.pos.y < letter.pos.y) {
				label = `${pair.letter}${letter.letter}`
			} else if (pair.pos.y > letter.pos.y) {
				label = `${letter.letter}${pair.letter}`
			}
			portals.push({
				label,
				pos: letter.isPortalFor as Position,
				isOuter: isOuterPortal(
					{ maze: mapAsString, width },
					letter.isPortalFor as Position,
				),
			})
			return portals
		}, [] as Portal[])

	return portals
}
