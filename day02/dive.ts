export type Command = {
	heading: 'forward' | 'down' | 'up'
	amount: number
}

export type Position = {
	horizontal: number
	depth: number
}

export const dive = (course: Command[]): Position =>
	course.reduce(
		({ horizontal, depth }, { heading, amount }) => {
			switch (heading) {
				case 'down':
					return { horizontal, depth: depth + amount }
				case 'up':
					return { horizontal, depth: depth - amount }
				case 'forward':
					return { horizontal: horizontal + amount, depth }
			}
			return { horizontal, depth } as Position
		},
		{
			horizontal: 0,
			depth: 0,
		} as Position,
	)
