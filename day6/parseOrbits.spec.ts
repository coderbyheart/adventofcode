import { parseOrbits, byId } from './parseOrbits'

describe('parseOrbits', () => {
	it('should parse one orbit', () => {
		const galaxy = parseOrbits(['COM)B'])
		expect(galaxy.objects).toHaveLength(1)
		expect(galaxy.objects[0].id).toEqual('B')
		expect(galaxy.objects[0].orbits).toEqual(galaxy.com)
		expect(galaxy.objects[0].orbits?.id).toEqual('COM')
	})
	it('should parse multiple orbits', () => {
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
		])
		const H = galaxy.objects.find(byId('H'))
		expect(H).toBeDefined()
		expect(H?.orbits).toEqual(galaxy.objects.find(byId('G')))
	})
})
