'use strict'

/* global describe, it, expect */

const { checksum } = require('./day2')
const input = require('./day2.json')

describe('parcel checksum', () => {
  it('should calculate the right checksum', () => {
    expect(checksum([
      'abcdef',
      'bababc',
      'abbcde',
      'abcccd',
      'aabcdd',
      'abcdee',
      'ababab'
    ])).toEqual(12)
  })
})
