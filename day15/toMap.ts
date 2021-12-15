export const toMap = (map: string[]): number[][] =>
	map.map((s) => s.split('').map((s) => parseInt(s, 10)))
