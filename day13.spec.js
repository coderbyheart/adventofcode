'use strict'

/* global describe, it, expect  */

const { parseLevel, tick, renderMap, renderMapAndCarts } = require('./day13')

const { readFileSync } = require('fs')
const input = readFileSync('./day13.txt', 'utf-8')
const inputAsMap = readFileSync('./day13.map.txt', 'utf-8')

const states = [
  '/->-\\\n' +
  '|   |  /----\\\n' +
  '| /-+--+-\\  |\n' +
  '| | |  | v  |\n' +
  '\\-+-/  \\-+--/\n' +
  '  \\------/\n' +
  '',
  '/-->\\\n' +
  '|   |  /----\\\n' +
  '| /-+--+-\\  |\n' +
  '| | |  | |  |\n' +
  '\\-+-/  \\->--/\n' +
  '  \\------/\n' +
  '',
  '/---v\n' +
  '|   |  /----\\\n' +
  '| /-+--+-\\  |\n' +
  '| | |  | |  |\n' +
  '\\-+-/  \\-+>-/\n' +
  '  \\------/\n' +
  '',
  '/---\\\n' +
  '|   v  /----\\\n' +
  '| /-+--+-\\  |\n' +
  '| | |  | |  |\n' +
  '\\-+-/  \\-+->/\n' +
  '  \\------/\n' +
  '',
  '/---\\\n' +
  '|   |  /----\\\n' +
  '| /->--+-\\  |\n' +
  '| | |  | |  |\n' +
  '\\-+-/  \\-+--^\n' +
  '  \\------/\n' +
  '',
  '/---\\\n' +
  '|   |  /----\\\n' +
  '| /-+>-+-\\  |\n' +
  '| | |  | |  ^\n' +
  '\\-+-/  \\-+--/\n' +
  '  \\------/\n' +
  '',
  '/---\\\n' +
  '|   |  /----\\\n' +
  '| /-+->+-\\  ^\n' +
  '| | |  | |  |\n' +
  '\\-+-/  \\-+--/\n' +
  '  \\------/\n' +
  '',
  '/---\\\n' +
  '|   |  /----<\n' +
  '| /-+-->-\\  |\n' +
  '| | |  | |  |\n' +
  '\\-+-/  \\-+--/\n' +
  '  \\------/\n' +
  '',
  '/---\\\n' +
  '|   |  /---<\\\n' +
  '| /-+--+>\\  |\n' +
  '| | |  | |  |\n' +
  '\\-+-/  \\-+--/\n' +
  '  \\------/\n' +
  '',
  '/---\\\n' +
  '|   |  /--<-\\\n' +
  '| /-+--+-v  |\n' +
  '| | |  | |  |\n' +
  '\\-+-/  \\-+--/\n' +
  '  \\------/\n' +
  '',
  '/---\\\n' +
  '|   |  /-<--\\\n' +
  '| /-+--+-\\  |\n' +
  '| | |  | v  |\n' +
  '\\-+-/  \\-+--/\n' +
  '  \\------/\n' +
  '',
  '/---\\\n' +
  '|   |  /<---\\\n' +
  '| /-+--+-\\  |\n' +
  '| | |  | |  |\n' +
  '\\-+-/  \\-<--/\n' +
  '  \\------/\n' +
  '',
  '/---\\\n' +
  '|   |  v----\\\n' +
  '| /-+--+-\\  |\n' +
  '| | |  | |  |\n' +
  '\\-+-/  \\<+--/\n' +
  '  \\------/\n' +
  '',
  '/---\\\n' +
  '|   |  /----\\\n' +
  '| /-+--v-\\  |\n' +
  '| | |  | |  |\n' +
  '\\-+-/  ^-+--/\n' +
  '  \\------/\n' +
  '',
  '/---\\\n' +
  '|   |  /----\\\n' +
  '| /-+--+-\\  |\n' +
  '| | |  X |  |\n' +
  '\\-+-/  \\-+--/\n' +
  '  \\------/   '
]

describe('Mine Cart Madness', () => {
  it('should parse the level', () => {
    const { carts, map } = parseLevel(states[0])
    expect(renderMap(map)).toEqual(
      '/---\\\n' +
      '|   |  /----\\\n' +
      '| /-+--+-\\  |\n' +
      '| | |  | |  |\n' +
      '\\-+-/  \\-+--/\n' +
      '  \\------/\n'
    )
    expect(carts).toEqual([
      {
        x: 2,
        y: 0,
        dir: '>',
        turn: 0
      },
      {
        x: 9,
        y: 3,
        dir: 'v',
        turn: 0
      }
    ])
  })
  it('should move the carts', () => {
    const { map, carts } = parseLevel(states[0])
    const mapTick = tick.bind(undefined, map)
    expect(mapTick(carts)).toEqual([
      {
        x: 3,
        y: 0,
        dir: '>',
        turn: 0
      },
      {
        x: 9,
        y: 4,
        dir: '>',
        turn: 1
      }
    ])
    expect(mapTick(mapTick(carts))).toEqual([
      {
        x: 4,
        y: 0,
        dir: 'v',
        turn: 0
      },
      {
        x: 10,
        y: 4,
        dir: '>',
        turn: 1
      }
    ])
    let { carts: tickedCarts } = parseLevel(states[0])
    for (let i = 0; i < 13; i++) {
      tickedCarts = mapTick(tickedCarts)
    }
    expect(tickedCarts).toMatchObject([
      {
        x: 7,
        y: 2,
        dir: 'v'
      },
      {
        x: 7,
        y: 4,
        dir: '^'
      }
    ])

    try {
      mapTick(tickedCarts)
      throw new Error('Fail!')
    } catch (err) {
      expect(err.message).toEqual('Crash at 7,3')
      expect(err.x).toEqual(7)
      expect(err.y).toEqual(3)
    }
  })

  it('should solve the puzzle', () => {
    let { map, carts } = parseLevel(input)
    expect(renderMap(map)).toEqual(inputAsMap)
    expect(renderMapAndCarts(map, carts)).toEqual(input)
    try {
      do {
        carts = tick(map, carts)
        renderMapAndCarts(map, carts)
      } while (true)
    } catch (err) {
      expect(err.message).toEqual('Crash at 100,21')
      expect(err.x).toEqual(100)
      expect(err.y).toEqual(21)
    }
  })
})
