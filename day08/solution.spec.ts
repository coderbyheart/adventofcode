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

describe('Day 8: Handheld Halting', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			const handheldBootCode = boot(sample)
			expect(handheldBootCode).toEqual(5)
		})
		it('should solve the', () => {
			const handheldBootCode = boot(input)
			expect(handheldBootCode).toEqual(1087)
		})
	})
})
