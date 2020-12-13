export const findShuttle = (
	notes: string[],
): { bus: number; waitTime: number } => {
	// Read arrival time from notes
	const arrivaleTime = parseInt(notes[0], 10)
	// Read bus linses from notes
	const buslines = notes[1]
		.split(',')
		.filter((s) => s !== 'x')
		.map((s) => parseInt(s, 10))

	// Calculate the next time of each bus arriving that is after the arrival time
	const schedulAfterArrival = buslines.reduce(
		(schedule, line) => ({
			...schedule,
			[line]: Math.ceil(arrivaleTime / line) * line,
		}),
		{} as Record<string, number>,
	)

	// Sort by closes arrivale time and pick the bus that arrives first
	const [bus, waitTime] = Object.entries(schedulAfterArrival).sort(
		([, timeA], [, timeB]) => timeA - timeB,
	)[0]

	return {
		waitTime: waitTime - arrivaleTime,
		bus: parseInt(bus, 10),
	}
}
