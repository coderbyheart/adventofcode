import { loader, loadString } from '../lib/loader'
import { collectAnswers } from './collectAnswers'
import { parseGroupList } from './parseGroupList'
import { sumAnswers } from './sumAnswers'
import { sumAnswersByAll } from './sumAnswersByAll'

const load = loader(6)
const sample = `abc

a
b
c

ab
ac

a
a
a
a

b`
const input = load('input')

describe('Day 6: Custom Customs', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			expect(
				sumAnswers(
					parseGroupList(loadString(sample))
						.map(collectAnswers)
						.map(({ answers }) => answers),
				),
			).toEqual(11)
		})
		it('should solve', () =>
			expect(
				sumAnswers(
					parseGroupList(input)
						.map(collectAnswers)
						.map(({ answers }) => answers),
				),
			).toEqual(6735))
	})
	describe('Part 2', () => {
		it('should solve the sample', () => {
			expect(
				sumAnswersByAll(parseGroupList(loadString(sample)).map(collectAnswers)),
			).toEqual(6)
		})
		it('should solve', () =>
			expect(
				sumAnswersByAll(parseGroupList(input).map(collectAnswers)),
			).toEqual(3221))
	})
})
