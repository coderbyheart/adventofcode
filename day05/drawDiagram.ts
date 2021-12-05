import { Point } from './lineTo'

export const drawDiagram = (points: Point[]): number[][] => {
	const width = points.reduce((maxX, [x]) => (x > maxX ? x : maxX), 0)
	const height = points.reduce((maxY, [, y]) => (y > maxY ? y : maxY), 0)
	// Prepare canvas
	const canvas = [] as number[][]
	for (let y = 0; y <= height; y++) {
		canvas[y] = []
		for (let x = 0; x <= width; x++) {
			canvas[y][x] = 0
		}
	}
	for (const [x, y] of points) {
		canvas[y][x] += 1
	}
	return canvas
}
