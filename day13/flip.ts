/**
 * .   0
 * .   .
 * .   .
 * - >
 * .   .
 * .   .
 * 5   .
 */
export const flip = (pos: number, flipPos: number): number => {
	const delta = pos - flipPos
	if (delta === 0) return pos
	const flipped = pos - delta * 2
	if (flipped < 0) throw new Error(`Failed to flip ${pos} at ${flipPos}`)
	return flipped
}
