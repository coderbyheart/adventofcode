import { nanofactory } from './nanofactory'

/**
 * Uses a binary search to find the fuel amount that can be produced for the given maximum
 */
export const maxFuel = (reactions: string, maxOre = 1000000000000): number => {
	let min = 0
	let max = maxOre
	while (max > min && min !== max) {
		const n = Math.floor((max + min) / 2)
		const ore = nanofactory(reactions, 'FUEL', n)
		if (ore > maxOre) {
			max = n - 1
		} else {
			min = n + 1
		}
	}
	return min
}
