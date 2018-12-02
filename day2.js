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

const compareIds = (id1, id2) => {
  const id1l = id1.split('')
  const id2l = id2.split('')
  const matches = [...id1l]
  let differences = 0
  for (let i = 0; i < id1l.length; i++) {
    const c1 = id1l[i]
    const c2 = id2l[i]
    if (c1 !== c2) {
      differences++
      delete matches[i]
    }
  }
  if (differences === 1) return matches.join('')
}

const findMatch = ids => {
  for (let i = 0; i < ids.length; i++) {
    for (let j = 0; j < ids.length; j++) {
      if (i === j) continue
      const id1 = ids[i]
      const id2 = ids[j]
      const match = compareIds(id1, id2)
      if (match) return match
    }
  }
}

module.exports = {
  checksum,
  findMatch
}
