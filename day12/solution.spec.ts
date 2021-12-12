import { findPathes, parseMap } from './caveNavigator'

const example1 = ['start-A', 'start-b', 'A-c', 'A-b', 'b-d', 'A-end', 'b-end']
const example2 = [
	'dc-end',
	'HN-start',
	'start-kj',
	'dc-start',
	'dc-HN',
	'LN-dc',
	'HN-end',
	'kj-sa',
	'kj-HN',
	'kj-dc',
]
const example3 = [
	'fs-end',
	'he-DX',
	'fs-he',
	'start-DX',
	'pj-DX',
	'end-zg',
	'zg-sl',
	'zg-pj',
	'pj-he',
	'RW-he',
	'fs-DX',
	'pj-RW',
	'zg-RW',
	'start-pj',
	'he-WI',
	'zg-he',
	'pj-fs',
	'start-RW',
]

const input = [
	'GC-zi',
	'end-zv',
	'lk-ca',
	'lk-zi',
	'GC-ky',
	'zi-ca',
	'end-FU',
	'iv-FU',
	'lk-iv',
	'lk-FU',
	'GC-end',
	'ca-zv',
	'lk-GC',
	'GC-zv',
	'start-iv',
	'zv-QQ',
	'ca-GC',
	'ca-FU',
	'iv-ca',
	'start-lk',
	'zv-FU',
	'start-zi',
]

describe('Day 12: Passage Pathing', () => {
	describe('Part 1', () => {
		it('should solve the first example', () => {
			const pathes = findPathes(parseMap(example1))
			expect(pathes).toHaveLength(10)
			expect(pathes.sort((a, b) => a.localeCompare(b))).toEqual(
				[
					'start,A,b,A,c,A,end',
					'start,A,b,A,end',
					'start,A,b,end',
					'start,A,c,A,b,A,end',
					'start,A,c,A,b,end',
					'start,A,c,A,end',
					'start,A,end',
					'start,b,A,c,A,end',
					'start,b,A,end',
					'start,b,end',
				].sort((a, b) => a.localeCompare(b)),
			)
		})
		it('should solve the second example', () => {
			const pathes = findPathes(parseMap(example2))
			expect(pathes).toHaveLength(19)
			expect(pathes.sort((a, b) => a.localeCompare(b))).toEqual(
				[
					'start,HN,dc,HN,end',
					'start,HN,dc,HN,kj,HN,end',
					'start,HN,dc,end',
					'start,HN,dc,kj,HN,end',
					'start,HN,end',
					'start,HN,kj,HN,dc,HN,end',
					'start,HN,kj,HN,dc,end',
					'start,HN,kj,HN,end',
					'start,HN,kj,dc,HN,end',
					'start,HN,kj,dc,end',
					'start,dc,HN,end',
					'start,dc,HN,kj,HN,end',
					'start,dc,end',
					'start,dc,kj,HN,end',
					'start,kj,HN,dc,HN,end',
					'start,kj,HN,dc,end',
					'start,kj,HN,end',
					'start,kj,dc,HN,end',
					'start,kj,dc,end',
				].sort((a, b) => a.localeCompare(b)),
			)
		})
		it('should solve the third example', () => {
			const pathes = findPathes(parseMap(example3))
			expect(pathes).toHaveLength(226)
		})
		it('should solve the puzzle', () => {
			const pathes = findPathes(parseMap(input))
			expect(pathes).toHaveLength(5252)
		})
	})
})
