import { angleTo } from './angleTo'
import { distanceTo } from './distanceTo'

/**
 * Cleans up a map string and removes all characters that are not part of a map.
 *
 * A map is described with # as asteriods and '.' as empty fields.
 */
export const mapToField = (map: string): string[] =>
	map.split('').filter(s => /[.#]/.test(s))

/**
 * Asteroid as tuple:
 * 1. X coordinate
 * 2. Y coordinate
 */
type Asteroid = [number, number]

/**
 * Returns all the asteroid positions on the map
 */
export const getAsteroidsInField = (field: string[], width: number) =>
	field.reduce((asteroids, c, index) => {
		if (c === '#') {
			// Add the position of the asteroid to the result
			// Calculate the X,Y based on the position in the string and the given field width
			asteroids.push([index % width, Math.floor(index / width)])
		}
		return asteroids
	}, [] as Asteroid[])

const equals = (a: Asteroid, b: Asteroid): boolean =>
	a[0] === b[0] && a[1] === b[1]

export type TrackedAsteroid = {
	asteroid: Asteroid
	distance: number
	angle: number
}

/**
 * Calculates the line of sight (LOS) to all asteroids from the given asteroid
 */
export const trackAsteroids = (
	asteroids: Asteroid[],
	asteroid: Asteroid,
): TrackedAsteroid[] =>
	asteroids
		// Ignore the given asteroid itself
		.filter(a => !equals(a, asteroid))
		.map(otherAsteroid => ({
			asteroid: otherAsteroid,
			// Calculate the distance to the other asteroid's position
			// This is later used to determine whether an asteroid blocks the direct LOS on to other asteroids
			distance: distanceTo(asteroid, otherAsteroid),
			// Calculate the angle to the other asteroid's position
			angle: angleTo(asteroid, otherAsteroid),
		}))
		// Sort the asteroids by distance, from near to far
		.sort(({ distance: d1 }, { distance: d2 }) => d1 - d2)

/**
 * This counts the asteroids that can be seen from the given asteroid
 */
export const countVisibleAsteroids = (
	asteroids: Asteroid[],
	asteroid: Asteroid,
): number => {
	// Calculate the line of sight (LOS) to all asteroids
	const lineOfSights = trackAsteroids(asteroids, asteroid)
	// Remove those asteroids from the list that cannot be seen
	// This is done by going through the list of tracked asteroids (which are sorted by distance)
	// and removing those who are on the exact same LOS (have the same angle to the given asteroid)
	// but are further away
	const visible = lineOfSights.reduce(
		(visible, lineOfSight) =>
			visible.filter(l => {
				// This LOS compares to itself, do not remove
				if (equals(l.asteroid, lineOfSight.asteroid)) return true
				// This LOS has a different, angle so it cannot be blocking, do not remove
				if (l.angle !== lineOfSight.angle) return true
				// This asteroid is closer to the given asteroid, so it cannot be locked by this LOS, do not remove
				if (l.distance < lineOfSight.distance) return true
				// This LOS has the same angle, and is further away, do remove
				return false
			}),
		lineOfSights,
	)
	return visible.length
}

type Station = {
	asteroid: Asteroid
	visibleAsteroids: number
}

/**
 * Calculates the best monitoring station for asteroids
 *
 * @param map The map of the galaxy, in string notation
 * @param width The width of the map (height = map.length / width)
 * @returns The position of the asteroid which is best suited for the monitoring station
 */
export const findBestAsteroidForMonitoringStation = (
	map: string,
	width: number,
): Station | undefined =>
	getAsteroidsInField(mapToField(map), width)
		// For all asteroids, count the visible asteroids and add the asteroids position and the count to a triple
		.map((asteroid, _, asteroids) => ({
			asteroid,
			visibleAsteroids: countVisibleAsteroids(asteroids, asteroid),
		}))
		// Sort by count
		.sort(
			({ visibleAsteroids: countA }, { visibleAsteroids: countB }) =>
				countA - countB,
		)
		// Return item with highest count
		.pop() as Station | undefined
