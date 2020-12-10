import { stringUpAdapters } from './stringUpAdapters'

/**
 * Third aproach: count the possible routes
 * Go through each adapter and count how many routes lead to this adapter.
 * There can be at max three adapters leading to this one in the previous
 * connection, because of the rating constraint (diff must be 1-3).
 */
export const countRoutes = (ratings: number[]): number => {
	const adapters = [0, ...stringUpAdapters(ratings)] // sort by rating
	const routes = adapters.map((_, k) => (k === 0 ? 1 : 0)) // Create the map to store the routes needed to reach each adapter

	// there are n adapters
	for (let n = 0; n < routes.length; n++) {
		// add the number of routes that lead to the preceeding 3 adapters
		for (let j = n - 3; j < n; j++) {
			if (adapters[n] <= adapters[j] + 3) {
				routes[n] += routes[j]
			}
		}
	}

	// the last entry now contains the sum of all possibly combinations leading
	// to the last adapter
	return routes[routes.length - 1]
}
