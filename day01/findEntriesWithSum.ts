import { uniqueCombinations } from '../lib/uniqueCombinations'

const sum = (total: number, n: number) => n + total

export const findEntriesWithSum = (numEntries: number) => (
	entries: number[],
	expectedSum: number,
): number[] =>
	uniqueCombinations<number>(numEntries)(entries).find(
		(e) => e.reduce(sum, 0) === expectedSum,
	) ?? []
