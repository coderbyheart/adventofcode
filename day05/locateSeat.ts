enum Instruction {
	LOWER_HALF = 'LOWER_HALF',
	UPPER_HALF = 'UPPER_HALF',
}

const findNumber = (
	instructions: Instruction[],
	start: number,
	end: number,
): number => {
	if (start === end) return start
	const [instruction, ...rest] = instructions
	if (rest.length === 0) {
		return instruction === Instruction.LOWER_HALF ? start : end
	}
	if (instruction === Instruction.LOWER_HALF) {
		return findNumber(rest, start, start + Math.floor((end - start) / 2))
	}
	return findNumber(rest, start + Math.ceil((end - start) / 2), end)
}

export const locateSeat = ({ rows, cols }: { rows: number; cols: number }) => (
	passId: string,
): { row: number; col: number } => ({
	row: findNumber(
		passId
			.split('')
			.filter((s) => ['F', 'B'].includes(s))
			.map((s) =>
				s === 'F' ? Instruction.LOWER_HALF : Instruction.UPPER_HALF,
			),
		0,
		rows - 1,
	),
	col: findNumber(
		passId
			.split('')
			.filter((s) => ['L', 'R'].includes(s))
			.map((s) =>
				s === 'L' ? Instruction.LOWER_HALF : Instruction.UPPER_HALF,
			),
		0,
		cols - 1,
	),
})
