import { Command, Position } from './dive'

export type AimedPosition = Position & { aim: number }

export const diveAim = (
	{ heading, amount }: Command,
	{ horizontal, depth, aim }: AimedPosition = {
		horizontal: 0,
		depth: 0,
		aim: 0,
	},
): AimedPosition => {
	switch (heading) {
		case 'down':
			return { horizontal, depth, aim: aim + amount }
		case 'up':
			return { horizontal, depth, aim: aim - amount }
		case 'forward':
			return {
				horizontal: horizontal + amount,
				depth: depth + aim * amount,
				aim,
			}
	}
	return { horizontal, depth, aim } as AimedPosition
}
