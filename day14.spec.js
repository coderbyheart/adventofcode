'use strict'

/* global describe, it, expect  */

const makeRecipes = (scoreBoard, elves = [0, 1]) => {
  const e1Score = +scoreBoard[elves[0]]
  const e2Score = +scoreBoard[elves[1]]
  const c = e1Score + e2Score
  const newScoreboard = `${scoreBoard}${c}`
  return [
    newScoreboard,
    [
      (elves[0] + 1 + e1Score) % (newScoreboard.length),
      (elves[1] + 1 + e2Score) % (newScoreboard.length)
    ]
  ]
}

describe('Chocolate Charts', () => {
  it('should solve the example', () => {
    const [scoreBoard, elves1] = makeRecipes('37')
    expect(scoreBoard).toEqual('3710')

    const [scoreBoard2, elves2] = makeRecipes(scoreBoard, elves1)
    expect(scoreBoard2).toEqual('371010')

    const [scoreBoard3, elves3] = makeRecipes(scoreBoard2, elves2)
    expect(scoreBoard3).toEqual('3710101')

    const [scoreBoard4] = makeRecipes(scoreBoard3, elves3)
    expect(scoreBoard4).toEqual('37101012')

    let [s9, e9] = makeRecipes('37')
    do {
      const r = makeRecipes(s9, e9)
      s9 = r[0]
      e9 = r[1]
    } while (s9.length < 2028)
    expect(s9.substr(9, 10)).toEqual('5158916779')
    expect(s9.substr(5, 10)).toEqual('0124515891')
    expect(s9.substr(2018, 10)).toEqual('5941429882')
  })
  it('should solve the puzzle', () => {
    let [s, e] = makeRecipes('37')
    do {
      const r = makeRecipes(s, e)
      s = r[0]
      e = r[1]
    } while (s.length < 323081 + 10)
    expect(s.substr(323081, 10)).toEqual('7162937112')
  })
})
