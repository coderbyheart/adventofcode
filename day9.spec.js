'use strict'

const { Circle, getWinningScore } = require('./day9')

/* global describe, it, expect, safeRegion  */

describe('marble mania', () => {
  it('should calculate the winning score', () => {
    const c = new Circle(5)
    c.placeMarble()
    expect(c.currentMarble.n).toEqual(0)
    expect(c.marbles()).toEqual([0])
    c.placeMarble()
    expect(c.currentMarble.n).toEqual(1)
    expect(c.marbles()).toEqual([0, 1])
    c.placeMarble()
    expect(c.currentMarble.n).toEqual(2)
    expect(c.marbles()).toEqual([0, 2, 1])
    c.placeMarble()
    expect(c.currentMarble.n).toEqual(3)
    expect(c.marbles()).toEqual([0, 2, 1, 3])
    c.placeMarble()
    expect(c.currentMarble.n).toEqual(4)
    expect(c.marbles()).toEqual([0, 4, 2, 1, 3])
    for (let i = 0; i < 18; i++) {
      c.placeMarble()
    }
    expect(c.currentMarble.n).toEqual(22)
    expect(c.marbles()).toEqual([
      0, 16, 8, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15
    ])
    // Rule 23
    c.placeMarble()
    expect(c.currentMarble.n).toEqual(19)
    expect(c.marbles()).toEqual([
      0, 16, 8, 17, 4, 18, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15
    ])
    c.placeMarble()
    expect(c.currentMarble.n).toEqual(24)
    expect(c.marbles()).toEqual([
      0, 16, 8, 17, 4, 18, 19, 2, 24, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15
    ])
    c.placeMarble()
    expect(c.currentMarble.n).toEqual(25)
    expect(c.marbles()).toEqual([
      0, 16, 8, 17, 4, 18, 19, 2, 24, 20, 25, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15
    ])
    expect(c.winningScore()).toEqual(32)
  })
  it('should calculate the winning score for the examples', () => {
    expect(getWinningScore(10, 1618)).toEqual(8317)
    expect(getWinningScore(13, 7999)).toEqual(146373)
    expect(getWinningScore(17, 1104)).toEqual(2764)
    expect(getWinningScore(21, 6111)).toEqual(54718)
    expect(getWinningScore(30, 5807)).toEqual(37305)
  })
  it('should calculate the puzzle', () => {
    expect(getWinningScore(413, 71082)).toEqual(416424)
    expect(getWinningScore(413, 7108200)).toEqual(3498287922)
  })
})
