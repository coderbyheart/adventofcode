/**
 * Creates combinations of a with length n
 */
export const combine = (
	arr: number[],
	numEntries: number,
	combinations: number[][] = [],
	remaining: number[] = [],
): number[][] =>
	arr.reduce((p, c, i, a) => {
		numEntries > 1
			? combine(
					a.slice(i + 1),
					numEntries - 1,
					p,
					(remaining.push(c), remaining),
			  )
			: p.push((remaining.push(c), remaining).slice(0))
		remaining.pop()
		return p
	}, combinations)
