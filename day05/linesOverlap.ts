import { Point } from './lineTo'

export const linesOverlap = (
	minOverlap: number,
	diagram: number[][],
): {
	point: Point
	count: number
}[] => {
	const points: {
		point: Point
		count: number
	}[] = []
	for (let y = 0; y < diagram.length; y++) {
		for (let x = 0; x < diagram[y].length; x++) {
			const count = diagram[y][x]
			if (count >= minOverlap)
				points.push({
					count,
					point: [x, y],
				})
		}
	}
	return points
}
