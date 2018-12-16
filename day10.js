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

const drawMap = (points, scale = 1) => {
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
  const height = Math.ceil((maxY + offsetY + 1) * scale)
  const width = Math.ceil((maxX + offsetX + 1) * scale)
  const map = []
  for (let y = 0; y < height; y++) {
    map[y] = '.'.repeat(width)
  }
  points.forEach(({x, y}) => {
    const mapY = Math.floor((y + offsetY) * scale)
    const mapX = Math.floor((x + offsetX) * scale)
    map[mapY] = map[mapY].substr(0, mapX) + '#' + map[mapY].substr(mapX + 1)
  })
  return map
}

module.exports = {
  parsePoints,
  movePoints,
  drawMap
}
