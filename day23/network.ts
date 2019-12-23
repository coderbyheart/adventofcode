export type Network = {
	send: (destination: number, x: number, y: number) => Promise<void>
	receive: (destination: number) => () => Promise<number>
}

export const network = (
	size: number,
	onSend: (destination: number, x: number, y: number) => void,
	onNAT?: (x: number, y: number) => void,
): Network => {
	const buffers = [] as number[][]
	const idle = [] as boolean[]
	let nat: [number, number] | undefined
	for (let i = 0; i < size; i++) {
		buffers[i] = []
		idle[i] = false
	}

	const allIdle = () =>
		idle.reduce((allIdle, b) => {
			if (!allIdle) return allIdle
			if (!b) return false
			return true
		}, true as boolean)

	const sendNatIfAllIdle = () => {
		if (allIdle()) {
			if (nat) {
				buffers[0].push(...nat)
				onNAT && onNAT(...nat)
				nat = undefined
			}
		}
	}

	return {
		send: async (destination: number, x: number, y: number): Promise<void> => {
			if (destination === 255) {
				nat = [x, y]
				sendNatIfAllIdle()
				onSend(destination, x, y)
				return Promise.resolve()
			}
			if (!buffers[destination]) {
				console.error(`[send] Unknown network destination: ${destination}!`)
				buffers[destination] = []
			}
			buffers[destination].push(x, y)
			idle[destination] = false
			return Promise.resolve()
		},
		receive: (destination: number) => async () => {
			if (!buffers[destination]) {
				console.error(`[recv] Unknown network destination: ${destination}!`)
				return Promise.resolve(-1)
			}
			const v = buffers[destination].shift()
			if (!v) {
				// console.log(`${destination} <- -1`)
				idle[destination] = true
				sendNatIfAllIdle()
				return Promise.resolve(-1)
			}
			return Promise.resolve(v)
		},
	}
}
