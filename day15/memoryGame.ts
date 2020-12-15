export const memoryGame = (numbers: number[], iterations: number): number => {
	const spokenTurn = {} as Record<number, number>
	let speak
	let lastSpoken
	for (let turn = 0; turn < iterations; turn++) {
		// Carry over what was said in the last turn
		lastSpoken = speak
		// They begin by taking turns reading from a list of starting numbers
		if (turn < numbers.length) {
			speak = numbers[turn]
		} else {
			// Now, consider the last number spoken

			const lastSpokenTurn = spokenTurn[lastSpoken as number] as
				| number
				| undefined
			if (lastSpokenTurn === undefined) {
				// If it is the first time the number is spoken return 0
				speak = 0
			} else {
				// Otherwise, announce how many turns apart the number is from when it was previously spoken.
				speak = turn - lastSpokenTurn
			}
		}
		// Record what was said in the last turn
		spokenTurn[lastSpoken ?? -1] = turn
	}
	return speak ?? -1
}
