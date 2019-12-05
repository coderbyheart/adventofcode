import { wireLayer } from './wireLayer'

export const wireCrossSectionFinder = (
	wireDirections: string[][],
): [number, number][] => {
	const wirePositionsCounter = {} as {
		[key: string]: {
			wires: { [key: number]: boolean }
			position: [number, number]
		}
	}

	const wires = wireDirections.map(wireLayer)

	wires.forEach((wire, id) =>
		wire.forEach(pos => {
			if (pos[0] === 0 && pos[1] === 0) return
			const coord = `${pos[0]}x${pos[1]}`
			if (!wirePositionsCounter[coord]) {
				wirePositionsCounter[coord] = {
					wires: {
						[id]: true,
					},
					position: pos,
				}
			} else {
				wirePositionsCounter[coord].wires[id] = true
			}
		}),
	)

	return Object.values(wirePositionsCounter)
		.filter(({ wires }) => Object.keys(wires).length > 1)
		.map(({ position }) => position)
}
