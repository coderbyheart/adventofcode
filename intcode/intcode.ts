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
}): Promise<number[]> => {
	const { program, input, output } = args
	let pos = args.pos || 0
	let relativeBase = 0

	const setPos = (newPos: number) => {
		pos = newPos
	}

	const setRelativeBase = (newRelativeBase: number) => {
		relativeBase = newRelativeBase
	}

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const { op, modes } = parseParameter(program[pos])
		switch (op) {
			case OPCODES.ADD:
			case OPCODES.MULTIPLY:
			case OPCODES.JUMP_IF_TRUE:
			case OPCODES.JUMP_IF_FALSE:
			case OPCODES.LESS_THAN:
			case OPCODES.EQUALS:
				setPos(instructions[op](program, pos, modes, relativeBase))
				break
			case OPCODES.INPUT:
				setPos(
					await (async inp => {
						if (inp === undefined) {
							throw new Error('Missing input')
						}
						return store(program, pos, modes, relativeBase, inp)
					})(await input?.()),
				)
				break
			case OPCODES.OUTPUT:
				setPos(
					await (async out => {
						if (output) output(out)
						return pos + 2
					})(retrieve(program, pos, modes, relativeBase)),
				)
				break
			case OPCODES.ADJUST_RELATIVE_BASE:
				setPos(
					(position => {
						setRelativeBase(relativeBase + program[position])
						return pos + 2
					})(getPosition(program, pos, modes, relativeBase)(0)),
				)
				break
			case OPCODES.EXIT:
				return program
			default:
				throw new Error(`Unknown opcode ${op}!`)
		}
	}
}
