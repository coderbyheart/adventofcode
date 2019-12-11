import { move } from './move'

export enum COLOR {
	BLACK = 0,
	WHITE = 1,
}

enum TURN {
	LEFT = 0,
	RIGHT = 1,
}

export enum DIRECTION {
	UP = 0,
	RIGHT = 1,
	DOWN = 2,
	LEFT = 3,
}

export type Position = [number, number]
const equals = (a: Position, b: Position): boolean =>
	a[0] === b[0] && a[1] === b[1]
export type PaintedPanel = { pos: Position; color: COLOR }

export const paintRobot = (): [
	(input: number) => COLOR,
	() => PaintedPanel[],
] => {
	let pos = [0, 0] as Position
	let inputs = 0
	let direction = DIRECTION.UP
	const paintedPanels = [] as PaintedPanel[]
	const currentPanel = () =>
		paintedPanels.find(({ pos: panelPos }) => equals(pos, panelPos))
	const input = (inp: number): COLOR => {
		inputs++
		if (inputs % 2 !== 0) {
			// 1st command is color
			const panel = currentPanel()
			if (panel) {
				panel.color = inp
			} else {
				paintedPanels.push({ pos, color: inp })
			}
			return inp
		}
		// 2nd command is direction
		switch (inp) {
			case TURN.LEFT:
				direction = (direction - 1) % 4
				if (direction < 0) {
					direction = 4 + direction
				}
				break
			case TURN.RIGHT:
				direction = (direction + 1) % 4
				break
		}
		pos = move(pos, direction)
		// Return color at new position
		return currentPanel()?.color ?? COLOR.BLACK
	}
	const end = () => {
		if (inputs % 2 !== 0) {
			throw new Error('Number of inputs is uneven!')
		}
		return paintedPanels
	}
	return [input, end]
}
