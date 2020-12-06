export type Answers = Record<string, number>

/**
 * Creates a record that counts how often a specific answer has been given
 * in a list of forms (AKA a group's answers)
 */
export const collectAnswers = (
	forms: string[],
): { answers: Answers; n: number } =>
	forms.reduce(
		(answered, form) =>
			form.split('').reduce(
				(answered, a) => ({
					...answered,
					answers: {
						...answered.answers,
						[a]: (answered.answers?.[a] ?? 0) + 1,
					},
				}),
				answered,
			),
		{
			n: forms.length,
			answers: {} as Answers,
		},
	)
