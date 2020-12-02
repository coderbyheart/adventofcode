import { loader } from '../lib/loader'
import { findValidPasswords, oldPasswordChecker } from './findValidPasswords'

const load = loader(2)
const sample = load('sample')
const input = load('input')

describe('Day 2: Password Philosophy', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			expect(findValidPasswords(oldPasswordChecker)(sample)).toEqual(2)
		})
		it('should solve', () => {
			expect(findValidPasswords(oldPasswordChecker)(input)).toEqual(424)
		})
	})
})
