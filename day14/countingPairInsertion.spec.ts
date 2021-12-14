import { countingPairInsertion } from './countingPairInsertion'
import { countPairs } from './countPairs'
import { parseRule } from './parseRule'

describe('countingPairInsertion()', () => {
	it('should insert a new pair', () => {
		expect(
			countingPairInsertion(
				{
					pairs: {
						NN: 1,
					},
					elements: {
						N: 2,
					},
				},
				[['NN', 'C']],
			),
		).toMatchObject({
			pairs: {
				NC: 1,
				CN: 1,
			},
		})
	})
	it('should solve the example', () => {
		const count = countPairs(`NNCB`)
		expect(count.pairs).toEqual({
			NN: 1,
			NC: 1,
			CB: 1,
		})
		const rules = ['NN -> C', 'NC -> B', 'CB -> H'].map(parseRule)
		expect(countingPairInsertion(count, rules)).toEqual(countPairs('NCNBCHB'))
	})
})
