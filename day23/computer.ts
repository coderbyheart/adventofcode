import { compute } from '../intcode/intcode'
import { Network } from './network'

export const computer = async (
	program: number[],
	networkAddress: number,
	network: Network,
	exit: (fn: () => void) => void,
): Promise<void> => {
	const buffer = [] as number[]
	let configured = false
	const rcv = network.receive(networkAddress)
	await compute({
		program: [...program],
		exit,
		input: async () => {
			if (!configured) {
				configured = true
				return Promise.resolve(networkAddress)
			}
			return rcv()
		},
		output: async out => {
			buffer.push(out)
			if (buffer.length === 3) {
				network.send(buffer[0], buffer[1], buffer[2])
				buffer.length = 0
			}
		},
	})
}
