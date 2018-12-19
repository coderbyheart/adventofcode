'use strict'

/* global describe, it, expect  */

const makeRecipes = (scoreBoard, elves = [0, 1]) => {
  const e1Score = scoreBoard[elves[0]]
  const e2Score = scoreBoard[elves[1]]
  const c = e1Score + e2Score
  if (c >= 10) {
    scoreBoard.push(Math.floor(c / 10))
    scoreBoard.push(c % 10)
  } else {
    scoreBoard.push(c)
  }
  return [
    scoreBoard,
    [
      (elves[0] + 1 + e1Score) % (scoreBoard.length),
      (elves[1] + 1 + e2Score) % (scoreBoard.length)
    ]
  ]
}

describe('Chocolate Charts', () => {
  it('should solve the example', () => {
    const [scoreBoard, elves1] = makeRecipes([3, 7])
    expect(scoreBoard.join('')).toEqual('3710')

    const [scoreBoard2, elves2] = makeRecipes(scoreBoard, elves1)
    expect(scoreBoard2.join('')).toEqual('371010')

    const [scoreBoard3, elves3] = makeRecipes(scoreBoard2, elves2)
    expect(scoreBoard3.join('')).toEqual('3710101')

    const [scoreBoard4] = makeRecipes(scoreBoard3, elves3)
    expect(scoreBoard4.join('')).toEqual('37101012')

    let [s9, e9] = makeRecipes([3, 7])
    do {
      const r = makeRecipes(s9, e9)
      s9 = r[0]
      e9 = r[1]
    } while (s9.length < 2028)
    expect(s9.join('').substr(9, 10)).toEqual('5158916779')
    expect(s9.join('').substr(5, 10)).toEqual('0124515891')
    expect(s9.join('').substr(2018, 10)).toEqual('5941429882')
  })
  it('should solve the puzzle', () => {
    let [s, e] = makeRecipes([3, 7])
    do {
      const r = makeRecipes(s, e)
      s = r[0]
      e = r[1]
    } while (s.length < 323081 + 10)
    expect(s.join('').substr(323081, 10)).toEqual('7162937112')
  })
})
