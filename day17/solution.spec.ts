import { loadString } from '../lib/loader'
import { loadSeed, printCubes, cycle } from './cubes'

const sampleSeed = loadString(`.#.
..#
###`)

const input = loadString(`####...#
......#.
#..#.##.
.#...#.#
..###.#.
##.###..
.#...###
.##....#`)

describe('Day 17: Conway Cubes', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			let space = [...loadSeed(sampleSeed)]
			for (let c = 0; c < 6; c++) {
				console.log('')
				console.log(`Cycle ${c}: ${space.length}`)
				space = cycle(space)
				printCubes(space)
			}
			expect(space).toHaveLength(112)
		})
		it('should solve', () => {
			let space = [...loadSeed(input)]
			for (let c = 0; c < 6; c++) {
				console.log('')
				console.log(`Cycle ${c}: ${space.length}`)
				space = cycle(space)
				printCubes(space)
			}
			expect(space).toHaveLength(286)
		})
	})
})
