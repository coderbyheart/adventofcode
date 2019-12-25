import { toSurface, simulateBacteriasOnSurface } from './bacterias'
import { simulateBacteriasOnSurface as simulateBacteriasOnSurfaceRescursive } from './bacterias-recursive'

describe('Day 24: Part 1', () => {
	it('should solve the puzzle', async () => {
		expect(
			simulateBacteriasOnSurface({
				surface: toSurface(`
                    .#..#
                    .#.#.
                    #..##
                    .#.##
                    ##..#
                `),
				width: 5,
			}),
		).toEqual(10282017)
	})
})

describe('Day 24: Part 2', () => {
	it('should solve the puzzle', async () => {
		expect(
			simulateBacteriasOnSurfaceRescursive(
				toSurface(`
			.#..#
			.#.#.
			#..##
			.#.##
			##..#
		`),
				5,
				200,
			),
		).toEqual(2065)
	})
})
