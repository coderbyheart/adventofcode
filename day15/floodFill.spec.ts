import { floodFill } from './floodFill'

describe('Flood fill', () => {
	it('should fill the example in 4 iterations', async () => {
		expect(
			await floodFill([
				[0, 0, 0, 0, 0, 0],
				[0, 1, 1, 0, 0, 0],
				[0, 1, 0, 1, 1, 0],
				[0, 1, 2, 1, 0, 0],
				[0, 0, 0, 0, 0, 0],
			]),
		).toEqual(4)
	})
})
