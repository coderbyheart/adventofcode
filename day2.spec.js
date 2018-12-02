'use strict'

/* global describe, it, expect */

const { checksum, findMatch } = require('./day2')
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

  it('should calculate the right checksum', () => {
    expect(checksum(input)).toEqual(8892)
  })
})

describe('matching ids', () => {
  it('should find the matching part of the ids', () => {
    expect(findMatch([
      'abcde',
      'fghij',
      'klmno',
      'pqrst',
      'fguij',
      'axcye',
      'wvxyz'
    ])).toEqual('fgij')
  })

  it('should calculate the solution', () => {
    expect(findMatch(input)).toEqual('zihwtxagifpbsnwleydukjmqv')
  })
})
