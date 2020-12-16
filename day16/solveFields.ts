import { Rules } from './isValidTicket'

const combine = <T>(categories: T[]) => {
	const combinations: T[][] = []
	const g = (categories: T[], parents: T[] = []) => {
		if (categories.length === 0) {
			combinations.push(parents)
			return
		}
		categories.forEach((cat) => {
			g(
				categories.filter((c) => [...parents, cat].includes(c) === false),
				[...parents, cat],
			)
		})
	}
	g(categories)
	return combinations
}

export const solveFields = (rules: Rules, filter?: string) => (
	validTickets: number[][],
): string[] => {
	const allCategories = Object.keys(rules)
	const filteredCategories = allCategories.filter((s) =>
		filter === undefined ? true : s.startsWith(filter),
	)
	const combinations = combine(filteredCategories)
	const missing = allCategories.length - filteredCategories.length

	for (let i = 0; i <= missing; i++) {
		for (const c of combinations) {
			let validCombination = [] as string[]
			;(() => {
				const ranges = [
					...'-'
						.repeat(i)
						.split('')
						.map(() => [
							[0, Number.MAX_SAFE_INTEGER],
							[0, Number.MAX_SAFE_INTEGER],
						]),
					...c.map((c) => rules[c]),
					...'-'
						.repeat(missing - i)
						.split('')
						.map(() => [
							[0, Number.MAX_SAFE_INTEGER],
							[0, Number.MAX_SAFE_INTEGER],
						]),
				]
				for (const t of validTickets) {
					for (let l = 0; l < t.length; l++) {
						const n = t[l]
						const [[from1, to1], [from2, to2]] = ranges[l]
						const valid = (n >= from1 && n <= to1) || (n >= from2 && n <= to2)
						if (!valid) return
					}
				}
				validCombination = c
			})()
			if (validCombination.length > 0) return validCombination
		}
	}
	return []
}
