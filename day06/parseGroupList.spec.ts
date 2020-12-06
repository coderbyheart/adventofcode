import { loadString } from '../lib/loader'
import { parseGroupList } from './parseGroupList'

describe('parseGroupList', () => {
	it('should parse a list of group answers', () => {
		expect(
			parseGroupList(
				loadString(`abc

        a
        b
        c
        
        ab
        ac
        
        a
        a
        a
        a
        
        b`),
			),
		).toEqual([
			['abc'],
			['a', 'b', 'c'],
			['ab', 'ac'],
			['a', 'a', 'a', 'a'],
			['b'],
		])
	})
})
