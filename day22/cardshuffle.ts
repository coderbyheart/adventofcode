type Deck = number[]

export const dealIntoNewStack = (deck: Deck): Deck => [...deck.reverse()]

export const cut = (n: number) => (deck: Deck): Deck => [
	...deck.slice(n),
	...deck.slice(0, n),
]

export const deal = (increment: number) => (deck: Deck): Deck => {
	const dealed = []
	const len = deck.length
	let c = deck.shift()
	let i = 0
	while (c !== undefined) {
		dealed[i] = c
		i += increment
		if (i >= len) {
			i = i % len
		}
		c = deck.shift()
	}
	return dealed
}

const pass = (deck: Deck) => deck

type CardAction = (deck: Deck) => Deck

const dealString = 'deal into new stack'
const cutRx = /^cut (-?[0-9]+)$/
const dealRx = /^deal with increment (-?[0-9]+)$/

export const parseActions = (actions: string): CardAction[] =>
	actions
		.trim()
		.split('\n')
		.map(s => s.trim())
		.map(s => {
			if (s === dealString) return dealIntoNewStack
			const cutMatch = cutRx.exec(s)
			if (cutMatch) return cut(parseInt(cutMatch[1], 10))
			const dealMatch = dealRx.exec(s)
			if (dealMatch) return deal(parseInt(dealMatch[1], 10))
			return pass
		})

export const cardShuffle = (actions: CardAction[]) => (deck: Deck): Deck =>
	actions.reduce((deck, action) => action(deck), deck)
