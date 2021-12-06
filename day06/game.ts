import { Population } from './toPopulation'

export const progressDay = (population: Population): Population =>
	Object.entries(population).reduce((population, [days, amount]) => {
		const newTimer = parseInt(days, 10) - 1
		if (newTimer < 0) {
			return {
				...population,
				6: amount + (population[6] ?? 0),
				8: amount + (population[8] ?? 0),
			}
		}
		return {
			...population,
			[newTimer]: amount + (population[newTimer] ?? 0),
		}
	}, {} as Population)

export const countFish = (population: Population): number =>
	Object.values(population).reduce((sum, amount) => sum + amount, 0)

export const renderPopulation = (population: Population): string =>
	Object.entries(population)
		.map(([timer, amount]) => timer.repeat(amount).split('').join(','))
		.join(',')
