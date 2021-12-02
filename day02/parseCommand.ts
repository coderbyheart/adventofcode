import { Command } from './dive'

export const parseCommand = (command: string): Command => {
	const [heading, amount] = command.split(' ')
	return {
		heading: heading as Command['heading'],
		amount: parseInt(amount, 10),
	}
}
