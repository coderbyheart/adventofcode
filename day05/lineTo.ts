export type Point = [x: number, y: number]

export const lineTo = ([x1, y1]: Point, [x2, y2]: Point): Point[] => {
	const dx = x2 - x1
	const dy = y2 - y1
	const adx = Math.abs(dx)
	const ady = Math.abs(dy)
	const sx = dx > 0 ? 1 : -1
	const sy = dy > 0 ? 1 : -1
	const arr: Point[] = []
	let eps = 0
	if (adx > ady) {
		for (let x = x1, y = y1; sx < 0 ? x >= x2 : x <= x2; x += sx) {
			arr.push([x, y])
			eps += ady
			if (eps << 1 >= adx) {
				y += sy
				eps -= adx
			}
		}
	} else {
		for (let x = x1, y = y1; sy < 0 ? y >= y2 : y <= y2; y += sy) {
			arr.push([x, y])
			eps += adx
			if (eps << 1 >= ady) {
				x += sx
				eps -= ady
			}
		}
	}
	return arr
}
