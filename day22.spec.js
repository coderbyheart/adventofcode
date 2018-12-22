'use strict'

/* global describe, it, test, expect  */

/**
 * A region's erosion level is its geologic index plus the cave system's depth, all modulo 20183.
 */
const erosionLevel = (depth, geoIndex) => {
  return (geoIndex + depth) % 20183
}

/**
 * If the erosion level modulo 3 is 0, the region's type is rocky.
 * If the erosion level modulo 3 is 1, the region's type is wet.
 * If the erosion level modulo 3 is 2, the region's type is narrow.
 */
const type = erosionLevel => erosionLevel % 3

/**
 * The geologic index can be determined using the first rule that applies
 */
const geoIndex = (depth, [x, y], [targetX, targetY], map) => {
  // The region at 0,0 (the mouth of the cave) has a geologic index of 0.
  if (x === 0 && y === 0) return 0
  // The region at the coordinates of the target has a geologic index of 0.
  if (x === targetX && y === targetY) return 0
  // If the region's Y coordinate is 0, the geologic index is its X coordinate times 16807.
  if (y === 0) return x * 16807
  // If the region's X coordinate is 0, the geologic index is its Y coordinate times 48271.
  if (x === 0) return y * 48271
  // Otherwise, the region's geologic index is the result of multiplying the erosion levels of the regions at X-1,Y and X,Y-1.
  const x1y = map[y][x - 1][0]
  const xy1 = map[y - 1][x][0]
  return erosionLevel(depth, x1y) * erosionLevel(depth, xy1)
}

const scan = (depth, [x, y], [targetX, targetY], map) => {
  const g = geoIndex(depth, [x, y], [targetX, targetY], map)
  const e = erosionLevel(depth, g)
  return [
    g,
    e,
    type(e)
  ]
}

const scanCave = (depth, [targetX, targetY], distance = 0, map) => {
  // we are done if distance is > target
  if (distance > targetY && distance > targetY) return map
  if (!map) {
    map = []
    for (let y = 0; y <= targetY; y++) {
      map[y] = []
    }
  }
  // Scan all x coordinates of the current distance
  for (let x = 0; x <= targetX; x++) {
    map[distance][x] = scan(depth, [x, distance], [targetX, targetY], map)
  }
  // Scan all y coordinates of the current distance
  for (let y = 0; y <= targetY; y++) {
    map[y][distance] = scan(depth, [distance, y], [targetX, targetY], map)
  }
  // console.log(distance, map)
  // Go in one step further
  return scanCave(depth, [targetX, targetY], distance + 1, map)
}

/**
 * For the the rectangle that has a top-left corner of region 0,0 and a bottom-right corner of the region containing the target, add up the risk level of each individual region: 0 for rocky regions, 1 for wet regions, and 2 for narrow regions.
 */
const totalRisk = (map, [targetX, targetY]) => {
  let risk = 0
  for (let y = 0; y <= targetY; y++) {
    for (let x = 0; x <= targetX; x++) {
      const [, e] = map[y][x]
      risk += type(e)
    }
  }
  return risk
}

describe('Mode Maze', () => {
  describe('should solve the example', () => {
    const target = [10, 10]
    it('should scan the cave', () => {
      const map = scanCave(510, target)
      // At 0,0, the geologic index is 0. The erosion level is (0 + 510) % 20183 = 510. The type is 510 % 3 = 0, rocky.
      expect(map[0][0]).toEqual([0, 510, 0])
      // At 1,0, because the Y coordinate is 0, the geologic index is 1 * 16807 = 16807. The erosion level is (16807 + 510) % 20183 = 17317. The type is 17317 % 3 = 1, wet.
      expect(map[0][1]).toEqual([16807, 17317, 1])
      // At 0,1, because the X coordinate is 0, the geologic index is 1 * 48271 = 48271. The erosion level is (48271 + 510) % 20183 = 8415. The type is 8415 % 3 = 0, rocky.
      expect(map[1][0]).toEqual([48271, 8415, 0])
      // At 1,1, neither coordinate is 0 and it is not the coordinate of the target, so the geologic index is the erosion level of 0,1 (8415) times the erosion level of 1,0 (17317), 8415 * 17317 = 145722555. The erosion level is (145722555 + 510) % 20183 = 1805. The type is 1805 % 3 = 2, narrow.
      expect(map[1][1]).toEqual([145722555, 1805, 2])
      // At 10,10, because they are the target's coordinates, the geologic index is 0. The erosion level is (0 + 510) % 20183 = 510. The type is 510 % 3 = 0, rocky.
      expect(map[10][10]).toEqual([0, 510, 0])
    })
    it('should determine the risk', () => {
      // In the cave system above, because the mouth is at 0,0 and the target is at 10,10, adding up the risk level of all regions with an X coordinate from 0 to 10 and a Y coordinate from 0 to 10, this total is 114.
      expect(totalRisk(scanCave(510, target), target)).toEqual(114)
    })
  })

  it('should solve the puzzle', () => {
    const target = [10, 715]
    expect(totalRisk(scanCave(3339, target), target)).toEqual(7915)
  })
})
