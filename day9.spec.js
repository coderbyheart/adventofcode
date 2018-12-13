'use strict'

const {readFileSync} = require('fs')

/* global describe, it, expect, safeRegion  */

class Circle {
  constructor (numPlayers) {
    this.marbles = []
    this.numPlayers = numPlayers
    this.scores = {}
    for (let i = 0; i < numPlayers; i++) {
      this.scores[i] = 0
    }
  }

  placeMarble () {
    if (this.currentMarble === undefined) {
      this.currentMarble = 0
      this.placements = 0
      this.marbles.push(this.currentMarble)
    } else {
      const marbleToBePlaced = ++this.placements
      const currentPlayer = this.placements % this.numPlayers
      if (marbleToBePlaced % 23 === 0) {
        // However, if the marble that is about to be placed has a number which is a multiple of 23, something entirely different happens:
        // First, the current player keeps the marble they would have placed, adding it to their score.
        this.scores[currentPlayer] += marbleToBePlaced
        // In addition, the marble 7 marbles counter-clockwise from the current marble is removed from the circle
        let idx = (this.marbles.indexOf(this.currentMarble) - 7) % this.marbles.length
        // Correct negative offset
        if (idx < 0) {
          idx = this.marbles.length + idx
        }
        // The marble located immediately clockwise of the marble that was removed becomes the new current marble.
        this.currentMarble = this.marbles[(idx + 1) % this.marbles.length]
        // and also added to the current player's score.
        this.scores[currentPlayer] += this.marbles[idx]
        this.marbles.splice(idx, 1)
      } else {
        const idx = (this.marbles.indexOf(this.currentMarble) + 1) % this.marbles.length
        this.marbles.splice(idx + 1, 0, marbleToBePlaced)
        this.currentMarble = marbleToBePlaced
      }
    }
  }

  winningScore () {
    return Object.keys(this.scores).reduce((max, player) => this.scores[player] > max ? this.scores[player] : max, 0)
  }
}

const getWinningScore = (numPlayers, maxMarble) => {
  const g = new Circle(numPlayers)
  for (let i = 0; i <= maxMarble; i++) {
    g.placeMarble()
  }
  return g.winningScore()
}

describe('marble mania', () => {
  it('should calculate the winning score', () => {
    const c = new Circle(5)
    c.placeMarble()
    expect(c.currentMarble).toEqual(0)
    expect(c.marbles).toEqual([0])
    c.placeMarble()
    expect(c.currentMarble).toEqual(1)
    expect(c.marbles).toEqual([0, 1])
    c.placeMarble()
    expect(c.currentMarble).toEqual(2)
    expect(c.marbles).toEqual([0, 2, 1])
    c.placeMarble()
    expect(c.currentMarble).toEqual(3)
    expect(c.marbles).toEqual([0, 2, 1, 3])
    c.placeMarble()
    expect(c.currentMarble).toEqual(4)
    expect(c.marbles).toEqual([0, 4, 2, 1, 3])
    for (let i = 0; i < 18; i++) {
      c.placeMarble()
    }
    expect(c.currentMarble).toEqual(22)
    expect(c.marbles).toEqual([
      0, 16, 8, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15
    ])
    // Rule 23
    c.placeMarble()
    expect(c.currentMarble).toEqual(19)
    expect(c.marbles).toEqual([
      0, 16, 8, 17, 4, 18, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15
    ])
    c.placeMarble()
    expect(c.currentMarble).toEqual(24)
    expect(c.marbles).toEqual([
      0, 16, 8, 17, 4, 18, 19, 2, 24, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15
    ])
    c.placeMarble()
    expect(c.currentMarble).toEqual(25)
    expect(c.marbles).toEqual([
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
  })
})
