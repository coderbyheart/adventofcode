import { fileToArray } from '../utils/fileToArray'
import { calculateMaxThrusterSignal } from './calculateMaxThrusterSignal'

const program = fileToArray('day7/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

describe('Day 7: Part 1', () => {
	it('should calculate the solution', () => {
		expect(calculateMaxThrusterSignal(program)).toEqual(368584)
	})
})
