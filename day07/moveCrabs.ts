export const moveCrabs = (crabs: number[]): number => {
	if (crabs.length === 1) return 0
	// Find max steps to move
	crabs.sort((a, b) => a - b)
	const min = crabs[0]
	const max = crabs[crabs.length - 1]
	let maxFuel = Number.MAX_SAFE_INTEGER
	for (let pos = min; pos <= max; pos++) {
		// Try to move all crabs to this position
		const { spentFuel } = moveCrabsToPos(crabs, pos, maxFuel)
		if (spentFuel < maxFuel) {
			maxFuel = spentFuel
		}
	}
	return maxFuel
}

export type Move = [crab: number, amount: number]

const moveCrabsToPos = (
	crabs: number[],
	target: number,
	maxFuel: number,
): { moves: Move[]; spentFuel: number } => {
	const moves: Move[] = []
	let spentFuel = 0
	for (const crab of crabs) {
		const neededFuel = Math.abs(target - crab)
		spentFuel += neededFuel
		moves.push([crab, neededFuel])
		// End early
		if (spentFuel > maxFuel) return { moves, spentFuel }
	}
	return { moves, spentFuel }
}
