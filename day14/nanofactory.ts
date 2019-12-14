type ChemicalAmount = {
	symbol: string
	amount: number
}

const parseChem = (chemical: string): ChemicalAmount => {
	const [amount, symbol] = chemical.split(' ')
	return {
		symbol,
		amount: parseInt(amount, 10),
	}
}

const FUEL = 'FUEL'
const ORE = 'ORE'

type Reaction = {
	inputs: ChemicalAmount[]
	output: ChemicalAmount
}

type Reactions = {
	[key: string]: Reaction
}

type Stock = {
	[key: string]: number
}

const startReaction = (
	reactions: Reactions,
	stock?: Stock,
	reaction?: Reaction,
): number => {
	if (!stock) stock = {}
	if (!reaction) reaction = reactions[FUEL]

	// Inputs that only require Ore
	const oreInputs = reaction.inputs.filter(({ symbol }) => symbol === ORE)
	const oreAmount = oreInputs.reduce((total, { amount }) => total + amount, 0)

	const reactionInputs = reaction.inputs.filter(({ symbol }) => symbol !== ORE)

	const reactionOutputs = reactionInputs
		.map(({ symbol, amount }) => {
			if (!stock) {
				stock = {}
			}
			if (!stock[symbol]) {
				stock[symbol] = 0
			}
			stock[symbol] -= amount
			let ore = 0
			while (stock[symbol] < 0) {
				ore += startReaction(reactions, stock, reactions[symbol])
			}
			return ore
		})
		.reduce((total, amount) => total + amount, 0)

	if (!stock[reaction.output.symbol]) {
		stock[reaction.output.symbol] = reaction.output.amount
	} else {
		stock[reaction.output.symbol] += reaction.output.amount
	}

	return oreAmount + reactionOutputs
}

export const nanofactory = (reactions: string): number => {
	const r = reactions
		.split('\n')
		.map(s => s.trim())
		.filter(s => s)
		.map(s => s.split(' => '))
		.map(([input, output]) => ({
			inputs: input.split(', ').map(parseChem),
			output: parseChem(output),
		}))
		.reduce(
			(reactions, { inputs, output }) => ({
				...reactions,
				[output.symbol]: {
					inputs,
					output,
				},
			}),
			{} as Reactions,
		)

	return startReaction(r)
}
