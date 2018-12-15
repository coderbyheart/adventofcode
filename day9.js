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

module.exports = {
  getWinningScore,
  Circle
}
