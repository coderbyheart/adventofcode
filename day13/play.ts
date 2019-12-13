import { compute } from '../intcode/intcode'
import { Tile } from './screen'

/**
 * Plays the game of blocks by moving the paddle
 */
export const play = async (game: number[]): Promise<number> => {
	const screen = [] as Tile[][]
	const outBuffer = [] as number[]
	let score = 0
	// Used to track the ball and paddle positions
	let ball = [-1, -1]
	let paddle = [-1, -1]
	await compute({
		program: [...game],
		input: async () => {
			// Move the paddle in direction of the ball
			if (ball[0] > paddle[0]) return 1
			if (ball[0] < paddle[0]) return -1
			return 0
		},
		output: async out => {
			outBuffer.push(out)
			if (outBuffer.length === 3) {
				const [x, y, v] = outBuffer
				if (x === -1 && y === 0) {
					score = v
				} else {
					if (!screen[y]) {
						screen[y] = []
					}
					screen[y][x] = v
					// Update the ball position
					if (v === Tile.BALL) {
						ball = [x, y]
					}
					// Update the paddle position
					if (v === Tile.HORIZONTAL_PADDLE) {
						paddle = [x, y]
					}
				}
				outBuffer.length = 0
			}
		},
	})
	return score
}
