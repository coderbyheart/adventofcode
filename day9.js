class Circle {
  constructor (numPlayers) {
    this.numPlayers = numPlayers
    this.scores = {}
    for (let i = 0; i < numPlayers; i++) {
      this.scores[i] = 0
    }
  }

  placeMarble () {
    if (this.currentMarble === undefined) {
      const marble = {n: 0}
      marble.next = marble
      marble.prev = marble
      this.currentMarble = marble
      this.firstMarble = marble
      this.placements = 0
    } else {
      const marbleToBePlacedValue = ++this.placements
      const currentPlayer = this.placements % this.numPlayers
      if (marbleToBePlacedValue % 23 === 0) {
        // However, if the marble that is about to be placed has a number which is a multiple of 23, something entirely different happens:
        // First, the current player keeps the marble they would have placed, adding it to their score.
        this.scores[currentPlayer] += marbleToBePlacedValue
        // In addition, the marble 7 marbles counter-clockwise from the current marble is removed from the circle
        let marbleToRemove = this.currentMarble
        for (let i = 0; i < 7; i++) {
          marbleToRemove = marbleToRemove.prev
        }
        marbleToRemove.prev.next = marbleToRemove.next
        // The marble located immediately clockwise of the marble that was removed becomes the new current marble.
        this.currentMarble = marbleToRemove.next
        // and also added to the current player's score.
        this.scores[currentPlayer] += marbleToRemove.n
      } else {
        const marble = {
          n: marbleToBePlacedValue,
          prev: this.currentMarble.next,
          next: this.currentMarble.next.next
        }
        this.currentMarble.next.next = marble
        this.currentMarble.next.next.next.prev = marble
        this.currentMarble = marble
      }
    }
  }

  marbles () {
    const marbles = []
    let marble = this.firstMarble
    do {
      marbles.push(marble.n)
      marble = marble.next
    } while (marble !== this.firstMarble)
    return marbles
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
