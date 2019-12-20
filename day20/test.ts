import * as fs from 'fs'
import * as path from 'path'
import { transportingMazeSolver } from './transportingMazeSolver'

const example = fs.readFileSync(
	path.resolve(process.cwd(), 'day20/example1.txt'),
	'utf-8',
)

const res = transportingMazeSolver(example)
console.log(res)
console.log(res?.path.length)
