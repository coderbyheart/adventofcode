export const parsePassportList = (input: string[]): Record<string, string>[] =>
	input.reduce(
		(list, line) => {
			if (line.length === 0) list.push({})
			list[list.length - 1] = {
				...list[list.length - 1],
				...line.split(' ').reduce((props, entry) => {
					const [k, v] = entry.split(':')
					if (v === undefined) return props
					return {
						...props,
						[k]: v,
					}
				}, {}),
			}
			return list
		},
		[{}],
	)
