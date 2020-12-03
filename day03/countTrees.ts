const tree = '#'

export const countTrees = ({
	down,
	right,
}: {
	down: number
	right: number
}) => (slopes: string[]): number => {
	const width = slopes[0].length
	let currentSlope = down,
		currentIndex = right % width,
		numTrees = 0
	do {
		if (slopes[currentSlope][currentIndex] === tree) numTrees += 1
		currentSlope += down
		currentIndex = (currentIndex + right) % width
	} while (currentSlope < slopes.length)
	return numTrees
}
