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

const instructions = {
    1: add,
    2: mul
}

export const computeSequence = (sequence: number[], pos: number = 0): number[] => {
    const op = sequence[pos]
    switch (op) {
        case 1:
        case 2:
            return computeSequence(sequence, pos + instructions[op](sequence, pos))
        case 99:
            return sequence
        default:
            throw new Error(`Unknown opcode ${op}!`)
    }
}