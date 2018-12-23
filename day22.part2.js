'use strict'

const distance = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2)

const go = (targetX, targetY, x, y, steps = []) => {
  // The regions with negative X or Y are solid rock and cannot be traversed.
  if (x < 0) return false
  if (y < 0) return false
  // We have reached the target
  if (x === targetX && y === targetY) {
    return steps
  }
  // Have we been there?
  const [prevX, prevY] = steps[steps.length - 1]
  if (x === prevX && y === prevY) return false
  // Are we closer to the target?
  const preDist = distance([prevX, prevY], [targetX, targetY])
  const dist = distance([x, y], [targetX, targetY])
  if (dist > preDist) return false
  // Go a step further
  const nextSteps = [
    go(targetX, targetY, x, y - 1, [...steps, [x, y]]),
    go(targetX, targetY, x, y + 1, [...steps, [x, y]]),
    go(targetX, targetY, x - 1, y, [...steps, [x, y]]),
    go(targetX, targetY, x + 1, y, [...steps, [x, y]])
  ]
  nextSteps.sort((s1, s2) => {
    const s1len = s1 ? s1.length : Number.MAX_SAFE_INTEGER
    const s2len = s2 ? s2.length : Number.MAX_SAFE_INTEGER
    return s1len - s2len
  })
  // This is the best route
  return nextSteps[0]
}

const findBestRoute = (targetX, targetY) => {
  const routes = [
    go(targetX, targetY, 1, 0, [[0, 0]]),
    // go(targetX, targetY, 0, 1, [[0, 0]])
  ]
  const map = []
  for (let y = 0; y <= targetY; y++) {
    map[y] = []
    for (let x = 0; x <= targetX; x++) {
      map[y][x] = '.'
    }
  }
  map[targetY][targetX] = 'T'
  for (const i in routes) {
    for (const j in routes[i]) {
      const [x, y] = routes[i][j]
      map[y][x] = String.fromCharCode(65 + parseInt(i, 10)).toLowerCase()
    }
  }
  console.log(map.reduce((map, row) => map + row.join('') + '\n', ''))
}
findBestRoute(10, 5)