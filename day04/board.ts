export type Board = number[][]

export const isWinning = (board: Board, numbers: number[]): boolean => {
	// Check winning rows
	for (const row of board) {
		const rowIsWinning = row.reduce((rowIsWinning, number) => {
			if (!rowIsWinning) return false
			return numbers.includes(number)
		}, true)
		if (rowIsWinning) return true
	}
	// Check winning cols
	for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
		const col = board.map((row) => row[colIndex])
		const colIsWinning = col.reduce((colIsWinning, number) => {
			if (!colIsWinning) return false
			return numbers.includes(number)
		}, true)
		if (colIsWinning) return true
	}
	return false
}

export const findUnmarkedNumbers = (
	board: Board,
	calledNumbers: number[],
): number[] => {
	const unmarkedNumbers: number[] = []
	for (const row of board) {
		for (const num of row) {
			if (!calledNumbers.includes(num)) unmarkedNumbers.push(num)
		}
	}
	return unmarkedNumbers
}

export const sum = (sum: number, add: number): number => sum + add

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
