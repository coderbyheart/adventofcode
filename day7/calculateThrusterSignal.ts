import { compute, toInput } from '../intcode/intcode'

export const calculateThrusterSignal = async (
	program: number[],
	sequence: number[],
	thruster = 0,
	input = 0,
): Promise<number> => {
	if (thruster > 4) return input
	let output = 0
	await compute({
		program,
		input: toInput([sequence[thruster], input]),
		output: out => {
			output = out
		},
	})
	return calculateThrusterSignal(program, sequence, ++thruster, output)
}
