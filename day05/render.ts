export const render = (diagram: number[][]): string =>
	diagram
		.map((row) => row.map((n) => (n === 0 ? '.' : n.toString())).join(''))
		.join('\n')
