'use strict'

const { parsePoints, movePoints, drawMap } = require('./day10')
const { readFileSync } = require('fs')
const input = readFileSync('./day10.txt', 'utf-8')

let points = parsePoints(input.split('\n'))

for (let i = 0; i <= 10458; i++) {
  points = movePoints(points)
}

const map = drawMap(points)
console.log(map.join('\n') + '\n')
