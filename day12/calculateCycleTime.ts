import { Position3D, pairs } from './moonMotionSimulator'
import { lowestCommonDenominator } from './lowestCommonDenominator'

/**
 * Tuple of a Moon's position and velocity on the axis
 */
type MoonAxisVelocity = [number, number]

const positionEquals = (a: number[], b: number[]) =>
	a.reduce((equals, n, k) => (equals ? n === b[k] : false), true)

/**
 * Calculates the cycle time for one axis
 */
const axisCycleTime = (startPositions: Position3D[], axis: number): number => {
	const axisStartPositions = startPositions.map(pos => pos[axis])
	const system: MoonAxisVelocity[] = startPositions.map(pos => [pos[axis], 0])
	let i = 1
	do {
		const moonPairs = pairs(system)
		moonPairs.forEach(([m1, m2]) => {
			if (m1[0] > m2[0]) {
				m1[1]--
				m2[1]++
			} else if (m1[0] < m2[0]) {
				m1[1]++
				m2[1]--
			}
		})
		system.forEach(moon => {
			moon[0] += moon[1]
		})
		i++
	} while (
		!positionEquals(
			axisStartPositions,
			system.map(m => m[0]),
		)
	)
	return i
}

/**
 * Calculates the cycle time for the system.
 *
 * It's important to recognize that the each axis moves independently,
 * therefore their cycles can be found independently.
 * A cycle is complete, when they reach their start positions, because
 * all cycle position are derivates of the initial position.
 * So we can check how long each axis takes to do a cycle, and the number
 * of cycles it takes all three axis to be complete is the lowest common denominator (LCM)
 * of the individual cycle numbers.
 */
export const calculateCycleTime = (initialPositions: Position3D[]): number => {
	const x = axisCycleTime(initialPositions, 0)
	const y = axisCycleTime(initialPositions, 1)
	const z = axisCycleTime(initialPositions, 2)
	return lowestCommonDenominator([x, y, z])
}
