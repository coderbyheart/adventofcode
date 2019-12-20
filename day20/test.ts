import * as fs from 'fs'
import * as path from 'path'
import { transportingMazeSolver, drawSolution } from './transportingMazeSolver'

const example = fs.readFileSync(
	path.resolve(process.cwd(), 'day20/example2.txt'),
	'utf-8',
)

const res = transportingMazeSolver(example)
if (res) drawSolution(example, res)
