import { compute } from '../intcode/intcode'

describe('intcode: opcode 9 and memory', () => {
	test('copy itself', async () => {
		const out: number[] = []
		const program = [
			109,
			1,
			204,
			-1,
			1001,
			100,
			1,
			100,
			1008,
			100,
			16,
			101,
			1006,
			101,
			0,
			99,
		]
		await compute({
			program: [...program],
			output: v => {
				out.push(v)
			},
		})
		expect(out).toEqual([...program])
	})
	test('16 bit number as result of multiplication', async () => {
		let output
		await compute({
			program: [1102, 34915192, 34915192, 7, 4, 7, 99, 0],
			output: out => {
				output = out
			},
		})
		expect(output).toEqual(34915192 * 34915192)
	})
	test('output 16 digit number', async () => {
		let output
		await compute({
			program: [104, 1125899906842624, 99],
			output: out => {
				output = out
			},
		})
		expect(output).toEqual(1125899906842624)
	})
})
