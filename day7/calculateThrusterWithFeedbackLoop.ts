import { compute, toInput } from '../day5/intcode'

type ThrusterPrograms = { [key: number]: number[] }
const makePrograms = (program: number[]): ThrusterPrograms => ({
	0: [...program],
	1: [...program],
	2: [...program],
	3: [...program],
	4: [...program],
})

export const calculateThrusterWithFeedbackLoop = (
	program: number[],
	sequence: number[],
	thruster = 0,
	input = 0,
	programs = makePrograms(program),
): number => {
	if (thruster > 4) return input
	let output = 0
	// Initiate programs
	console.log({
		thruster,
	})
	compute({
		program: programs[thruster],
		input: toInput([sequence[thruster], input]),
		output: out => {
			output = out
		},
	})
	return calculateThrusterWithFeedbackLoop(
		program,
		sequence,
		++thruster,
		output,
		programs,
	)
}
