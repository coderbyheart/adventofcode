import { toSurface, simulateBacteriasOnSurface } from './bacterias'

describe('Day 23: Part 1', () => {
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
