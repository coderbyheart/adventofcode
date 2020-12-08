import { loader, loadString } from '../lib/loader'
import { boot } from './handheld'

const load = loader(8)
const input = load('input')
const sample = loadString(`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`)
const sample2 = loadString(`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
nop -4
acc +6`)

describe('Day 8: Handheld Halting', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			const handheldBootCode = boot(sample)
			expect(handheldBootCode).toEqual([-1, 5])
		})
		it('should solve', () => {
			const handheldBootCode = boot(input)
			expect(handheldBootCode).toEqual([-1, 1087])
		})
	})
	describe('Part 2', () => {
		it('should solve the sample', () => {
			const handheldBootCode = boot(sample2)
			expect(handheldBootCode).toEqual([0, 8])
		})
		it('should solve', () => {
			// Find all the jumps
			const jmps = input.reduce((jmps, i, k) => {
				if (i.startsWith('jmp')) return [...jmps, k]
				return jmps
			}, [] as number[])

			// Change one jpm instruction after another and run the program
			expect(
				jmps.reduce(
					(exit, line) => {
						if (exit[0] === 0) return exit
						return boot([
							...input.slice(0, line),
							input[line].replace('jmp', 'nop'),
							...input.slice(line + 1),
						])
					},
					[-1, 0],
				),
			).toEqual([0, 780])
		})
	})
})
