import { loader } from '../lib/loader'

const toHeatMap = (map: string[]): number[][] =>
	map.map((s) => s.split('').map((s) => parseInt(s, 10)))

const example = toHeatMap([
	'2199943210',
	'3987894921',
	'9856789892',
	'8767896789',
	'9899965678',
])

const input = toHeatMap(loader(9)('input'))

type Point = {
	level: number
	x: number
	y: number
}

export const findLowPoints = (heightmap: number[][]): Point[] => {
	const lowPoints: Point[] = []

	for (let y = 0; y < heightmap.length; y++) {
		for (let x = 0; x < heightmap[y].length; x++) {
			const point = heightmap[y][x]
			const up = heightmap[y - 1]?.[x] ?? Number.MAX_SAFE_INTEGER
			const down = heightmap[y + 1]?.[x] ?? Number.MAX_SAFE_INTEGER
			const left = heightmap[y][x - 1] ?? Number.MAX_SAFE_INTEGER
			const right = heightmap[y][x + 1] ?? Number.MAX_SAFE_INTEGER
			if (right <= point) continue
			if (left <= point) continue
			if (up <= point) continue
			if (down <= point) continue
			lowPoints.push({
				x,
				y,
				level: point,
			})
		}
	}
	return lowPoints
}

export const flood = (
	heightmap: number[][],
	lowPoint: Point,
	basin = [lowPoint],
	endLevel = 9,
): Point[] => {
	const { x, y } = lowPoint
	const up: Point = { x, y: y - 1, level: heightmap[y - 1]?.[x] ?? endLevel }
	const down: Point = { x, y: y + 1, level: heightmap[y + 1]?.[x] ?? endLevel }
	const left: Point = { x: x - 1, y, level: heightmap[y][x - 1] ?? endLevel }
	const right: Point = { x: x + 1, y, level: heightmap[y][x + 1] ?? endLevel }

	if (up.level < endLevel) {
		if (basin.find(({ x, y }) => x === up.x && y === up.y) === undefined) {
			basin.push(...flood(heightmap, up, [...basin, up], endLevel))
		}
	}
	if (down.level < endLevel) {
		if (basin.find(({ x, y }) => x === down.x && y === down.y) === undefined) {
			basin.push(...flood(heightmap, down, [...basin, down], endLevel))
		}
	}
	if (left.level < endLevel) {
		if (basin.find(({ x, y }) => x === left.x && y === left.y) === undefined) {
			basin.push(...flood(heightmap, left, [...basin, left], endLevel))
		}
	}
	if (right.level < endLevel) {
		if (
			basin.find(({ x, y }) => x === right.x && y === right.y) === undefined
		) {
			basin.push(...flood(heightmap, right, [...basin, right], endLevel))
		}
	}
	// Remove duplicates (FIXME!)
	const uniquePoints: Point[] = []
	const basinMap = basin.reduce((basinMap, { x, y, level }) => {
		if (basinMap[y] === undefined) basinMap[y] = []
		basinMap[y][x] = level
		return basinMap
	}, [] as number[][])
	for (let y = 0; y < basinMap.length; y++) {
		for (let x = 0; x < basinMap[y]?.length ?? 0; x++) {
			const level = basinMap[y][x]
			if (level !== undefined)
				uniquePoints.push({
					x,
					y,
					level,
				})
		}
	}
	return uniquePoints
}

export const findBasins = (heightmap: number[][]): Point[][] => {
	const lowPoints = findLowPoints(heightmap)
	return lowPoints.map((lowPoint) => flood(heightmap, lowPoint))
}

export const riskLevel = (heightmap: number[][]): number => {
	const lowPoints = findLowPoints(heightmap)
	return lowPoints.reduce((sum, { level }) => sum + level + 1, 0)
}

describe('findLowPoints()', () => {
	it.each([
		[['000', '000', '000'], []],
		[
			['111', '101', '111'],
			[
				{
					x: 1,
					y: 1,
					level: 0,
				},
			],
		],
	])('should find low points in %j to be %j', (map, expected) =>
		expect(findLowPoints(toHeatMap(map))).toEqual(expected),
	)
})

describe('Day 9: Smoke Basin', () => {
	describe('Part 1', () => {
		it('should solve the example', () => expect(riskLevel(example)).toEqual(15))
		it('should solve the puzzle', () => expect(riskLevel(input)).toEqual(498))
	})
	describe('Part 2', () => {
		it('should solve the example', () => {
			const basins = findBasins(example)
			expect(basins).toHaveLength(4)
			basins.sort((b1, b2) => b2.length - b1.length)
			expect(basins[0]).toHaveLength(14)
			expect(basins[1]).toHaveLength(9)
			expect(basins[2]).toHaveLength(9)
			expect(basins[3]).toHaveLength(3)
		})
		it('should solve the puzzle', () => {
			const basins = findBasins(input)
			basins.sort((b1, b2) => b2.length - b1.length)
			expect(basins[0]).toHaveLength(105)
			expect(basins[1]).toHaveLength(102)
			expect(basins[2]).toHaveLength(100)
		})
	})
})
