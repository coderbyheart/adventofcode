import * as fs from 'fs'
import * as path from 'path'
import { transportingMazeSolver, drawSolution } from './transportingMazeSolver'

const example = fs.readFileSync(
	path.resolve(process.cwd(), 'day20/example-part2.txt'),
	'utf-8',
)

const res = transportingMazeSolver(example, true)
if (res) drawSolution(example, res)
console.log(res?.path.length)
