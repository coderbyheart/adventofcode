import { compute } from '../day5/intcode'

type Taker = (value: number) => void
const inputGenerator = (inp: number[], takers: Taker[] = []) => ({
	take: async () => {
		const i = inp.shift()
		if (i !== undefined) return Promise.resolve(i)
		return new Promise<number>(resolve => {
			takers.push(resolve)
		})
	},
	push: (value: number) => {
		inp.push(value)

		let taker: Taker | undefined
		while ((taker = takers.shift())) {
			taker(value)
		}
	},
	inputs: inp,
})

export const calculateThrusterWithFeedbackLoop = async (
	program: number[],
	sequence: number[],
): Promise<number> => {
	const programs = {
		0: [...program],
		1: [...program],
		2: [...program],
		3: [...program],
		4: [...program],
	}
	const inputs = {
		0: inputGenerator([sequence[0], 0]),
		1: inputGenerator([sequence[1]]),
		2: inputGenerator([sequence[2]]),
		3: inputGenerator([sequence[3]]),
		4: inputGenerator([sequence[4]]),
	}
	await Promise.all([
		compute({
			program: programs[0],
			input: inputs[0].take,
			output: out => {
				inputs[1].push(out)
			},
		}),
		compute({
			program: programs[1],
			input: inputs[1].take,
			output: out => {
				inputs[2].push(out)
			},
		}),
		compute({
			program: programs[2],
			input: inputs[2].take,
			output: out => {
				inputs[3].push(out)
			},
		}),
		compute({
			program: programs[3],
			input: inputs[3].take,
			output: out => {
				inputs[4].push(out)
			},
		}),
		compute({
			program: programs[4],
			input: inputs[4].take,
			output: out => {
				inputs[0].push(out)
			},
		}),
	])
	return -1
}
