import { loader, loadString } from '../lib/loader'
import { Answers, collectAnswers } from './collectAnswers'
import { parseGroupList } from './parseGroupList'

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

/**
 * Count the questions to which anyone answered "yes"
 */
const sumAnswers = (answers: Answers[]) =>
	answers
		// collectAnswers counts how often answer was given
		// in keys to the Answers record
		.map(Object.keys)
		// count how many entries the record has
		.map((a) => a.length)
		// sum it up
		.reduce((total, i) => total + i, 0)

/**
 * Count the questions to which everyone answered "yes"
 */
const sumAnswersByAll = (
	answers: {
		answers: Answers
		n: number
	}[],
) =>
	answers.reduce(
		(total, { answers, n }) =>
			// add the number of answers which have been given by all to the total
			total +
			Object.values(answers)
				// filter out those answers which not have been given by everyone
				.filter((v) => v === n).length,
		0,
	)

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
