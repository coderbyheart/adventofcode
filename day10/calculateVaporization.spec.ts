import {
	trackAsteroids,
	getAsteroidsInField,
	mapToField,
} from './findBestAsteroidForMonitoringStation'
import { calculateVaporization } from './calculateVaporization'

const planOfAttack = calculateVaporization(
	trackAsteroids(
		getAsteroidsInField(
			mapToField(`
		.#..##.###...#######
		##.############..##.
		.#.######.########.#
		.###.#######.####.#.
		#####.##.#.##.###.##
		..#####..#.#########
		####################
		#.####....###.#.#.##
		##.#################
		#####.##.###..####..
		..######..##.#######
		####.##.####...##..#
		.#####..#.######.###
		##...#.##########...
		#.##########.#######
		.####.#.###.###.#.##
		....##.##.###..#####
		.#.#.###########.###
		#.#.#.#####.####.###
		###.##.####.##.#..##
		`),
			20,
		),
		[11, 13],
	),
)

describe('Complete Vaporization', () => {
	it.each([
		[1, [11, 12]],
		[2, [12, 1]],
		[3, [12, 2]],
		[10, [12, 8]],
		[20, [16, 0]],
		[50, [16, 9]],
		[100, [10, 16]],
		[199, [9, 6]],
		[200, [8, 2]],
		[201, [10, 9]],
		[299, [11, 1]],
	])(`attack the %i asteroid at %p`, (n, expected) => {
		expect(planOfAttack[(n as number) - 1].asteroid).toEqual(expected)
	})
})
