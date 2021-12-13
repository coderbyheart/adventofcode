import { flip } from './flip'

describe('flip()', () => {
	it.each([
		[14, 7, 0],
		[13, 7, 1],
		[8, 7, 6],
		[7, 7, 7],
	])('should flip position %d folded at %d to %d', (n, flipPos, expected) => {
		expect(flip(n, flipPos)).toEqual(expected)
	})
})
