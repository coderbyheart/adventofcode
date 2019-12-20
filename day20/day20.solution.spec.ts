import {
	transportingMazeSolver,
	drawSolution,
	Location,
} from './transportingMazeSolver'
import * as fs from 'fs'
import * as path from 'path'

describe('Day 20: Part 1', () => {
	it('should solve the puzzle', () => {
		const input = fs.readFileSync(
			path.resolve(process.cwd(), 'day20/input.txt'),
			'utf-8',
		)
		const res = transportingMazeSolver(input)
		expect(res?.path).toHaveLength(400)
		drawSolution(input, res as Location)
	})
})
