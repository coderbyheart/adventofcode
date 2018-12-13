'use strict'

const {readFileSync} = require('fs')

/* global describe, it, expect, safeRegion  */

const parseTree = (sequence, parent, tree = []) => {
  const node = {
    childNodes: sequence.shift(),
    metadataEntries: sequence.shift(),
    // parent,
    metadata: []
  }
  tree.push(node)
  if (node.childNodes) {
    for (let i = 0; i < node.childNodes; i++) {
      parseTree(sequence, node, tree)
    }
  }
  if (node.metadataEntries) {
    for (let i = 0; i < node.metadataEntries; i++) {
      node.metadata.push(sequence.shift())
    }
  }
  return {
    tree,
    sequence
  }
}

const metadataSum = sequence => parseTree(sequence.split(' ').map(n => +n)).tree.reduce((sum, node) => sum + node.metadata.reduce((sum, v) => sum + v, 0), 0)

describe('tree parser', () => {
  it('should parse test sequences', () => {
    const {tree} = parseTree('0 0'.split(' ').map(n => +n))
    expect(tree).toHaveLength(1)
  })
  it('should parse test sequences', () => {
    const {tree} = parseTree('0 1 2'.split(' ').map(n => +n))
    expect(tree).toHaveLength(1)
  })
  it('should parse test sequences', () => {
    const {tree} = parseTree('1 0 0 0 1 2'.split(' ').map(n => +n))
    expect(tree).toHaveLength(2)
  })
  it('should parse test sequences', () => {
    const {tree} = parseTree('1 0 1 0 0 0 1 2'.split(' ').map(n => +n))
    expect(tree).toHaveLength(3)
  })
  it('should parse test sequences', () => {
    const {tree} = parseTree('1 1 0 0 4 1 2'.split(' ').map(n => +n))
    expect(tree).toHaveLength(2)
    expect(tree[0].metadata).toEqual([4])
  })
  it('should parse test sequences', () => {
    const {tree} = parseTree('1 1 0 2 5 6 4 1 2'.split(' ').map(n => +n))
    expect(tree).toHaveLength(2)
    expect(tree[0].metadata).toEqual([4])
    expect(tree[1].metadata).toEqual([5, 6])
  })
  it('should parse the example sequence', () => {
    const {tree} = parseTree('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.split(' ').map(n => +n))
    expect(tree).toHaveLength(4)
  })

})
describe('metadataSum', () => {
  it('should sum the example sequence', () => {
    expect(metadataSum('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2')).toEqual(138)
  })
  it('should sum the puzzle sequence', () => {
    expect(metadataSum(readFileSync('./day8.txt', 'utf-8'))).toEqual(138)
  })
})
