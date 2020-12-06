import { collectAnswers } from './collectAnswers'

describe('collectAnswers', () => {
	it(`should collect all answers`, () =>
		expect(
			Object.keys(collectAnswers(['abcx', 'abcy', 'abcz']).answers),
		).toHaveLength(6))
	it(`should count forms`, () =>
		expect(collectAnswers(['abcx', 'abcy', 'abcz']).n).toEqual(3))
})
