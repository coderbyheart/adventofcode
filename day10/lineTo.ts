/**
 * Calculates a line between two points using the Bresenham algorithm
 */
export const lineTo = (
	from: [number, number],
	to: [number, number],
): [number, number][] => {
	const line = [] as [number, number][]

	const dx = Math.abs(to[0] - from[0])
	const dy = Math.abs(to[1] - from[1])
	const sx = from[0] < to[0] ? 1 : -1
	const sy = from[1] < to[1] ? 1 : -1
	let err = dx - dy
	let newX = from[0]
	let newY = from[1]

	// eslint-disable-next-line no-constant-condition
	while (true) {
		line.push([newX, newY])
		if (newX === to[0] && newY === to[1]) break
		const e2 = 2 * err

		if (e2 > -dy) {
			err -= dy
			newX += sx
		}
		if (e2 < dx) {
			err += dx
			newY += sy
		}
	}

	return line
}
