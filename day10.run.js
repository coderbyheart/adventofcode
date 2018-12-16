'use strict'

const {parsePoints, movePoints, drawMap} = require('./day10')
const {readFileSync} = require('fs')
const input = readFileSync('./day10.txt', 'utf-8');

let points = parsePoints(input.split('\n'))

const render = () => {
  console.log(drawMap(points))
}

render()