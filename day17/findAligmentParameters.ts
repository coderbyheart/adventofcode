import { Map, findIntersections } from './findIntersections'
export const findAligmentParameters = (map: Map): number =>
	findIntersections(map).reduce((sum, [x, y]) => sum + x * y, 0)
