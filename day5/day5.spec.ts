import { computeSequence } from "./intcode"

describe('Intcode program', () => {
    test('Opcode 1 adds together numbers', () => {
        expect(computeSequence({ sequence: [1, 9, 10, 3, 99, 3, 11, 0, 99, 30, 40, 50] })).toEqual([1, 9, 10, 70, 99, 3, 11, 0, 99, 30, 40, 50])
    })
    test('Opcode 2 multiplies together numbers', () => {
        expect(computeSequence({ sequence: [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50], pos: 4 })).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50])
    })
    test('Opcode 3 takes a single integer as input and saves it to the address given by its only parameter', () => {
        const seq = [3, 50, 99]
        expect(computeSequence({ input: 42, sequence: seq }))
        expect(seq[50]).toEqual(42)
    })
    test('Opcode 4 outputs the value of its only parameter.', () => {
        expect.assertions(1)
        computeSequence({
            sequence: [4, 3, 99, 42],
            output: out => {
                expect(out).toEqual(42)
            }
        })
    })
    test('[3,0,4,0,99] outputs whatever it gets as input', () => {
        expect.assertions(2)
        const sequence = [3, 0, 4, 0, 99]
        computeSequence({
            sequence,
            input: 42,
            output: out => {
                expect(out).toEqual(42)
            }
        })
        expect(sequence).toEqual([42, 0, 4, 0, 99])
    })
    test('Opcode 99 halts', () => {
        expect(computeSequence({ sequence: [99] })).toEqual([99])
    })
    test('Unknown opcode should throw an error', () => {
        expect(() => computeSequence({ sequence: [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50] })).toThrow(/Unknown opcode 3500/)
    })
    test.each([
        [
            [1, 0, 0, 0, 99],
            [2, 0, 0, 0, 99]
        ],
        [
            [2, 3, 0, 3, 99],
            [2, 3, 0, 6, 99]
        ],
        [
            [2, 4, 4, 5, 99, 0],
            [2, 4, 4, 5, 99, 9801]
        ],
        [
            [1, 1, 1, 4, 99, 5, 6, 0, 99],
            [30, 1, 1, 4, 2, 5, 6, 0, 99]
        ]
    ])(`%p equals %p`, (sequence, expected) => {
        expect(computeSequence({ sequence })).toEqual(expected)
    })
})