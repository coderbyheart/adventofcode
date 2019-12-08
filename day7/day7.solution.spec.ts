import { fileToArray } from '../utils/fileToArray'
import { calculateMaxThrusterSignal } from './calculateMaxThrusterSignal'
import { calculateMaxThrusterSignalWithFeedbackLoop } from './calculateMaxThrusterSignalWithFeedbackLoop'

const program = fileToArray('day7/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

describe('Day 7: Part 1', () => {
	it('should calculate the solution', async () => {
		expect(await calculateMaxThrusterSignal(program)).toEqual(368584)
	})
})

describe('Day 7: Part 2', () => {
	it('should calculate the solution', async () => {
		expect(await calculateMaxThrusterSignalWithFeedbackLoop(program)).toEqual(
			35993240,
		)
	})
})
