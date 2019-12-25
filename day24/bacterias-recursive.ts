import * as chalk from 'chalk'
import { toSurface } from './bacterias'

type Grid = boolean[]

type World = {
	width: number
	levels: Grid[]
}

type Position = {
	x: number
	y: number
}

const newGrid = (width: number, length: number): Grid => [
	...new Array((length / width) * width).fill(false),
]

enum Edge {
	Left,
	Right,
	Top,
	Bottom,
}

const isBugThisIterationRecursive = (
	world: World,
	level: number,
	grid: Grid,
) => ({ x, y }: Position, edge: Edge): number => {
	if (x < 0) {
		// Left edge, go up one level
		if (!world.levels[level - 1]) {
			// No adjacent cells
			return 0
		}
		return isBugThisIterationRecursive(
			world,
			level - 1,
			world.levels[level - 1],
		)(
			{
				x: Math.floor(world.width / 2) - 1,
				y: Math.floor(grid.length / world.width / 2),
			},
			edge,
		)
	}
	if (x > world.width - 1) {
		// Right edge, go up on level
		if (!world.levels[level - 1]) {
			// No adjacent cells
			return 0
		}
		return isBugThisIterationRecursive(
			world,
			level - 1,
			world.levels[level - 1],
		)(
			{
				x: Math.floor(world.width / 2) + 1,
				y: Math.floor(grid.length / world.width / 2),
			},
			edge,
		)
	}
	if (y < 0) {
		// top edge, go up one level
		if (!world.levels[level - 1]) {
			// No adjacent cells
			return 0
		}
		return isBugThisIterationRecursive(
			world,
			level - 1,
			world.levels[level - 1],
		)(
			{
				x: Math.floor(world.width / 2),
				y: Math.floor(grid.length / world.width / 2) - 1,
			},
			edge,
		)
	}
	if (y > grid.length / world.width - 1) {
		// bottom edge, go up one level
		if (!world.levels[level - 1]) {
			// No adjacent cells
			return 0
		}
		return isBugThisIterationRecursive(
			world,
			level - 1,
			world.levels[level - 1],
		)(
			{
				x: Math.floor(world.width / 2),
				y: Math.floor(grid.length / world.width / 2) + 1,
			},
			edge,
		)
	}
	if (
		x === Math.floor(world.width / 2) &&
		y === Math.floor(grid.length / world.width / 2)
	) {
		// Center, collect edge from one level down
		if (!world.levels[level + 1]) {
			return 0
		}
		const downLevel = world.levels[level + 1]
		const downInfected = isBugThisIterationRecursive(
			world,
			level + 1,
			downLevel,
		)
		let adjacentInfected = 0
		if (edge === Edge.Left) {
			// Collect info from right cells of grid
			for (let y = 0; y < Math.floor(grid.length / world.width); y++) {
				const downRightColInfected = downInfected(
					{
						x: world.width - 1,
						y: y,
					},
					edge,
				)
				adjacentInfected += downRightColInfected
			}
		}
		if (edge === Edge.Right) {
			// Collect info from left cells of grid
			for (let y = 0; y < Math.floor(grid.length / world.width); y++) {
				const downLeftColInfected = downInfected(
					{
						x: 0,
						y: y,
					},
					edge,
				)
				adjacentInfected += downLeftColInfected
			}
		}
		if (edge === Edge.Bottom) {
			// Collect info from top row of grid
			for (let x = 0; x < world.width; x++) {
				const downTopRowInfected = downInfected(
					{
						x,
						y: 0,
					},
					edge,
				)
				adjacentInfected += downTopRowInfected
			}
		}
		if (edge === Edge.Top) {
			// Collect info from bottom row of grid
			for (let x = 0; x < world.width; x++) {
				const downBottomRowInfected = downInfected(
					{
						x,
						y: Math.floor(grid.length / world.width) - 1,
					},
					edge,
				)
				adjacentInfected += downBottomRowInfected
			}
		}
		return adjacentInfected
	}
	return grid[y * world.width + x] ? 1 : 0
}

const updateLocation = (world: World, level: number, grid: Grid) => ({
	x,
	y,
}: Position): boolean => {
	// Middle tile is empty
	if (
		x === Math.floor(world.width / 2) &&
		y === Math.floor(grid.length / world.width / 2)
	) {
		return false
	}
	const isInfested = grid[y * world.width + x]
	let numAdjacent = 0
	const countInfested = isBugThisIterationRecursive(world, level, grid)
	// top
	numAdjacent += countInfested({ x, y: y - 1 }, Edge.Top)
	// right
	numAdjacent += countInfested({ x: x + 1, y }, Edge.Right)
	// bottom
	numAdjacent += countInfested({ x, y: y + 1 }, Edge.Bottom)
	// left
	numAdjacent += countInfested({ x: x - 1, y }, Edge.Left)
	if (isInfested) {
		return numAdjacent === 1
	} else {
		return numAdjacent === 1 || numAdjacent === 2
	}
}

const countBacterias = (grid: Grid) =>
	grid.reduce((count, b) => count + (b ? 1 : 0), 0)

export const drawWorld = (world: World, time: number): void => {
	const screen = [] as string[][]
	for (let y = 0; y < Math.floor(world.levels[0].length / world.width); y++) {
		screen[y] = []
		for (let l = 0; l < world.levels.length; l++) {
			for (let x = 0; x < world.width; x++) {
				screen[y][x + (l * world.width + l * 1)] = world.levels[l][
					y * world.width + x
				]
					? chalk.red('█')
					: chalk.gray.dim('▒')
			}
			screen[y][world.width + (l * world.width + l * 1)] = chalk.black('▒')
		}
	}
	console.log(
		`Minute ${time}. Bacterias: ${world.levels.reduce(
			(sum, level) => sum + countBacterias(level),
			0,
		)}`,
	)
	console.log(screen.map(row => row.join('')).join('\n'))
}

const updateGrid = (world: World, level: number, grid: Grid): Grid => {
	const u = updateLocation(world, level, grid)
	return grid.map((_, i) =>
		u({ x: i % world.width, y: Math.floor(i / world.width) }),
	)
}

export const simulateBacteriasOnSurface = (world: World): void => {
	drawWorld(world, 0)
	for (let i = 0; i < 10; i++) {
		const levels = []
		for (let k = 0; k < world.levels.length; k++) {
			levels[k] = updateGrid(world, k, world.levels[k])
		}
		if (countBacterias(levels[0]) > 0) {
			levels.unshift(newGrid(world.width, world.levels[0].length))
		}
		if (countBacterias(levels[levels.length - 1]) > 0) {
			levels.push(newGrid(world.width, world.levels[0].length))
		}
		world.levels = levels
		drawWorld(world, i + 1)
	}
}

simulateBacteriasOnSurface({
	levels: [
		newGrid(5, 25),
		newGrid(5, 25),
		newGrid(5, 25),
		newGrid(5, 25),
		newGrid(5, 25),
		newGrid(5, 25),
		toSurface(`
			....#
			#..#.
			#.?##
			..#..
			#....
		`),
		newGrid(5, 25),
		newGrid(5, 25),
		newGrid(5, 25),
		newGrid(5, 25),
		newGrid(5, 25),
		newGrid(5, 25),
	],
	width: 5,
})
