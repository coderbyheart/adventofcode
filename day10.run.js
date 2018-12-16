'use strict'

const {parsePoints, movePoints, drawMap} = require('./day10')
const {readFileSync} = require('fs')
const input = readFileSync('./day10.txt', 'utf-8')

let points = parsePoints(input.split('\n'))

let size = Number.MAX_SAFE_INTEGER

for(let i = 0; i <= 10458; i++) {
  points = movePoints(points)
}

const render = (i = 0) => {
  const map = drawMap(points)
  const newSize = map[0].length * map.length
  points = movePoints(points)
  if (size >= newSize) {
    console.log(i, newSize)
    size = newSize
    setTimeout(() => render(i + 1))
  }
}

// render()

const map = drawMap(points)
console.log(map.join('\n') + '\n')