import { loader } from '../lib/loader'
import { moveCrabs } from './moveCrabs'

const input = loader(7)('input')[0]
	.split(',')
	.map((s) => parseInt(s, 10))

describe('Day 7: The Treachery of Whales', () => {
	describe('Part 1', () => {
		it('should solve the example', () =>
			expect(moveCrabs([16, 1, 2, 0, 4, 2, 7, 1, 2, 14])).toEqual(37))
		it('should solve the puzzle', () =>
			expect(moveCrabs(input)).toEqual(344297))
	})
})
