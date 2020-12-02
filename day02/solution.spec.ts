import { loader } from '../lib/loader'
import {
	findValidPasswords,
	LegacyPasswordChecker,
	TobogganPasswordChecker,
} from './findValidPasswords'

const load = loader(2)
const sample = load('sample')
const input = load('input')

describe('Day 2: Password Philosophy', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			expect(findValidPasswords(LegacyPasswordChecker)(sample)).toEqual(2)
		})
		it('should solve', () => {
			expect(findValidPasswords(LegacyPasswordChecker)(input)).toEqual(424)
		})
	})
	describe('Part 2', () => {
		it('should solve the sample', () => {
			expect(findValidPasswords(TobogganPasswordChecker)(sample)).toEqual(1)
		})
		it('should solve', () => {
			expect(findValidPasswords(TobogganPasswordChecker)(input)).toEqual(747)
		})
	})
})
