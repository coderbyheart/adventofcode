import { Rule } from './parseRule'

/**
 * Naive implementation:
 * go through the template string and insert the element between every matching pair.
 *
 * @deprecated Memory intensive. Use {@link countingPairInsertion}.
 */
export const pairInsertion = (template: string, rules: Rule[]): string => {
	const result: string[] = []
	for (let i = 0; i < template.length; i++) {
		const pair = `${template[i - 1] ?? ''}${template[i]}`
		const matchingRule = rules.find(([rulePair]) => rulePair === pair)
		if (matchingRule !== undefined) {
			// Insert the element before the current half pair
			result.push(matchingRule[1])
		}
		result.push(template[i])
	}
	return result.join('')
}
