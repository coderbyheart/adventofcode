import { fileToArray } from '../utils/fileToArray'
import { spaceImageFormatParser } from './spaceImageFormatParser'
import { imageChecksum } from './imageChecksum'
import { renderImage, COLOR_BLACK, COLOR_RED } from './renderImage'
import * as chalk from 'chalk'

const data = fileToArray('day8/input.txt', s =>
	s.split('').map(s => parseInt(s, 10)),
)[0]

describe('Day 8: Part 1', () => {
	it('should calculate the solution', async () => {
		const image = spaceImageFormatParser(data, 25, 6)
		expect(imageChecksum(image)).toEqual(1620)
	})
})

describe('Day 8: Part 2', () => {
	it('should calculate the solution', async () => {
		const img = renderImage(data, 25, 6)
		expect(img).toEqual([
			[
				1,
				1,
				1,
				0,
				0,
				0,
				1,
				1,
				0,
				0,
				1,
				0,
				0,
				0,
				1,
				1,
				1,
				1,
				1,
				0,
				1,
				1,
				1,
				1,
				0,
			],
			[
				1,
				0,
				0,
				1,
				0,
				1,
				0,
				0,
				1,
				0,
				1,
				0,
				0,
				0,
				1,
				1,
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
			],
			[
				1,
				1,
				1,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
				0,
				1,
				0,
				1,
				0,
				1,
				1,
				1,
				0,
				0,
				1,
				1,
				1,
				0,
				0,
			],
			[
				1,
				0,
				0,
				1,
				0,
				1,
				0,
				0,
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
			],
			[
				1,
				0,
				0,
				1,
				0,
				1,
				0,
				0,
				1,
				0,
				0,
				0,
				1,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
			],
			[
				1,
				1,
				1,
				0,
				0,
				0,
				1,
				1,
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				1,
				1,
				1,
				1,
				0,
				1,
				0,
				0,
				0,
				0,
			],
		])
		console.log(
			img.reduce((rowText, cols) => {
				const row = cols.reduce((colText, col) => {
					let colored = ' '
					if (col === COLOR_BLACK) {
						colored = chalk.gray(col)
					} else if (col === COLOR_RED) {
						colored = chalk.bgRedBright(col)
					}
					return `${colText}${colored}`
				}, '')
				return `${rowText}\n${row}`
			}, ''),
		)
	})
})
