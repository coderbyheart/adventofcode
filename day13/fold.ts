import { flip } from './flip'
import { Fold, Position } from './parseInstructions'

export type Sheet = {
	coordinates: Position[]
	maxX: number
	maxY: number
}

export const fold = (
	{
		coordinates,
		maxX,
		maxY,
	}: {
		coordinates: Position[]
		maxX?: number
		maxY?: number
	},
	fold: Fold,
): Sheet => {
	const folded: Position[] = []
	maxX = maxX ?? coordinates.reduce((maxX, [x]) => (x > maxX ? x : maxX), 0)
	maxY = maxY ?? coordinates.reduce((maxY, [, y]) => (y > maxY ? y : maxY), 0)
	// Horizontal fold
	if ('y' in fold) {
		// Copy all points above y
		folded.push(...coordinates.filter(([, y]) => y <= fold.y))
		// Flip y for all points on and below
		folded.push(
			...coordinates
				.filter(([, y]) => y > fold.y)
				.map(([x, y]) => [x, flip(y, fold.y)] as Position),
		)
		return {
			coordinates: removeDupes(folded),
			maxX,
			maxY: fold.y - 1,
		}
	}
	// Vertical fold
	// Copy all points left of x
	folded.push(...coordinates.filter(([x]) => x <= fold.x))
	// Flip y for all points on and below
	folded.push(
		...coordinates
			.filter(([x]) => x > fold.x)
			.map(([x, y]) => [flip(x, fold.x), y] as Position),
	)
	return {
		coordinates: removeDupes(folded),
		maxX: fold.x - 1,
		maxY,
	}
}

const removeDupes = (coordinates: Position[]): Position[] => {
	const uniquePoints: Position[] = []
	const dotMap = coordinates.reduce((dotMap, [x, y]) => {
		if (dotMap[y] === undefined) dotMap[y] = []
		dotMap[y][x] = true
		return dotMap
	}, [] as boolean[][])
	for (let y = 0; y < dotMap.length; y++) {
		for (let x = 0; x < dotMap[y]?.length ?? 0; x++) {
			const level = dotMap[y][x]
			if (level !== undefined) uniquePoints.push([x, y])
		}
	}
	return uniquePoints
}
