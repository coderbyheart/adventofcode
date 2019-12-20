import { Position } from './transportingMazeSolver'

/**
 * Calculates the distance between two points
 */
export const distanceTo = (from: Position, to: Position): number =>
	Math.sqrt(Math.pow(Math.abs(to.x - from.x), 2) + Math.pow(to.y - from.y, 2))
