import { fileToArray } from '../utils/fileToArray'
import { findOxygenSystem, drawMap } from './repairRobot'
import { floodFill, Tile, drawMap as drawFloodMap } from './floodFill'
import { findShortestPath } from './findShortesPath'

const program = fileToArray('day15/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

jest.setTimeout(60000)

describe('Day 15: Part 1', () => {
	it('should find the solution', async () => {
		const { start, oxygenSystemPosition, map } = await findOxygenSystem(program)
		console.log(`Oxygen System is at position`, oxygenSystemPosition)
		console.log(`Start`, start)
		const path = findShortestPath(map, start, oxygenSystemPosition)
		expect(path.length).toEqual(246)
	})
})

describe('Day 15: Part 2', () => {
	it('should find the solution', async () => {
		const r1 = await findOxygenSystem([...program])
		// Because the implementation favours unvisited fields, this maze will be fully explored
		const r2 = await findOxygenSystem([...program], r1.usedMap)
		await drawMap(r2.usedMap)
		const floodMap = r2.map.map(row =>
			row.map(b => (b ? Tile.FLOODABLE : Tile.WALL)),
		) as number[][]
		floodMap[r2.oxygenSystemPosition[1]][r2.oxygenSystemPosition[0]] =
			Tile.FLOODED
		const iterations = await floodFill(floodMap)
		expect(iterations).toEqual(376)
		await drawFloodMap(floodMap, iterations)
	})
})
