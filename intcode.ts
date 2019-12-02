export const computeSequence = (sequence: number[], pos: number = 0): number[] => {
    const op = sequence[pos]
    switch (op) {
        case 1:
            const a1 = sequence[pos + 1]
            const a2 = sequence[pos + 2]
            const out = sequence[pos + 3]
            sequence[out] = sequence[a1] + sequence[a2]
            return computeSequence(sequence, pos + 4)
        case 2:
            const m1 = sequence[pos + 1]
            const m2 = sequence[pos + 2]
            const out2 = sequence[pos + 3]
            sequence[out2] = sequence[m1] * sequence[m2]
            return computeSequence(sequence, pos + 4)
        case 99:
            return sequence
        default:
            throw new Error(`Unknown opcode ${op}!`)
    }
}
