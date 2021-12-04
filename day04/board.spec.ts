import { isWinning } from './board'

describe('Board', () => {
	it.each([
		[[[0]], [1], false],
		[[[0]], [1, 0], true],
		[
			[
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			],
			[1, 0, 3],
			false,
		],
		// Winning row
		[
			[
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			],
			[0, 1, 2],
			true,
		],
		// Winning col
		[
			[
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			],
			[8, 6, 5, 3, 2],
			true,
		],
	])('board %j should win with numbers %j: %b', (board, numbers, winning) =>
		expect(isWinning(board, numbers)).toEqual(winning),
	)
})
