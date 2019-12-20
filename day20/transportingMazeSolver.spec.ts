import { transportingMazeSolver } from './transportingMazeSolver'
import * as fs from 'fs'
import * as path from 'path'

describe('Transporting maze solver', () => {
	it('should solve the example', () => {
		const example = fs.readFileSync(
			path.resolve(process.cwd(), 'day20/example1.txt'),
			'utf-8',
		)
		expect(transportingMazeSolver(example)?.path).toHaveLength(23)
	})
})
