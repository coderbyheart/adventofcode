export type Position = [number, number]

export enum Tile {
	SCAFFOLDING = '#',
	SPACE = '.',
	BOT_UP = '^',
	BOT_DOWN = 'v',
	BOT_LEFT = '<',
	BOT_RIGHT = '>',
	INTERSECTION = 'O',
}

export type Map = Tile[][]

const isIntersection = ([x, y]: Position, map: Map) => {
	if (map[y][x] !== Tile.SCAFFOLDING) return false
	if (map[y - 1]?.[x] !== Tile.SCAFFOLDING) return false
	if (map[y + 1]?.[x] !== Tile.SCAFFOLDING) return false
	if (map[y][x - 1] !== Tile.SCAFFOLDING) return false
	if (map[y][x + 1] !== Tile.SCAFFOLDING) return false
	return true
}

export const findIntersections = (map: Map): Position[] => {
	const intersections = [] as Position[]
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (isIntersection([x, y], map)) {
				intersections.push([x, y])
			}
		}
	}
	return intersections
}
