/**
 * Implements Dijkstra's algorithm to search cave
 *
 * @see https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 */
const navigateCave = (
	cave: number[][],
	onEnd: (distance: number) => void,
): void => {
	const unvisited: boolean[][] = []
	const distance: number[][] = []
	for (let y = 0; y < cave.length; y++) {
		unvisited[y] = []
		distance[y] = []
		for (let x = 0; x < cave[y].length; x++) {
			unvisited[y][x] = true
			distance[y][x] = Number.MAX_SAFE_INTEGER
		}
	}
	distance[0][0] = 0
	let current: [x: number, y: number] | undefined = [0, 0]
	while (current !== undefined) {
		const [x, y] = current
		const currentDistance = distance[y][x]

		if (cave[y - 1]?.[x] !== undefined && unvisited[y - 1][x]) {
			const upDistance = cave[y - 1][x] + currentDistance
			distance[y - 1][x] = Math.min(upDistance, distance[y - 1][x])
		}
		if (cave[y + 1]?.[x] !== undefined && unvisited[y + 1][x]) {
			const downDistance = cave[y + 1][x] + currentDistance
			distance[y + 1][x] = Math.min(downDistance, distance[y + 1][x])
		}
		if (cave[y][x - 1] !== undefined && unvisited[y][x - 1]) {
			const leftDistance = cave[y][x - 1] + currentDistance
			distance[y][x - 1] = Math.min(distance[y][x - 1], leftDistance)
		}
		if (cave[y][x + 1] !== undefined && unvisited[y][x + 1]) {
			const rightDistance = cave[y][x + 1] + currentDistance
			distance[y][x + 1] = Math.min(distance[y][x + 1], rightDistance)
		}
		unvisited[y][x] = false

		if (y === cave.length - 1 && x === cave[y].length - 1) {
			onEnd(currentDistance)
		}

		const caveDistances = []
		for (let y = 0; y < cave.length; y++) {
			for (let x = 0; x < cave[y].length; x++) {
				if (unvisited[y][x])
					caveDistances.push({
						position: [x, y] as [x: number, y: number],
						distance: distance[y][x],
					})
			}
		}
		current = caveDistances
			.sort(({ distance: d1 }, { distance: d2 }) => d2 - d1)
			.pop()?.position
	}
}

export const lowestRisk = (cave: number[][]): number => {
	let lowestRisk = Number.MAX_SAFE_INTEGER
	navigateCave(cave, (distance) => {
		lowestRisk = distance
	})
	return lowestRisk
}
