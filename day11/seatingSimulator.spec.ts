import { loadString, isOccupied, Direction } from './seatingSimulator'

describe('seatingSimulator', () => {
	describe('isOccupied', () => {
		const world1 = loadString(`.......#.
        ...#.....
        .#.......
        .........
        ..#L....#
        ....#....
        .........
        #........
        ...#.....`)
		it.each([
			[Direction.E],
			[Direction.SE],
			[Direction.S],
			[Direction.SW],
			[Direction.W],
			[Direction.NW],
			[Direction.N],
			[Direction.NE],
		])('should see a seat in direction %s', (direction) =>
			expect(isOccupied(world1, 4, 3, direction, direction)).toEqual(1),
		)

		it('should only see one seat', () => {
			const world2 = loadString(
				`.............
                .L.L.#.#.#.#.
                .............`,
			)
			expect(isOccupied(world2, 1, 1, Direction.E, Direction.E)).toEqual(0)
		})
	})
})
