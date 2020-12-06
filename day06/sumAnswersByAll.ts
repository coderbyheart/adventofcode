import { Answers } from './collectAnswers'

/**
 * Count the questions to which everyone answered "yes"
 */
export const sumAnswersByAll = (
	answers: {
		answers: Answers
		n: number
	}[],
): number =>
	answers.reduce(
		(total, { answers, n }) =>
			// add the number of answers which have been given by all to the total
			total +
			Object.values(answers)
				// filter out those answers which not have been given by everyone
				.filter((v) => v === n).length,
		0,
	)
