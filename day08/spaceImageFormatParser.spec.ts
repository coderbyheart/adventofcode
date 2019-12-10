import { spaceImageFormatParser } from './spaceImageFormatParser'

describe('Space Image Format Parser', () => {
	it('should parse the example', () => {
		expect(
			spaceImageFormatParser([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2], 3, 2),
		).toEqual([
			// Layer 1
			[
				[1, 2, 3],
				[4, 5, 6],
			],
			// Layer 2
			[
				[7, 8, 9],
				[0, 1, 2],
			],
		])
	})
})
