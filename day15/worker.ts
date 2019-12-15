import { repairRobot } from './repairRobot'
import { parentPort, MessagePort, workerData } from 'worker_threads'

export const main = async () => {
	let { maxMovements } = workerData
	;(parentPort as MessagePort).postMessage(`Max movements: ${maxMovements}`)
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const movementCount = await repairRobot(
			[...workerData.program],
			maxMovements,
		)
		if (movementCount < maxMovements) {
			maxMovements = movementCount
			;(parentPort as MessagePort).postMessage(maxMovements)
		}
	}
}

main()
