import { spaceImageFormatParser } from './spaceImageFormatParser'

export const COLOR_BLACK = 0
export const COLOR_RED = 1
export const COLOR_TRANSPARENT = 2

export const renderImage = (
	pixels: number[],
	width: number,
	height: number,
): number[][] => {
	const layers = spaceImageFormatParser(pixels, width, height)
	const image = [] as number[][]
	for (let row = 0; row < height; row++) {
		image[row] = []
		for (let col = 0; col < width; col++) {
			const pixelColors = []
			for (const layer of layers) {
				pixelColors.push(layer[row][col])
			}
			image[row][col] = pixelColors.reverse().reduce((finalColor, color) => {
				if (color === COLOR_TRANSPARENT) return finalColor
				return color
			}, (undefined as unknown) as number)
		}
	}
	return image
}
