import { uniqueCombinations } from './uniqueCombinations'

const seq = [2, 3, 5, 7]
describe('uniqueCombinations', () => {
	it.each([
		[0, seq, []],
		[1, seq, [[2], [3], [5], [7]]],
		[
			2,
			seq,
			[
				[2, 3],
				[2, 5],
				[2, 7],
				[3, 5],
				[3, 7],
				[5, 7],
			],
		],
		[
			3,
			seq,
			[
				[2, 3, 5],
				[2, 3, 7],
				[2, 5, 7],
				[3, 5, 7],
			],
		],
		[4, seq, [[2, 3, 5, 7]]],
		[5, seq, []],
	])('combinations of length %d', (length, items, expected) =>
		expect(uniqueCombinations(length)(items)).toEqual(expected),
	)
})
