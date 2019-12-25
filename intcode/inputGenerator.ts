type Taker = (value: number) => void
export const inputGenerator = (inp: number[], takers: Taker[] = []) => ({
	take: async () => {
		const i = inp.shift()
		if (i !== undefined) {
			return Promise.resolve(i)
		}
		return new Promise<number>(resolve => {
			takers.push(resolve)
		})
	},
	push: (value: number) => {
		const taker = takers.shift()
		if (taker) {
			taker(value)
		} else {
			inp.push(value)
		}
	},
	inputs: inp,
})
