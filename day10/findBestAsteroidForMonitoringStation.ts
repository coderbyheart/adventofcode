import { angleTo } from './angleTo'
import { distanceTo } from './distanceTo'

export const mapToField = (map: string): string[] =>
	map.split('').filter(s => /[.#]/.test(s))
export const getAsteroidsInField = (field: string[], width: number) =>
	field.reduce((asteroids, c, index) => {
		if (c === '#') asteroids.push([index % width, Math.floor(index / width)])
		return asteroids
	}, [] as [number, number][])

const equals = (a: [number, number], b: [number, number]): boolean =>
	a[0] === b[0] && a[1] === b[1]

export const countVisibleAsteroids = (
	asteroids: [number, number][],
	asteroid: [number, number],
): number => {
	const lineOfSights = asteroids
		.filter(a => !equals(a, asteroid))
		.map(otherAsteroid => ({
			asteroid: otherAsteroid,
			distance: distanceTo(asteroid, otherAsteroid),
			angle: angleTo(asteroid, otherAsteroid),
		}))
	lineOfSights.sort(({ distance: d1 }, { distance: d2 }) => d1 - d2)
	const visible = lineOfSights.reduce(
		(visible, los) =>
			visible.filter(l => {
				if (equals(l.asteroid, los.asteroid)) return true
				if (l.angle !== los.angle) return true
				if (l.distance < los.distance) return true
				return false
			}),
		lineOfSights,
	)
	return visible.length
}

export const findBestAsteroidForMonitoringStation = (
	map: string,
	width: number,
): [number, number, number] | undefined => {
	const asteroids = getAsteroidsInField(mapToField(map), width)
	const visible = asteroids.map((asteroid, _, asteroids) => [
		...asteroid,
		countVisibleAsteroids(asteroids, asteroid),
	]) as [number, number, number][]

	const station = visible
		.sort(([, , countA], [, , countB]) => countA - countB)
		.pop()

	return station
}
