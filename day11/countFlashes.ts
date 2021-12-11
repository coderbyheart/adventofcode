import { Generation, step } from './game'

export const countFlashes = (generation: Generation, steps: number): number => {
	let flashes = 0
	for (let i = 0; i < steps; i++) {
		generation = step(generation, () => {
			flashes++
		})
	}
	return flashes
}
