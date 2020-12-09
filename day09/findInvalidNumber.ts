import { uniqueCombinations } from '../lib/uniqueCombinations'

const sum = (numbers: number[]): number =>
	numbers.reduce((total, n) => total + n, 0)

const equal = (n: number) => (compare: number): boolean => compare === n

/**
 * Finds the invalid number in the input:
 * To be valid, the number must be the sum of two of those numbers in
 * the subset of preambleLength preceeding it.
 */
export const findInvalidNumber = (preambleLength: number) => (
	input: number[],
): number | undefined => {
	const c = uniqueCombinations<number>(2)
	// Go through all numbers
	return input.find((n, k, arr) => {
		// Skip if it is part of the preamble
		if (k < preambleLength) return false
		// Build a list of all possible pairs of numbers in the preamble
		const preamble = c(arr.slice(k - preambleLength, k))
		// If there is no pair which's sum equals this number, it is invalid
		return preamble.map(sum).find(equal(n)) === undefined
	})
}
