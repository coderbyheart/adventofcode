/**
 * Calculates the between two points
 */
export const angleTo = (from: [number, number], to: [number, number]): number =>
	(Math.atan2(to[1] - from[1], to[0] - from[0]) * 180) / Math.PI
