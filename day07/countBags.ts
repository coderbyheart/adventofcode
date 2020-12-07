import { Bag, Bags } from './parseRules'

const countChildren = (bags: Bags) => (bag: Bag): number => {
	// Bag has no children, so no more bags are needed
	if (bag.children === undefined) return 0

	return Object.entries(bag.children).reduce(
		(total, [color, count]) =>
			total +
			// Count all the child bags
			count +
			// and add the amount of bags they contain multiplied by the number of bags
			count * countChildren(bags)(bags[color]),
		0,
	)
}

/**
 * Count how many bags are need to transport the given bag
 */
export const countBags = (bags: Bags) => (color: string): number =>
	countChildren(bags)(bags[color])
