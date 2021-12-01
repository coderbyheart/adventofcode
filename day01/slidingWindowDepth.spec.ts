import { slidingWindowDepth } from './slidingWindowDepth'

const sample = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

describe('slidingWindowDepth()', () => {
	it.each([
		[0, Number.MAX_SAFE_INTEGER],
		[1, Number.MAX_SAFE_INTEGER],
		[2, 607],
		[3, 618],
	])('should calculate the sliding window depth', (k, depth) =>
		expect(slidingWindowDepth(sample, 3)(k)).toEqual(depth),
	)
})
