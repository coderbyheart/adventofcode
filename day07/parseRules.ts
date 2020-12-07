export type Bag = {
	color: string
	children?: Record<string, number>
}

const ruleDef = /^(?<color>[a-z ]+) bags contain (?<contents>.+)/
const contentsRuleDef = /^(?<amount>[0-9]+) (?<color>[a-z ]+) bags?/

export const parseRuleLine = (rule: string): Bag | undefined => {
	const match = ruleDef.exec(rule)
	if (match === null) return
	const children = match.groups.contents
		.split(',')
		.map((s) => s.trim())
		.filter((s) => s !== undefined)
		.filter((s) => !/no other bags/.test(s))
		.map((s) => contentsRuleDef.exec(s))
		.reduce(
			(children, child) => ({
				...children,
				[child?.groups.color]: parseInt(child?.groups.amount, 10),
			}),
			{},
		)
	return {
		color: match.groups.color as string,
		children: Object.keys(children).length === 0 ? undefined : children,
	}
}

export const parseRules = (rules: string[]): Record<string, Bag> =>
	rules.reduce((bags, rule) => {
		const bag = parseRuleLine(rule)
		if (bag === undefined) return bags
		return {
			...bags,
			[bag.color]: bag,
		}
	}, {})
