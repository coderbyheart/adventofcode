import { loader } from '../lib/loader'
import { fold, Sheet } from './fold'
import { parseInstructions } from './parseInstructions'
import { render } from './render'

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

const input = parseInstructions(loader(13)('input'))

describe('parseInstructions()', () => {
	it('should parse instructions', () => {
		const { coordinates, folds } = parseInstructions(example)
		expect(coordinates).toHaveLength(18)
		expect(coordinates).toContainEqual([10, 12])
		expect(folds).toEqual([{ y: 7 }, { x: 5 }])
		expect(render({ coordinates })).toEqual(
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
			const folded1 = fold({ coordinates }, folds[0])
			expect(folded1.coordinates).toHaveLength(17)
			expect(render(folded1)).toEqual(
				[
					'#.##..#..#.',
					'#...#......',
					'......#...#',
					'#...#......',
					'.#.#..#.###',
					'...........',
					'...........',
				].join('\n'),
			)
			const folded2 = fold(folded1, folds[1])
			expect(folded2.coordinates).toHaveLength(16)
			expect(render(folded2)).toEqual(
				['#####', '#...#', '#...#', '#...#', '#####', '.....', '.....'].join(
					'\n',
				),
			)
		})
		it('should solve the puzzle', () => {
			const folded = fold({ coordinates: input.coordinates }, input.folds[0])
			expect(folded.coordinates).toHaveLength(666)
		})
	})
	describe('Part 2', () => {
		it('should solve the puzzle', () => {
			let folded: Sheet | undefined = undefined
			for (const foldstep of input.folds) {
				folded = fold(folded ?? { coordinates: input.coordinates }, foldstep)
			}
			console.log(render(folded as Sheet)) // CJHAZHKU
			expect(folded?.coordinates).toHaveLength(97)
		})
	})
})
