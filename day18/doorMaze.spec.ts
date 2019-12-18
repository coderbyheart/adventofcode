import { solveDoorMaze, Tile } from './solveDoorMaze'

const toMap = (map: string) =>
	map
		.split('\n')
		.map(s => s.trim())
		.filter(s => s)
		.map(s => s.split(''))

describe('Door Maze', () => {
	it('sould solve the first example', () => {
		expect(
			solveDoorMaze(
				toMap(`
        #########
        #b.A.@.a#
        #########
        `) as Tile[][],
			)?.path,
		).toHaveLength(8 + 1)
	})

	it('should solve the second example', () => {
		expect(
			solveDoorMaze(
				toMap(`
        ########################
        #f.D.E.e.C.b.A.@.a.B.c.#
        ######################.#
        #d.....................#
        ########################
        `) as Tile[][],
			)?.path,
		).toHaveLength(86 + 1)
	})
	it('should solve the third example', () => {
		expect(
			solveDoorMaze(
				toMap(`
        ########################
        #...............b.C.D.f#
        #.######################
        #.....@.a.B.c.d.A.e.F.g#
        ########################
        `) as Tile[][],
			)?.path,
		).toHaveLength(132 + 1)
	})
	it.skip('should solve the fourth example', () => {
		expect(
			solveDoorMaze(
				toMap(`
        #################
        #i.G..c...e..H.p#
        ########.########
        #j.A..b...f..D.o#
        ########@########
        #k.E..a...g..B.n#
        ########.########
        #l.F..d...h..C.m#
        #################
        `) as Tile[][],
			)?.path,
		).toHaveLength(136 + 1)
	})
	it('should solve the fifth example', () => {
		expect(
			solveDoorMaze(
				toMap(`
        ########################
        #@..............ac.GI.b#
        ###d#e#f################
        ###A#B#C################
        ###g#h#i################
        ########################
        `) as Tile[][],
			)?.path,
		).toHaveLength(81 + 1)
	})
})
