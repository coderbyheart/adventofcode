export type GalaxyObject = {
	id: string
	orbits?: GalaxyObject
}

export type Galaxy = { com: GalaxyObject; objects: GalaxyObject[] }

const CENTER_OF_THE_UNIVERSE = 'COM'

export const byId = (id: string) => ({ id: objectId }: GalaxyObject) =>
	objectId === id

export const parseOrbits = (orbits: string[]): Galaxy => {
	const com = { id: CENTER_OF_THE_UNIVERSE }
	return orbits.reduce(
		(galaxy, orbit) => {
			const [orbits, id] = orbit.split(')')

			let orbitObject =
				orbits === CENTER_OF_THE_UNIVERSE
					? com
					: galaxy.objects.find(byId(orbits))
			if (!orbitObject) {
				orbitObject = {
					id: orbits,
				}
				galaxy.objects.push(orbitObject)
			}

			const object =
				id === CENTER_OF_THE_UNIVERSE ? com : galaxy.objects.find(byId(id))
			if (object) {
				;(object as GalaxyObject).orbits = orbitObject
			} else {
				galaxy.objects.push({
					id,
					orbits: orbitObject,
				})
			}

			return galaxy
		},
		{ com, objects: [] } as Galaxy,
	)
}
