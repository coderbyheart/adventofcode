// Use backtracking to iterate over growing sets of previous numbers
const sumSet = (input: number[], find: number) => (
	start: number,
	size = 2,
): number[] => {
	const begin = start - size
	if (begin < 0) return []
	const set = input.slice(begin, start)
	const setSum = set.reduce((total, n) => total + n, 0)
	if (setSum === find) return set
	// The set is getting too large
	if (setSum > find) return sumSet(input, find)(start - 1) // Move up one line
	// Grow the set
	return sumSet(input, find)(start, size + 1)
}

export const findSet = (n: number) => (input: number[]): number[] =>
	sumSet(input, n)(input.indexOf(n))
