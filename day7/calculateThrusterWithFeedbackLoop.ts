import { compute } from '../day5/intcode'

type ThrusterPrograms = { [key: number]: number[] }
const makePrograms = (program: number[]): ThrusterPrograms => ({
	0: [...program],
	1: [...program],
	2: [...program],
	3: [...program],
	4: [...program],
})

const inputGenerator = (
	inp: number[],
	takers: ((value: number) => void)[] = [],
) => ({
	take: async () => {
		const i = inp.shift()
		if (i !== undefined) return Promise.resolve(i)
		return new Promise<number>(resolve => {
			takers.push(resolve)
		})
	},
	push: (value: number) => {
		inp.push(value)
		takers.forEach(fn => fn(value))
	},
	inputs: inp,
})

type ThrusterInputs = {
	[key: number]: {
		take: () => Promise<number>
		push: (value: number) => void
		inputs: number[]
	}
}
const makeInputs = (sequence: number[]): ThrusterInputs => ({
	0: inputGenerator([sequence[0], 0]),
	1: inputGenerator([sequence[1]]),
	2: inputGenerator([sequence[2]]),
	3: inputGenerator([sequence[3]]),
	4: inputGenerator([sequence[4]]),
})

const computeThruster = async (
	thruster: number,
	programs: ThrusterPrograms,
	inputs: ThrusterInputs,
) =>
	compute({
		program: programs[thruster],
		input: inputs[thruster].take,
		output: out => {
			console.log(`Thruster ${thruster} outputs ${out}`)
			const nextThruster = (thruster + 1) % 5
			inputs[nextThruster].push(out)
		},
	})

export const calculateThrusterWithFeedbackLoop = (
	program: number[],
	sequence: number[],
	programs = makePrograms(program),
	inputs = makeInputs(sequence),
): number => {
	computeThruster(0, programs, inputs)
	computeThruster(1, programs, inputs)
	computeThruster(2, programs, inputs)
	computeThruster(3, programs, inputs)
	computeThruster(4, programs, inputs)
	return -1
}
