import { findIntersections, Map } from './findIntersections'

describe('findIntersections', () => {
	it('should find the intersections in the example', () => {
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

		const intersections = findIntersections(map as Map)

		expect(intersections).toHaveLength(4)
		expect(intersections).toContainEqual([2, 2])
		expect(intersections).toContainEqual([2, 4])
		expect(intersections).toContainEqual([6, 4])
		expect(intersections).toContainEqual([10, 4])
		console.log(map)
	})
})
