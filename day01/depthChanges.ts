export const depthChanges = (depths: number[]): number =>
	depths.reduce((dives, depth, k, depths) => {
		const previousDepth = depths[k - 1] ?? Number.MAX_SAFE_INTEGER
		if (depth > previousDepth) return dives + 1
		return dives
	}, 0)
