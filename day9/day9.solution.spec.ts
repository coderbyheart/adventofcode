import { fileToArray } from '../utils/fileToArray'
import { compute, toInput } from '../day5/intcode'

const program = fileToArray('day9/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

describe('Day 9: Part 1', () => {
	it('should calculate the solution', async () => {
		const outputs = [] as number[]
		await compute({
			program: [...program],
			input: toInput([1]),
			output: out => {
				outputs.push(out)
			},
		})
		expect(outputs.pop()).toEqual(2752191671)
	})
})

describe('Day 9: Part 2', () => {
	it.skip('should calculate the solution', async () => {
		const outputs = [] as number[]
		await compute({
			program: [...program],
			input: toInput([2]),
			output: out => {
				outputs.push(out)
			},
		})
		expect(outputs.pop()).toEqual(2752191671)
	})
})
