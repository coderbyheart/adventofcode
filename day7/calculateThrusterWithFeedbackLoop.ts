import { compute, toInput } from '../day5/intcode'

type ThrusterPrograms = { [key: number]: number[] }
const makePrograms = (program: number[]): ThrusterPrograms => ({
	0: [...program],
	1: [...program],
	2: [...program],
	3: [...program],
	4: [...program],
})

type ThrusterInputs = { [key: number]: number[] }
const makeInputs = (sequence: number[]): ThrusterInputs => ({
	0: [sequence[0], 0],
	1: [sequence[1]],
	2: [sequence[2]],
	3: [sequence[3]],
	4: [sequence[4]],
})

const computeThruster = (
	thruster: number,
	programs: ThrusterPrograms,
	inputs: ThrusterInputs,
) =>
	compute({
		program: programs[thruster],
		input: toInput(inputs[thruster]),
		output: out => {
			console.log(`Thruster ${thruster} outputs ${out}`)
			const nextThruster = (thruster + 1) % 5
			inputs[nextThruster].push(out)
			computeThruster(nextThruster, programs, inputs)
		},
	})

export const calculateThrusterWithFeedbackLoop = (
	program: number[],
	sequence: number[],
	programs = makePrograms(program),
	inputs = makeInputs(sequence),
): number => {
	computeThruster(0, programs, inputs)
	return -1
}
