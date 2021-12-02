import { parseCommand } from './parseCommand'

describe('parseCommand()', () => {
	it.each([
		['forward 5', { heading: 'forward', amount: 5 }],
		['down 5', { heading: 'down', amount: 5 }],
		['forward 8', { heading: 'forward', amount: 8 }],
		['up 3', { heading: 'up', amount: 3 }],
		['down 8', { heading: 'down', amount: 8 }],
		['forward 2', { heading: 'forward', amount: 2 }],
	])('should parse the command %s into %j', (command, heading) =>
		expect(parseCommand(command)).toEqual(heading),
	)
})
