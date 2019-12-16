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
}

main()
