'use strict'

const {
  makeAreas,
  maxArea,
  makeMap,
  distance
} = require('./day6')

/* global describe, it, expect */

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
  it('should calculate the max area', () => {
    expect(maxArea([
      [0, 0],
      [0, 3]
    ])).toEqual(2)
    expect(maxArea([
      [0, 0],
      [0, 4]
    ])).toEqual(2)
    expect(maxArea([
      [0, 0],
      [3, 0]
    ])).toEqual(2)
    expect(maxArea([
      [0, 0],
      [4, 0]
    ])).toEqual(2)
    expect(maxArea([
      [0, 0],
      [3, 3]
    ])).toEqual(6)
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
    expect(maxArea([
      [242, 112],
      [292, 356],
      [66, 265],
      [73, 357],
      [357, 67],
      [44, 303],
      [262, 72],
      [220, 349],
      [331, 301],
      [338, 348],
      [189, 287],
      [285, 288],
      [324, 143],
      [169, 282],
      [114, 166],
      [111, 150],
      [251, 107],
      [176, 196],
      [254, 287],
      [146, 177],
      [149, 213],
      [342, 275],
      [158, 279],
      [327, 325],
      [201, 70],
      [145, 344],
      [227, 345],
      [168, 261],
      [108, 236],
      [306, 222],
      [174, 289],
      [67, 317],
      [316, 302],
      [248, 194],
      [67, 162],
      [232, 357],
      [300, 193],
      [229, 125],
      [326, 234],
      [252, 343],
      [51, 263],
      [348, 234],
      [136, 337],
      [146, 82],
      [334, 62],
      [255, 152],
      [326, 272],
      [114, 168],
      [292, 311],
      [202, 62]
    ])).toEqual(16918)
  })
})
