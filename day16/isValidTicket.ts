export type Rules = Record<string, [[number, number], [number, number]]>

export const parseRules = (rules: string[]): Rules =>
	rules.reduce((rules, rule) => {
		const m = /^(?<class>[^:]+): (?<from1>[0-9]+)-(?<to1>[0-9]+) or (?<from2>[0-9]+)-(?<to2>[0-9]+)$/.exec(
			rule,
		)
		if (m === null) {
			console.error(`Could not parse rule ${rule}!`)
			return rules
		}
		return {
			...rules,
			[m.groups?.class as string]: [
				[
					parseInt(m.groups?.from1 as string, 10),
					parseInt(m.groups?.to1 as string, 10),
				] as [number, number],
				[
					parseInt(m.groups?.from2 as string, 10),
					parseInt(m.groups?.to2 as string, 10),
				] as [number, number],
			],
		}
	}, {} as Rules)

/**
 * Returns the invalid numbers in a ticket
 */
export const findInvalidNumbers = (rules: Rules) => (
	ticket: number[],
): number[] =>
	ticket.filter((n) => {
		const range = Object.values(rules).find(
			(ruleRanges) =>
				ruleRanges.find(([from, to]) => {
					if (n < from) return false
					if (n > to) return false
					return true
				}) !== undefined,
		)
		const isInRange = range !== undefined
		return !isInRange
	})
