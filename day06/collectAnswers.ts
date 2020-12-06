export const collectAnswers = (forms: string[]): Record<string, number> =>
	forms.reduce(
		(answered, form) =>
			form.split('').reduce(
				(answered, a) => ({
					...answered,
					[a]: (answered?.[a] ?? 0) + 1,
				}),
				answered,
			),
		{} as Record<string, number>,
	)
