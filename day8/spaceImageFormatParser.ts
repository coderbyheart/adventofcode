export const spaceImageFormatParser = (
	pixels: number[],
	width: number,
	height: number,
): number[][][] => {
	const image = [] as number[][][]
	const layers = pixels.length / (width * height)

	for (let layer = 0; layer < layers; layer++) {
		image[layer] = []
		for (let row = 0; row < height; row++) {
			image[layer][row] = []
			for (let col = 0; col < width; col++) {
				const pixel = layer * width * height + row * width + col
				image[layer][row][col] = pixels[pixel]
			}
		}
	}

	return image
}
