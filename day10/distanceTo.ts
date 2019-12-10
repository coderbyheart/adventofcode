/**
 * Calculates the distance between two points
 */
export const distanceTo = (
	from: [number, number],
	to: [number, number],
): number =>
	Math.sqrt(
		Math.pow(Math.abs(to[0] - from[0]), 2) + Math.pow(to[1] - from[1], 2),
	)
