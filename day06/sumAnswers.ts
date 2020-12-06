import { Answers } from './collectAnswers'

/**
 * Count the questions to which anyone answered "yes"
 */
export const sumAnswers = (answers: Answers[]): number =>
	answers
		// collectAnswers counts how often answer was given
		// in keys to the Answers record
		.map(Object.keys)
		// count how many entries the record has
		.map((a) => a.length)
		// sum it up
		.reduce((total, i) => total + i, 0)
