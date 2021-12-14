import { pairInsertion } from './pairInsertion'
import { parseRule } from './parseRule'

const exampleRules = [
	'CH -> B',
	'HH -> N',
	'CB -> H',
	'NH -> C',
	'HB -> C',
	'HC -> B',
	'HN -> C',
	'NN -> C',
	'BH -> H',
	'NC -> B',
	'NB -> B',
	'BN -> B',
	'BB -> N',
	'BC -> B',
	'CC -> N',
	'CN -> C',
].map(parseRule)

const exampleTemplate = `NNCB`

describe('pairInsertion()', () => {
	let input = exampleTemplate
	it.each([
		['NCNBCHB'],
		['NBCCNBBBCBHCB'],
		['NBBBCNCCNBBNBNBBCHBHHBCHB'],
		['NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB'],
	])('should turn pair into %s', (expected) => {
		input = pairInsertion(input, exampleRules)
		return expect(input).toEqual(expected)
	})
})
