import { fileToArray } from '../utils/fileToArray'
import { compute, toInput } from '../intcode/intcode'
import { paintRobot, COLOR, PaintedPanel } from './paintRobot'
import { drawPanels } from './drawPanels'

const program = fileToArray('day11/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

const paint = async (startColor = COLOR.BLACK): Promise<PaintedPanel[]> => {
	const [inp, done] = paintRobot()
	const panelColors: COLOR[] = [startColor]
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
	return done()
}

describe('Day 11: Part 1', () => {
	it('should calculate the solution', async () => {
		expect(await paint()).toHaveLength(2093)
	})
})

describe('Day 11: Part 2', () => {
	it('should calculate the solution', async () => {
		const panels = await paint(COLOR.WHITE)
		const picture = drawPanels(panels)
		const p = `
        ###    ## ###  #  # #      ## #  # ###   
        #  #    # #  # # #  #       # #  # #  #   
        ###     # #  # ##   #       # #  # #  #   
        #  #    # ###  # #  #       # #  # ###   
        #  # #  # # #  # #  #    #  # #  # #     
        ###   ##  #  # #  # ####  ##   ##  #
        `
		console.log(picture.map(line => line.join('')).join('\n'))
		expect(['', ...picture.map(line => line.join('').trim()), '']).toEqual(
			p.split('\n').map(s => s.trim()),
		)
	})
})
