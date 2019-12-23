import { fileToArray } from '../utils/fileToArray'
import { run } from './run'
import { run as run2 } from './run2'

const program = fileToArray('day23/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

describe('Day 23: Part 1', () => {
	it('should solve the puzzle', async () => {
		expect(await run(50, program)).toEqual(23213)
	})
})

describe('Day 23: Part 2', () => {
	it('should solve the puzzle', async () => {
		expect(await run2(50, program)).toEqual(17874)
	})
})
