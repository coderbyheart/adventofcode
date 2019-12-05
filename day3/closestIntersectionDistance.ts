import { wireCrossSectionFinder } from './wireCrossSectionFinder'

export const closestIntersectionDistance = (
	wireDirections: string[][],
): number => {
	const crossSections = wireCrossSectionFinder(wireDirections)
	return crossSections
		.map(pos => Math.abs(pos[0]) + Math.abs(pos[1])) // The central port is always a 0,0 so the Manhatten distance is just the sum of the coordinates        .sort()
		.sort((a, b) => b - a)
		.pop() as number
}
