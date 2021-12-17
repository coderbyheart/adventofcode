import { Point, probeLauncher, Target } from './probeLauncher.js'

let trajectory: Point = { x: 18, y: 1 }
const target: Target = { from: { x: 20, y: -10 }, to: { x: 30, y: -5 } }

const render = () => {
	process.stdout.write('\u001b[2J') // Clear screen
	const { points, hit, highestY } = probeLauncher(target, trajectory)
	const pointsYSorted = points.sort(({ y: y1 }, { y: y2 }) => y2 - y1)
	const pointsMinY = pointsYSorted[0].y
	const pointsMaxY = pointsYSorted[pointsYSorted.length - 1].y
	const deltaY = pointsMaxY < 0 ? pointsMinY : pointsMaxY

	const pointsXSorted = points.sort(({ x: x1 }, { x: x2 }) => x2 - x1)
	const pointsMinX = pointsXSorted[0].x
	const pointsMaxX = pointsXSorted[pointsXSorted.length - 1].x
	const deltaX = pointsMaxX < 0 ? pointsMinX : pointsMaxX

	const shifted = points.map((point) => ({
		...point,
		y: -point.y + deltaY,
		x: point.x + deltaX,
	}))

	const maxX = shifted.sort(({ x: x1 }, { x: x2 }) => x2 - x1)[0].x
	const maxY = shifted.sort(({ y: y1 }, { y: y2 }) => y2 - y1)[0].y
	const map: string[][] = []
	for (let y = 0; y <= maxY; y++) {
		map[y] = []
		for (let x = 0; x <= maxX; x++) {
			map[y][x] = ' '
		}
	}
	for (const { x, y, icon } of shifted) {
		map[y][x] = icon
	}

	console.log(map.map((s) => s.join('')).join('\n'))
	console.log({ trajectory, hit, highestY })
}

render()

const stdin = process.stdin

// without this, we would only get streams once enter is pressed
stdin.setRawMode(true)

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume()

// i don't want binary, do you?
stdin.setEncoding('utf8')

// on any data into stdin
stdin.on('data', (key) => {
	// ctrl-c ( end of text )
	if (key.toString() === '\u0003') {
		process.exit()
	}
	switch (key.toString()) {
		case '\u0003':
			process.exit()
			break
		case '\u001b[A':
			trajectory = { ...trajectory, y: trajectory.y + 1 }
			render()
			break
		case '\u001b[B':
			trajectory = { ...trajectory, y: trajectory.y - 1 }
			render()
			break
		case '\u001b[D':
			trajectory = { ...trajectory, x: trajectory.x - 1 }
			render()
			break
		case '\u001b[C':
			trajectory = { ...trajectory, x: trajectory.x + 1 }
			render()
			break
	}
})

render()
