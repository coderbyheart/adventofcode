import { Asteroid } from './findBestAsteroidForMonitoringStation'

/**
 * Normalizes the angle from +-180 to 0-360
 */
const normalizeAngle = (a: number): number => (a < 0 ? 180 + (180 + a) : a)

/**
 * Calculates the plan of attack (POA) for the destruction of all asteroids
 */
export const calculateVaporization = (asteroids: Asteroid[]): Asteroid[] => {
	const sortedByAttackAngle = asteroids
		// Ensure they are sorted by distance
		.sort(({ distance: d1 }, { distance: d2 }) => d1 - d2)
		// Calculate a normalized angle ...
		.map(a => ({
			...a,
			angle: normalizeAngle(a.angle + 90), // Laser points up
		}))
		// ... so it can be sorted clockwise for the rotating laser
		.sort(({ angle: a1 }, { angle: a2 }) => a1 - a2)
	// Start with the first asteroid
	let target = sortedByAttackAngle.shift()
	const poa = [target] as Asteroid[]
	// store laser position of the target
	let laserAngle = target?.angle
	while (sortedByAttackAngle.length) {
		// Find the next asteroid which can be reached after rotating
		target = sortedByAttackAngle.find(
			// after destroying an asteroid it moves clockwise to the next asteroid
			// so the next target must have a greater angle than the current one
			({ angle }) => angle > (laserAngle as number),
		) as Asteroid
		if (!target) {
			// This will happen everytime the laser has destroyed the target with is the furthest in one full rotation
			// in this case, Reset the laser to 0, and find the next asteroid whose angle will be 0 or greater (!)
			target = sortedByAttackAngle.find(({ angle }) => angle >= 0) as Asteroid
		}
		// store laser position
		laserAngle = target?.angle
		// Remove the target from the list of asteroids
		sortedByAttackAngle.splice(sortedByAttackAngle.indexOf(target), 1)
		// Add it to the plan of attack
		poa.push(target)
	}
	return poa
}
