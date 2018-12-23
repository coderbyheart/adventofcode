'use strict'

/* global describe, it, expect  */

const {readFileSync} = require('fs')
const input = readFileSync('./day23.txt', 'utf-8')

const distance = ([x1, y1, z1], [x2, y2, z2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(z1 - z2)

const examples = '' +
  'pos=<1,0,0>, r=1\n' +
  'pos=<4,0,0>, r=3\n' +
  'pos=<0,2,0>, r=1\n' +
  'pos=<0,0,0>, r=4\n' +
  'pos=<0,5,0>, r=3\n' +
  'pos=<0,0,3>, r=1\n' +
  'pos=<1,1,1>, r=1\n' +
  'pos=<1,1,2>, r=1\n' +
  'pos=<1,3,1>, r=1'

const parseInput = input => input
  .split('\n')
  .map(b => b.match(/pos=<(?<x>-?[0-9]+),(?<y>-?[0-9]+),(?<z>-?[0-9]+)>, r=(?<radius>-?[0-9]+)/).groups)
  .map(({x, y, z, radius}) => [
    parseInt(x, 10),
    parseInt(y, 10),
    parseInt(z, 10),
    parseInt(radius, 10)
  ])

const numberOfNanobotsInRange = input => {
  const bots = parseInput(input)
  const network = bots
    .map(bot => ({
      bot,
      peers: bots.filter(peer => distance(bot, peer) <= bot[3])
    }))
  network.sort((b1, b2) => b2.bot[3] - b1.bot[3])
  return network[0].peers.length
}

describe('distance', () => {
  it('should calculate the distance', () => {
    expect(distance([0, 0, 0], [0, 0, 0])).toEqual(0)
    expect(distance([1, 0, 0], [0, 0, 0])).toEqual(1)
    expect(distance([4, 0, 0], [0, 0, 0])).toEqual(4)
    expect(distance([0, 2, 0], [0, 0, 0])).toEqual(2)
    expect(distance([0, 5, 0], [0, 0, 0])).toEqual(5)
    expect(distance([0, 0, 3], [0, 0, 0])).toEqual(3)
    expect(distance([1, 1, 1], [0, 0, 0])).toEqual(3)
    expect(distance([1, 1, 2], [0, 0, 0])).toEqual(4)
    expect(distance([1, 3, 1], [0, 0, 0])).toEqual(5)
  })
})

describe('Experimental Emergency Teleportation', () => {
  it('should solve the example', () => {
    expect(numberOfNanobotsInRange(examples)).toEqual(7)
  })
  it('should solve the puzzle', () => {
    expect(numberOfNanobotsInRange(input)).toEqual(584)
  })
})
