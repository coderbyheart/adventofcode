import { fileToArray } from '../utils/fileToArray'
import { countOrbits } from './countOrbits'
import { parseOrbits } from './parseOrbits'

const orbits = fileToArray('day6/input.txt', s => s)

describe('Day 6: Part 1', () => {
	it('should calculate the solution', () => {
		expect(countOrbits(parseOrbits(orbits))).toEqual(247089)
	})
})
