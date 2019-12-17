import { compute } from '../intcode/intcode'
import { fileToArray } from '../utils/fileToArray'
import { Map, Tile } from './findIntersections'
import { findAligmentParameters } from './findAligmentParameters'

const program = fileToArray('day17/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

describe('Day 17: Part 1', () => {
	it('should calculate the solution', async () => {
		const map = [] as Map
		let line = 0
		map[line] = []
		await compute({
			program: [...program],
			output: async out => {
				switch (out) {
					case 35:
						map[line].push(Tile.SCAFFOLDING)
						break
					case 46:
						map[line].push(Tile.SPACE)
						break
					case 10:
						line++
						map[line] = []
						break
				}
			},
		})

		expect(findAligmentParameters(map)).toEqual(4220)
	})
})
