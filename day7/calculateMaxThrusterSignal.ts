import { calculateThrusterSignal } from './calculateThrusterSignal'

const thrusters = [0, 1, 2, 3, 4]

const permutate = (arr: number[]): number[][] => {
	const ret = []
	for (let i = 0; i < arr.length; i++) {
		const rest = permutate(arr.slice(0, i).concat(arr.slice(i + 1)))
		if (!rest.length) {
			ret.push([arr[i]])
		} else {
			for (const r of rest) {
				ret.push([arr[i]].concat(r))
			}
		}
	}
	return ret
}

export const calculateMaxThrusterSignal = async (
	program: number[],
): Promise<number> => {
	const thrusterSignals = await Promise.all(
		permutate(thrusters).map(async phaseSettings =>
			calculateThrusterSignal(program, phaseSettings),
		),
	)
	return thrusterSignals.reduce((maxThrusterSignal, thrusterSignal) => {
		if (thrusterSignal > maxThrusterSignal) return thrusterSignal
		return maxThrusterSignal
	}, 0)
}
