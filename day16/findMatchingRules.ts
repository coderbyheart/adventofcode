import { Rules } from './isValidTicket'

export const findMatchingRules = (
	tickets: number[][],
	rules: Rules,
	rowRules = [] as string[],
	row = 0,
	testMemory = {} as Record<string, boolean>,
): string[] | undefined => {
	if (row >= tickets[0].length) {
		// We have assinged rules to all rows, which means we are done.
		return rowRules
	}
	// Assing the remaining rules
	const remainingRules = Object.entries(rules).filter(
		([ruleName]) => !rowRules.includes(ruleName),
	)
	const matchingRules = []
	for (const [ruleName, [[min1, max1], [min2, max2]]] of remainingRules) {
		const key = `${ruleName}-${row}`
		const previous = testMemory[key]
		if (previous === false) continue // We have tested this rule already for this row and it never matches
		if (previous === true) {
			// We have tested this rule already for all tickets and can use it
			matchingRules.push(ruleName)
			continue
		}
		// Check if all tickets match this rule
		let allTicketsMatch = true
		for (const ticket of tickets) {
			const v = ticket[row]
			if (!((v >= min1 && v <= max1) || (v >= min2 && v <= max2))) {
				allTicketsMatch = false
				testMemory[key] = false
				break
			}
		}
		if (allTicketsMatch) {
			matchingRules.push(ruleName)
			testMemory[key] = true
		}
	}
	if (matchingRules.length) {
		for (const matchingRule of matchingRules) {
			const res = findMatchingRules(
				tickets,
				rules,
				[...rowRules, matchingRule],
				row + 1,
				testMemory,
			)
			if (res) return res
		}
	}
	return
}
