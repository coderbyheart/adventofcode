import { findAligmentParameters } from './findAligmentParameters'
import { Map } from './findIntersections'

describe('findAlignmentParameters', () => {
	it('should find the alignment parameters in the example', () => {
		const map = `
        ..#..........
        ..#..........
        #######...###
        #.#...#...#.#
        #############
        ..#...#...#..
        ..#####...^..
        `
			.split('\n')
			.map(s => s.trim())
			.filter(s => s)
			.map(s => s.split(''))
		expect(findAligmentParameters(map as Map)).toEqual(76)
	})
})
