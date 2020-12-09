/**
 * Use backtracking to iterate over growing sets of previous numbers in input
 * until a continuous set of numbers is found which's sums up the the number
 * we are interested in.
 */
export const findSet = (
	input: number[],
	interestingNumber: number,
	start = input.indexOf(interestingNumber),
	size = 2,
): number[] => {
	const begin = start - size
	if (begin < 0) return []
	const set = input.slice(begin, start)
	const setSum = set.reduce((total, n) => total + n, 0)
	if (setSum === interestingNumber) return set
	// The set is getting too large
	if (setSum > interestingNumber)
		return findSet(input, interestingNumber, start - 1) // Move up one line
	// Grow the set
	return findSet(input, interestingNumber, start, size + 1)
}
