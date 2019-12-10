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

const normalizeAngle = (a: number): number => (a < 0 ? 180 + (180 + a) : a)

type Asteroid = {
	asteroid: [number, number]
	distance: number
	angle: number
}

export const trackAsteroids = (
	asteroids: [number, number][],
	asteroid: [number, number],
): Asteroid[] =>
	asteroids
		.filter(a => !equals(a, asteroid))
		.map(otherAsteroid => ({
			asteroid: otherAsteroid,
			distance: distanceTo(asteroid, otherAsteroid),
			angle: angleTo(asteroid, otherAsteroid),
		}))
		.sort(({ distance: d1 }, { distance: d2 }) => d1 - d2)

export const calculateVaporization = (asteroids: Asteroid[]): Asteroid[] => {
	const sortedByAttackAngle = asteroids
		.map(a => ({
			...a,
			angle: normalizeAngle(a.angle + 90), // Laser points up
		}))
		.sort(({ angle: a1 }, { angle: a2 }) => a1 - a2)
	// Start with the first asteroid
	let target = sortedByAttackAngle.shift()
	const poa = [target] as Asteroid[]
	// store laser position
	let laserAngle = target?.angle
	while (sortedByAttackAngle.length) {
		// Find the next asteroid which can be reached after rotating
		target = sortedByAttackAngle.find(
			({ angle }) => angle > (laserAngle as number),
		) as Asteroid
		// Reset the laser to 0, and find the next asteroid
		if (!target) {
			target = sortedByAttackAngle.find(({ angle }) => angle >= 0) as Asteroid
		}
		poa.push(target)
		sortedByAttackAngle.splice(sortedByAttackAngle.indexOf(target), 1)
		// store laser position
		laserAngle = target?.angle
	}
	return poa
}

export const countVisibleAsteroids = (
	asteroids: [number, number][],
	asteroid: [number, number],
): number => {
	const lineOfSights = trackAsteroids(asteroids, asteroid)
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
