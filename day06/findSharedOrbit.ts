import { GalaxyObject } from './parseOrbits'

const getOrbits = (
	current: GalaxyObject,
	orbits: GalaxyObject[] = [],
): GalaxyObject[] => {
	if (!current.orbits) return orbits
	return getOrbits(current.orbits, [...orbits, current.orbits])
}

export const findSharedOrbit = (
	from: GalaxyObject,
	to: GalaxyObject,
): GalaxyObject | undefined => {
	const fromOrbits = getOrbits(from)
	const toOrbits = getOrbits(to)

	return fromOrbits
		.filter(x => toOrbits.includes(x))
		.reverse()
		.pop()
}
