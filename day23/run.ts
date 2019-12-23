import { network } from './network'
import { computer } from './computer'

export const run = async (n: number, program: number[]): Promise<number> => {
	let result = 0
	const exitFns: (() => void)[] = []
	const nw = network(n, (destination, _, y) => {
		if (destination === 255) {
			result = y
			exitFns.forEach(exitFn => exitFn())
		}
	})
	const computers = []
	for (let i = 0; i < n; i++) {
		computers.push(
			computer([...program], i, nw, exitFn => {
				exitFns.push(exitFn)
			}),
		)
	}

	await Promise.all(computers)
	return result
}
