import { loadString } from '../lib/loader'
import { parseRules } from './parseRules'
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

describe('packBag', () => {
	/**
	 * You have a shiny gold bag. If you wanted to carry it in at least one
	 * other bag, how many different bag colors would be valid for the outermost
	 * bag? (In other words: how many colors can, eventually, contain at least
	 * one shiny gold bag?)
	 *
	 * In the above rules, the following options would be available to you:
	 *
	 * A bright white bag, which can hold your shiny gold bag directly.
	 * A muted yellow bag, which can hold your shiny gold bag directly, plus some other bags.
	 * A dark orange bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
	 * A light red bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
	 * So, in this example, the number of bag colors that can eventually contain at least one shiny gold bag is 4.
	 */
	it('should pack a shiny gold bag', () => {
		const rules = parseRules(loadString(sample))
		const packager = packBag(rules)
		const colors = Object.keys(packager('shiny gold'))
		expect(colors).toEqual([
			'bright white',
			'muted yellow',
			'dark orange',
			'light red',
		])
	})
})
