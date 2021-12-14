/**
 * Turns a sequence into a count of pairs and elements
 */
export const countPairs = (
	sequence: string,
): { pairs: Record<string, number>; elements: Record<string, number> } => {
	const pairCount: Record<string, number> = {}
	const elementCount: Record<string, number> = {}
	for (let i = 1; i < sequence.length; i++) {
		const pair = `${sequence[i - 1]}${sequence[i]}`
		pairCount[pair] = (pairCount[pair] ?? 0) + 1
	}
	for (const element of sequence) {
		elementCount[element] = (elementCount[element] ?? 0) + 1
	}
	return { pairs: pairCount, elements: elementCount }
}
