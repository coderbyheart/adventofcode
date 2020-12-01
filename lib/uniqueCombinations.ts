/**
 * Returns a list of unique combinations of length n of the items
 */
export const uniqueCombinations = <T>(len: number) => (items: T[]): T[][] => {
	// Trivial case: only one item per combination
	if (len === 1) return items.map((i) => [i])
	// Otherwise: go over all items in the list ...
	return items.reduce((combinations, item, i) => {
		// ... and combine it with the remaining entries in the list
		const pairs = uniqueCombinations<T>(
			// which means the list will be one item less
			len - 1,
		)(
			// and starts from the next entry in the list
			items.slice(i + 1),
		)
		// which is all previous entries
		combinations.push(
			// and this element, combined with all found pairs
			...pairs.map((p) => [item, ...p]),
		)
		// Return the result
		return combinations
	}, [] as T[][])
}
