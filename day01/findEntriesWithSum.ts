import { combine } from '../lib/combine'

const sum = (total: number, n: number) => n + total

export const findEntriesWithSum = (numEntries: number) => (
	entries: number[],
	expectedSum: number,
): number[] =>
	combine(entries, numEntries).find((e) => e.reduce(sum, 0) === expectedSum) ??
	[]
