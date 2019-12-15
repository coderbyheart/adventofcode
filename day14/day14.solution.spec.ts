import { nanofactory } from './nanofactory'
import * as fs from 'fs'
import * as path from 'path'

const recipes = fs.readFileSync(
	path.resolve(process.cwd(), 'day14/input.txt'),
	'utf-8',
)

describe('Day 14: Part 1', () => {
	it('should calculate the solution', () => {
		expect(nanofactory(recipes, 'FUEL', 1)).toEqual(168046)
	})
})
