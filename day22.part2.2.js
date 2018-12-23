'use strict'

const distance = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2)

const go = (map, targetX, targetY, x, y, steps = []) => {
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
  const nextSteps = []
  // down
  if (map[y + 1] && map[y + 1] && map[y + 1][x].reachable) {
    nextSteps.push([x, y + 1])
  }
  // up
  if (map[y - 1] && map[y - 1][x] && map[y - 1][x].reachable) {
    nextSteps.push([x, y - 1])
  }
  // left
  if (map[y] && map[y][x - 1] && map[y][x - 1].reachable) {
    nextSteps.push([x - 1, y])
  }
  // up
  if (map[y] && map[y][x + 1] && map[y][x + 1].reachable) {
    nextSteps.push([x + 1, y])
  }
  /*
  nextSteps.sort((s1, s2) => {
    const s1len = s1 ? s1.length : Number.MAX_SAFE_INTEGER
    const s2len = s2 ? s2.length : Number.MAX_SAFE_INTEGER
    return s1len - s2len
  })
  */
  // This is the best route
  return nextSteps
}

const findBestRoute = (targetX, targetY) => {
  const map = []
  const maxRadius = distance([0, 0], [targetX, targetY])
  // Find connected tiles
  for (let radius = 1; radius <= maxRadius; radius++) {
    for (let y = targetY - radius; y < targetY + radius; y++) {
      if (y < 0) continue
      if (!map[y]) {
        map[y] = []
      }
      for (let x = targetX - radius; x < targetX + radius; x++) {
        if (x < 0) continue
        if (map[y][x] && map[y][x].reachable) continue // Already measured
        // Can the target be reached from this coordinate?
        if (
          (x === targetX && y + 1 === targetY) ||// down
          (x === targetX && y - 1 === targetY) ||// up
          (x - 1 === targetX && y === targetY) ||// left
          (x + 1 === targetX && y === targetY) // right
        ) {
          map[y][x] = {
            reachable: true,
            radius,
            next: [targetX, targetY]
          }
          // Can a step towards the target be reached
        } else if (map[y + 1] && map[y + 1][x] && map[y + 1][x].reachable) {
          // down
          map[y][x] = {
            reachable: true,
            radius,
            next: [x, y + 1]
          }
        } else if (map[y - 1] && map[y - 1][x] && map[y - 1][x].reachable) {
          // up
          map[y][x] = {
            reachable: true,
            radius,
            next: [x, y - 1]
          }
        } else if (map[y] && map[y][x + 1] && map[y][x + 1].reachable) {
          // right
          map[y][x] = {
            reachable: true,
            radius,
            next: [x + 1, y]
          }
        } else if (map[y] && map[y][x - 1] && map[y][x - 1].reachable) {
          // left
          map[y][x] = {
            reachable: true,
            radius,
            next: [x - 1, y]
          }
        } else {
          map[y][x] = {
            reachable: false
          }
        }
      }
    }
  }
  map[0][0] = 'E'
  map[targetY][targetX] = 'T'

  const routes = [
    go(map, targetX, targetY, 1, 0, [[0, 0]]),
    go(map, targetX, targetY, 0, 1, [[0, 0]])
  ]
  console.log(routes)

  console.log(map.reduce((map, row) => map + row.map(c => c.reachable ? String.fromCharCode(65 + c.radius).toLowerCase() : '.').join('') + '\n', ''))
}

findBestRoute(10, 10)
