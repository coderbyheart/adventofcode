import { findBestAsteroidForMonitoringStation } from './findBestAsteroidForMonitoringStation'

describe('Find the best asteroid for a monitoring station', () => {
	test.each([
		[
			`
            .#.....
            .......
            .#.#..#
            .......
            .#.....
            `,
			7,
			{ asteroid: [3, 2], visibleAsteroids: 4 },
		],
		[
			`
            .#..#
            .....
            #####
            ....#
            ...##
            `,
			5,
			{ asteroid: [3, 4], visibleAsteroids: 8 },
		],
		[
			`
            ......#.#.
            #..#.#....
            ..#######.
            .#.#.###..
            .#..#.....
            ..#....#.#
            #..#....#.
            .##.#..###
            ##...#..#.
            .#....####
            `,
			10,
			{ asteroid: [5, 8], visibleAsteroids: 33 },
		],
		[
			`
            #.#...#.#.
            .###....#.
            .#....#...
            ##.#.#.#.#
            ....#.#.#.
            .##..###.#
            ..#...##..
            ..##....##
            ......#...
            .####.###.
            `,
			10,
			{ asteroid: [1, 2], visibleAsteroids: 35 },
		],
		[
			`
            .#..#..###
            ####.###.#
            ....###.#.
            ..###.##.#
            ##.##.#.#.
            ....###..#
            ..#.#..#.#
            #..#.#.###
            .##...##.#
            .....#.#..
            `,
			10,
			{ asteroid: [6, 3], visibleAsteroids: 41 },
		],
		[
			`
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
            `,
			20,
			{ asteroid: [11, 13], visibleAsteroids: 210 },
		],
	])(`should find monitoring station in %s on %p`, (map, width, expected) => {
		expect(
			findBestAsteroidForMonitoringStation(map as string, width as number),
		).toEqual(expected)
	})
})
