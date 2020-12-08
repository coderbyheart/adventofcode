export const boot = (bootCode: string[]): number => {
	const bootInstructions = bootCode
		.map((s) => s.split(' '))
		.map(([i, a]) => [i, parseInt(a, 10)])
	let acc = 0
	let ptr = 0
	const lineExecutions = {} as Record<number, boolean>
	let ins, arg
	do {
		if (lineExecutions[ptr] !== undefined) return acc
		lineExecutions[ptr] = true
		ins = bootInstructions[ptr]?.[0]
		arg = bootInstructions[ptr]?.[1]
		if (ins === undefined) return acc // normal termination
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
				ptr++
		}
	} while (ins !== undefined)
	return acc
}
