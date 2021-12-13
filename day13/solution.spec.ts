const example = [
	'6,10',
	'0,14',
	'9,10',
	'0,3',
	'10,4',
	'4,11',
	'6,0',
	'6,12',
	'4,1',
	'0,13',
	'10,12',
	'3,4',
	'3,0',
	'8,4',
	'1,10',
	'2,14',
	'8,10',
	'9,0',
	'',
	'fold along y=7',
	'fold along x=5',
]

type Position = [x: number, y: number]
type Fold = { x: number } | { y: number }
const parseInstructions = (
	input: string[],
): {
	coordinates: Position[]
	folds: Fold[]
} => {
	const coordinates: Position[] = []
	const folds: Fold[] = []
	for (const line of input.filter((s) => s.length > 0)) {
		if (line.startsWith('fold along')) {
			const res = line.match(/fold along (x|y)=([0-9]+)/)
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

/**
 * .   0
 * .   .
 * .   .
 * - >
 * .   .
 * .   .
 * 5   .
 */
const flip = (pos: number, flipPos: number): number => {
	const delta = pos - flipPos
	if (delta === 0) return pos
	const flipped = pos - delta * 2
	if (flipped < 0) throw new Error(`Failed to flip ${pos} at ${flipPos}`)
	return flipped
}

describe('flip()', () => {
	it.each([
		[14, 7, 0],
		[13, 7, 1],
		[8, 7, 6],
		[7, 7, 7],
	])('should flip position %d folded at %d to %d', (n, flipPos, expected) => {
		expect(flip(n, flipPos)).toEqual(expected)
	})
})

const fold = (coordinates: Position[], fold: Fold): Position[] => {
	const folded: Position[] = []
	// const maxX = coordinates.reduce((maxX, [x]) => (x > maxX ? x : maxX), 0)
	//const maxY = coordinates.reduce((maxY, [, y]) => (y > maxY ? y : maxY), 0)
	// Horizontal fold
	if ('y' in fold) {
		// Copy all points above y
		folded.push(...coordinates.filter(([, y]) => y <= fold.y))
		// Flip y for all points on and below
		folded.push(
			...coordinates
				.filter(([, y]) => y > fold.y)
				.map(([x, y]) => [x, flip(y, fold.y)] as Position),
		)
	}
	return folded
}

const render = (coordinates: Position[]): string => {
	const maxX = coordinates.reduce((maxX, [x]) => (x > maxX ? x : maxX), 0)
	const maxY = coordinates.reduce((maxY, [, y]) => (y > maxY ? y : maxY), 0)
	const dots: string[][] = []
	for (let y = 0; y < maxY; y++) {
		dots[y] = []
		for (let x = 0; x < maxX; x++) {
			const dot = coordinates.find(([dotX, dotY]) => dotX === x && dotY === y)
			if (dot === undefined) {
				dots[y][x] = '.'
			} else {
				dots[y][x] = '#'
			}
		}
	}
	return dots.map((s) => s.join('')).join('\n')
}

describe('parseInstructions()', () => {
	it('should parse instructions', () => {
		const { coordinates, folds } = parseInstructions(example)
		expect(coordinates).toHaveLength(18)
		expect(coordinates).toContainEqual([10, 12])
		expect(folds).toEqual([{ y: 7 }, { x: 5 }])
		console.log(render(coordinates))
		expect(render(coordinates)).toEqual(
			[
				'...#..#..#.',
				'....#......',
				'...........',
				'#..........',
				'...#....#.#',
				'...........',
				'...........',
				'...........',
				'...........',
				'...........',
				'.#....#.##.',
				'....#......',
				'......#...#',
				'#..........',
				'#.#........',
			].join('\n'),
		)
	})
})

describe('Day 13: Transparent Origami', () => {
	describe('Part 1', () => {
		it('should solve the example', () => {
			const { coordinates, folds } = parseInstructions(example)
			expect(coordinates).toHaveLength(18)
			const folded = fold(coordinates, folds[0])
			// expect(folded).toHaveLength(17)
			console.log(render(folded))
		})
	})
})
