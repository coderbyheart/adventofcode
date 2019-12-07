import { compute } from './intcode'

const calculateTrusterSignal = (
	program: number[],
	phaseSetting: number,
	input: number,
) => {
	let output: number
	compute({
		program,
		input: [phaseSetting, input],
		output: out => {
			output = out
		},
	})
	// @ts-ignore
	return output
}

export const calculateMaxTrusterSignal = (
	program: number[],
	sequence: number[],
): number => {
	const signal1 = calculateTrusterSignal(program, sequence[0], 0)
	const signal2 = calculateTrusterSignal(program, sequence[1], signal1)
	const signal3 = calculateTrusterSignal(program, sequence[2], signal2)
	const signal4 = calculateTrusterSignal(program, sequence[3], signal3)
	const signal5 = calculateTrusterSignal(program, sequence[4], signal4)
	return signal5
}
