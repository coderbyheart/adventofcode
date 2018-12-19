'use strict'

const chalk = require('chalk')

const parseLevel = state => {
  const rows = state.split('\n').filter(l => l.length)
  const width = rows.reduce((max, line) => Math.max(line.length, max), 0)
  const height = rows.length
  const currentState = [
    ...rows.map(r => [...r])
  ]
  const nextState = [
    ...rows.map(r => [...r])
  ]
  const carts = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const m = (currentState[y][x] || '').match(/(?<dir>[\^v<>])/)
      if (m) {
        const { dir } = m.groups
        carts.push({
          dir, x, y, turn: 0
        })
        switch (dir) {
          case '^':
          case 'v':
            nextState[y][x] = '|'
            break
          case '<':
          case '>':
            nextState[y][x] = '-'
            break
        }
      }
    }
  }
  return {
    map: nextState,
    carts
  }
}

const renderMap = map => map.reduce((s, row) => s + row.join('').replace(/ +$/g, '') + '\n', '')

const renderMapAndCarts = (map, carts, colored = false) => {
  const width = map.reduce((max, line) => Math.max(line.length, max), 0)
  const height = map.length
  let r = []
  for (let y = 0; y < height; y++) {
    r[y] = []
    for (let x = 0; x < width; x++) {
      r[y][x] = colored ? chalk.gray(map[y][x] || '') : map[y][x] || ''
    }
  }
  carts.forEach(({ x, y, dir }) => {
    r[y][x] = colored ? chalk.green(dir) : dir
  })
  return renderMap(r)
}

const tick = (map, carts) => {
  const movedCarts = carts.map(cart => {
    let { dir, x, y, turn } = cart
    switch (dir) {
      case '^':
        y--
        break
      case 'v':
        y++
        break
      case '<':
        x--
        break
      case '>':
        x++
        break
    }
    const n = map[y][x]
    switch (n) {
      case '-':
      case '|':
        break
      case '+':
        switch (cart.turn) { // left, straight, right
          case 0:
            dir = turnLeft(dir)
            break
          case 1:
            // keep straight
            break
          case 2:
            dir = turnRight(dir)
            break
        }
        turn = (turn + 1) % 3
        break
      case '\\':
        switch (dir) {
          case '^':
            dir = '<'
            break
          case 'v':
            dir = '>'
            break
          case '>':
            dir = 'v'
            break
          case '<':
            dir = '^'
            break
        }
        break
      case '/':
        switch (dir) {
          case '^':
            dir = '>'
            break
          case 'v':
            dir = '<'
            break
          case '>':
            dir = '^'
            break
          case '<':
            dir = 'v'
            break
        }
        break
      default:
        throw Error('Off track!')
    }
    return { dir, x, y, turn }
  }).sort(({ y: y1 }, { y: y2 }) => y1 - y2)

  const crashed = movedCarts.filter(cart => movedCarts.find(cartn => cart !== cartn && cart.x === cartn.x && cart.y === cartn.y))
  if (crashed.length) throw new Crash(`Crash at ${crashed[0].x},${crashed[0].y}`, crashed[0].x, crashed[0].y)
  return movedCarts
}

const turnLeft = dir => {
  switch (dir) {
    case '^':
      return '<'
    case 'v':
      return '>'
    case '>':
      return '^'
    case '<':
      return 'v'
  }
}

const turnRight = dir => {
  switch (dir) {
    case '^':
      return '>'
    case 'v':
      return '<'
    case '>':
      return 'v'
    case '<':
      return '^'
  }
}

module.exports = {
  parseLevel,
  tick,
  renderMap,
  renderMapAndCarts
}

class Crash extends Error {
  constructor (msg, x, y) {
    super(msg)
    this.x = x
    this.y = y
    this.name = Crash.name
    Error.captureStackTrace(this, Crash)
    Object.setPrototypeOf(this, Crash.prototype)
  }
}
