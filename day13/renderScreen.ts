import { TilePosition, Tile } from './screen'

const tiles = {
	[Tile.BALL]: '▀',
	[Tile.BLOCK]: '▇',
	[Tile.EMPTY]: ' ',
	[Tile.HORIZONTAL_PADDLE]: '▂',
	[Tile.WALL]: '▒',
}
const drawTile = (tile: Tile): string => tiles[tile]

export const renderScreen = (screen: TilePosition[]): void => {
	const minWidth = screen.reduce(
		(minWidth, [x]) => (x < minWidth ? x : minWidth),
		0,
	)
	const xOffset = -minWidth
	const minHeight = screen.reduce(
		(minHeight, [, y]) => (y < minHeight ? y : minHeight),
		0,
	)
	const yOffset = -minHeight

	const frame = screen.reduce((picture, [x, y, tile]) => {
		const screenX = x + xOffset
		const screenY = y + yOffset
		if (!picture[screenY]) {
			picture[screenY] = []
		}
		picture[screenY][screenX] = drawTile(tile)
		return picture
	}, [] as string[][])

	console.log(frame.map(row => row.join('')).join('\n'))
}
