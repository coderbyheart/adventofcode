export function* pattern(phase: number, pattern = [0, 1, 0, -1]) {
	let i = 0
	const phasePattern = pattern.reduce(
		(phasePattern, entry) => [
			...phasePattern,
			...[...new Array(phase)].fill(entry),
		],
		[] as number[],
	)
	while (true) {
		i = (i + 1) % phasePattern.length
		yield phasePattern[i]
	}
}
