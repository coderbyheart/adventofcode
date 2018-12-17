'use strict'

/* global describe, it, expect  */

const subsus = (pot0, initialState, notes) => {
  const startState = `....${initialState}....`
  const states = notes.reduce((newState, note) => {
    const {pattern, result} = note.match(/(?<pattern>[.#]{5}) => (?<result>[.#])/).groups
    let idx = -1
    do {
      idx = startState.indexOf(pattern, idx + 1)
      if (idx > -1) {
        newState[idx + 2] = result === '#'
      }
    } while (idx > -1)
    return newState
  }, [])

  let newState = []
  for (let i = 0; i < states.length; i++) {
    newState.push(states[i] ? '#' : '.')
  }
  const pots = newState.join('')
  return {
    pot0: pot0 - (4 - pots.match(/^\.+/g)[0].length),
    pots: pots.replace(/^\.+/g, '')
  }
}

const sumGen = ({pot0, pots}) => pots.split('').reduce((sum, pot, index) => sum + (pot === '#' ? index + pot0 : 0), 0)

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
    ]
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
    ]
    let res = {pot0: 0, pots: initialState}
    for (let i = 0; i < 20; i++) {
      res = subsus(res.pot0, res.pots, notes)
    }
    expect(sumGen(res)).toEqual(2140)
  })
})
