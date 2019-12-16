import { pattern } from './pattern'

export const fft = (input: string, numPhases: number): string => {
	const res = input.split('').map(s => parseInt(s, 10))
	for (let n = 0; n < numPhases; n++) {
		for (let k = 0; k < res.length; k++) {
			const p = pattern(k + 1)
			const digitSum = res.reduce(
				(sum, digit) => sum + digit * (p.next().value as number),
				0,
			)
			res[k] = Math.abs(digitSum % 10)
		}
	}
	return res.join('')
}
