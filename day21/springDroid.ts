import { compute, toInput } from '../intcode/intcode'

const NEWLINE = 10

const ascii = (instructions: string[]): number[] =>
	instructions
		.map(s => [...s.split('').map(s => s.charCodeAt(0)), NEWLINE])
		.flat()

export const springDroid = async (
	program: number[],
	script: string[],
): Promise<number> => {
	const output = [] as string[]
	let result = 0

	await compute({
		program: [...program],
		input: toInput(ascii(script)),
		output: async out => {
			if (out > 255) {
				result = out
				console.log(out)
			} else {
				output.push(String.fromCharCode(out))
			}
		},
	})

	return result
}
