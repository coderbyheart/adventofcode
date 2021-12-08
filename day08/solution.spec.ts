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
 * 0: abcefg  (6)  1*, 7*, Not: 2, 3, 4*, 5, 6, 8*, 9
 * 1: cf      (2)  Unique
 * 2: acdeg   (5)  Not: 0, 1*, 3, 4*, 5, 6, 7*, 8*, 9
 * 3: acdfg   (5)  1*, 7*, Not: 0, 1, 2, 4*, 5, 6, 8*, 9
 * 4: bcdf    (4)  Unique
 * 5: abdfg   (5)  Not: 0, 1*, 2, 3, 4*, 6, 7*, 8*, 9
 * 6: abdefg  (6)  5, Not: 0, 1*, 2, 3, 4*, 7*, 8*, 9
 * 7: acf     (3)  Unique
 * 8: abcdefg (7)  Unique
 * 9: abcdfg  (6)  1*, 3, 4*, 5, 7*, Not: 0, 2, 6, 8
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

const uniquePatterns = [
	[1, 2],
	[4, 4],
	[7, 3],
	[8, 7],
]

const digitIncluded = (
	pattern: string,
	digit: number,
	configuration: Record<number, string>,
) =>
	pattern.split('').filter((s) => configuration[digit].includes(s)).length ===
	configuration[digit].length

const len = (len: number) => (p: string) => p.length === len

const includesDigitsInConfig =
	(configuration: Record<number, string>) =>
	(digits: number[]) =>
	(pattern: string) =>
		digits.reduce((included, digit) => {
			if (!included) return false
			return digitIncluded(pattern, digit, configuration)
		}, true)

const notInDigitPattern =
	(configuration: Record<number, string>) =>
	(digit: number) =>
	(pattern: string) =>
		!digitIncluded(pattern, digit, configuration)

const includesPattern = (pattern: string, inPattern: string) =>
	pattern.split('').filter((s) => inPattern.includes(s)).length ===
	pattern.length

const includesDigitPatternInConfig =
	(digitPattern: Record<number, string>) =>
	(digit: number) =>
	(pattern: string) =>
		includesPattern(pattern, digitPattern[digit])

const wireConfiguration = ([pattern]: Note): Record<string, number> => {
	const digitPattern: Record<number, string> = {}
	const includesDigits = includesDigitsInConfig(digitPattern)
	const not = notInDigitPattern(digitPattern)
	const includesDigitPattern = includesDigitPatternInConfig(digitPattern)

	// unique patterns
	for (const [digit, length] of uniquePatterns) {
		const p = pattern.find(len(length))
		if (p !== undefined) {
			digitPattern[digit] = p
		}
	}
	// Nine
	const nines = pattern
		.filter(len(6)) // has 6 segments,
		.filter(includesDigits([1, 4, 7])) // and includes segements for 1, 4, and 7 (which are all unique)
	if (nines.length != 1)
		throw new Error(`Unexpected number of candidates for 9`)
	digitPattern[9] = nines[0]

	// Zero
	const zeros = pattern
		.filter(len(6)) // has 6 segments
		.filter(not(9)) // but is not 9
		.filter(includesDigits([1, 7])) // and includes segements for 1, and 7 (which are all unique)
	if (zeros.length != 1)
		throw new Error(`Unexpected number of candidates for 0`)
	digitPattern[0] = zeros[0]

	// Six
	const sixes = pattern
		.filter(len(6)) // has 6 segments
		.filter(not(0)) // but is not 0
		.filter(not(9)) // but is not 9
	if (sixes.length != 1)
		throw new Error(`Unexpected number of candidates for 6`)
	digitPattern[6] = sixes[0]

	// Three
	const threes = pattern
		.filter(len(5)) // Has 5 segments
		.filter(includesDigits([1, 7])) // includes 1 and 7
	if (threes.length != 1)
		throw new Error(`Unexpected number of candidates for 3`)
	digitPattern[3] = threes[0]

	// Five
	const fives = pattern
		.filter(len(5)) // has 5 segments
		.filter(includesDigitPattern(6)) // The pattern of 5 must be included in the pattern for 6
	if (fives.length != 1)
		throw new Error(`Unexpected number of candidates for 5`)
	digitPattern[5] = fives[0]

	// Two
	const twos = pattern
		.filter(len(5)) // has 5 segments
		.filter(not(3)) // is not 3
		.filter(not(5)) // is not 5
	if (twos.length != 1) throw new Error(`Unexpected number of candidates for 2`)
	digitPattern[2] = twos[0]

	return Object.entries(digitPattern).reduce(
		(wireConfig, [digit, pattern]) => ({
			...wireConfig,
			[pattern]: parseInt(digit, 10),
		}),
		{},
	)
}

const outputValue = (note: Note): number => {
	const config = wireConfiguration(note)
	return parseInt(
		note[1]
			.map((pattern) => {
				return (
					Object.entries(config).find(
						([p]) => p.length === pattern.length && includesPattern(p, pattern),
					)?.[1] ?? 0
				)
			})
			.join(''),
		10,
	)
}

describe('Day 8: Seven Segment Search', () => {
	describe('Part 1', () => {
		it('should solve the example', () => {
			expect(allUnique(example)).toEqual(26)
		})
		it('should solve the puzzle', () => expect(allUnique(input)).toEqual(456))
	})
	describe('Part 2', () => {
		it('should solve the example', () => {
			const sample = parseInput(
				'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf',
			)
			const config = wireConfiguration(sample)
			expect(config).toEqual({
				acedgfb: 8,
				cdfbe: 5,
				gcdfa: 2,
				fbcad: 3,
				dab: 7,
				cefabd: 9,
				cdfgeb: 6,
				eafb: 4,
				cagedb: 0,
				ab: 1,
			})
			expect(outputValue(sample)).toEqual(5353)
			expect(example.map(outputValue).reduce((sum, s) => sum + s, 0)).toEqual(
				61229,
			)
		})
		it('should solve the puzzle', () =>
			expect(input.map(outputValue).reduce((sum, s) => sum + s, 0)).toEqual(
				1091609,
			))
	})
})
