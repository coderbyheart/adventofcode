export type Population = Record<number, number>

export const toPopulation = (initial: number[]): Population =>
	initial.reduce(
		(population, fish) => ({
			...population,
			[fish]: (population[fish] ?? 0) + 1,
		}),
		{} as Population,
	)
