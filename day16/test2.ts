import { loadString } from '../lib/loader'
import { parseRules } from './isValidTicket'

type Rules = [string, [[number, number], [number, number]]][]

const rulePositionChecked = {} as Record<string, boolean>
const ruleOrderChecked = {} as Record<string, boolean>

const findMatch = (
	rules: Rules,
	tickets: number[][],
	remainingRules = rules,
	parents: string[] = [],
): any => {
	if (remainingRules.length === 0) {
		if (rules.length !== parents.length) {
			console.error({
				remainingRules,
				parents,
			})
			throw new Error('BUG!')
		}
		if (ruleOrderChecked[parents.join(',')] !== undefined) return
		// Check all rules with all tickets
		for (let k = 0; k < parents.length; k++) {
			const ruleName = parents[k]
			const key = `${ruleName}-${k}`
			if (rulePositionChecked[key] !== undefined) return // fail early
			const rule = rules.find(([name]) => name === ruleName)
			const [ruleMin1, ruleMax1] = rule?.[1][0] ?? [
				Number.MAX_SAFE_INTEGER,
				-Number.MAX_SAFE_INTEGER,
			]
			const [ruleMin2, ruleMax2] = rule?.[1][1] ?? [
				Number.MAX_SAFE_INTEGER,
				-Number.MAX_SAFE_INTEGER,
			]
			for (const ticket of tickets) {
				const v = ticket[k]
				if (
					!(
						(v >= ruleMin1 && v <= ruleMax1) ||
						(v >= ruleMin2 && v <= ruleMax2)
					)
				) {
					ruleOrderChecked[parents.join(',')] = false
					return // fail
				}
			}
		}
		ruleOrderChecked[parents.join(',')] = true
		return parents // pass
	}
	for (let r = 0; r < remainingRules.length; r++) {
		const rule = remainingRules[r]
		const rest = [...remainingRules.slice(0, r), ...remainingRules.slice(r + 1)]
		for (let k = 0; k < tickets[0].length; k++) {
			const key = `${rule[0]}-${k}`
			if (rulePositionChecked[key] !== undefined) return
			const [ruleMin1, ruleMax1] = rule[1][0]
			const [ruleMin2, ruleMax2] = rule[1][1]
			let allMatch = true
			for (const ticket of tickets) {
				const v = ticket[k]
				if (
					!(
						(v >= ruleMin1 && v <= ruleMax1) ||
						(v >= ruleMin2 && v <= ruleMax2)
					)
				) {
					allMatch = false
					break
				}
			}
			if (allMatch) {
				const newParents = [...parents]
				newParents[k] = rule[0]
				return findMatch(rules, tickets, rest, newParents)
			} else {
				rulePositionChecked[key] = false
			}
		}
	}
}

/*
const load = loader(16)
const tickets = load('tickets').map((s) =>
	s.split(',').map((s) => parseInt(s, 10)),
)
const rules = parseRules(load('rules'))
console.log(findMatch(Object.entries(rules), tickets))
console.log(rules)
*/

const step2sampleTickets = loadString(`
3,9,18
15,1,5
5,14,9`).map((s) => s.split(',').map((s) => parseInt(s, 10)))
const sample2Rules = parseRules(
	loadString(`class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19`),
)
console.log(findMatch(Object.entries(sample2Rules), step2sampleTickets)) // 'row', 'class', 'seat',
