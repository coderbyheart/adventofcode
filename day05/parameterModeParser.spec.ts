import { parseParameter } from '../intcode/parseParameter'

describe('Parameter mode parser', () => {
	it('should parse parameters', () => {
		expect(parseParameter(1002)).toEqual({
			op: 2,
			modes: [0, 1],
		})
	})
	it('should not except invalid modes', () => {
		expect(() => parseParameter(3002)).toThrow(/Invalid parameter mode: 3/)
	})
})
