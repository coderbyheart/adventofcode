import { compute } from '../intcode/intcode'

function* walkWidth(width: number, start = 0) {
	for (let x = start; x < width; x++) {
		yield x
	}
}

enum BEAM {
	UNKNOWN,
	TURNED_ON,
	TURNED_OFF,
}

export const droneScan = async (
	program: number[],
	size: number,
	scanForWidth = 100,
	startY = 0,
	onWidthFound?: (args: { x: number; y: number }) => void,
): Promise<string[][]> => {
	const measures = [] as string[][]
	let startX = 0
	let widthFound = false
	for (let y = startY; y < size; y++) {
		const w = walkWidth(size, startX)
		let beam = BEAM.UNKNOWN
		let c = 0
		let currentX = 0
		let x = w.next().value
		while (
			x !== undefined &&
			(beam === BEAM.UNKNOWN || beam === BEAM.TURNED_ON)
		) {
			await compute({
				program: [...program],
				input: async () => {
					if (c++ % 2 === 0) {
						currentX = x as number
						x = w.next().value
						return currentX
					} else {
						return y
					}
				},
				output: async out => {
					if (measures[y] === undefined) {
						measures[y] = []
					}
					measures[y][currentX] = out ? '#' : ' '
					const oldBeam = beam
					if (oldBeam === BEAM.UNKNOWN && out) {
						// entered
						beam = BEAM.TURNED_ON
						startX = currentX
					}
					if (oldBeam === BEAM.TURNED_ON && !out) {
						// left
						beam = BEAM.TURNED_OFF
						const width = (x as number) - startX
						if (width > scanForWidth) {
							if (
								measures[y - (scanForWidth - 1)] !== undefined &&
								measures[y - (scanForWidth - 1)][
									startX + (scanForWidth - 1)
								] === '#'
							) {
								widthFound = true
								if (onWidthFound) {
									onWidthFound({
										x: startX,
										y: y - (scanForWidth - 1),
									})
								}
							}
						}
					}
				},
			})
		}
		if (widthFound) break
	}
	return measures
}
