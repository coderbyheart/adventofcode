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

const wasVisited =
	(path: Route) =>
	(target: string): boolean => {
		if (isBigCave(target)) return true
		return path.find((visited) => visited === target) === undefined
	}

const navigateCaves = (
	connections: Connection[],
	path: Route,
	onEnd: (_: Route) => void,
) => {
	const current = path[path.length - 1]
	const forward = connections // Forward connections
		.filter(({ from }) => from === current)
		.map(({ to }) => to)
		// Can't go back to start
		.filter((target) => target !== 'start')
		// Cant' revisit small cages
		.filter(wasVisited(path))
	const backward = connections
		.filter(({ to }) => to === current)
		.map(({ from }) => from)
		// Can't go back to start
		.filter((target) => target !== 'start')
		// Cant' revisit small cages
		.filter(wasVisited(path))

	const nextConnections: string[] = [...forward, ...backward]
	for (const connection of nextConnections) {
		// End reached
		if (connection === 'end') {
			const routeToEnd = [...path, connection]
			onEnd(routeToEnd)
			continue
		}
		navigateCaves(connections, [...path, connection], onEnd)
	}
	// Dead end
}

export const findPathes = (connections: Connection[]): string[] => {
	const starts = [
		...connections.filter(({ from }) => from === 'start').map(({ to }) => to),
		...connections.filter(({ to }) => to === 'start').map(({ from }) => from),
	]
	const pathes: Route[] = []
	for (const start of starts) {
		navigateCaves(connections, ['start', start], (route) => {
			pathes.push(route)
		})
	}
	return pathes.map(routeToString)
}

const example = ['start-A', 'start-b', 'A-c', 'A-b', 'b-d', 'A-end', 'b-end']
findPathes(parseMap(example))
