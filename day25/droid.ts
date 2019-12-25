import { compute } from '../intcode/intcode'
import { inputGenerator } from '../intcode/inputGenerator'
import { fileToArray } from '../utils/fileToArray'
import { NEWLINE, ascii } from '../ascii/ascii'

const program = fileToArray('day25/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

export const droid = async (program: number[]): Promise<void> => {
	const buffer = [] as number[]
	const inp = inputGenerator(
		ascii([
			'north',
			'north',
			'take mutex',
			'east',
			'take tambourine',
			'west',
			'south',
			'south',
			'west',
			'west',
			'take loom',
			'east',
			'east',
			'north',
			'west',
			'take antenna',
			'south',
			'take hologram',
			'south',
			'take mug',
			'north',
			'west',
			'take astronaut ice cream',
			'east',
			'north',
			'north',
			'north',
			'north',
			'take space heater',
			'north',
			'east',
			'inv',
			'drop mutex',
			'drop mug',
			'drop loom',
			'drop tambourine',
			'inv',
			'east', // Passcode: 25166400
		]),
	)
	await compute({
		program: [...program],
		input: inp.take,
		output: async out => {
			buffer.push(out)
			if (out === NEWLINE) {
				process.stdout.write('\n')
			} else {
				process.stdout.write(String.fromCharCode(out))
			}
		},
	})
}

droid([...program])
