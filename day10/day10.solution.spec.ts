import { findBestAsteroidForMonitoringStation } from './findBestAsteroidForMonitoringStation'

describe('Day 10: Part 1', () => {
	it(`calculate the solution`, () => {
		expect(
			findBestAsteroidForMonitoringStation(
				`
            .###..#......###..#...#
            #.#..#.##..###..#...#.#
            #.#.#.##.#..##.#.###.##
            .#..#...####.#.##..##..
            #.###.#.####.##.#######
            ..#######..##..##.#.###
            .##.#...##.##.####..###
            ....####.####.#########
            #.########.#...##.####.
            .#.#..#.#.#.#.##.###.##
            #..#.#..##...#..#.####.
            .###.#.#...###....###..
            ###..#.###..###.#.###.#
            ...###.##.#.##.#...#..#
            #......#.#.##..#...#.#.
            ###.##.#..##...#..#.#.#
            ###..###..##.##..##.###
            ###.###.####....######.
            .###.#####.#.#.#.#####.
            ##.#.###.###.##.##..##.
            ##.#..#..#..#.####.#.#.
            .#.#.#.##.##########..#
            #####.##......#.#.####.
            `,
				23,
			),
		).toEqual([19, 11, 230])
	})
})
