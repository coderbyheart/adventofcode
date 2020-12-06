import { loader, loadString } from '../lib/loader'
import { collectAnswers } from './collectAnswers'
import { parseGroupList } from './parseGroupList'

const load = loader(6)

const sumAnswers = (answers: Record<string, number>[]) =>
	answers
		.map(Object.keys)
		.map((a) => a.length)
		.reduce((total, i) => total + i, 0)

describe('Day 6: Custom Customs', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			expect(
				sumAnswers(
					parseGroupList(
						loadString(`abc

			a
			b
			c
			
			ab
			ac
			
			a
			a
			a
			a
			
			b`),
					).map(collectAnswers),
				),
			).toEqual(11)
		})
		it('should solve', () =>
			expect(
				sumAnswers(parseGroupList(load('input')).map(collectAnswers)),
			).toEqual(6735))
	})
})
