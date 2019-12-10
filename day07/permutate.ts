export const permutate = (arr: number[]): number[][] => {
	const ret = []
	for (let i = 0; i < arr.length; i++) {
		const rest = permutate(arr.slice(0, i).concat(arr.slice(i + 1)))
		if (!rest.length) {
			ret.push([arr[i]])
		} else {
			for (const r of rest) {
				ret.push([arr[i]].concat(r))
			}
		}
	}
	return ret
}
