const diagonalPath = ([targetX, targetY]: [x: number, y: number]): [
	x: number,
	y: number,
][] => {
	const path: [x: number, y: number][] = []
	let x = 0
	let y = 0
	let xDist = targetX
	let yDist = targetY

	while (xDist > 0 && yDist > 0) {
		if (xDist > yDist) {
			x++
			xDist--
		} else {
			y++
			yDist--
		}
		path.push([x, y])
	}
	path.push([targetX, targetY])
	return path
}

const navigateCave = (
	cave: number[][],
	lowestRisk: () => number,
	onPath: (_: number) => void,
	y = 0,
	x = 0,
	risk = 0,
): void => {
	// Reach the end (bottom right)
	if (y === cave.length - 1 && x === cave[y].length - 1) {
		onPath(risk)
	}
	// Follow the lowest risk path
	// Don't move up or left
	const down = cave[y + 1]?.[x]
	const right = cave[y]?.[x + 1]
	if (down !== undefined) {
		if (risk + down < lowestRisk()) {
			navigateCave(cave, lowestRisk, onPath, y + 1, x, risk + down)
		}
	}
	if (right !== undefined) {
		if (risk + right < lowestRisk()) {
			navigateCave(cave, lowestRisk, onPath, y, x + 1, risk + right)
		}
	}
}

export const lowestRiskPath = (cave: number[][]): number => {
	// Create a baseline risk: a diagonal line
	const line = diagonalPath([cave[cave.length - 1].length - 1, cave.length - 1])
	const lineRisk = line.reduce((risk, [x, y]) => risk + cave[y][x], 0)
	let bestPath = lineRisk
	console.log(bestPath)
	navigateCave(
		cave,
		() => bestPath,
		(risk) => {
			if (risk < bestPath) {
				console.log(`new best path`, risk)
				bestPath = risk
			}
		},
	)
	return bestPath
}

/*
import { loader } from '../lib/loader.js'
const input = loader(15)('input').map((s) =>
	s.split('').map((s) => parseInt(s, 10)),
)

*/

const input = [
	'1163751742',
	'1381373672',
	'2136511328',
	'3694931569',
	'7463417111',
	'1319128137',
	'1359912421',
	'3125421639',
	'1293138521',
	'2311944581',
].map((s) => s.split('').map((s) => parseInt(s, 10)))

console.log(lowestRiskPath(input))
