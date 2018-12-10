'use strict'

const { readFileSync } = require('fs');

/* global describe, it, expect, safeRegion  */

const parseStep = s => {
  const [, a, b] = s.match(/Step ([^ ]+) must be finished before step ([^ ]+) can begin\./)
  return [a, b]
}

const makeList = steps => steps.reduce((list, step) => {
  const [a, b] = parseStep(step)
  const nodeA = list.find(({step}) => step === a)
  const nodeB = list.find(({step}) => step === b)
  if (!nodeA) {
    list.push({step: a, depends: []})
  }
  if (!nodeB) {
    list.push({step: b, depends: [a]})
  } else {
    nodeB.depends.push(a)
  }
  return list
}, [])

const runList = (list, steps = '') => {
  if (!list.length) {
    return steps
  }
  let nextSteps
  if (!steps.length) {
    nextSteps = list.filter(({depends}) => depends.length === 0)
  } else {
    nextSteps = list.filter(({depends}) => depends.reduce((inSteps, dependsOn) => {
      if (inSteps === false) return inSteps
      return steps.includes(dependsOn)
    }, true))
  }
  nextSteps.sort(({step: s1}, {step: s2}) => s1 > s2 ? 1 : -1)
  const step = nextSteps[0]
  list.splice(list.indexOf(step), 1)
  return runList(list, `${steps}${step.step}`)
}

describe('parse step', () => {
  it('should parse steps', () => {
    expect(parseStep('Step C must be finished before step A can begin.')).toEqual(['C', 'A'])
    expect(parseStep('Step C must be finished before step F can begin.')).toEqual(['C', 'F'])
    expect(parseStep('Step A must be finished before step B can begin.')).toEqual(['A', 'B'])
    expect(parseStep('Step A must be finished before step D can begin.')).toEqual(['A', 'D'])
    expect(parseStep('Step B must be finished before step E can begin.')).toEqual(['B', 'E'])
    expect(parseStep('Step D must be finished before step E can begin.')).toEqual(['D', 'E'])
    expect(parseStep('Step F must be finished before step E can begin.')).toEqual(['F', 'E'])
  })
})

describe('build a linked list', () => {
  let l
  it('should convert to linked list', () => {
    l = makeList([
      'Step C must be finished before step A can begin.',
      'Step C must be finished before step F can begin.',
      'Step A must be finished before step B can begin.',
      'Step A must be finished before step D can begin.',
      'Step B must be finished before step E can begin.',
      'Step D must be finished before step E can begin.',
      'Step F must be finished before step E can begin.'
    ])
    expect(l).toHaveLength(6)
  })
  it('should solve the example', () => {
    expect(runList(l)).toEqual('CABDFE')
  })
  it('should solve the puzzle', () => {
    const input = readFileSync('./day7.txt', 'utf-8').split('\n')
    expect(runList(makeList(input))).toEqual('CABDFE')
  })
})