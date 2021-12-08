import { loader } from '../lib/loader'

type Note = [signal: string[], output: string[]]

const parseInput = (line: string): Note => {
	const [s, o] = line.split('|')
	return [s.split(' ').map((s) => s.trim()), o.split(' ').map((o) => o.trim())]
}
const example = [
	'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
	'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
	'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
	'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
	'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
	'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
	'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
	'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
	'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
	'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce',
].map(parseInput)

const input = loader(8)('input').map(parseInput)

/**
 * 0: abcefg  (6)
 * 1: cf      (2)*
 * 2: acdeg   (5)
 * 3: acdfg   (5)
 * 4: bcdf    (4)*
 * 5: abdfg   (5)
 * 6: abdefg  (6)
 * 7: acf     (3)*
 * 8: abcdefg (7)*
 * 9: abcdfg  (6)
 */

const isUnique = (s: string): boolean =>
	s.length === 2 || s.length === 4 || s.length === 3 || s.length === 7
const countUnique = (output: string[]): number =>
	output.filter((s) => isUnique(s)).length

const allUnique = (notes: Note[]): number =>
	notes
		.map(([, output]) => output)
		.map(countUnique)
		.reduce((total, count) => total + count, 0)

describe('Day 8: Seven Segment Search', () => {
	describe('Part 1', () => {
		it('should solve the example', () => {
			expect(allUnique(example)).toEqual(26)
		})
		it('should solve the puzzle', () => expect(allUnique(input)).toEqual(456))
	})
})
