import { loader, loadString } from '../lib/loader'
import { navigate } from './navigate'

const load = loader(12)
const input = load('input')

describe('Day 12: Rain Risk', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			const { x, y } = navigate(
				loadString(
					`F10
					N3
					F7
					R90
					F11`,
				),
			)
			expect(Math.abs(x) + Math.abs(y)).toEqual(25)
		})
		it('should solve', () => {
			const { x, y } = navigate(input)
			expect(Math.abs(x) + Math.abs(y)).toEqual(441)
		})
	})
})
