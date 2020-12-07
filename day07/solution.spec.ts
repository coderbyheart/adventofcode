import { loader, loadString } from '../lib/loader'
import { countBags } from './countBags'
import { packBag } from './packBag'
import { parseRules } from './parseRules'

const load = loader(7)
const input = load('input')
/**
 * These rules specify the required contents for 9 bag types. In this example,
 * every faded blue bag is empty, every vibrant plum bag contains 11 bags
 * (5 faded blue and 6 dotted black), and so on.
 */
const sample = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`

const sample2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`

describe('Day 7: Handy Haversacks', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			const rules = parseRules(loadString(sample))
			const packager = packBag(rules)
			const bags = packager('shiny gold')
			expect(bags).toHaveLength(4)
			expect(bags.includes('bright white')).toEqual(true)
			expect(bags.includes('muted yellow')).toEqual(true)
			expect(bags.includes('dark orange')).toEqual(true)
			expect(bags.includes('light red')).toEqual(true)
		})
		it('should solve', () => {
			const rules = parseRules(input)
			const packager = packBag(rules)
			expect(packager('shiny gold')).toHaveLength(378)
		})
	})
	describe('Part 2', () => {
		it('should solve the sample', () => {
			const rules = parseRules(loadString(sample))
			const counter = countBags(rules)
			expect(counter('shiny gold')).toEqual(32)
		})
		it('should solve the second sample', () => {
			const rules = parseRules(loadString(sample2))
			const counter = countBags(rules)
			expect(counter('shiny gold')).toEqual(126)
		})
		it('should solve', () => {
			const rules = parseRules(input)
			const counter = countBags(rules)
			expect(counter('shiny gold')).toEqual(27526)
		})
	})
})
