import { ParameterMode, parseParameter } from "./parseParameter"

const getParameter = (sequence: number[], pos: number, modes: ParameterMode[]) =>
    (param: number) => modes[param] === ParameterMode.IMMEDIATE ? sequence[pos + param + 1] : sequence[sequence[pos + param + 1]]

const add = (sequence: number[], pos: number, modes: ParameterMode[]): number => {
    const p = getParameter(sequence, pos, modes)
    const v1 = p(0)
    const v2 = p(1)
    const out = sequence[pos + 3]
    sequence[out] = v1 + v2
    return 4
}

const mul = (sequence: number[], pos: number, modes: ParameterMode[]): number => {
    const p = getParameter(sequence, pos, modes)
    const v1 = p(0)
    const v2 = p(1)
    const out = sequence[pos + 3]
    sequence[out] = v1 * v2
    return 4
}

const store = (sequence: number[], pos: number, input: number): number => {
    const out = sequence[pos + 1]
    sequence[out] = input
    return 2
}

const retrieve = (sequence: number[], pos: number, modes: ParameterMode[]): number => {
    return getParameter(sequence, pos, modes)(0)
}

const instructions = {
    1: add,
    2: mul
}

export const computeSequence = (args: {
    sequence: number[],
    pos?: number,
    input?: number,
    output?: (out: number) => void,
}): number[] => {
    const { sequence, input, output } = args
    const pos = args.pos || 0
    const { op, modes } = parseParameter(sequence[pos])

    switch (op) {
        case 1:
        case 2:
            return computeSequence({
                ...args,
                pos: pos + instructions[op](sequence, pos, modes)
            })
        case 3:
            return computeSequence({
                ...args,
                pos: pos + store(sequence, pos, input as number)
            })
        case 4:
            const out = retrieve(sequence, pos, modes)
            if (output) output(out)
            return computeSequence({
                ...args,
                pos: pos + 2
            })
        case 99:
            return sequence
        default:
            throw new Error(`Unknown opcode ${op}!`)
    }
}