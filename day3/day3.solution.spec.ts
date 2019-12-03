import { fileToArray } from "../utils/fileToArray"
import { closestIntersectionDistance } from "./closestIntersectionDistance"

describe('Day 3: Part 1', () => {
    it('should calculate the solution', () => {
        const directions = fileToArray('day3/input.txt', s => s.split(','))
        expect(closestIntersectionDistance(directions)).toEqual(5319)
    })
})