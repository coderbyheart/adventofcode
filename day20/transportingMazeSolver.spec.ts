import {
	transportingMazeSolver,
	drawSolution,
	Location,
} from './transportingMazeSolver'
import * as fs from 'fs'
import * as path from 'path'

describe('Transporting maze solver', () => {
	it('should solve the example', () => {
		const example = fs.readFileSync(
			path.resolve(process.cwd(), 'day20/example1.txt'),
			'utf-8',
		)
		const res = transportingMazeSolver(example)
		expect(res?.path).toHaveLength(23)
		drawSolution(example, res as Location)
	})
})
