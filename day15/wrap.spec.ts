import { loader } from '../lib/loader'
import { toMap } from './toMap'
import { wrap } from './wrap'

const example = toMap([
	'1163751742',
	'1381373672',
	'2136511328',
	'3694931569',
	'7463417111',
	'1319128137',
	'1359912421',
	'3125421639',
	'1293138521',
	'2311944581',
])

describe('wrap()', () => {
	it('should wrap the map', () =>
		expect(wrap(example)).toEqual(toMap(loader(15)('wrappedExample'))))
})
