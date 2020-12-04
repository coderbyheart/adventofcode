import { loader } from '../lib/loader'
import { parsePassportList } from './parsePassportList'
import { validatePassport } from './validatePassport'

const load = loader(4)
const sample = load('sample')
const input = load('input')

describe('Day 4: Passport Processing', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			expect(parsePassportList(sample).filter(validatePassport)).toHaveLength(2)
		})
		it('should solve', () => {
			expect(parsePassportList(input).filter(validatePassport)).toHaveLength(
				250,
			)
		})
	})
})
