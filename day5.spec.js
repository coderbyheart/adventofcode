'use strict'

/* global describe, it, expect */

const reactUnits = (a, b) => {
  if (a === b) return false
  if (b === a.toUpperCase()) return true
  if (a === b.toUpperCase()) return true
  return false
}
const reactions = input => {
  let output = input
  for (let start = 0; start < input.length - 1; start++) {
    const end = chainReaction(output, start)
    if (end && start !== end) {
      const o = output.slice(0, start) + output.slice(end + 1, output.length)
      return reactions(o)
    }
  }
  return output
}

const chainReaction = (input, start, end = start + 1) => {
  if (input[end] === undefined) return start
  if (reactUnits(input[start], input[end])) {
    /*
    let next = chainReaction(input, end, end + 1)
    if (next) return next
    */
    return end
  }
  return false
}

describe('reactions', () => {
  it('should destroy aA', () => {
    expect(reactions('aA')).toEqual('')
  })
  it('should pass the example', () => {
    expect(reactions('dabAcCaCBAcCcaDA')).toEqual('dabCBAcaDA')
  })
})

describe('reactUnits', () => {
  it('should destroy aA', () => {
    expect(reactUnits('a', 'A')).toEqual(true)
  })
  it('should destroy Aa', () => {
    expect(reactUnits('A', 'a')).toEqual(true)
  })
  it('should not destroy AA', () => {
    expect(reactUnits('A', 'A')).toEqual(false)
  })
  it('should not destroy aa', () => {
    expect(reactUnits('a', 'a')).toEqual(false)
  })
  it('should not destroy Ab', () => {
    expect(reactUnits('A', 'b')).toEqual(false)
  })
})
