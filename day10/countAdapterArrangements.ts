import { stringUpAdapters } from './stringUpAdapters'

const chainConnections = (
	connections: Record<string, number[]>,
	chains = 0,
	rating = 0,
): number => {
	// If there is no more adapter to connect, we have reached the end of the chain
	if (connections[rating].length === 0) {
		// end of chain
		return 1
	}
	// For all possible connections to this adapter extend the chain
	return connections[rating].reduce(
		(total, connection) =>
			total + chainConnections(connections, chains, connection),
		chains,
	)
}

/**
 * Improved implementation: this one first determins all possible adapters one,
 * and then creates a chain for all these combinations using backtracking.
 */
export const countAdapterArrangements = (ratings: number[]): number => {
	const connections = [0, ...stringUpAdapters(ratings)]
		.sort((a, b) => a - b)
		.reduce(
			(connections, rating, _, ratings) => ({
				...connections,
				[rating]: ratings.filter((r) => {
					const diff = r - rating
					return diff >= 1 && diff <= 3
				}),
			}),
			{} as Record<number, number[]>,
		)
	return chainConnections(connections)
}
