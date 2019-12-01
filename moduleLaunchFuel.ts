/**
 * Calculates the fuel required to launch a given module is based on its mass. 
 * 
 * To find the fuel required for a module, take its mass, 
 * divide by three, round down, and subtract 2.
 */
export const moduleLaunchFuel = (mass: number): number => Math.floor(mass / 3) - 2

/**
 * Calculates the launch fuel for all given modules
 */
export const modulesLaunchFuel = (modules: number[]) => modules.reduce((totalMass, mass) => totalMass + moduleLaunchFuel(mass), 0)