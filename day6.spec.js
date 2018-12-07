'use strict'

/* global describe, it, expect */

const distance = ([y1, x1], [y2, x2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2)

const makeMap = coordinates => {
  const [maxX, maxY] = [
    coordinates.reduce((max, [_, x]) => {
      if (x > max) return x
      return max
    }, 0),
    coordinates.reduce((max, [y]) => {
      if (y > max) return y
      return max
    }, 0)
  ]
  const map = []
  for (let y = 0; y <= maxY; y++) {
    map[y] = []
    for (let x = 0; x <= maxX; x++) {
      map[y][x] = 0
    }
  }

  coordinates.forEach(([y, x], idx) => {
    map[y][x] = idx + 1
  })
  return map
}

const makeAreas = coordinates => {
  const map = makeMap(coordinates)
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      const distances = coordinates.reduce((distances, [cy, cx], i) => {
        const d = distance([y, x], [cy, cx])
        if (!distances[d]) {
          distances[d] = [i]
        } else {
          distances[d].push(i)
        }
        return distances
      }, {})
      const minDistance = Object.keys(distances).sort((d1, d2) => d1 - d2)[0]
      if (distances[minDistance].length === 1) {
        map[y][x] = distances[minDistance][0] + 1
      }
    }
  }
  return map
}

const maxArea = coordinates => {
  const areas = makeAreas(coordinates)
  const countPerCoordinate = {

  }
  for (let y = 0; y < areas.length; y++) {
    for (let x = 0; x < areas[0].length; x++) {
      if (!countPerCoordinate[areas[y][x]]) {
        countPerCoordinate[areas[y][x]] = 1
      } else {
        countPerCoordinate[areas[y][x]]++
      }
    }
  }
  return countPerCoordinate[Object.keys(countPerCoordinate).sort((c1, c2) => countPerCoordinate[c2] - countPerCoordinate[c1])[0]]
}

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
      [1, 1],
      [1, 6],
      [8, 3],
      [3, 4],
      [5, 5],
      [8, 9]
    ])).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 3, 0, 0, 0, 0, 0, 6]
    ])
  })
})

describe('make areas', () => {
  it('should measure distance', () => {
    expect(makeAreas([
      [1, 1]
    ])).toEqual([
      [1, 1],
      [1, 1]
    ])
    expect(makeMap([
      [0, 0],
      [3, 3]
    ])).toEqual([
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 2]
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
  /*
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
  }) */
})
