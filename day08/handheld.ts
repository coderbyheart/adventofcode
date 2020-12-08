/**
 * Run the boot program with loop protection
 * and return an exit code (-1 on error) and
 * the value of the accumulator.
 */
export const boot = (bootCode: string[]): [number, number] => {
	// Parse the instructions
	const bootInstructions = bootCode
		.map((s) => s.split(' '))
		.map(([i, a]) => [i, parseInt(a, 10)])
	let acc = 0
	let ptr = 0
	const lineExecutions = {} as Record<number, boolean>
	let ins, arg
	do {
		if (lineExecutions[ptr] !== undefined) return [-1, acc]
		lineExecutions[ptr] = true // Record line executions
		ins = bootInstructions[ptr]?.[0]
		arg = bootInstructions[ptr]?.[1]
		if (ins === undefined) return [0, acc] // normal termination
		switch (ins) {
			case 'nop':
				ptr++
				break
			case 'acc':
				acc += arg as number
				ptr++
				break
			case 'jmp':
				ptr += arg as number
				break
			default:
				console.warn(`Unknown instruction: ${ins} ${arg}`)
				return [-2, acc]
		}
	} while (ins !== undefined)
	return [-3, acc]
}
