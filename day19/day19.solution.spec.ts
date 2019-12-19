import { fileToArray } from '../utils/fileToArray'
import { droneScan } from './droneScan'

const program = fileToArray('day19/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

describe('Day 19: Part 1', () => {
	it('should calculate the solution', async () => {
		expect(
			(await droneScan([...program], 50)).flat().filter(s => s === '#').length,
		).toEqual(213)
	})
})

describe('Day 19: Part 2', () => {
	it('should calculate the solution', async () => {
		expect.assertions(1)
		await droneScan([...program], 1200, 100, 900, ({ x, y }) => {
			expect(x * 10000 + y).toEqual(7830987)
		})
	})
})
