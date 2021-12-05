import { Line } from './line'
import { lineTo, Point } from './lineTo'

export const drawLines = (lines: Line[]): Point[] =>
	lines.reduce((points, line) => [...points, ...lineTo(...line)], [] as Point[])
