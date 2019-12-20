import {
	transportingMazeSolver,
	drawSolution,
	Location,
} from './transportingMazeSolver'
import * as fs from 'fs'
import * as path from 'path'

describe('Transporting maze solver', () => {
	it('should solve the first example', () => {
		const example = fs.readFileSync(
			path.resolve(process.cwd(), 'day20/example1.txt'),
			'utf-8',
		)
		const res = transportingMazeSolver(example, { start: 'AA', end: 'ZZ' })
		expect(res?.path).toHaveLength(23)
		drawSolution(example, res as Location)
	})

	it('should solve the second example', () => {
		const example = fs.readFileSync(
			path.resolve(process.cwd(), 'day20/example2.txt'),
			'utf-8',
		)
		const res = transportingMazeSolver(example, { start: 'AA', end: 'ZZ' })
		expect(res?.path).toHaveLength(58)
		drawSolution(example, res as Location)
	})
})
