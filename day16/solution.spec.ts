import { loader, loadString } from '../lib/loader'
import { findInvalidNumbers, parseRules } from './isValidTicket'
import { solveFields } from './solveFields'

const sampleRules = loadString(`class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50`)

const load = loader(16)
const rules = load('rules')
const tickets = load('tickets')

describe('Day 16: Ticket Translation', () => {
	describe('parseRules', () => {
		it('should parse the rules', () =>
			expect(parseRules(sampleRules)).toEqual({
				class: [
					[1, 3],
					[5, 7],
				],
				row: [
					[6, 11],
					[33, 44],
				],
				seat: [
					[13, 40],
					[45, 50],
				],
			}))
	})
	describe('findInvalidNumbers', () => {
		it.each([
			[[7, 1, 14], []],
			[[7, 3, 47], []],
			[[40, 4, 50], [4]],
			[[55, 2, 20], [55]],
			[[38, 6, 12], [12]],
		])('the ticket %s invalid numbers are %s', (ticket, invalidNumbers) =>
			expect(findInvalidNumbers(parseRules(sampleRules))(ticket)).toEqual(
				invalidNumbers,
			),
		)
	})
	describe('Part 1', () => {
		const ticketScanningErrorRate = (
			rules: string[],
			tickets: string[],
		): number =>
			tickets
				.map((s) => s.split(',').map((s) => parseInt(s, 10)))
				.map(findInvalidNumbers(parseRules(rules)))
				.flat()
				.reduce((sum, n) => n + sum, 0)

		it('should solve the sample', () =>
			expect(
				ticketScanningErrorRate(
					sampleRules,
					loadString(`7,3,47
			40,4,50
			55,2,20
			38,6,12`),
				),
			).toEqual(71))
		it('should solve', () =>
			expect(ticketScanningErrorRate(rules, tickets)).toEqual(21081))
	})
	describe('Part 2', () => {
		it('should solve the sample', () => {
			const step2sampleTickets = loadString(`
			3,9,18
			15,1,5
			5,14,9`).map((s) => s.split(',').map((s) => parseInt(s, 10)))
			const sample2Rules = parseRules(
				loadString(`class: 0-1 or 4-19
			row: 0-5 or 8-19
			seat: 0-13 or 16-19`),
			)
			const validTickets = step2sampleTickets.filter(
				(t) => findInvalidNumbers(sample2Rules)(t).length === 0,
			)
			expect(validTickets).toHaveLength(3)

			expect(solveFields(sample2Rules)(step2sampleTickets)).toEqual([
				'row',
				'class',
				'seat',
			])
		})
	})
})
