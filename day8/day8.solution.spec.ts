import { fileToArray } from '../utils/fileToArray'
import { spaceImageFormatParser } from './spaceImageFormatParser'
import { imageChecksum } from './imageChecksum'

const data = fileToArray('day8/input.txt', s =>
	s.split('').map(s => parseInt(s, 10)),
)[0]

describe('Day 8: Part 1', () => {
	it('should calculate the solution', async () => {
		const image = spaceImageFormatParser(data, 25, 6)
		expect(imageChecksum(image)).toEqual(1620)
	})
})
