export const parsePassportList = (input: string[]): Record<string, string>[] =>
	input.reduce(
		(list, line) => {
			if (line.length === 0) list.push({})
			list[list.length - 1] = {
				...list[list.length - 1],
				...line.split(' ').reduce(
					(props, entry) => ({
						...props,
						[entry.split(':')[0]]: entry.split(':')[1],
					}),
					{},
				),
			}
			return list
		},
		[{}],
	)
