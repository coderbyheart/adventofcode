'use strict'

const {parseLevel, tick, renderMapAndCarts} = require('./day13')

const {readFileSync} = require('fs')
const input = readFileSync('./day13.txt', 'utf-8')

let {map, carts} = parseLevel(input)
do {
  carts = tick(map, carts)
  console.log(renderMapAndCarts(map, carts))
} while (true)