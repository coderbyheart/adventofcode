/**
 * String up all adapters (by sorting them).
 * Finally, your device's built-in adapter is always 3 higher than the highest adapter
 */
export const stringUpAdapters = (adapterRatings: number[]): number[] => {
	const sorted = [...adapterRatings].sort((a, b) => a - b)
	sorted.push(sorted[sorted.length - 1] + 3) // Add device adapter
	return sorted
}

/**
 * Count the rating differences in the string of adapters
 */
export const countDifferences = (
	adapterRatings: number[],
): Record<number, number> =>
	adapterRatings.reduce((diff, rating, index, ratings) => {
		const previousRating = ratings[index - 1] ?? 0
		const ratingDiff = rating - previousRating
		return {
			...diff,
			[ratingDiff]: (diff[ratingDiff] ?? 0) + 1, // Increase counter for this rating differences
		}
	}, {} as Record<number, number>)
