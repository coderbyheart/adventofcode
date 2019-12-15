import { fileToArray } from '../utils/fileToArray'
import { repairRobot } from './repairRobot'

const program = fileToArray('day15/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

export const main = async () => {
	let maxMovements = Infinity
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const movementCount = await repairRobot([...program], maxMovements)
		if (movementCount < maxMovements) {
			maxMovements = movementCount
			console.log(`New low: ${maxMovements}`)
		}
	}
}

main()
