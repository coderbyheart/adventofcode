type Deck = number[]

export const dealIntoNewStack = (deck: Deck): Deck => [...deck.reverse()]

export const cut = (n: number) => (deck: Deck): Deck => [
	...deck.slice(n),
	...deck.slice(0, n),
]
