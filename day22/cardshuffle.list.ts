export type Card = {
	id: number
	next?: Card
}

export type Deck = {
	size: number
	first: Card
	last: Card
}

export const deckOf = (size: number): Deck => {
	const first = {
		id: 0,
	} as Card
	let last = first
	for (let i = 1; i < size; i++) {
		const current = {
			id: i,
		}
		last.next = current
		last = current
	}
	return {
		size,
		first,
		last,
	}
}

export const deal = (interval: number) => (deck: Deck): Deck => {
	const dealed = deckOf(deck.size)
	let c: Card | undefined = deck.first
	let i: Card = dealed.first
	while (c !== undefined) {
		i.id = c.id
		for (let n = 0; n < interval; n++) {
			i = i.next || dealed.first
		}
		c = c.next
	}
	return dealed
}

export const dealIntoNewStack = (deck: Deck): Deck => {
	let prev = undefined
	let current: Card | undefined = deck.first
	let next: Card | undefined
	while (current) {
		next = current.next
		current.next = prev
		prev = current
		current = next
	}
	return {
		size: deck.size,
		first: deck.last,
		last: deck.first,
	}
}

export function* walk(deck: Deck): Generator<number> {
	let current: Card | undefined = deck.first
	while (current) {
		yield current.id
		current = current.next
	}
}

export const cut = (n: number) => (deck: Deck): Deck => {
	if (n < 0) {
		return cut(deck.size + n)(deck)
	}
	const oldFirst = deck.first
	const oldLast = deck.last
	oldLast.next = oldFirst
	let newFirst = oldFirst
	let newLast = oldLast

	for (let i = 0; i < n; i++) {
		newLast = newFirst
		newFirst = newFirst.next as Card
	}
	newLast.next = undefined
	return {
		size: deck.size,
		first: newFirst,
		last: newLast,
	}
}

type CardAction = (deck: Deck) => Deck

export const cardShuffle = (actions: CardAction[]) => (deck: Deck): Deck =>
	actions.reduce((deck, action) => action(deck), deck)

const dealString = 'deal into new stack'
const cutRx = /^cut (-?[0-9]+)$/
const dealRx = /^deal with increment (-?[0-9]+)$/

const pass = (deck: Deck) => deck

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
