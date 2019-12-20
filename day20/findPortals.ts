import { Position, Tile, MazeString } from './transportingMazeSolver'
import { distanceTo } from './distanceTo'

export type Portal = {
	label: string
	pos: Position
	isOuter: boolean
}

type PortalPart = { pos: Position; letter: string; isPortalFor?: Position }

/**
 * Detects outer portal, they are located on the outside of the map
 */
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
 * Determines if a coordinate is the entry of a portal,
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

export const findPortals = (maze: MazeString): Portal[] => {
	// Find all the letters in the map
	const letters = maze.maze.split('').reduce((letters, p, i) => {
		if (/[A-Z]/.test(p)) {
			const y = Math.floor(i / maze.width)
			const entry = isPortalEntry(maze.maze, maze.width, i % maze.width, y)
			letters.push({
				pos: {
					x: i % maze.width,
					y,
				},
				letter: p,
				isPortalFor:
					entry !== 0
						? ({
								x: entry % maze.width,
								y: Math.floor(entry / maze.width),
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
			// Figure out the label based on the relative position of the pair
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
				isOuter: isOuterPortal(maze, letter.isPortalFor as Position),
			})
			return portals
		}, [] as Portal[])

	return portals
}
