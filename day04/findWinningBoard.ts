import { Board, isWinning } from './board'

export const findWinningBoard = (
	boards: Board[],
	numbers: number[],
): { winningBoard?: Board; drawnNumbers: number[] } =>
	numbers.reduce(
		({ winningBoard, drawnNumbers }, number) => {
			if (winningBoard !== undefined) return { winningBoard, drawnNumbers }
			drawnNumbers.push(number)
			return {
				winningBoard: boards.find((b) => isWinning(b, drawnNumbers)),
				drawnNumbers,
			}
		},
		{ drawnNumbers: [] } as {
			winningBoard?: Board
			drawnNumbers: number[]
		},
	)
