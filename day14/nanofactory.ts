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

const ORE = 'ORE'

type Reaction = {
	inputs: ChemicalAmount[]
	output: ChemicalAmount
	stock: number
}

type Reactions = {
	[key: string]: Reaction
}

const makeChemical = (
	reactions: Reactions,
	chemical: string,
	need: number,
): number => {
	if (chemical === ORE) return need // Is always available

	const reaction = reactions[chemical]

	if (reaction.stock > need) {
		// We have enough in stock
		reaction.stock -= need
		return 0
	}

	need -= reaction.stock

	// Calculate the leftovers and stock them
	const extra = reaction.output.amount - (need % reaction.output.amount)
	if (extra == reaction.output.amount) {
		reaction.stock = 0
	} else {
		reaction.stock = extra
	}

	// How often do we need to run the reaction?
	const mult = Math.ceil(need / reaction.output.amount)
	let oreUsed = 0
	for (const input of reaction.inputs) {
		oreUsed += makeChemical(reactions, input.symbol, input.amount * mult)
	}
	return oreUsed
}

export const parseReactions = (reactions: string) =>
	reactions
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
					stock: 0,
				},
			}),
			{} as Reactions,
		)

export const nanofactory = (
	reactions: string,
	chemical: string,
	amountneed: number,
): number => makeChemical(parseReactions(reactions), chemical, amountneed)
