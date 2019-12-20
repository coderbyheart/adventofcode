import { Location, Tile } from './transportingMazeSolver'
import * as chalk from 'chalk'

const split = (s: string, length: number) => {
	const ret = []
	for (let offset = 0, strLen = s.length; offset < strLen; offset += length) {
		ret.push(s.slice(offset, length + offset))
	}
	return ret
}

const colorTile = (s: string) => {
	if (/[A-Z]/.test(s)) {
		return chalk.blueBright(s)
	}
	switch (s) {
		case Tile.WALL:
			return chalk.gray('▒')
		case Tile.PATH:
			return ' '
		case '@':
			return chalk.green('█')
		default:
			return s
	}
}

export const drawSolution = (maze: string, finalLocation: Location) => {
	const width = maze.indexOf('\n')
	const mapAsString = maze.trimEnd().replace(/\n/g, '')
	let solution = mapAsString
	finalLocation.path.forEach(p => {
		solution =
			solution.substr(0, p.y * width + p.x) +
			'@' +
			solution.substr(p.y * width + p.x + 1)
	})
	console.log(
		split(solution, width)
			.map(line =>
				line
					.split('')
					.map(colorTile)
					.join(''),
			)
			.join('\n'),
	)
}
