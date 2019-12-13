import { compute } from '../intcode/intcode'
import { TilePosition, Tile } from './screen'
import { fileToArray } from '../utils/fileToArray'

const program = fileToArray('day13/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

describe('Day 13: Part 1', () => {
	it('count block tiles', async () => {
		const screen = [] as TilePosition[]

		const outBuffer = [] as number[]
		await compute({
			program: [...program],
			output: async out => {
				outBuffer.push(out)
				if (outBuffer.length === 3) {
					const [x, y, tile] = outBuffer
					screen.push([x, y, tile])
					outBuffer.length = 0
				}
			},
		})

		expect(screen.filter(([, , tile]) => tile === Tile.BLOCK)).toHaveLength(376)
	})
})
