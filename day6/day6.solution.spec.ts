import { fileToArray } from '../utils/fileToArray'
import { countOrbits } from './countOrbits'
import { parseOrbits, byId, GalaxyObject } from './parseOrbits'
import { findSharedOrbit } from './findSharedOrbit'
import { countHopsVia } from './countHopsVia'

const orbits = fileToArray('day6/input.txt', s => s)
const galaxy = parseOrbits(orbits)

describe('Day 6: Part 1', () => {
	it('should calculate the solution', () => {
		expect(countOrbits(galaxy)).toEqual(247089)
	})
})

describe('Day 6: Part 1', () => {
	it('should calculate the solution', () => {
		const santa = galaxy.objects.find(byId('SAN')) as GalaxyObject
		const me = galaxy.objects.find(byId('YOU')) as GalaxyObject
		const via = findSharedOrbit(santa, me) as GalaxyObject
		expect(countHopsVia(via, santa, me)).toEqual(442)
	})
})
