import { ParameterMode, parseParameter } from './parseParameter'

export const toInput = (array: number[]) => async () =>
	Promise.resolve(array.shift())

const getParameter = (
	sequence: number[],
	pos: number,
	modes: ParameterMode[],
) => (param: number) =>
	modes[param] === ParameterMode.IMMEDIATE
		? sequence[pos + param + 1]
		: sequence[sequence[pos + param + 1]]

const add = (
	sequence: number[],
	pos: number,
	modes: ParameterMode[],
): number => {
	const p = getParameter(sequence, pos, modes)
	const v1 = p(0)
	const v2 = p(1)
	const out = sequence[pos + 3]
	sequence[out] = v1 + v2
	return pos + 4
}

const mul = (
	sequence: number[],
	pos: number,
	modes: ParameterMode[],
): number => {
	const p = getParameter(sequence, pos, modes)
	const v1 = p(0)
	const v2 = p(1)
	const out = sequence[pos + 3]
	sequence[out] = v1 * v2
	return pos + 4
}

const store = (sequence: number[], pos: number, input: number): number => {
	const out = sequence[pos + 1]
	sequence[out] = input
	return pos + 2
}

const retrieve = (
	sequence: number[],
	pos: number,
	modes: ParameterMode[],
): number => {
	return getParameter(sequence, pos, modes)(0)
}

const jumpIf = (expected: boolean) => (
	sequence: number[],
	pos: number,
	modes: ParameterMode[],
): number => {
	const p = getParameter(sequence, pos, modes)
	const v1 = p(0)
	const v2 = p(1)
	if (expected && v1 > 0) {
		return v2
	}
	if (!expected && v1 === 0) {
		return v2
	}
	return pos + 3
}

const lessThan = (
	sequence: number[],
	pos: number,
	modes: ParameterMode[],
): number => {
	const p = getParameter(sequence, pos, modes)
	const v1 = p(0)
	const v2 = p(1)
	const out = sequence[pos + 3]
	sequence[out] = v1 < v2 ? 1 : 0
	return pos + 4
}

const equals = (
	sequence: number[],
	pos: number,
	modes: ParameterMode[],
): number => {
	const p = getParameter(sequence, pos, modes)
	const v1 = p(0)
	const v2 = p(1)
	const out = sequence[pos + 3]
	sequence[out] = v1 === v2 ? 1 : 0
	return pos + 4
}

const instructions = {
	1: add,
	2: mul,
	5: jumpIf(true),
	6: jumpIf(false),
	7: lessThan,
	8: equals,
}

export const compute = async (args: {
	program: number[]
	pos?: number
	input?: () => Promise<number | undefined>
	output?: (out: number) => void
}): Promise<number[]> => {
	const { program: sequence, input, output } = args
	const pos = args.pos || 0
	const { op, modes } = parseParameter(sequence[pos])
	let out: number
	let inp: number

	switch (op) {
		case 1:
		case 2:
		case 5:
		case 6:
		case 7:
		case 8:
			return compute({
				...args,
				pos: instructions[op](sequence, pos, modes),
			})
		case 3:
			inp = (await input?.()) as number
			if (inp === undefined) {
				throw new Error('Missing input')
			}
			return compute({
				...args,
				pos: store(sequence, pos, inp),
			})
		case 4:
			out = retrieve(sequence, pos, modes)
			if (output) output(out)
			return compute({
				...args,
				pos: pos + 2,
			})
		case 99:
			return sequence
		default:
			throw new Error(`Unknown opcode ${op}!`)
	}
}
