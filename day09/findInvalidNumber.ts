import { uniqueCombinations } from '../lib/uniqueCombinations'

export const sum = (numbers: number[]): number =>
	numbers.reduce((total, n) => total + n, 0)

export const findInvalidNumber = (preambleLength: number) => (
	input: number[],
): number | undefined => {
	const c = uniqueCombinations<number>(2)
	return input.find((n, k, arr) => {
		if (k < preambleLength) return false
		const preamble = c(arr.slice(k - preambleLength, k))
		return preamble.map(sum).find((s) => s === n) === undefined
	})
}
