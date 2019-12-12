import { lowestCommonDenominator } from './lowestCommonDenominator'

describe('least common denominator', () => {
	test('leastCommonDenominator', () => {
		expect(lowestCommonDenominator([1, 2, 3, 4, 5])).toEqual(60)
		expect(lowestCommonDenominator([1234, 2345, 5432, 4321])).toEqual(
			4851477244040,
		)
	})
})
