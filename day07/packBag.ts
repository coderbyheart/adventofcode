import { Bag, Bags } from './parseRules'

const unique = (value: unknown, index: number, arr: unknown[]) =>
	arr.indexOf(value) === index

const findContainingBag = (bags: Bags) => (bag: Bag): string[] => {
	// Find the bags that can contain this bag
	const parents = Object.values(bags).filter(
		({ children }) => children?.[bag.color] !== undefined,
	)
	// No one contains this bag, so it's just that
	if (parents.length === 0) return [bag.color]

	return [
		// Return the parents
		...parents.map(({ color }) => color),
		// and the parents of the parents
		...parents.map(findContainingBag(bags)).flat(),
	].filter(unique)
}

/**
 * Determine which bags are needed to package a bag with the given color.
 */
export const packBag = (bags: Bags) => (color: string): string[] =>
	findContainingBag(bags)(bags[color]).flat()
