export type Position3D = [number, number, number]

export type Moon = {
	pos: Position3D
	vel: Position3D
}

export const pairs = (a: any[]) =>
	a.map((v1, k) => a.slice(k + 1).map(v2 => [v1, v2])).flat()

/**
 * Simulates the motion of the moons in time steps.
 */
export const moonMotionSimulator = (
	startPositions: Position3D[],
	iterations: number,
): Moon[] => {
	const system: Moon[] = startPositions.map(pos => ({
		pos,
		vel: [0, 0, 0],
	}))
	for (let i = 1; i <= iterations; i++) {
		const moonPairs = pairs(system)
		moonPairs.forEach(([m1, m2]) => {
			for (let n = 0; n < 3; n++) {
				if (m1.pos[n] > m2.pos[n]) {
					m1.vel[n]--
					m2.vel[n]++
				} else if (m1.pos[n] < m2.pos[n]) {
					m1.vel[n]++
					m2.vel[n]--
				}
			}
		})
		system.forEach(moon => {
			for (let n = 0; n < 3; n++) {
				moon.pos[n] += moon.vel[n]
			}
		})
	}
	return system
}
