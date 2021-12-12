import { isBigCave } from './isBigCave'

type Connection = {
	from: string
	to: string
}

type Route = string[]

export const parseMap = (connections: string[]): Connection[] =>
	connections.map((connection) => {
		const [from, to] = connection.split('-')
		return {
			from,
			to,
		}
	})

const routeToString = (route: Route): string => route.join(',')

const canVisit =
	(path: Route, options?: NavigateOptions) =>
	(target: string): boolean => {
		if (isBigCave(target)) return true

		const allowOneSmallCaveTwice = options?.allowOneSmallCaveTwice ?? false
		if (!allowOneSmallCaveTwice)
			return path.find((visited) => visited === target) === undefined

		const visitedBefore =
			path.filter((visited) => visited === target) !== undefined
		if (!visitedBefore) return true
		// Collect the visits per small cage
		const visits = path.reduce((visitorCount, p) => {
			if (isBigCave(p)) return visitorCount
			return {
				...visitorCount,
				[p]: (visitorCount[p] ?? 0) + 1,
			}
		}, {} as Record<string, number>)
		// Make sure we haven't visited the target already twice
		if ((visits[target] ?? 0) > 1) {
			return false
		}
		// Make sure we haven't visited any other small cave twice
		const doubleVisits = Object.values(visits).filter((v) => v > 1)
		const canVisit = doubleVisits.length <= 1
		return canVisit
	}

type NavigateOptions = { allowOneSmallCaveTwice: boolean }

const navigateCaves = (
	connections: Connection[],
	path: Route,
	onEnd: (_: Route) => void,
	options?: NavigateOptions,
) => {
	const current = path[path.length - 1]
	const forward = connections // Forward connections
		.filter(({ from }) => from === current)
		.map(({ to }) => to)
		// Can't go back to start
		.filter((target) => target !== 'start')
		// Cant' revisit small cages
		.filter(canVisit(path, options))
	const backward = connections
		.filter(({ to }) => to === current)
		.map(({ from }) => from)
		// Can't go back to start
		.filter((target) => target !== 'start')
		// Cant' revisit small cages
		.filter(canVisit(path, options))

	const nextConnections: string[] = [...forward, ...backward]
	for (const connection of nextConnections) {
		// End reached
		if (connection === 'end') {
			const routeToEnd = [...path, connection]
			onEnd(routeToEnd)
			continue
		}
		navigateCaves(connections, [...path, connection], onEnd, options)
	}
	// Dead end
}

export const findPathes = (
	connections: Connection[],
	options?: NavigateOptions,
): string[] => {
	const starts = [
		...connections.filter(({ from }) => from === 'start').map(({ to }) => to),
		...connections.filter(({ to }) => to === 'start').map(({ from }) => from),
	]
	const pathes: Route[] = []
	for (const start of starts) {
		navigateCaves(
			connections,
			['start', start],
			(route) => {
				pathes.push(route)
			},
			options,
		)
	}
	return pathes.map(routeToString)
}

const example = ['start-A', 'start-b', 'A-c', 'A-b', 'b-d', 'A-end', 'b-end']
findPathes(parseMap(example))
