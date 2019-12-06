import { parseOrbits, byId, GalaxyObject } from './parseOrbits'
import { findSharedOrbit } from './findSharedOrbit'
import { countHopsVia } from './countHopsVia'

describe('find shared orbit', () => {
	it('should find 4 as the number of hops', () => {
		const galaxy = parseOrbits([
			'COM)B',
			'B)C',
			'C)D',
			'D)E',
			'E)F',
			'B)G',
			'G)H',
			'D)I',
			'E)J',
			'J)K',
			'K)L',
			'K)YOU',
			'I)SAN',
		])
		const santa = galaxy.objects.find(byId('SAN')) as GalaxyObject
		const me = galaxy.objects.find(byId('YOU')) as GalaxyObject
		const via = findSharedOrbit(santa, me) as GalaxyObject
		expect(countHopsVia(via, santa, me)).toEqual(4)
	})
})
