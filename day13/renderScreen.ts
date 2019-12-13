import { Tile } from './screen'

const tiles = {
	[Tile.BALL]: '▀',
	[Tile.BLOCK]: '▇',
	[Tile.EMPTY]: ' ',
	[Tile.HORIZONTAL_PADDLE]: '▂',
	[Tile.WALL]: '▒',
}
const drawTile = (tile: Tile): string => tiles[tile]

export const renderScreen = (screen: Tile[][], clear = false): void => {
	if (clear) process.stdout.write('\x1B[2J')
	console.log(
		screen.map(row => row.map(tile => drawTile(tile)).join('')).join('\n'),
	)
}
