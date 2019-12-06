import { parseOrbits } from './parseOrbits'
import { countOrbits } from './countOrbits'

describe('count orbits', () => {
	it('should count 42 orbits in the sample input', () => {
		expect(
			countOrbits(
				parseOrbits([
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
				]),
			),
		).toEqual(42)
	})
})
