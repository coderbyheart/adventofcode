import { findPortals } from './findPortals'
import * as fs from 'fs'
import * as path from 'path'

describe('Find the portals', () => {
	it('should find all portals in the map', () => {
		const example = fs.readFileSync(
			path.resolve(process.cwd(), 'day20/example1.txt'),
			'utf-8',
		)
		const portals = findPortals(example)
		expect(portals).toHaveLength(8)
	})
})
