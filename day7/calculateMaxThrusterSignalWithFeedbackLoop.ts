import { permutate } from './permutate'
import { calculateThrusterWithFeedbackLoop } from './calculateThrusterWithFeedbackLoop'

const thrusters = [5, 6, 7, 8, 9]

export const calculateMaxThrusterSignalWithFeedbackLoop = async (
	program: number[],
): Promise<number> => {
	const thrusterSignals = await Promise.all(
		permutate(thrusters).map(async phaseSettings =>
			calculateThrusterWithFeedbackLoop(program, phaseSettings),
		),
	)
	return thrusterSignals.reduce((maxThrusterSignal, thrusterSignal) => {
		if (thrusterSignal > maxThrusterSignal) return thrusterSignal
		return maxThrusterSignal
	}, 0)
}
