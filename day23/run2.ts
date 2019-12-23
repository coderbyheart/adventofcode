import { network } from './network'
import { computer } from './computer'

export const run = async (n: number, program: number[]): Promise<number> => {
	const exitFns: (() => void)[] = []
	let result = 0
	let lastNATy = Number.MAX_SAFE_INTEGER
	const nw = network(
		n,
		(destination, x, y) => {
			if (destination === 0) {
				console.log(`${destination}: -> ${x} ${y}`)
			}
		},
		(_, y) => {
			if (lastNATy === y) {
				result = y
				exitFns.forEach(fn => fn())
			}
			lastNATy = y
		},
	)
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
