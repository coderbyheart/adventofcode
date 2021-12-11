import { Generation, step } from './game'

export const countFlashes = (generation: Generation, steps: number): number => {
	let flashes = 0
	for (let i = 0; i < steps; i++) {
		generation = step(generation, (numFlashes) => {
			flashes += numFlashes
		})
	}
	return flashes
}

export const allFlash = (
	generation: Generation,
	limit = Number.MAX_SAFE_INTEGER,
): number => {
	const squids = generation.length * generation[0].length
	let flashes = 0
	let stepNum = 0
	do {
		generation = step(generation, (numFlashes) => {
			flashes = numFlashes
		})
		stepNum++
	} while (flashes < squids && stepNum < limit)
	return stepNum
}
