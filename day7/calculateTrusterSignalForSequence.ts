import { compute } from './intcode'

const calculateTrusterSignal = (
	program: number[],
	sequence: number[],
	trusterNo = 0,
	input = 0,
): number => {
	if (trusterNo > 4) return input
	let output = 0
	compute({
		program,
		input: [sequence[trusterNo], input],
		output: out => {
			output = out
		},
	})
	return calculateTrusterSignal(program, sequence, ++trusterNo, output)
}

export const calculateTrusterSignalForSequence = (
	program: number[],
	sequence: number[],
): number => calculateTrusterSignal(program, sequence)
