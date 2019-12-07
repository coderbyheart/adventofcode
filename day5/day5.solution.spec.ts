import { compute, toInput } from './intcode'
import { fileToArray } from '../utils/fileToArray'

const program = fileToArray('day5/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

describe('Day 5: Part 1', () => {
	it('should calculate the solution', () => {
		const outputs = [] as number[]
		compute({
			program: [...program],
			input: toInput([1]),
			output: out => {
				outputs.push(out)
			},
		})
		expect(outputs.pop()).toEqual(13210611)
	})
})

describe('Day 5: Part 2', () => {
	it('should calculate the solution', () => {
		const outputs = [] as number[]
		compute({
			program: [...program],
			input: toInput([5]),
			output: out => {
				outputs.push(out)
			},
		})
		expect(outputs.pop()).toEqual(584126)
	})
})
