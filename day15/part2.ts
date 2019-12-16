import { fileToArray } from '../utils/fileToArray'
import { findOxygenSystem, drawMap } from './repairRobot'

const program = fileToArray('day15/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

const main = async () => {
	const r1 = await findOxygenSystem([...program])
	// Because the implementation favours unvisited fields, this maze will be fully explored
	const r2 = await findOxygenSystem([...program], r1.usedMap)
	await drawMap(r2.usedMap)
	const floodMap = r2.map.map(row => row.map(b => (b ? 1 : 0))) as number[][]
	floodMap[r2.oxygenSystemPosition[1]][r2.oxygenSystemPosition[0]] = 2
	console.log(floodMap.map(row => row.join('')).join('\n'))
	// floodFill(r2.map, r2.oxygenSystemPosition)
}

main()
