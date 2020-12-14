/**
 * Returns the value with the given mask applied
 */
const mask = (value: number, mask: string): number => {
	// Convert to 36 bit long binary string
	const valueAsBinary = [...value.toString(2).padStart(36, '0')]
	for (let i = 0; i < 36; i++) {
		const maskVal = mask[mask.length - i - 1]
		if (maskVal !== 'X') {
			// Overwrite value bit with mask bit
			valueAsBinary[valueAsBinary.length - i - 1] = maskVal
		}
	}
	return parseInt(valueAsBinary.join(''), 2)
}

export const run = (program: string[]): Record<string, number> =>
	program.reduce(
		(context, instruction) => {
			const [cmd, value] = instruction.split(' = ')
			if (cmd === 'mask') {
				context.mask = value
			} else {
				const addr = parseInt(/mem\[([0-9]+)\]/.exec(cmd)?.[1] as string, 10)
				const v = parseInt(value, 10)
				context.memory[addr] = mask(v, context.mask)
			}
			return context
		},
		{
			memory: {} as Record<string, number>,
			mask: 'X'.repeat(36),
		},
	).memory
