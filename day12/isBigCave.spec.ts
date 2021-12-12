import { isBigCave } from './isBigCave'

describe('isBigCave', () => {
	it.each([
		['start', false],
		['A', true],
		['Abc', false],
		['ABC', true],
	])('should determine cave %s as big: %b', (name, expected) =>
		expect(isBigCave(name)).toEqual(expected),
	)
})
