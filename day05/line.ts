import { Point } from './lineTo'

export const toNumber = (s: string): number => parseInt(s, 10)

export type Line = [from: Point, to: Point]

export const toLine = (s: string): Line => {
	const [f, t] = s.split(' -> ')
	const [x0, y0] = f.split(',').map(toNumber)
	const [x1, y1] = t.split(',').map(toNumber)
	return [
		[x0, y0],
		[x1, y1],
	]
}
