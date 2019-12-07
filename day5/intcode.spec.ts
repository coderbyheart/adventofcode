import { compute } from './intcode'

describe('Intcode program with parameter mode', () => {
	test('Opcode 1 adds together numbers', () => {
		expect(
			compute({
				program: [1, 9, 10, 3, 99, 3, 11, 0, 99, 30, 40, 50],
			}),
		).toEqual([1, 9, 10, 70, 99, 3, 11, 0, 99, 30, 40, 50])
	})
	test('Opcode 2 multiplies together numbers', () => {
		expect(
			compute({
				program: [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50],
				pos: 4,
			}),
		).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50])
	})
	test('Opcode 3 takes a single integer as input and saves it to the address given by its only parameter', () => {
		const seq = [3, 50, 99]
		expect(compute({ input: [42], program: seq }))
		expect(seq[50]).toEqual(42)
	})
	test('Opcode 4 outputs the value of its only parameter.', () => {
		expect.assertions(1)
		compute({
			program: [4, 3, 99, 42],
			output: out => {
				expect(out).toEqual(42)
			},
		})
	})
	test('[3,0,4,0,99] outputs whatever it gets as input', () => {
		expect.assertions(2)
		const program = [3, 0, 4, 0, 99]
		compute({
			program,
			input: [42],
			output: out => {
				expect(out).toEqual(42)
			},
		})
		expect(program).toEqual([42, 0, 4, 0, 99])
	})
	test('Opcode 99 halts', () => {
		expect(compute({ program: [99] })).toEqual([99])
	})
	test('Unknown opcode should throw an error', () => {
		expect(() =>
			compute({
				program: [35, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50],
			}),
		).toThrow(/Unknown opcode 35/)
	})
	test.each([
		[
			[1, 0, 0, 0, 99],
			[2, 0, 0, 0, 99],
		],
		[
			[2, 3, 0, 3, 99],
			[2, 3, 0, 6, 99],
		],
		[
			[2, 4, 4, 5, 99, 0],
			[2, 4, 4, 5, 99, 9801],
		],
		[
			[1, 1, 1, 4, 99, 5, 6, 0, 99],
			[30, 1, 1, 4, 2, 5, 6, 0, 99],
		],
	])(`%p equals %p`, (program, expected) => {
		expect(compute({ program })).toEqual(expected)
	})
	test('Program with parameter modes', () => {
		const program = [1002, 4, 3, 4, 33, 99]
		expect(
			compute({
				program,
			}),
		)
		expect(program).toEqual([1002, 4, 3, 4, 99, 99])
	})
	test('negative values', () => {
		const program = [1101, 100, -1, 4, 0]
		expect(
			compute({
				program,
			}),
		)
		expect(program).toEqual([1101, 100, -1, 4, 99])
	})

	describe('Opcodes 5-8', () => {
		test.each([
			[[3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], 8, 1],
			[[3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], 7, 0],
			[[3, 3, 1108, -1, 8, 3, 4, 3, 99], 8, 1],
			[[3, 3, 1108, -1, 8, 3, 4, 3, 99], 7, 0],
			[[3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], 7, 1],
			[[3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], 8, 0],
			[[3, 3, 1107, -1, 8, 3, 4, 3, 99], 7, 1],
			[[3, 3, 1107, -1, 8, 3, 4, 3, 99], 8, 0],
			[[3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9], 1, 1],
			[[3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9], 0, 0],
			[[3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], 1, 1],
			[[3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], 0, 0],
			[
				[
					3,
					21,
					1008,
					21,
					8,
					20,
					1005,
					20,
					22,
					107,
					8,
					21,
					20,
					1006,
					20,
					31,
					1106,
					0,
					36,
					98,
					0,
					0,
					1002,
					21,
					125,
					20,
					4,
					20,
					1105,
					1,
					46,
					104,
					999,
					1105,
					1,
					46,
					1101,
					1000,
					1,
					20,
					4,
					20,
					1105,
					1,
					46,
					98,
					99,
				],
				7,
				999,
			],
			[
				[
					3,
					21,
					1008,
					21,
					8,
					20,
					1005,
					20,
					22,
					107,
					8,
					21,
					20,
					1006,
					20,
					31,
					1106,
					0,
					36,
					98,
					0,
					0,
					1002,
					21,
					125,
					20,
					4,
					20,
					1105,
					1,
					46,
					104,
					999,
					1105,
					1,
					46,
					1101,
					1000,
					1,
					20,
					4,
					20,
					1105,
					1,
					46,
					98,
					99,
				],
				8,
				1000,
			],
			[
				[
					3,
					21,
					1008,
					21,
					8,
					20,
					1005,
					20,
					22,
					107,
					8,
					21,
					20,
					1006,
					20,
					31,
					1106,
					0,
					36,
					98,
					0,
					0,
					1002,
					21,
					125,
					20,
					4,
					20,
					1105,
					1,
					46,
					104,
					999,
					1105,
					1,
					46,
					1101,
					1000,
					1,
					20,
					4,
					20,
					1105,
					1,
					46,
					98,
					99,
				],
				9,
				1001,
			],
		])('%p with input %i should output %i', (program, input, expected) => {
			let output
			compute({
				program: [...(program as number[])],
				input: [input] as number[],
				output: out => {
					output = out
				},
			})
			expect(output).toEqual(expected)
		})
	})
})
