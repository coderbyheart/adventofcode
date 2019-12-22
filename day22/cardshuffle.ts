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

export const cardShuffle = (actions: ((deck: Deck) => Deck)[]) => (
	deck: Deck,
): Deck => actions.reduce((deck, action) => action(deck), deck)
