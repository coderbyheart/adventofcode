import { loader } from '../lib/loader'
import { drawDiagram } from './drawDiagram'
import { drawLines } from './drawLines'
import { Line, toLine } from './line'
import { linesOverlap } from './linesOverlap'
import { render } from './render'

const onlyHorizontal = ([[x1, y1], [x2, y2]]: Line): boolean =>
	x1 === x2 || y1 === y2

const example = [
	'0,9 -> 5,9',
	'8,0 -> 0,8',
	'9,4 -> 3,4',
	'2,2 -> 2,1',
	'7,0 -> 7,4',
	'6,4 -> 2,0',
	'0,9 -> 2,9',
	'3,4 -> 1,4',
	'0,0 -> 8,8',
	'5,5 -> 8,2',
]
	.map(toLine)
	// For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.
	.filter(onlyHorizontal)

const input = loader(5)('input').map(toLine).filter(onlyHorizontal)

describe('Day 5: Hydrothermal Venture', () => {
	it('should solve the example', () => {
		const lines = drawLines(example)
		const diagram = drawDiagram(lines)
		console.log(render(diagram))
		const overlaps = linesOverlap(2, diagram)
		expect(overlaps).toHaveLength(5)
	})
	it('should solve the puzzle', () => {
		const lines = drawLines(input)
		const diagram = drawDiagram(lines)
		const overlaps = linesOverlap(2, diagram)
		expect(overlaps).toHaveLength(7468)
	})
})
