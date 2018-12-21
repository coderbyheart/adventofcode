'use strict'

const addr = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) + (reg[B] || 0)
  return reg
}
const addi = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) + B
  return reg
}
const mulr = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) * (reg[B] || 0)
  return reg
}
const muli = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) * B
  return reg
}
const banr = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) & (reg[B] || 0)
  return reg
}
const bani = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) & B
  return reg
}
const borr = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) | (reg[B] || 0)
  return reg
}
const bori = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) | B
  return reg
}
const setr = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0)
  return reg
}
const seti = (A, B, C, reg) => {
  reg[C] = A
  return reg
}
const gtir = (A, B, C, reg) => {
  reg[C] = A > (reg[B] || 0) ? 1 : 0
  return reg
}
const gtri = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) > B ? 1 : 0
  return reg
}
const gtrr = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) > (reg[B] || 0) ? 1 : 0
  return reg
}
const eqir = (A, B, C, reg) => {
  reg[C] = A === (reg[B] || 0) ? 1 : 0
  return reg
}
const eqri = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) === B ? 1 : 0
  return reg
}
const eqrr = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) === (reg[B] || 0) ? 1 : 0
  return reg
}

const opcodes = {
  'addr': addr,
  'addi': addi,
  'mulr': mulr,
  'muli': muli,
  'banr': banr,
  'bani': bani,
  'borr': borr,
  'bori': bori,
  'setr': setr,
  'seti': seti,
  'gtir': gtir,
  'gtri': gtri,
  'gtrr': gtrr,
  'eqir': eqir,
  'eqri': eqri,
  'eqrr': eqrr
}

const equals = (a, b) => a.length === b.length && a.reduce((equal, v, k) => equal ? v === b[k] : equal, true)

const findMatchingOpcodes = (before, [A, B, C], after) => Object.keys(opcodes).filter(opcode => equals(opcodes[opcode](A, B, C, [...before]), after)).sort((a, b) => a > b ? 1 : -1)

const findOpcodeNumbers = input => {
  // Count how often they are matched
  const opcodeMatches = input
    .split('\n\n')
    .filter(s => /^Before:/.test(s))
    .map(s => {
      const [before, opWithInput, after] = s.split('\n')
      const op = JSON.parse(`[${opWithInput.replace(/ /g, ',')}]`)
      const [opNumber, ...values] = op
      return [
        opNumber,
        findMatchingOpcodes(
          JSON.parse(before.replace(/Before: /, '')),
          values,
          JSON.parse(after.replace(/After: /, ''))
        )
      ]
    })
  const opStats = opcodeMatches
    .reduce((opStats, [opNumber, matches]) => {
      if (!opStats[opNumber]) {
        opStats[opNumber] = {}
      }
      matches.forEach(match => {
        if (!opStats[opNumber][match]) {
          opStats[opNumber][match] = 1
        } else {
          opStats[opNumber][match]++
        }
      })
      return opStats
    }, {})
  return flattenOpStats(opStats)
}

// Figure out which number is which op by exclusion
const flattenOpStats = (opStats, opNumbers = {}) => {
  // we are done if all are of length 0
  if (Object.keys(opStats).filter(key => Object.keys(opStats[key]).length === 0).length === Object.keys(opStats).length) {
    return opNumbers
  }
  // Find the opStats which only have one candidate left
  const onlyOneMatch = Object.keys(opStats)
    .filter(key => Object.keys(opStats[key]).length === 1)
    .reduce((opNumbers, opCode) => {
      opNumbers[opCode] = Object.keys(opStats[opCode])[0]
      return opNumbers
    }, {})
  // remove the known ops from the opStats
  Object.keys(opStats).forEach(key => {
    Object.keys(onlyOneMatch).forEach(knownOp => {
      delete opStats[key][onlyOneMatch[knownOp]]
    })
  })
  return flattenOpStats(opStats, {
    ...opNumbers,
    ...onlyOneMatch
  })
}

module.exports = {
  addr,
  addi,
  mulr,
  muli,
  banr,
  bani,
  borr,
  bori,
  setr,
  seti,
  gtir,
  gtri,
  gtrr,
  eqir,
  eqri,
  eqrr,
  opcodes,
  findMatchingOpcodes,
  flattenOpStats,
  findOpcodeNumbers,
  equals
}
