import { trickShot } from './trickShot'

describe('Day 17: Trick Shot', () => {
	describe('Part 1', () => {
		it('should solve the puzzle', () => {
			expect(
				trickShot({
					from: { x: 138, y: -125 },
					to: { x: 184, y: -71 },
				}).highestY,
			).toEqual(7750)
		})
	})
	describe('Part 2', () => {
		it('should solve the puzzle', () => {
			expect(
				trickShot({
					from: { x: 138, y: -125 },
					to: { x: 184, y: -71 },
				}).hittingVelocities.length,
			).toEqual(4120)
		})
	})
})
