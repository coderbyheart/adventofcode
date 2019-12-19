import { fileToArray } from '../utils/fileToArray'
import { droneScan } from './droneScan'

const program = fileToArray('day19/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

describe('Day 19: Part 1', () => {
	it('should calculate the solution', async () => {
		expect(await droneScan([...program], 50, 50)).toEqual(213)
	})
})
