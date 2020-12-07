export type Bag = {
	color: string
	children?: Record<string, number>
}

export type Bags = Record<string, Bag>

const ruleDef = /^(?<color>[a-z ]+) bags contain (?<contents>.+)/
const contentsRuleDef = /^(?<amount>[0-9]+) (?<color>[a-z ]+) bags?/

export const parseRuleLine = (rule: string): Bag | undefined => {
	const match = ruleDef.exec(rule)
	if (match?.groups === undefined) return
	const children = match.groups.contents
		.split(',')
		.map((s) => s.trim())
		.filter((s) => s !== undefined)
		.filter((s) => !s.includes('no other bags'))
		.map((s) => contentsRuleDef.exec(s))
		.reduce((children, child) => {
			if (child?.groups === undefined) return children
			return {
				...children,
				[child?.groups.color]: parseInt(child?.groups.amount, 10),
			}
		}, {})
	return {
		color: match.groups.color,
		children: Object.keys(children).length === 0 ? undefined : children,
	}
}

export const parseRules = (rules: string[]): Bags =>
	rules.reduce((bags, rule) => {
		const bag = parseRuleLine(rule)
		if (bag === undefined) return bags
		return {
			...bags,
			[bag.color]: bag,
		}
	}, {})
