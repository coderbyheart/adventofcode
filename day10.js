const parsePoints = points => points.map(
  p => {
    const groups = p.match(/position=< *(?<x>-?[0-9]+), *(?<y>-?[0-9]+)> velocity=< *(?<vx>-?[0-9]+), *(?<vy>-?[0-9]+)>/).groups
    return {
      x: parseInt(groups.x, 10),
      y: parseInt(groups.y, 10),
      vx: parseInt(groups.vx, 10),
      vy: parseInt(groups.vy, 10)
    }
  }
)

const movePoints = points => points.map(({x, y, vx, vy}) => ({
  x: x + vx,
  y: y + vy,
  vx,
  vy
}))

const drawMap = points => {
  const [minX, minY, maxX, maxY] = [
    points.reduce((min, {x}) => {
      if (x < min) return x
      return min
    }, Number.MAX_SAFE_INTEGER),
    points.reduce((min, {y}) => {
      if (y < min) return y
      return min
    }, Number.MAX_SAFE_INTEGER),
    points.reduce((max, {x}) => {
      if (x > max) return x
      return max
    }, 0),
    points.reduce((max, {y}) => {
      if (y > max) return y
      return max
    }, 0)
  ]
  const offsetX = minX < 0 ? Math.abs(minX) : 0
  const offsetY = minY < 0 ? Math.abs(minY) : 0
  const map = []
  for (let y = 0; y <= maxY + offsetY; y++) {
    map[y] = []
    for (let x = 0; x <= maxX + offsetX; x++) {
      map[y][x] = '.'
    }
  }
  points.forEach(({x, y}) => {
    const mapY = y + offsetY
    const mapX = x + offsetX
    map[mapY][mapX] = '#'
  })
  let flattened = ''
  map.forEach(row => {
    flattened += row.join('') + '\n'
  })
  return flattened
}

module.exports = {
  parsePoints,
  movePoints,
  drawMap
}
