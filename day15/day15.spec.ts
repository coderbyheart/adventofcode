import { fileToArray } from '../utils/fileToArray'
import { repairRobot } from './repairRobot'

const program = fileToArray('day15/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

describe('Day 15: Part 1', () => {
	it('should find the solution', async () => {
		expect(await repairRobot([...program])).toEqual(246)
	})
})
