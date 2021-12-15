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

	const queue: [x: number, y: number, prio: number][] = [[0, 0, 0]]
	let current: [x: number, y: number, prio: number] | undefined = undefined
	while (
		(current = queue.sort(([, , prio0], [, , prio1]) => prio1 - prio0).pop())
	) {
		const [x, y] = current
		const currentDistance = distance[y][x]

		const neighbors = [
			// up
			[y - 1, x],
			// down
			[y + 1, x],
			// right
			[y, x - 1],
			// left
			[y, x + 1],
		]
		for (const [nY, nX] of neighbors) {
			if (cave[nY]?.[nX] !== undefined && unvisited[nY][nX]) {
				const nDistance = cave[nY][nX] + currentDistance
				if (nDistance < distance[nY][nX]) {
					distance[nY][nX] = nDistance
					// Add to queue, if a better distance was found
					queue.push([nX, nY, nDistance])
				}
			}
		}
		unvisited[y][x] = false

		if (y === cave.length - 1 && x === cave[y].length - 1) {
			onEnd(currentDistance)
		}
	}
}

export const lowestRisk = (cave: number[][]): number => {
	let lowestRisk = Number.MAX_SAFE_INTEGER
	navigateCave(cave, (distance) => {
		lowestRisk = distance
	})
	return lowestRisk
}
