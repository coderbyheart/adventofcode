import { Rule } from './parseRule'

/**
 * This implementation tracks pairs and element count and does not rely on concatenating a long string.
 */
export const countingPairInsertion = (
	{
		pairs,
		elements,
	}: { pairs: Record<string, number>; elements: Record<string, number> },
	rules: Rule[],
): { pairs: Record<string, number>; elements: Record<string, number> } => {
	const newPairs = { ...pairs }
	const newElements = { ...elements }
	for (const [pair, insertion] of rules) {
		const pairCount = pairs[pair]
		// The rule applies to a pair which does not exist
		if (pairCount === undefined) continue
		// Increment the counts for the two new resulting pairs
		const [left, right] = pair
		const leftPair = `${left}${insertion}`
		const rightPair = `${insertion}${right}`
		newPairs[leftPair] = (newPairs[leftPair] ?? 0) + pairCount
		newPairs[rightPair] = (newPairs[rightPair] ?? 0) + pairCount

		// Remove replaced pairs (pairs are "split" in a left and a right pair, therefore they dissapear)
		newPairs[pair] = (newPairs[pair] ?? 0) - pairCount
		if (newPairs[pair] === 0) delete newPairs[pair]

		// Increase the count for the inserted element
		newElements[insertion] = (newElements[insertion] ?? 0) + pairCount
	}
	return { pairs: newPairs, elements: newElements }
}
