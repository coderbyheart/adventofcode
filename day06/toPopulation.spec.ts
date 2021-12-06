import { toPopulation } from './toPopulation'

describe('toPopulation()', () => {
	it('should convert the input to a population', () =>
		expect(toPopulation([3, 4, 3, 1, 2])).toEqual({
			1: 1,
			2: 1,
			3: 2,
			4: 1,
		}))
})
