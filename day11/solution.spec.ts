import { countFlashes } from './countFlashes'
import { generation } from './game'

describe('Day 11: Dumbo Octopus', () => {
	describe('Part 1', () => {
		it('should solve the example', () => {
			//After 100 steps, there have been a total of 1656 flashes.
			expect(
				countFlashes(
					generation(
						`5483143223
                        2745854711
                        5264556173
                        6141336146
                        6357385478
                        4167524645
                        2176841721
                        6882881134
                        4846848554
                        5283751526`,
					),
					100,
				),
			).toEqual(1656)
		})
		it('should solve the puzzle', () => {
			expect(
				countFlashes(
					generation(
						`3265255276
                        1537412665
                        7335746422
                        6426325658
                        3854434364
                        8717377486
                        4522286326
                        6337772845
                        8824387665
                        6351586484`,
					),
					100,
				),
			).toEqual(1627)
		})
	})
})
