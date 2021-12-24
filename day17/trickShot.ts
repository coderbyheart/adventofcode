import { Point, Target } from './probeLauncher'

const shootAt = (targetArea: Target) => {
	const targetStartY = Math.min(targetArea.from.y, targetArea.to.y)
	const targetEndY = Math.max(targetArea.from.y, targetArea.to.y)

	const targetStartX = Math.min(targetArea.from.x, targetArea.to.x)
	const targetEndX = Math.max(targetArea.from.x, targetArea.to.x)

	return (
		trajectory: Point,
	): {
		hit: boolean
		highestY: number
	} => {
		let hitOrMiss = false
		let highestY = 0
		let yPos = 0
		let probeX = 0
		let probeY = 0
		let probeXVelocity = trajectory.x
		let probeYVelocity = trajectory.y
		while (!hitOrMiss) {
			probeX += probeXVelocity
			probeY += probeYVelocity
			if (probeY > yPos) yPos = probeY
			if (probeXVelocity > 0) probeXVelocity -= 1
			if (probeXVelocity < 0) probeXVelocity += 1
			probeYVelocity -= 1
			if (
				probeX >= targetStartX &&
				probeX <= targetEndX &&
				probeY >= targetStartY &&
				probeY <= targetEndY
			) {
				hitOrMiss = true
				if (yPos > highestY) highestY = yPos
				return {
					hit: true,
					highestY,
				}
			} else if (probeX > targetEndX || probeY < targetStartY) {
				hitOrMiss = true
				return {
					hit: false,
					highestY,
				}
			}
		}
		return {
			hit: false,
			highestY,
		}
	}
}

/**
 * Brute-force all velocities with an upper limit
 */
export const trickShot = ({
	from,
	to,
}: {
	from: Point
	to: Point
}): {
	highestY: number
	hittingVelocities: Point[]
} => {
	const aim = shootAt({ from, to })
	let highestY = 0
	const hittingVelocities: Point[] = []
	for (let x = 1; x < 1000; x++) {
		for (let y = -1000; y < 1000; y++) {
			const { hit, highestY: maxY } = aim({ x, y })
			if (maxY > highestY) highestY = maxY
			if (hit) {
				hittingVelocities.push({ x, y })
			}
		}
	}
	return {
		hittingVelocities,
		highestY,
	}
}
