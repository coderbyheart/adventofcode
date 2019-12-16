import { fft } from './fft'

describe('Flawed Frequency Transmission', () => {
	it.each([
		['12345678', 1, '48226158'],
		['12345678', 2, '34040438'],
		['12345678', 3, '03415518'],
		['12345678', 4, '01029498'],
	])(
		`should calculate from %i in %i phase(s) the result %i`,
		(input, phases, expected) => {
			expect(fft(input as string, phases as number)).toEqual(expected)
		},
	)
	it.each([
		['80871224585914546619083218645595', '24176176'],
		['19617804207202209144916044189917', '73745418'],
		['69317163492948606335995924319873', '52432133'],
	])(
		`should calculate from %i in 100 phases the first 8 digits %i`,
		(input, expected) => {
			expect(fft(input, 100)).toMatch(new RegExp(`^${expected}`))
		},
	)
})
