const add = (sequence: number[], pos: number): number => {
    const noun = sequence[pos + 1]
    const verb = sequence[pos + 2]
    const out = sequence[pos + 3]
    sequence[out] = sequence[noun] + sequence[verb]
    return 4
}

const mul = (sequence: number[], pos: number): number => {
    const noun = sequence[pos + 1]
    const verb = sequence[pos + 2]
    const out = sequence[pos + 3]
    sequence[out] = sequence[noun] * sequence[verb]
    return 4
}

const store = (sequence: number[], pos: number, input: number): number => {
    const out = sequence[pos + 1]
    sequence[out] = input
    return 2
}

const retrieve = (sequence: number[], pos: number): number => {
    const k = sequence[pos + 1]
    return sequence[k]
}

const instructions = {
    1: add,
    2: mul,
    3: store
}

export const computeSequence = (args: { sequence: number[], pos?: number, input?: number, output?: (out: number) => void }): number[] => {
    const { sequence, input, output } = args
    const pos = args.pos || 0
    const op = sequence[pos]
    switch (op) {
        case 1:
        case 2:
        case 3:
            return computeSequence({
                ...args,
                pos: pos + instructions[op](sequence, pos, input as number)
            })
        case 4:
            const out = retrieve(sequence, pos)
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