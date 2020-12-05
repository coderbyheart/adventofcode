/**
 * Recursively follow the instructions which determine whether to use the
 * upper half (true) or lower half (false) of the number range
 */
const findNumber = (
	instructions: boolean[],
	start: number,
	end: number,
): number => {
	if (start === end) return start
	const [upperHalf, ...rest] = instructions
	if (rest.length === 0) {
		// No more instructions left, decide between the two
		return upperHalf === false ? start : end
	}
	if (upperHalf === false) {
		return findNumber(rest, start, start + Math.floor((end - start) / 2))
	}
	return findNumber(rest, start + Math.ceil((end - start) / 2), end)
}

type Instruction = 'L' | 'R' | 'F' | 'B'
export type Instructions = ('L' | 'R' | 'F' | 'B')[]

const filterInstructions = (instructions: Instructions) => (i: Instruction) =>
	instructions.includes(i)

const isUpperIf = (upperInstruction: Instruction) => (i: Instruction) =>
	i === upperInstruction

/**
 * Implements a recursive aproach to finding the seat based on the given instructions
 */
export const locateSeat = ({ rows, cols }: { rows: number; cols: number }) => (
	passId: Instructions,
): { row: number; col: number } => ({
	row: findNumber(
		// This converts the boarding pass instructions sequence of true/false for only the front/back operation
		passId.filter(filterInstructions(['F', 'B'])).map(isUpperIf('B')),
		0,
		rows - 1,
	),
	col: findNumber(
		// This converts the boarding pass instructions sequence of true/false for only the left/right operation
		passId.filter(filterInstructions(['L', 'R'])).map(isUpperIf('R')),
		0,
		cols - 1,
	),
})
