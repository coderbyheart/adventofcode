import { GalaxyObject } from './parseOrbits'

const getHopsTo = (from: GalaxyObject, to: GalaxyObject, hops = 0): number => {
	if (from.id === to.id) {
		return hops
	}
	return getHopsTo(from.orbits as GalaxyObject, to, ++hops)
}

export const countHopsVia = (
	via: GalaxyObject,
	from: GalaxyObject,
	to: GalaxyObject,
): number => {
	const hopsfrom = getHopsTo(from.orbits as GalaxyObject, via)
	const hopsto = getHopsTo(to.orbits as GalaxyObject, via)
	return hopsfrom + hopsto
}
