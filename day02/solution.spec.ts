import { loader } from '../lib/loader'
import { dive } from './dive'
import { AimedPosition, diveAim } from './diveAim'
import { parseCommand } from './parseCommand'

const course = loader(2)('course').map(parseCommand)

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
			const pos = dive(course)
			expect(pos.horizontal * pos.depth).toEqual(1580000)
		})
	})
	describe('Part 2', () => {
		describe('it should solve the example', () => {
			let pos: AimedPosition
			it.each([
				// forward 5 adds 5 to your horizontal position, a total of 5. Because your aim is 0, your depth does not change.
				['forward 5', { horizontal: 5, depth: 0, aim: 0 }],
				// down 5 adds 5 to your aim, resulting in a value of 5.
				['down 5', { horizontal: 5, depth: 0, aim: 5 }],
				// forward 8 adds 8 to your horizontal position, a total of 13. Because your aim is 5, your depth increases by 8*5=40.
				['forward 8', { horizontal: 13, depth: 40, aim: 5 }],
				// up 3 decreases your aim by 3, resulting in a value of 2.
				['up 3', { horizontal: 13, depth: 40, aim: 2 }],
				// down 8 adds 8 to your aim, resulting in a value of 10.
				['down 8', { horizontal: 13, depth: 40, aim: 10 }],
				// forward 2 adds 2 to your horizontal position, a total of 15. Because your aim is 10, your depth increases by 2*10=20 to a total of 60.
				['forward 2', { horizontal: 15, depth: 60, aim: 10 }],
			])('%s => %j', (command, expectedPosition) => {
				pos = diveAim(parseCommand(command), pos)
				expect(pos).toEqual(expectedPosition)
			})
			it('should calculate the solution', () =>
				expect(pos.horizontal * pos.depth).toEqual(900))
		})
		it('it should solve the puzzle', () => {
			const pos = course.reduce(
				(position, command) => diveAim(command, position),
				{ horizontal: 0, depth: 0, aim: 0 } as AimedPosition,
			)
			expect(pos.horizontal * pos.depth).toEqual(1251263225)
		})
	})
})
