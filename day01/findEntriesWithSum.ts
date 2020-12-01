export const findEntriesWithSum = (
	entries: number[],
	expectedSum: number,
): number[] => {
	for (const i of entries) {
		for (const j of entries) {
			if (i + j === expectedSum) return [i, j]
		}
	}
	return []
}
