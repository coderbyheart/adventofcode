export type Point = { x: number; y: number }
export type Target = { from: Point; to: Point }
export type Element = Point & { icon: 'S' | 'T' | '#' | 'X' }

export const probeLauncher = (
	targetArea: Target,
	trajectory: Point,
): { hit: boolean; points: Element[]; highestY: number } => {
	const points: Element[] = [
		{ x: 0, y: 0, icon: 'S' }, // ship
	]

	// Add target area
	const targetStartY = Math.min(targetArea.from.y, targetArea.to.y)
	const targetEndY = Math.max(targetArea.from.y, targetArea.to.y)

	const targetStartX = Math.min(targetArea.from.x, targetArea.to.x)
	const targetEndX = Math.max(targetArea.from.x, targetArea.to.x)

	// Add probe proints
	// The probe's x,y position starts at 0,0. Then, it will follow some trajectory by moving in steps. On each step, these changes occur in the following order:
	// - The probe's x position increases by its x velocity.
	// - The probe's y position increases by its y velocity.
	// - Due to drag, the probe's x velocity changes by 1 toward the value 0; that is, it decreases by 1 if it is greater than 0, increases by 1 if it is less than 0, or does not change if it is already 0.
	// - Due to gravity, the probe's y velocity decreases by 1.
	const probePoints: Point[] = []
	let probeXVelocity = trajectory.x
	let probeYVelocity = trajectory.y
	let probeX = 0
	let probeY = 0
	let hit = false
	let highestY = 0
	do {
		probeX += probeXVelocity
		probeY += probeYVelocity
		if (probeXVelocity > 0) probeXVelocity--
		if (probeXVelocity < 0) probeXVelocity++
		probeYVelocity--
		probePoints.push({
			x: probeX,
			y: probeY,
		})
		if (!hit) {
			if (
				probeX >= targetStartX &&
				probeX <= targetEndX &&
				probeY >= targetStartY &&
				probeY <= targetEndY
			)
				hit = true
		}
		if (probeY > highestY) highestY = probeY
	} while (targetStartY < probeY)

	// Add elements for target
	for (let y = targetStartY; y <= targetEndY; y++) {
		for (let x = targetStartX; x <= targetEndX; x++) {
			points.push({
				x,
				y,
				icon: hit ? 'X' : 'T',
			})
		}
	}

	// Add elements for probe
	points.push(
		...probePoints.map((point) => ({ ...point, icon: '#' } as Element)),
	)

	return {
		points,
		hit,
		highestY,
	}
}
