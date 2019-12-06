import { Galaxy, GalaxyObject } from './parseOrbits'

export const countOrbits = (galaxy: Galaxy): number =>
	galaxy.objects.reduce((count, object) => {
		let orbits = 0
		let current: GalaxyObject | undefined = object
		do {
			if (current.orbits) {
				orbits++
			}
			current = current.orbits
		} while (current)
		return count + orbits
	}, 0)
