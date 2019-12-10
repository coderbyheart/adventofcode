import { calculateThrusterSignal } from './calculateThrusterSignal'
import { permutate } from './permutate'

const thrusters = [0, 1, 2, 3, 4]

export const calculateMaxThrusterSignal = async (
	program: number[],
): Promise<number> => {
	const thrusterSignals = await Promise.all(
		permutate(thrusters).map(async phaseSettings =>
			calculateThrusterSignal([...program], phaseSettings),
		),
	)
	return thrusterSignals.reduce((maxThrusterSignal, thrusterSignal) => {
		if (thrusterSignal > maxThrusterSignal) return thrusterSignal
		return maxThrusterSignal
	}, 0)
}
