import { lineTo, Point } from './lineTo'

describe('lineTo', () => {
	it.each([
		[
			[1, 1],
			[1, 3],
			[
				[1, 1],
				[1, 2],
				[1, 3],
			],
		],
		[
			[9, 7],
			[7, 7],
			[
				[9, 7],
				[8, 7],
				[7, 7],
			],
		],
	])('should draw a line from %j to %j => %j', (from, to, expected) =>
		expect(lineTo(from as Point, to as Point)).toEqual(expected),
	)
})
