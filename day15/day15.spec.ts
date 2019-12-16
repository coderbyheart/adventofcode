import { fileToArray } from '../utils/fileToArray'
import { repairRobot, findOxygenSystem, drawMap } from './repairRobot'
import { floodFill, Tile } from './floodFill'

const program = fileToArray('day15/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

describe('Day 15: Part 1', () => {
	it('should find the solution', async () => {
		expect(await repairRobot([...program])).toEqual(246)
	})
})

describe('Day 15: Part 2', () => {
	it('should find the solution', async () => {
		expect(await repairRobot([...program])).toEqual(246)
		const r1 = await findOxygenSystem([...program])
		// Because the implementation favours unvisited fields, this maze will be fully explored
		const r2 = await findOxygenSystem([...program], r1.usedMap)
		await drawMap(r2.usedMap)
		const floodMap = r2.map.map(row =>
			row.map(b => (b ? Tile.FLOODABLE : Tile.WALL)),
		) as number[][]
		floodMap[r2.oxygenSystemPosition[1]][r2.oxygenSystemPosition[0]] =
			Tile.FLOODED
		expect(await floodFill(floodMap)).toEqual(376)
	})
})
