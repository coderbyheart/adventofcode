import { compute } from '../intcode/intcode'

function* walkMap(width: number, height: number) {
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			yield x
			yield y
		}
	}
}

export const droneScan = async (
	program: number[],
	width: number,
	height: number,
): Promise<number> => {
	const measures = [] as string[][]
	const w = walkMap(width, height)
	let currentX = 0
	let currentY = 0
	let c = 0
	for (let i = 0; i < width * height; i++) {
		await compute({
			program: [...program],
			input: async () => {
				const v = w.next().value as number
				if (c % 2 === 0) {
					currentX = v
				} else {
					currentY = v
				}
				c++
				return v
			},
			output: async out => {
				if (measures[currentY] === undefined) {
					measures[currentY] = []
				}
				measures[currentY][currentX] = out ? '#' : ' '
			},
		})
	}
	return measures.flat().filter(s => s === '#').length
}
