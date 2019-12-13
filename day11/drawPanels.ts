import { PaintedPanel, COLOR } from './paintRobot'

export const drawPanels = (panels: PaintedPanel[]) => {
	const minWidth = panels.reduce(
		(minWidth, { pos: [x] }) => (x < minWidth ? x : minWidth),
		0,
	)
	const maxWidth = panels.reduce(
		(maxWidth, { pos: [x] }) => (x > maxWidth ? x : maxWidth),
		0,
	)
	const width = Math.abs(minWidth) + maxWidth
	const xOffset = -minWidth

	const minHeight = panels.reduce(
		(minHeight, { pos: [, y] }) => (y < minHeight ? y : minHeight),
		0,
	)
	const yOffset = -minHeight

	return panels.reduce((picture, { pos, color }) => {
		const x = pos[0] + xOffset
		const y = pos[1] + yOffset
		if (!picture[y]) {
			picture[y] = [...new Array(width)].fill(' ')
		}
		picture[y][x] = color === COLOR.WHITE ? '#' : ' '
		return picture
	}, [] as string[][])
}
