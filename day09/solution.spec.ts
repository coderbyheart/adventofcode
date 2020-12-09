import { loader, loadString } from '../lib/loader'
import { findInvalidNumber } from './findInvalidNumber'

const toInt = (s: string) => parseInt(s, 10)
const load = loader(9)
const sample = loadString(`35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`).map(toInt)
const input = load('input').map(toInt)

describe('Day 9: Encoding Error', () => {
	describe('Part 1', () => {
		it('should solve the sample', () =>
			expect(findInvalidNumber(5)(sample)).toEqual(127))
		it('should solve', () =>
			expect(findInvalidNumber(25)(input)).toEqual(25918798))
	})
})
