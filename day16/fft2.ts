/**
 * fft() can be heavily optimized once you realize that only the digits after
 * the offset are interesting (which halfes the problem space)
 * and that every iteration adds the previous numbers, so doing it in revers
 * simplifies that operation as well
 */
export const fft2 = (input: string, phases: number): string => {
	const off = parseInt(input.substring(0, 7), 10)
	const res = input.split('').map(s => parseInt(s, 10))
	for (let phase = 0; phase < phases; phase++) {
		// reverse sum until offset
		for (let repeat = res.length - 2; repeat > off - 5; repeat--) {
			const n = res[repeat + 1] + res[repeat]
			res[repeat] = Math.abs(n % 10)
		}
	}
	return res.join('')
}
