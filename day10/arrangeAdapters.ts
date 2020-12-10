import { countDifferences, stringUpAdapters } from './stringUpAdapters'

const checks = {} as Record<string, boolean>

const hashRatings = (ratings: number[]): string => ratings.toString()

const isValid = (ratings: number[]): boolean => {
	const hash = hashRatings(ratings)
	if (checks[hash] === undefined) {
		const diffs = countDifferences(ratings)
		// All differences must be between 1-3 volts
		const diffRatingsValid = Object.keys(diffs).reduce((isValid, rating) => {
			if (isValid === false) return false
			const r = parseInt(rating, 10)
			return r >= 1 && r <= 3
		}, true)
		checks[hash] = diffRatingsValid
	}
	return checks[hash]
}

/**
 * First attempt, mutate the arrangements by removing one or more adapters
 * and verifying if this arrangement is valid.
 * If yes, remove more adapters until it is not.
 *
 * This works, but is too slow.
 */
const mutate = (
	ratings: number[],
	mutations: number[][],
	deviceRating: number = ratings[ratings.length - 1],
	deleteFrom = 0,
	deleteAmount = 1,
	previousPassed = true,
): boolean => {
	// We would be deleting the entire list of adapters
	if (deleteFrom >= ratings.length) return false
	if (deleteFrom + deleteAmount >= ratings.length) return false
	// Create the mutation by removing adapters from the given position
	const mutation = [
		...ratings.slice(0, deleteFrom),
		...ratings.slice(deleteFrom + deleteAmount),
	]
	// We removed all
	if (mutation.length === 0) return false
	// We no longer can connect to the device
	if (mutation[mutation.length - 1] !== deviceRating) return false
	// We already know this is a valid mutations
	const mutationHash = hashRatings(mutation)
	if (mutations.find((m) => hashRatings(m) === mutationHash)) return false
	// We have already checked this mutation
	if (checks[mutationHash] !== undefined) {
		return mutate(ratings, mutations, deviceRating, deleteFrom + 1, 1, false)
	}
	if (isValid(mutation)) {
		mutations.push(mutation) // Found one
		// Continue with this mutation, delete more
		mutate(mutation, mutations, deviceRating, deleteFrom - deleteAmount, 1)
		mutate(
			mutation,
			mutations,
			deviceRating,
			deleteFrom - deleteAmount,
			deleteAmount + 1,
		)
		// If we found this from a previously valid combination,
		// continue with the entire chain and delete more
		if (previousPassed)
			mutate(ratings, mutations, deviceRating, deleteFrom, deleteAmount + 1)
	}
	return mutate(ratings, mutations, deviceRating, deleteFrom + 1, 1, false)
}

export const arrangeAdapters = (ratings: number[]): number[][] => {
	const sorted = stringUpAdapters(ratings)
	const mutations = [] as number[][]
	mutate(sorted, mutations)
	return [sorted, ...mutations]
}
