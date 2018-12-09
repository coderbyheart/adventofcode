'use strict'

/* global describe, it, expect, safeRegion  */

const {
  makeAreas,
  maxArea,
  makeMap,
  distance,
  safeRegion
} = require('./day6')

const input = require('./day6.json')


describe('Manhattan Distance', () => {
  it('should calculate the manhatten distance', () => {
    expect(distance([0, 0], [0, 0])).toEqual(0)
    expect(distance([0, 0], [1, 1])).toEqual(2)
    expect(distance([0, 0], [-1, -1])).toEqual(2)
  })
})

describe('map coordinats', () => {
  it('should make a map with all coordinates', () => {
    expect(makeMap([
      [1, 1]
    ])).toEqual([
      [0, 0],
      [0, 1]
    ])
    expect(makeMap([
      [1, 1],
      [2, 2]
    ])).toEqual([
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 2]
    ])
    expect(makeMap([
      [0, 0],
      [1, 3]
    ])).toEqual([
      [1, 0],
      [0, 0],
      [0, 0],
      [0, 2]
    ])
    expect(makeMap([
      [1, 1],
      [1, 6],
      [8, 3],
      [3, 4],
      [5, 5],
      [8, 9]
    ])).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 3],
      [0, 0, 0, 4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 5, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 6]
    ])
  })
})

describe('make areas', () => {
  it('should make areas', () => {
    expect(makeAreas([
      [1, 1]
    ])).toEqual([
      [1, 1],
      [1, 1]
    ])
    expect(makeAreas([
      [0, 0],
      [3, 3]
    ])).toEqual([
      [1, 1, 1, 0],
      [1, 1, 0, 2],
      [1, 0, 2, 2],
      [0, 2, 2, 2]
    ])
    expect(makeAreas([
      [0, 0],
      [0, 3]
    ])).toEqual([
      [1],
      [1],
      [2],
      [2]
    ])
    expect(makeAreas([
      [0, 0],
      [0, 4]
    ])).toEqual([
      [1],
      [1],
      [0],
      [2],
      [2]
    ])
    expect(makeAreas([
      [0, 0],
      [3, 0]
    ])).toEqual([
      [1, 1, 2, 2]
    ])
    expect(makeAreas([
      [0, 0],
      [4, 0]
    ])).toEqual([
      [1, 1, 0, 2, 2]
    ])
  })
  it('make the example map', () => {
    expect(makeAreas([
      [1, 1],
      [1, 6],
      [8, 3],
      [3, 4],
      [5, 5],
      [8, 9]
    ])).toEqual([
      [1, 1, 1, 1, 1, 0, 3, 3, 3],
      [1, 1, 1, 1, 1, 0, 3, 3, 3],
      [1, 1, 1, 4, 4, 5, 3, 3, 3],
      [1, 1, 4, 4, 4, 5, 3, 3, 3],
      [0, 0, 4, 4, 4, 5, 5, 3, 3],
      [2, 2, 0, 4, 5, 5, 5, 5, 3],
      [2, 2, 2, 0, 5, 5, 5, 5, 0],
      [2, 2, 2, 0, 5, 5, 5, 6, 6],
      [2, 2, 2, 0, 5, 5, 6, 6, 6],
      [2, 2, 2, 0, 6, 6, 6, 6, 6]
    ])
  })
  it('should solve the example', () => {
    expect(maxArea([
      [1, 1],
      [1, 6],
      [8, 3],
      [3, 4],
      [5, 5],
      [8, 9]
    ])).toEqual(17)
  })
  it('should calculate the solution', () => {
    expect(maxArea(input)).toEqual(3933)
  })
})

describe('safe region', () => {
  it('should find the safe example region', () => {
    expect(safeRegion([
      [1, 1],
      [1, 6],
      [8, 3],
      [3, 4],
      [5, 5],
      [8, 9]
    ])).toEqual(16)
  })
  it('should find the safe solution region', () => {
    expect(safeRegion(input, 10000)).toEqual(41145)
  })
})
