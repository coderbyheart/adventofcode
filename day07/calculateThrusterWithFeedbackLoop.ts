import { compute } from '../intcode/intcode'
import { inputGenerator } from '../intcode/inputGenerator'

export const calculateThrusterWithFeedbackLoop = async (
	program: number[],
	sequence: number[],
): Promise<number> => {
	const inputs = {
		0: inputGenerator([sequence[0], 0]),
		1: inputGenerator([sequence[1]]),
		2: inputGenerator([sequence[2]]),
		3: inputGenerator([sequence[3]]),
		4: inputGenerator([sequence[4]]),
	}
	await Promise.all([
		compute({
			program: [...program],
			input: inputs[0].take,
			output: inputs[1].push,
		}),
		compute({
			program: [...program],
			input: inputs[1].take,
			output: inputs[2].push,
		}),
		compute({
			program: [...program],
			input: inputs[2].take,
			output: inputs[3].push,
		}),
		compute({
			program: [...program],
			input: inputs[3].take,
			output: inputs[4].push,
		}),
		compute({
			program: [...program],
			input: inputs[4].take,
			output: inputs[0].push,
		}),
	])
	return await inputs[0].take()
}
