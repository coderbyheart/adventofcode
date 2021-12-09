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

export const findLowPoints = (heightmap: number[][]): number[] => {
	const lowPoints: number[] = []

	for (let y = 0; y < heightmap.length; y++) {
		for (let x = 0; x < heightmap[y].length; x++) {
			const point = heightmap[y][x]
			const up = heightmap[y - 1]?.[x] ?? Number.MAX_SAFE_INTEGER
			if (up <= point) continue
			const down = heightmap[y + 1]?.[x] ?? Number.MAX_SAFE_INTEGER
			if (down <= point) continue
			const left = heightmap[y][x - 1] ?? Number.MAX_SAFE_INTEGER
			if (left <= point) continue
			const right = heightmap[y][x + 1] ?? Number.MAX_SAFE_INTEGER
			if (right <= point) continue
			lowPoints.push(point)
		}
	}
	return lowPoints
}

export const riskLevel = (heightmap: number[][]): number => {
	const lowPoints = findLowPoints(heightmap)
	return lowPoints.reduce((sum, level) => sum + level + 1, 0)
}

describe('findLowPoints()', () => {
	it.each([
		[['000', '000', '000'], []],
		[['111', '101', '111'], [0]],
	])('should find low points in %j to be %j', (map, expected) =>
		expect(findLowPoints(toHeatMap(map))).toEqual(expected),
	)
})

describe('Day 9: Smoke Basin', () => {
	describe('Part 1', () => {
		it('should solve the example', () => expect(riskLevel(example)).toEqual(15))
		it('should solve the puzzle', () => expect(riskLevel(input)).toEqual(498))
	})
})
