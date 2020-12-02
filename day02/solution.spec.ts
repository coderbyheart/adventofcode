import { loader } from '../lib/loader'
import { findValidPasswords } from './findValidPasswords'

const load = loader(2)
const sample = load('sample')
const input = load('input')

describe('Day 2: Password Philosophy', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			expect(findValidPasswords(sample)).toEqual(2)
		})
		it('should solve', () => {
			expect(findValidPasswords(input)).toEqual(424)
		})
	})
})
