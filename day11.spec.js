'use strict'

/* global describe, it, expect  */

const {fuelAt, fullestCellWithGrid, fullestCell} = require('./day11')

describe('chronal charge', () => {
  it('should calculate the example', () => {
    expect(fuelAt(3, 5, 8)).toEqual(4)
    expect(fuelAt(122, 79, 57)).toEqual(-5)
    expect(fuelAt(217, 196, 39)).toEqual(0)
    expect(fuelAt(101, 153, 71)).toEqual(4)
  })
  it('should find the example fuel cell', () => {
    expect(fullestCellWithGrid(18)).toMatchObject({x: 33, y: 45, power: 29})
    expect(fullestCellWithGrid(42)).toMatchObject({x: 21, y: 61, power: 30})
  })
  it('should solve the puzzle', () => {
    expect(fullestCellWithGrid(9306)).toMatchObject({power: 30, x: 235, y: 38})
  })
})

describe('chronal charge part 2', () => {
  it('should find the example fuel cell', () => {
    expect(fullestCell(18)).toEqual({x: 90, y: 269, power: 113, size: 16})
    expect(fullestCell(18)).toEqual({x: 232, y: 251, power: 119, size: 12})
  })
})