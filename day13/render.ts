import { Position } from './parseInstructions'

export const render = (
	{
		coordinates,
		maxX,
		maxY,
	}: {
		coordinates: Position[]
		maxX?: number
		maxY?: number
	},
	blank?: string,
): string => {
	maxX = maxX ?? coordinates.reduce((maxX, [x]) => (x > maxX ? x : maxX), 0)
	maxY = maxY ?? coordinates.reduce((maxY, [, y]) => (y > maxY ? y : maxY), 0)
	const dots: string[][] = []
	for (let y = 0; y <= maxY; y++) {
		dots[y] = []
		for (let x = 0; x <= maxX; x++) {
			const dot = coordinates.find(([dotX, dotY]) => dotX === x && dotY === y)
			if (dot === undefined) {
				dots[y][x] = blank ?? '.'
			} else {
				dots[y][x] = '#'
			}
		}
	}
	return dots.map((s) => s.join('')).join('\n')
}
