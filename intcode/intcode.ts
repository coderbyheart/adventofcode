import { ParameterMode, parseParameter } from './parseParameter'

export const toInput = (array: number[]) => async () =>
	Promise.resolve(array.shift())

const undefTo0 = (n?: any): number => (n === undefined ? 0 : n)
const getOrZero = (sequence: number[]) => (pos: number) =>
	undefTo0(sequence[pos])

const getPosition = (
	sequence: number[],
	pos: number,
	modes: ParameterMode[],
	relativeBase: number,
) => (param: number) => {
	if (modes[param] === ParameterMode.RELATIVE)
		return relativeBase + getOrZero(sequence)(pos + param + 1)
	if (modes[param] === ParameterMode.IMMEDIATE) return pos + param + 1
	return getOrZero(sequence)(pos + param + 1)
}

const getParameter = (
	sequence: number[],
	pos: number,
	modes: ParameterMode[],
	relativeBase: number,
) => (param: number) =>
	getOrZero(sequence)(getPosition(sequence, pos, modes, relativeBase)(param))

const add = (
	sequence: number[],
	pos: number,
	modes: ParameterMode[],
	relativeBase: number,
): number => {
	const p = getParameter(sequence, pos, modes, relativeBase)
	const v1 = p(0)
	const v2 = p(1)
	const out = getPosition(sequence, pos, modes, relativeBase)(2)
	sequence[out] = v1 + v2
	return pos + 4
}

const mul = (
	sequence: number[],
	pos: number,
	modes: ParameterMode[],
	relativeBase: number,
): number => {
	const p = getParameter(sequence, pos, modes, relativeBase)
	const v1 = p(0)
	const v2 = p(1)
	const out = getPosition(sequence, pos, modes, relativeBase)(2)
	sequence[out] = v1 * v2
	return pos + 4
}

const store = (
	sequence: number[],
	pos: number,
	modes: ParameterMode[],
	relativeBase: number,
	input: number,
): number => {
	const out = getPosition(sequence, pos, modes, relativeBase)(0)
	sequence[out] = input
	return pos + 2
}

const retrieve = (
	sequence: number[],
	pos: number,
	modes: ParameterMode[],
	relativeBase: number,
): number => getParameter(sequence, pos, modes, relativeBase)(0)

const jumpIf = (expected: boolean) => (
	sequence: number[],
	pos: number,
	modes: ParameterMode[],
	relativeBase: number,
): number => {
	const p = getParameter(sequence, pos, modes, relativeBase)
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
	relativeBase: number,
): number => {
	const p = getParameter(sequence, pos, modes, relativeBase)
	const v1 = p(0)
	const v2 = p(1)
	const out = getPosition(sequence, pos, modes, relativeBase)(2)
	sequence[out] = v1 < v2 ? 1 : 0
	return pos + 4
}

const equals = (
	sequence: number[],
	pos: number,
	modes: ParameterMode[],
	relativeBase: number,
): number => {
	const p = getParameter(sequence, pos, modes, relativeBase)
	const v1 = p(0)
	const v2 = p(1)
	const out = getPosition(sequence, pos, modes, relativeBase)(2)
	sequence[out] = v1 === v2 ? 1 : 0
	return pos + 4
}

enum OPCODES {
	ADD = 1,
	MULTIPLY = 2,
	INPUT = 3,
	OUTPUT = 4,
	JUMP_IF_TRUE = 5,
	JUMP_IF_FALSE = 6,
	LESS_THAN = 7,
	EQUALS = 8,
	ADJUST_RELATIVE_BASE = 9,
	EXIT = 99,
}

const instructions = {
	[OPCODES.ADD]: add,
	[OPCODES.MULTIPLY]: mul,
	[OPCODES.JUMP_IF_TRUE]: jumpIf(true),
	[OPCODES.JUMP_IF_FALSE]: jumpIf(false),
	[OPCODES.LESS_THAN]: lessThan,
	[OPCODES.EQUALS]: equals,
}

export const compute = async (args: {
	program: number[]
	pos?: number
	input?: () => Promise<number | undefined>
	output?: (out: number) => void
	relativeBase?: number
}): Promise<number[]> => {
	const { program: sequence, input, output } = args
	const pos = args.pos || 0
	const relativeBase = args.relativeBase || 0
	const { op, modes } = parseParameter(sequence[pos])

	switch (op) {
		case OPCODES.ADD:
		case OPCODES.MULTIPLY:
		case OPCODES.JUMP_IF_TRUE:
		case OPCODES.JUMP_IF_FALSE:
		case OPCODES.LESS_THAN:
		case OPCODES.EQUALS:
			return compute({
				...args,
				pos: instructions[op](sequence, pos, modes, relativeBase),
			})
		case OPCODES.INPUT:
			return (async inp => {
				if (inp === undefined) {
					throw new Error('Missing input')
				}
				return compute({
					...args,
					pos: store(sequence, pos, modes, relativeBase, inp),
				})
			})(await input?.())
		case OPCODES.OUTPUT:
			return (async out => {
				if (output) output(out)
				return compute({
					...args,
					pos: pos + 2,
				})
			})(retrieve(sequence, pos, modes, relativeBase))
		case OPCODES.ADJUST_RELATIVE_BASE:
			return (async out =>
				compute({
					...args,
					pos: pos + 2,
					relativeBase: relativeBase + sequence[out],
				}))(getPosition(sequence, pos, modes, relativeBase)(0))
		case OPCODES.EXIT:
			return sequence
		default:
			throw new Error(`Unknown opcode ${op}!`)
	}
}
