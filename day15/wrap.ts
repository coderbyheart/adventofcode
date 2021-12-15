export const wrap = (map: number[][], wrap = 5): number[][] => {
	const wrapped: number[][] = []
	for (let wrapY = 0; wrapY < wrap; wrapY++) {
		for (let y = 0; y < map.length; y++) {
			const yOffset = y + wrapY * map.length
			for (let wrapX = 0; wrapX < wrap; wrapX++) {
				for (let x = 0; x < map[y].length; x++) {
					const xOffset = x + wrapX * map[y].length
					let v = map[y][x] + wrapY + wrapX
					if (v > 9) v = v - 9
					if (wrapped[yOffset] === undefined) wrapped[yOffset] = []
					wrapped[yOffset][xOffset] = v
				}
			}
		}
	}
	return wrapped
}
