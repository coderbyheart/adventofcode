/**
 * Group the list of answers. A blank line denotes a new group.
 */
export const parseGroupList = (input: string[]): string[][] =>
	input.reduce(
		(list, line) => {
			if (line.length === 0) {
				list.push([])
				return list
			}
			list[list.length - 1].push(line)
			return list
		},
		[[]] as string[][],
	)
