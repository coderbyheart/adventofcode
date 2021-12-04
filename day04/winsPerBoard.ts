import { Board, isWinning } from './board'

export const lastWinner = (
	boards: Board[],
	numbers: number[],
): { board: Board; drawnNumbers: number[] } => {
	const winsPerBoard = boards.map((board) => ({
		board,
		drawnNumbers: winningNumbers(board, numbers),
	}))

	return winsPerBoard.sort(
		({ drawnNumbers: a }, { drawnNumbers: b }) => b.length - a.length,
	)[0]
}

export const winningNumbers = (board: Board, numbers: number[]): number[] => {
	const drawnNumbers: number[] = []
	do {
		drawnNumbers.push(numbers[drawnNumbers.length])
	} while (
		!isWinning(board, drawnNumbers) &&
		drawnNumbers.length < numbers.length
	)
	return drawnNumbers
}
