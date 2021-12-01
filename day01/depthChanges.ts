import { slidingWindowDepth } from './slidingWindowDepth'

export const slidingDepthChanges =
	(windowSize: number) =>
	(depths: number[]): number => {
		const depthsWindow = slidingWindowDepth(depths, windowSize)
		return depths.reduce((dives, _, k) => {
			const currentWindowDepth = depthsWindow(k)
			const previousWindowDepth = depthsWindow(k - 1)
			if (currentWindowDepth > previousWindowDepth) return dives + 1
			return dives
		}, 0)
	}

export const depthChanges = (depths: number[]): number =>
	depths.reduce((dives, depth, k, depths) => {
		const previousDepth = depths[k - 1] ?? Number.MAX_SAFE_INTEGER
		if (depth > previousDepth) return dives + 1
		return dives
	}, 0)
