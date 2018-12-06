'use strict'

/* global describe, it, expect */

const { readFileSync } = require('fs')

const polymer = readFileSync('./polymer.txt', 'utf-8')

const reactUnits = (a, b) => {
  if (a === b) return false
  if (b === a.toUpperCase()) return true
  return a === b.toUpperCase()
}
const reactions = input => {
  let output = input
  let reacted
  do {
    reacted = false
    for (let start = 0; start < output.length - 1; start++) {
      const react = reactUnits(output[start], output[start + 1])
      if (react) {
        output = output.slice(0, start) + output.slice(start + 2, output.length)
        reacted = true
        break
      }
    }
  } while (reacted)
  return output
}

const multipassReactions = input => {
  let best = input
  for (let i = 65; i < 91; i++) {
    const c = String.fromCharCode(i)
    console.log(c)
    const r = reactions(input.replace(new RegExp(c, 'ig'), ''))
    if (r.length < best.length) {
      best = r
    }
  }
  return best
}

describe('reactions', () => {
  it('should destroy aA', () => {
    expect(reactions('aA')).toEqual('')
  })
  it('should pass the example', () => {
    expect(reactions('dabAcCaCBAcCcaDA')).toEqual('dabCBAcaDA')
  })
  it('should calculate the solution', () => {
    expect(reactions(polymer)).toHaveLength(11636)
  })
})

describe('shortest', () => {
  it('should pass the example', () => {
    expect(multipassReactions('dabAcCaCBAcCcaDA')).toEqual('daDA')
  })
  it.only('should calculate the solution', () => {
    expect(multipassReactions(polymer)).toHaveLength(11636)
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
