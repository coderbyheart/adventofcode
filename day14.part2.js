'use strict'

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

let [s, e] = makeRecipes([3, 7])
let idx
do {
  idx = s.join('').indexOf('323081')
  const r = makeRecipes(s, e)
  s = r[0]
  e = r[1]
} while (idx === -1)

console.log(idx)
