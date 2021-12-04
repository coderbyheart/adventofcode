import { loader } from '../lib/loader'
import { Board, findUnmarkedNumbers, sum } from './board'
import { findWinningBoard } from './findWinningBoard'
import { lastWinner } from './winsPerBoard'

// Example input
const exampleBoards: Board[] = [
	[
		[22, 13, 17, 11, 0],
		[8, 2, 23, 4, 24],
		[21, 9, 14, 16, 7],
		[6, 10, 3, 18, 5],
		[1, 12, 20, 15, 19],
	],
	[
		[3, 15, 0, 2, 22],
		[9, 18, 13, 17, 5],
		[19, 8, 7, 25, 23],
		[20, 11, 10, 24, 4],
		[14, 21, 16, 12, 6],
	],
	[
		[14, 21, 17, 24, 4],
		[10, 16, 15, 9, 19],
		[18, 8, 23, 26, 20],
		[22, 11, 13, 6, 5],
		[2, 0, 12, 3, 7],
	],
]
const exampleNumbers = [
	7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
	20, 8, 19, 3, 26, 1,
]

// Puzzle input
const input = loader(4)('input')
const numbers = input[0].split(',').map((s) => parseInt(s, 10))
const boards: Board[] = [[]]
let boardId = 0
for (let i = 2; i < input.length; i++) {
	const row = input[i]
		.replace(/ +/g, ',')
		.split(',')
		.map((s) => parseInt(s, 10))
	if (isNaN(row[0])) {
		boards[++boardId] = []
	} else {
		boards[boardId].push(row)
	}
}

describe('Day 4: Giant Squid', () => {
	describe('Part 1', () => {
		it('should solve the example', () => {
			const { winningBoard, drawnNumbers } = findWinningBoard(
				exampleBoards,
				exampleNumbers,
			)

			expect(winningBoard).toEqual(exampleBoards[2])
			const winningNumber = drawnNumbers[drawnNumbers.length - 1]
			expect(winningNumber).toEqual(24)
			expect(
				findUnmarkedNumbers(winningBoard as Board, drawnNumbers).reduce(sum),
			).toEqual(188)
			expect(24 * 188).toEqual(4512)
		})
		it('should solve the puzzle', () => {
			const { winningBoard, drawnNumbers } = findWinningBoard(boards, numbers)
			const winningNumber = drawnNumbers[drawnNumbers.length - 1]
			const unmarked = findUnmarkedNumbers(
				winningBoard as Board,
				drawnNumbers,
			).reduce(sum)
			expect(winningNumber * unmarked).toEqual(38913)
		})
	})

	describe('Part 2', () => {
		it('should solve the example', () => {
			const { drawnNumbers, board } = lastWinner(exampleBoards, exampleNumbers)
			const winningNumber = drawnNumbers[drawnNumbers.length - 1]
			const unmarked = findUnmarkedNumbers(board, drawnNumbers).reduce(sum)
			expect(winningNumber * unmarked).toEqual(1924)
		})
		it('should solve the puzzle', () => {
			const { drawnNumbers, board } = lastWinner(boards, numbers)
			const winningNumber = drawnNumbers[drawnNumbers.length - 1]
			const unmarked = findUnmarkedNumbers(board, drawnNumbers).reduce(sum)
			expect(winningNumber * unmarked).toEqual(16836)
		})
	})
})
