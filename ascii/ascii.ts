export const NEWLINE = 10

export const ascii = (instructions: string[]): number[] =>
	instructions
		.map(s => [...s.split('').map(s => s.charCodeAt(0)), NEWLINE])
		.flat()
