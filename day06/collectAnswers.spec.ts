import { collectAnswers } from './collectAnswers'

describe('collectAnswers', () => {
	it(`should collect all answers`, () =>
		expect(Object.keys(collectAnswers(['abcx', 'abcy', 'abcz']))).toHaveLength(
			6,
		))
})
