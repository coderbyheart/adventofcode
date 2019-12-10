import { lineTo } from './lineTo'

describe('lineTo', () => {
	test.each([
		[[0, 0], [0, 0], [[0, 0]]],
		[
			[0, 0],
			[3, 3],
			[
				[0, 0],
				[1, 1],
				[2, 2],
				[3, 3],
			],
		],
		[
			[0, 0],
			[-3, 3],
			[
				[0, 0],
				[-1, 1],
				[-2, 2],
				[-3, 3],
			],
		],
	])(`from %p to %p should draw line %p`, (from, to, line) => {
		expect(lineTo(from as [number, number], to as [number, number])).toEqual(
			line,
		)
	})
})
