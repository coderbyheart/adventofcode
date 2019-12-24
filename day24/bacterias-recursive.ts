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

const newGrid = (world: World): Grid => [
	...new Array((world.levels[0].length / world.width) * world.width).fill(
		false,
	),
]

enum Edge {
	None,
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
				adjacentInfected += downInfected(
					{
						x: world.width,
						y: y * world.width,
					},
					edge,
				)
			}
		}
		if (edge === Edge.Right) {
			// Collect info from left cells of grid
			for (let y = 0; y < Math.floor(grid.length / world.width); y++) {
				adjacentInfected += downInfected(
					{
						x: 0,
						y: y * world.width,
					},
					edge,
				)
			}
		}
		if (edge === Edge.Bottom) {
			// Collect info from top row of grid
			for (let x = 0; x < world.width; x++) {
				adjacentInfected += downInfected(
					{
						x,
						y: 0,
					},
					edge,
				)
			}
		}
		if (edge === Edge.Top) {
			// Collect info from bottom row of grid
			for (let x = 0; x < world.width; x++) {
				adjacentInfected += downInfected(
					{
						x,
						y: Math.floor(grid.length / world.width),
					},
					edge,
				)
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
	let numAdjacent = 0
	const isBug = isBugThisIterationRecursive(world, level, grid)
	const isInfested = isBug({ x, y }, Edge.None)
	// top
	if (isBug({ x, y: y - 1 }, Edge.Top)) {
		numAdjacent++
	}
	// right
	if (isBug({ x: x + 1, y }, Edge.Right)) {
		numAdjacent++
	}
	// bottom
	if (isBug({ x, y: y + 1 }, Edge.Bottom)) {
		numAdjacent++
	}
	// left
	if (isBug({ x: x - 1, y }, Edge.Left)) {
		numAdjacent++
	}
	if (isInfested) {
		return numAdjacent === 1
	} else {
		return numAdjacent === 1 || numAdjacent === 2
	}
}

export const drawLevel = (world: World, grid: Grid, level: number) => {
	for (let i = 0; i < grid.length / world.width; i++) {
		console.log(
			grid
				.slice(i * world.width, i * world.width + world.width)
				.map(b => (b ? chalk.red('█') : chalk.gray('▒')))
				.join(''),
		)
	}
	console.log(`${level}`)
}

const updateGrid = (world: World, level: number, grid: Grid): Grid => {
	const u = updateLocation(world, level, grid)
	return grid.map((_, i) =>
		u({ x: i % world.width, y: Math.floor(i / world.width) }),
	)
}

const countBacterias = (grid: Grid) =>
	grid.reduce((count, b) => count + (b ? 1 : 0), 0)

export const simulateBacteriasOnSurface = (world: World): void => {
	console.log(`Time: 0`)
	world.levels.filter(countBacterias).forEach((level, i) => {
		drawLevel(world, level, i)
	})
	for (let i = 0; i < 2; i++) {
		const levels = []
		for (let k = 0; k < world.levels.length; k++) {
			levels[k] = updateGrid(world, k, world.levels[k])
		}
		if (countBacterias(levels[0]) > 0) {
			levels.unshift(newGrid(world))
		}
		if (countBacterias(levels[levels.length - 1]) > 0) {
			levels.push(newGrid(world))
		}
		console.log(`Time: ${i + 1}`)
		world.levels = levels
		world.levels.filter(countBacterias).forEach((level, i) => {
			drawLevel(world, level, i)
		})
	}
	console.log(
		`Bacterias: ${world.levels.reduce(
			(sum, level) => sum + countBacterias(level),
			0,
		)}`,
	)
}

simulateBacteriasOnSurface({
	levels: [
		toSurface(`
			....#
			#..#.
			#.?##
			..#..
			#....
		`),
	],
	width: 5,
})
