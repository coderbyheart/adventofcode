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
  const areas = makeAreas(coordinates)
  const countPerCoordinate = {}
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


module.exports = {
  makeAreas,
  maxArea,
  makeMap,
  distance
}
