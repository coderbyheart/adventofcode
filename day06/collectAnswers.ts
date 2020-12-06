export const collectAnswers = (
	forms: string[],
): { answers: Record<string, number>; n: number } =>
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
			answers: {} as Record<string, number>,
		},
	)
