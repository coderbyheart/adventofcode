import { fileToArray } from '../utils/fileToArray'
import { closestIntersectionDistance } from './closestIntersectionDistance'
import { stepsToIntersection } from './stepsToIntersection'

const directions = fileToArray('day3/input.txt', s => s.split(','))

describe('Day 3: Part 1', () => {
	it('should calculate the solution', () => {
		expect(closestIntersectionDistance(directions)).toEqual(5319)
	})
})

describe('Day 3: Part 2', () => {
	it('should calculate the solution', () => {
		expect(stepsToIntersection(directions)).toEqual(122514)
	})
})
