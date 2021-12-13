export type Position = [x: number, y: number]
export type Fold = { x: number } | { y: number }
export const parseInstructions = (
	input: string[],
): {
	coordinates: Position[]
	folds: Fold[]
} => {
	const coordinates: Position[] = []
	const folds: Fold[] = []
	for (const line of input.filter((s) => s.length > 0)) {
		if (line.startsWith('fold along')) {
			const res = /fold along (x|y)=([0-9]+)/.exec(line)
			const amount = parseInt(res?.[2] ?? '', 10)
			if (res?.[1] === 'x') {
				folds.push({ x: amount })
			} else {
				folds.push({ y: amount })
			}
		} else {
			const [x, y] = line.split(',').map((s) => parseInt(s, 10))
			coordinates.push([x, y])
		}
	}
	return {
		coordinates,
		folds,
	}
}
