export const slidingWindowDepth =
	(depths: number[], windowSize: number) =>
	(index: number): number => {
		let currentWindowDepth = depths[index]
		if (currentWindowDepth === undefined) return Number.MAX_SAFE_INTEGER
		for (let j = 1; j < windowSize; j++) {
			const prev = depths[index - j]
			if (prev === undefined) return Number.MAX_SAFE_INTEGER
			currentWindowDepth += prev
		}
		return currentWindowDepth
	}
