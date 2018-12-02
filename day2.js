'use strict'

const matchRepeatingLetters = (numLetters, ids) => ids.reduce((count, id) => {
  const match = id.split('').sort().join('').match(/([a-z])\1+/g)
  if (match) {
    for (let seq in match) {
      if (match[seq].length === numLetters) return count + 1
    }
  }
  return count
}, 0)

const checksum = ids => {
  const idsWithTwoLetters = matchRepeatingLetters(2, ids)
  const idsWithThreeLetters = matchRepeatingLetters(3, ids)

  return idsWithTwoLetters * idsWithThreeLetters
}

module.exports = {
  checksum
}
