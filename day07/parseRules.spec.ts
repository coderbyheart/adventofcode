import { loadString } from '../lib/loader'
import { parseRules, parseRuleLine } from './parseRules'

const sample = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`

describe('parseRule', () => {
	it.each([
		[
			'light red bags contain 1 bright white bag, 2 muted yellow bags.',
			{
				color: 'light red',
				children: { 'bright white': 1, 'muted yellow': 2 },
			},
		],
		[
			'bright white bags contain 1 shiny gold bag.',
			{
				color: 'bright white',
				children: { 'shiny gold': 1 },
			},
		],
		[
			'faded blue bags contain no other bags.',
			{
				color: 'faded blue',
			},
		],
	])(`should parse %s into %s`, (rule, expected) => {
		expect(parseRuleLine(rule)).toEqual(expected)
	})
})

describe('parseRules', () => {
	it('should parse the rules', () => {
		/*
        Test that it parses the rules into trees:

        light red
           /   \
          1     2
         /       \
       white      muted yellow

        */
		const rules = parseRules(loadString(sample))
		expect(Object.keys(rules)).toHaveLength(9)
		// top level bag is light red
		const lightRed = rules['light red']
		expect(lightRed.color).toEqual('light red')
		// It does not have parents
		expect(lightRed.children?.['bright white']).toEqual(1)
		expect(lightRed.children?.['muted yellow']).toEqual(2)
		// Bottom level is faded blue
		const fadedBlue = rules['faded blue']
		expect(fadedBlue.children).toBeUndefined()
	})
})
