/**
 * Find the time required by multiplying each bus with the time of the
 * previous' bus iterations needed to arrive on the correct time
 */
export const findTime = (times: string): number => {
	const slots = times.split(',').reduce((slots, k, n) => {
		if (k === 'x') return slots
		return [...slots, [parseInt(k, 10), n]]
	}, [] as number[][])

	let time = 0
	// start with the first bus' timeslot
	let inc = slots[0][0]
	// now go over all other buses
	for (let bus = 1; bus < slots.length; bus++) {
		// increment time until the next bus arrives at the desired time
		while ((time + slots[bus][1]) % slots[bus][0] != 0) {
			time += inc
		}
		// the next bus needs it's time multiplied by all previous busses
		inc *= slots[bus][0]
	}
	return time
}
