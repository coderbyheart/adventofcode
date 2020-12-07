import { Bag, Bags } from './parseRules'

const unique = (value: unknown, index: number, arr: unknown[]) =>
	arr.indexOf(value) === index

const findContainingBag = (bags: Bags) => (bag: Bag): string[] => {
	// Find the bags that can contain this bag
	const parents = Object.values(bags).filter(
		({ children }) => children?.[bag.color] !== undefined,
	)
	if (parents.length === 0) return [bag.color]
	return [
		...parents.map(({ color }) => color),
		...parents.map(findContainingBag(bags)).flat(),
	].filter(unique)
}

/**
 * Determine which bags are needed to package a bag with the given color.
 */
export const packBag = (bags: Bags) => (color: string): string[] =>
	findContainingBag(bags)(bags[color]).flat()
