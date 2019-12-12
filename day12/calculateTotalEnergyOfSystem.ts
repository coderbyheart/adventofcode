import { Moon } from './moonMotionSimulator'

const sumAbsolute = (v: number[]) => v.reduce((sum, n) => sum + Math.abs(n), 0)

/**
 * The total energy for a single moon is its potential energy multiplied by its kinetic energy.
 * A moon's potential energy is the sum of the absolute values of its x, y, and z position coordinates.
 * A moon's kinetic energy is the sum of the absolute values of its velocity coordinates.
 */
const calculateTotalEnergyOfMoon = ({ pos, vel }: Moon) =>
	sumAbsolute(pos) * sumAbsolute(vel)

export const calculateTotalEnergyOfSystem = (galaxy: Moon[]): number =>
	galaxy.reduce(
		(totalEnergy, moon) => totalEnergy + calculateTotalEnergyOfMoon(moon),
		0,
	)
