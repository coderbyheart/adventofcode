import { parseOrbits, byId, GalaxyObject } from './parseOrbits'
import { findSharedOrbit } from './findSharedOrbit'

describe('find shared orbit', () => {
	it('should find D as the shared orbit in the sample', () => {
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
		const object = findSharedOrbit(santa, me)
		expect(object?.id).toEqual('D')
	})
})
