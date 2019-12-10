/**
 * Calculates the fuel required to launch a given module is based on its mass.
 *
 * To find the fuel required for a module, take its mass,
 * divide by three, round down, and subtract 2.
 */
export const moduleLaunchFuel = (mass: number): number =>
	Math.floor(mass / 3) - 2

/**
 * Calculates the launch fuel for all given modules
 */
export const modulesLaunchFuel = (modules: number[]) =>
	modules.reduce((totalMass, mass) => totalMass + moduleLaunchFuel(mass), 0)

/**
 * Caculate the total fuel required for a module
 *
 * Calculate its fuel and add it to the total.
 * Then, treat the fuel amount you just calculated as the input mass
 * and repeat the process,
 * continuing until a fuel requirement is zero or negative.
 */
export const moduleLaunchFuelWithExtraFuelForFuel = (mass: number) => {
	let fuelAmount = moduleLaunchFuel(mass)
	let total = fuelAmount
	do {
		const additionalFuel = moduleLaunchFuel(fuelAmount)
		fuelAmount = additionalFuel
		if (additionalFuel > 0) {
			total += additionalFuel
		}
	} while (fuelAmount > 0)
	return total
}

/**
 * Caculate the total fuel required for all given modules
 */
export const modulesLaunchFuelWithExtraFuelForFuel = (modules: number[]) =>
	modules.reduce(
		(totalMass, mass) => totalMass + moduleLaunchFuelWithExtraFuelForFuel(mass),
		0,
	)
