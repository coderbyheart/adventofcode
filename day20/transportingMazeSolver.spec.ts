import { transportingMazeSolver, Location } from './transportingMazeSolver'
import * as fs from 'fs'
import * as path from 'path'
import { drawSolution } from './drawSolution'

describe('Transporting maze solver', () => {
	it('should solve the first example', () => {
		const example = fs.readFileSync(
			path.resolve(process.cwd(), 'day20/example1.txt'),
			'utf-8',
		)
		const res = transportingMazeSolver(example)
		expect(res?.path).toHaveLength(23)
		drawSolution(example, res as Location)
	})

	it('should solve the second example', () => {
		const example = fs.readFileSync(
			path.resolve(process.cwd(), 'day20/example2.txt'),
			'utf-8',
		)
		const res = transportingMazeSolver(example)
		expect(res?.path).toHaveLength(58)
		drawSolution(example, res as Location)
	})

	it('should recursively solve the third example', () => {
		const example = fs.readFileSync(
			path.resolve(process.cwd(), 'day20/example-part2.txt'),
			'utf-8',
		)

		const res = transportingMazeSolver(example, true)
		expect(res?.path).toHaveLength(396)
		drawSolution(example, res as Location)
	})
})
