import { compute } from '../intcode/intcode'
import { Tile } from './screen'
import { fileToArray } from '../utils/fileToArray'
import { renderScreen } from './renderScreen'
import { play } from './play'

const program = fileToArray('day13/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

describe('Day 13: Part 1', () => {
	it('count block tiles', async () => {
		const screen = [] as Tile[][]

		const outBuffer = [] as number[]
		await compute({
			program: [...program],
			output: async out => {
				outBuffer.push(out)
				if (outBuffer.length === 3) {
					const [x, y, tile] = outBuffer
					if (!screen[y]) {
						screen[y] = []
					}
					screen[y][x] = tile
					outBuffer.length = 0
				}
			},
		})

		expect(screen.flat().filter(tile => tile === Tile.BLOCK)).toHaveLength(376)

		renderScreen(screen)
	})
})

describe('Day 13: Part 2', () => {
	it('should play the game', async () => {
		const game = [...program]
		game[0] = 2
		const score = await play(game)
		expect(score).toEqual(18509)
	})
})
