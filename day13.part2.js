'use strict'

const { parseLevel, tick } = require('./day13')

const { readFileSync } = require('fs')
const input = readFileSync('./day13.txt', 'utf-8')

let { map, carts } = parseLevel(input)
let i = 0

const NS_PER_SEC = 1e9
let start = process.hrtime()
const benchEvery = 10000000
do {
  carts = tick(map, carts, true)
  if (++i % benchEvery === 0) {
    console.log(i)
    const diff = process.hrtime(start)
    console.log(`${Math.round((diff[0] * NS_PER_SEC + diff[1]) / benchEvery)}ns / tick`)
    start = process.hrtime()
  }
} while (true)
