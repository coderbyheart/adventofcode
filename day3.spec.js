'use strict'

/* global describe, it, expect */

const { overlappingPatches } = require('./day3')
const input = require('./day3.json')

describe('overlapping patches', () => {
  it('should calculate the number of overlapping patches', () => {
    expect(overlappingPatches([
      '#1 @ 1,3: 4x4',
      '#2 @ 3,1: 4x4',
      '#3 @ 5,5: 2x2'
    ])).toEqual(4)
  })
})
