import { countPairs } from './countPairs'

describe('countPairs()', () => {
	it('should count pairs in a string', () =>
		expect(countPairs('NNCB').pairs).toEqual({
			NN: 1,
			NC: 1,
			CB: 1,
		}))
	it('should count pairs in a string', () =>
		expect(countPairs('NCNBCHB').pairs).toEqual({
			NC: 1,
			CN: 1,
			NB: 1,
			BC: 1,
			CH: 1,
			HB: 1,
		}))
	it('should count elements from pairs', () =>
		expect(countPairs('NNCB').elements).toEqual({
			N: 2,
			C: 1,
			B: 1,
		}))
	it('should count elements from pairs', () =>
		expect(countPairs('NCNBCHB').elements).toEqual({
			N: 2,
			C: 2,
			B: 2,
			H: 1,
		}))
})
