import { compute, toInput } from '../day5/intcode'

export const calculateThrusterSignal = (
	program: number[],
	sequence: number[],
	thruster = 0,
	input = 0,
): number => {
	if (thruster > 4) return input
	let output = 0
	compute({
		program,
		input: toInput([sequence[thruster], input]),
		output: out => {
			output = out
		},
	})
	return calculateThrusterSignal(program, sequence, ++thruster, output)
}
