'use strict'

/* global describe, it, expect  */

const { subsus, sumGen } = require('./day12')

describe('Subterranean Sustainability', () => {
  it('should solve the example', () => {
    const initialState = '#..#.#..##......###...###'
    const notes = [
      '...## => #',
      '..#.. => #',
      '.#... => #',
      '.#.#. => #',
      '.#.## => #',
      '.##.. => #',
      '.#### => #',
      '#.#.# => #',
      '#.### => #',
      '##.#. => #',
      '##.## => #',
      '###.. => #',
      '###.# => #',
      '####. => #'
    ].map(n => n.match(/(?<pattern>[.#]{5}) => (?<result>[.#])/).groups)
    const gen1 = subsus(0, initialState, notes)
    expect(gen1.pots).toEqual('#...#....#.....#..#..#..#')
    expect(gen1.pot0).toEqual(0)
    const gen2 = subsus(gen1.pot0, gen1.pots, notes)
    expect(gen2.pots).toEqual('##..##...##....#..#..#..##')
    const gen3 = subsus(gen2.pot0, gen2.pots, notes)
    expect(gen3.pots).toEqual('#.#...#..#.#....#..#..#...#')
    expect(gen3.pot0).toEqual(-1)
    let gen20 = gen3
    for (let i = 4; i <= 20; i++) {
      gen20 = subsus(gen20.pot0, gen20.pots, notes)
    }
    expect(gen20.pots).toEqual('#....##....#####...#######....#.#..##')
    expect(gen20.pot0).toEqual(-2)
    expect(sumGen(gen20)).toEqual(325)
  })
  it('should calculate the solution', () => {
    const initialState = '##.#.#.##..#....######..#..#...#.#..#.#.#..###.#.#.#..#..###.##.#..#.##.##.#.####..##...##..#..##.#.'
    const notes = [
      '...## => #',
      '#.#.# => #',
      '.###. => #',
      '#.#.. => .',
      '.#..# => #',
      '#..#. => #',
      '..##. => .',
      '....# => .',
      '#.... => .',
      '###.. => #',
      '.#### => #',
      '###.# => .',
      '#..## => #',
      '..... => .',
      '##.## => #',
      '####. => .',
      '##.#. => .',
      '#...# => .',
      '##### => .',
      '..#.. => .',
      '.#.#. => .',
      '#.### => .',
      '.##.# => .',
      '..#.# => .',
      '.#.## => #',
      '...#. => .',
      '##... => #',
      '##..# => #',
      '.##.. => .',
      '.#... => #',
      '#.##. => #',
      '..### => .'
    ].map(n => n.match(/(?<pattern>[.#]{5}) => (?<result>[.#])/).groups)
    let res = { pot0: 0, pots: initialState }
    for (let i = 0; i < 20; i++) {
      res = subsus(res.pot0, res.pots, notes)
    }
    expect(sumGen(res)).toEqual(2140)
  })
})
