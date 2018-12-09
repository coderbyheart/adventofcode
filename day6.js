'use strict'

const distance = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2)

const makeMap = coordinates => {
  const [maxX, maxY] = [
    coordinates.reduce((max, [x]) => {
      if (x > max) return x
      return max
    }, 0),
    coordinates.reduce((max, [_, y]) => {
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

  coordinates.forEach(([x, y], idx) => {
    map[y][x] = idx + 1
  })
  return map
}

const makeAreas = coordinates => {
  const map = makeMap(coordinates)
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      const distances = coordinates.reduce((distances, [cx, cy], i) => {
        const d = distance([x, y], [cx, cy])
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
  const notInfinite = countAreas(coordinates)
  return notInfinite[Object.keys(notInfinite).sort((c1, c2) => notInfinite[c2] - notInfinite[c1])[0]]
}

const countAreas = coordinates => {
  const areas = makeAreas(coordinates)
  const countPerCoordinate = {}
  const maxX = areas[0].length - 1
  const maxY = areas.length - 1
  const infiniteAreas = {}
  for (let y = 0; y < areas.length; y++) {
    for (let x = 0; x < areas[0].length; x++) {
      // Do not count areas with infinite reach (= those at the edges)
      if (y === 0 || x === 0 || y === maxY || x === maxX) {
        infiniteAreas[areas[y][x]] = true
      }
      if (!countPerCoordinate[areas[y][x]]) {
        countPerCoordinate[areas[y][x]] = 1
      } else {
        countPerCoordinate[areas[y][x]]++
      }
    }
  }
  return Object.keys(countPerCoordinate).reduce((cMap, c) => {
    if (+c === 0) return cMap
    if (infiniteAreas[c]) return cMap
    cMap[c] = countPerCoordinate[c]
    return cMap
  }, {})
}

const safeRegion = (coordinates, max = 32) => {
  const map = makeMap(coordinates)
  let safeRegions = 0
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      let total = 0
      for (let i = 0; i < coordinates.length; i++) {
        total += distance([x, y], [coordinates[i][0], coordinates[i][1]])
      }
      if (total < max) safeRegions++
    }
  }
  return safeRegions
}

module.exports = {
  makeAreas,
  maxArea,
  makeMap,
  distance,
  countAreas,
  safeRegion
}
