import {
	getAsteroidsInField,
	mapToField,
	countVisibleAsteroids,
} from './findBestAsteroidForMonitoringStation'

describe('count visible asteroids', () => {
	const asteroids = getAsteroidsInField(
		mapToField(`
    .#..#
    .....
    #####
    ....#
    ...##`),
		5,
	)
	it.each([
		[[1, 0], 7],
		[[4, 0], 7],
		[[0, 2], 6],
		[[1, 2], 7],
		[[2, 2], 7],
		[[3, 2], 7],
		[[4, 2], 5],
		[[4, 3], 7],
		[[3, 4], 8],
		[[4, 4], 7],
	])(
		'should count for asteroid %p %i visible asteroids',
		(asteroid, visible) => {
			expect(
				countVisibleAsteroids(asteroids, asteroid as [number, number]),
			).toEqual(visible)
		},
	)
})
