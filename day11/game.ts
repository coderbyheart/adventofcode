const trim = (s: string): string => s.trim()

export type Generation = number[][]

export const generation = (squids: string): Generation =>
	squids
		.split('\n')
		.map(trim)
		.map((s) => s.split('').map((s) => parseInt(s, 10)))

export const render = (generation: Generation): string =>
	generation.map((row) => row.join('')).join('\n')

/**
 * You can model the energy levels and flashes of light in steps. During a single step, the following occurs:
 * - First, the energy level of each octopus increases by 1.
 * - Then, any octopus with an energy level greater than 9 flashes.
 *   This increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent.
 *   If this causes an octopus to have an energy level greater than 9, it also flashes.
 *   This process continues as long as new octopuses keep having their energy level increased beyond 9.
 *   (An octopus can only flash at most once per step.)
 * - Finally, any octopus that flashed during this step has its energy level set to 0, as it used all of its energy to flash.
 */
export const step = (
	generation: Generation,
	onFlashes?: (_: number) => void,
): Generation => {
	const flashing: boolean[][] = []
	const nextGeneration: Generation = []
	// First, the energy level of each octopus increases by 1.
	for (let y = 0; y < generation.length; y++) {
		for (let x = 0; x < generation[y].length; x++) {
			const current = generation[y][x]
			if (nextGeneration[y] === undefined) {
				nextGeneration[y] = []
				flashing[y] = []
			}
			nextGeneration[y][x] = current + 1
		}
	}
	// Then, any octopus with an energy level greater than 9 flashes.
	do {
		for (let y = 0; y < nextGeneration.length; y++) {
			for (let x = 0; x < nextGeneration[y].length; x++) {
				const current = nextGeneration[y][x]
				if (
					current > 9 &&
					// (An octopus can only flash at most once per step.)
					flashing[y][x] !== true
				) {
					// Flashing
					flashing[y][x] = true
					// This increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent.
					const N = nextGeneration[y - 1]?.[x]
					const NE = nextGeneration[y - 1]?.[x + 1]
					const E = nextGeneration[y]?.[x + 1]
					const SE = nextGeneration[y + 1]?.[x + 1]
					const S = nextGeneration[y + 1]?.[x]
					const SW = nextGeneration[y + 1]?.[x - 1]
					const W = nextGeneration[y]?.[x - 1]
					const NW = nextGeneration[y - 1]?.[x - 1]
					if (N !== undefined) {
						nextGeneration[y - 1][x]++
					}
					if (NE !== undefined) {
						nextGeneration[y - 1][x + 1]++
					}
					if (E !== undefined) {
						nextGeneration[y][x + 1]++
					}
					if (SE !== undefined) {
						nextGeneration[y + 1][x + 1]++
					}
					if (S !== undefined) {
						nextGeneration[y + 1][x]++
					}
					if (SW !== undefined) {
						nextGeneration[y + 1][x - 1]++
					}
					if (W !== undefined) {
						nextGeneration[y][x - 1]++
					}
					if (NW !== undefined) {
						nextGeneration[y - 1][x - 1]++
					}
				}
			}
		}
	} while (
		// This process continues as long as new octopuses keep having their energy level increased beyond 9.
		(() => {
			for (let y = 0; y < nextGeneration.length; y++) {
				for (let x = 0; x < nextGeneration[y].length; x++) {
					const current = nextGeneration[y][x]
					if (current > 9 && flashing[y][x] !== true) return true
				}
			}
			return false
		})()
	)
	// Finally, any octopus that flashed during this step has its energy level set to 0, as it used all of its energy to flash.
	let flashes = 0
	for (let y = 0; y < nextGeneration.length; y++) {
		for (let x = 0; x < nextGeneration[y].length; x++) {
			if (flashing[y][x]) {
				nextGeneration[y][x] = 0
				flashes++
			}
		}
	}
	onFlashes?.(flashes)
	return nextGeneration
}
