'use strict'

const subsus = (pot0, initialState, notes) => {
  const startState = `.....${initialState}.....`
  const pots = notes.reduce((newState, {pattern, result}) => {
    let idx = -1
    do {
      idx = startState.indexOf(pattern, idx + 1)
      if (idx > -1) {
        newState = newState.substr(0, idx + 2) + result + newState.substr(idx + 3)
      }
    } while (idx > -1)
    return newState
  }, '.'.repeat(startState.length))

  const newPot0 = pot0 + pots.match(/^\.+/g)[0].length - 5

  return {
    pot0: newPot0,
    pots: pots.replace(/^\.+/g, '').replace(/\.+$/g, '')
  }
}

const sumGen = ({pot0, pots}) => pots.split('').reduce((sum, pot, index) => sum + (pot === '#' ? index + pot0 : 0), 0)

module.exports = {
  subsus,
  sumGen
}