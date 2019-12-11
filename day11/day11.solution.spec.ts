import { fileToArray } from '../utils/fileToArray'
import { compute, toInput } from '../intcode/intcode'
import { paintRobot, COLOR } from './paintRobot'

const program = fileToArray('day11/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

describe('Day 11: Part 1', () => {
	it('should calculate the solution', async () => {
		const [inp, done] = paintRobot()
		const panelColors: COLOR[] = [COLOR.BLACK] // First panel is black
		let inputs = 0
		await compute({
			program: [...program],
			input: toInput(panelColors),
			output: async out => {
				inputs++
				const color = inp(out)
				if (inputs % 2 === 0) {
					panelColors.push(color)
				}
			},
		})
		const panels = done()
		expect(panels).toHaveLength(2093)
	})
})
