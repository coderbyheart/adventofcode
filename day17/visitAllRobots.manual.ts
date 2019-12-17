import { compute, toInput } from '../intcode/intcode'
import { Map, tiles } from './findIntersections'

const NEWLINE = 10
const A = 'A'.charCodeAt(0)
const B = 'B'.charCodeAt(0)
const C = 'C'.charCodeAt(0)
const L = 'L'.charCodeAt(0)
const R = 'R'.charCodeAt(0)
const y = 'y'.charCodeAt(0)
// const n = 'n'.charCodeAt(0)
const SEP = ','.charCodeAt(0)
const nToChar = (n: number) => `${n}`.charCodeAt(0)

export const manualSolution = async (program: number[]): Promise<number> => {
	const map = [] as Map
	let line = 0
	map[line] = []
	const p = [...program]
	p[0] = 2 // wake up the robot
	const nonMapOutputs = [] as number[]

	await compute({
		program: p,
		input: toInput([
			// Programs
			A,
			SEP,
			B,
			SEP,
			B,
			SEP,
			C,
			SEP,
			B,
			SEP,
			C,
			SEP,
			B,
			SEP,
			C,
			SEP,
			A,
			SEP,
			A,
			NEWLINE,
			// A = L6,R8,L4,R8,L12
			L,
			SEP,
			nToChar(6),
			SEP,
			R,
			SEP,
			nToChar(8),
			SEP,
			L,
			SEP,
			nToChar(4),
			SEP,
			R,
			SEP,
			nToChar(8),
			SEP,
			L,
			SEP,
			nToChar(1),
			nToChar(2),
			NEWLINE,
			// B = L12,R10,L4
			L,
			SEP,
			nToChar(1),
			nToChar(2),
			SEP,
			R,
			SEP,
			nToChar(1),
			nToChar(0),
			SEP,
			L,
			SEP,
			nToChar(4),
			NEWLINE,
			// C = L12,L6,L4,L4
			L,
			SEP,
			nToChar(1),
			nToChar(2),
			SEP,
			L,
			SEP,
			nToChar(6),
			SEP,
			L,
			SEP,
			nToChar(4),
			SEP,
			L,
			SEP,
			nToChar(4),
			NEWLINE,
			y,
			NEWLINE,
		]),
		output: async out => {
			switch (out) {
				case 10:
					line++
					map[line] = []
					break
				default:
					if (tiles[out] === undefined) {
						nonMapOutputs.push(out)
					} else {
						map[line].push(tiles[out])
					}
			}
		},
	})
	return nonMapOutputs.pop() as number
}
