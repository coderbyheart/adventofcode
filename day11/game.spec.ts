import { render } from '../day05/render'
import { generation, step } from './game'

describe('Glowing Octopus Game of Life', () => {
	it('should calculate the next generation', () => {
		const start = generation(
			`11111
            19991
            19191
            19991
            11111`,
		)
		const gen1 = step(start)
		const gen2 = step(gen1)
		expect(render(gen1)).toEqual(
			render(
				generation(
					`34543
                    40004
                    50005
                    40004
                    34543`,
				),
			),
		)
		expect(render(gen2)).toEqual(
			render(
				generation(
					`45654
                    51115
                    61116
                    51115
                    45654`,
				),
			),
		)
	})
	it('should calculate a bigger example', () => {
		let gen = generation(
			`5483143223
            2745854711
            5264556173
            6141336146
            6357385478
            4167524645
            2176841721
            6882881134
            4846848554
            5283751526`,
		)
		for (let i = 0; i < 10; i++) {
			gen = step(gen)
		}
		expect(render(gen)).toEqual(
			render(
				generation(
					`0481112976
                    0031112009
                    0041112504
                    0081111406
                    0099111306
                    0093511233
                    0442361130
                    5532252350
                    0532250600
                    0032240000`,
				),
			),
		)
	})
})
