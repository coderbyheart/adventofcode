const countDigitsOnLayer = (layer: number[][], digit: number): number =>
	layer.reduce(
		(zeros, row) =>
			zeros +
			row.reduce((zeros, col) => (col === digit ? zeros + 1 : zeros), 0),
		0,
	)

export const imageChecksum = (image: number[][][]): number => {
	const zerosPerLayer = image.map(layer => {
		const zeros = countDigitsOnLayer(layer, 0)
		return {
			layer,
			zeros,
		}
	})
	const layerWithFewestZeros = zerosPerLayer
		.sort(({ zeros: z1 }, { zeros: z2 }) => z2 - z1)
		.pop()

	return (
		countDigitsOnLayer(layerWithFewestZeros?.layer as number[][], 1) *
		countDigitsOnLayer(layerWithFewestZeros?.layer as number[][], 2)
	)
}
