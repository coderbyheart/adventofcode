import { loader } from '../lib/loader'
import { parseRules } from './isValidTicket'
import { solveFields } from './solveFields'

const load = loader(16)
const rules = load('rules')
const tickets = load('tickets')

console.log(
	solveFields(
		parseRules(rules),
		'departure',
	)(tickets.map((s) => s.split(',').map((s) => parseInt(s, 10)))),
)
