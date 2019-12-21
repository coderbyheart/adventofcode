import { fileToArray } from '../utils/fileToArray'
import { springDroid } from './test'

const program = fileToArray('day21/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

describe('Day 21: Part 1', () => {
	it('should solve the puzzle', async () => {
		expect(
			await springDroid(program, [
				'OR A J', // J = A
				'AND B J', // J = A & B
				'AND C J', // J = A & B & C
				'NOT J J', // J = !(A & B & C)
				'AND D J', // J = !(A & B & C) & D
				'WALK',
			]),
		).toEqual(19357335)
	})
})

describe('Day 21: Part 1', () => {
	it('should solve the puzzle', async () => {
		expect(
			await springDroid(program, [
				'OR A J', // J = A
				'AND B J', // J = A & B
				'AND C J', // J = A & B & C
				'NOT J J', // J = !(A & B & C)
				'AND D J', // J = !(A & B & C) & D
				'OR E T', // T = E
				'OR H T', // T = E | H
				'AND T J', // J = !(A & B & C) & D & (E | H)
				'RUN',
			]),
		).toEqual(1140147758)
	})
})
