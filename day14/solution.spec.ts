import { loader, loadString } from '../lib/loader'
import { run } from './run'

const sample = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`

const load = loader(14)
const input = load('input')

describe('Day 14: Docking Data', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			const mem = run(loadString(sample))
			expect(mem[8] + mem[7]).toEqual(165)
		})
		it('should solve the sample', () => {
			const mem = run(input)
			expect(Object.values(mem).reduce((sum, v) => v + sum, 0)).toEqual(
				15403588588538,
			)
		})
	})
})
