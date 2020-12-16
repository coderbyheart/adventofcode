import { loader } from '../lib/loader'
import { parseRules } from './isValidTicket'

const load = loader(16)
const tickets = load('tickets').map((s) =>
	s.split(',').map((s) => parseInt(s, 10)),
)
const rules = parseRules(load('rules'))

type Rules = [string, [[number, number], [number, number]]][]

const departureRules: Rules = Object.entries(rules).filter(([k]) =>
	k.startsWith('departure'),
)

const findMatch = (
	rules: Rules,
	tickets: number[][],
	parents: Record<string, number> = {},
): any => {
	if (rules.length === 0) {
		// Check all tickets
		for (const ticket of tickets) {
			for (const [ruleName, k] of Object.entries(parents)) {
				const v = ticket[k]
				const rule = rules.find(([name]) => name === ruleName)
				const [ruleMin1, ruleMax1] = rule?.[1][0] ?? [
					Number.MAX_SAFE_INTEGER,
					-Number.MAX_SAFE_INTEGER,
				]
				const [ruleMin2, ruleMax2] = rule?.[1][1] ?? [
					Number.MAX_SAFE_INTEGER,
					-Number.MAX_SAFE_INTEGER,
				]
				if (
					!(
						(v >= ruleMin1 || v >= ruleMin2) &&
						(v <= ruleMax1 || v <= ruleMax2)
					)
				) {
					return // fail
				}
			}
		}
		console.log(parents)
		return // pass
	}
	for (let r = 0; r < rules.length; r++) {
		const rule = rules[r]
		const rest = [...rules.slice(0, r), ...rules.slice(r + 1)]
		for (let k = 0; k < tickets[0].length; k++) {
			if (Object.values(parents).includes(k)) continue
			const [ruleMin1, ruleMax1] = rule[1][0]
			const [ruleMin2, ruleMax2] = rule[1][1]
			for (const ticket of tickets) {
				const v = ticket[k]
				if (
					(v >= ruleMin1 || v >= ruleMin2) &&
					(v <= ruleMax1 || v <= ruleMax2)
				) {
					findMatch(rest, tickets, {
						...parents,
						[rule[0]]: k,
					})
				}
			}
		}
	}
}

console.log(findMatch(departureRules, tickets))
