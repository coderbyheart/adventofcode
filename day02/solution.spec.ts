import { loader } from '../lib/loader'
import { dive } from './dive'
import { parseCommand } from './parseCommand'

describe('Day 2: Dive!', () => {
	describe('Part 1', () => {
		it('should solve the example', () => {
			const course = [
				'forward 5',
				'down 5',
				'forward 8',
				'up 3',
				'down 8',
				'forward 2',
			].map(parseCommand)
			const pos = dive(course)
			expect(pos.horizontal * pos.depth).toEqual(150)
		})
		it('should solve the puzzle', () => {
			const course = loader(2)('course').map(parseCommand)
			const pos = dive(course)
			expect(pos.horizontal * pos.depth).toEqual(1580000)
		})
	})
})
