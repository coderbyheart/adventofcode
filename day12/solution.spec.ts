import { loader, loadString } from '../lib/loader'
import { navigateAbsolute, navigateRelative } from './navigate'

const load = loader(12)
const sample = loadString(
	`F10
	N3
	F7
	R90
	F11`,
)
const input = load('input')

const manhatten = (
	{ x: x1, y: y1 }: { x: number; y: number },
	{ x: x2, y: y2 } = { x: 0, y: 0 },
): number => Math.abs(x1 - x2) + Math.abs(y1 - y2)

describe('Day 12: Rain Risk', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			const pos = navigateAbsolute(sample, 90)
			expect(manhatten(pos)).toEqual(25)
		})
		it('should solve', () => {
			const pos = navigateAbsolute(input, 90)
			expect(manhatten(pos)).toEqual(441)
		})
	})
	describe('Part 2', () => {
		it('should solve the sample', () => {
			const pos = navigateRelative(sample, { x: 10, y: -1 })
			expect(manhatten(pos)).toEqual(286)
		})
		it('should solve', () => {
			const pos = navigateRelative(input, { x: 10, y: -1 })
			expect(manhatten(pos)).toEqual(40014)
		})
	})
})
