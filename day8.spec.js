'use strict'

const {readFileSync} = require('fs')

/* global describe, it, expect, safeRegion  */

const input = readFileSync('./day8.txt', 'utf-8');

const parseTree = (sequence, parent, tree = []) => {
  const node = {
    childNodes: sequence.shift(),
    metadataEntries: sequence.shift(),
    children: [],
    metadata: []
  }
  tree.push(node)
  if (node.childNodes) {
    for (let i = 0; i < node.childNodes; i++) {
      node.children.push(parseTree(sequence, node, tree))
    }
  }
  if (node.metadataEntries) {
    for (let i = 0; i < node.metadataEntries; i++) {
      node.metadata.push(sequence.shift())
    }
  }
  if (parent) return node
  return tree
}

const metadataSum = sequence => parseTree(sequence.split(' ').map(n => +n)).reduce((sum, node) => sum + node.metadata.reduce((sum, v) => sum + v, 0), 0)

const rootNodeSum = sequence => {
  const tree = parseTree(sequence.split(' ').map(n => +n))
  return summarizeNode(tree[0])
}

const summarizeNode = (node) => {
  if (node.childNodes === 0) {
    return node.metadata.reduce((sum, v) => sum + v, 0)
  }
  return node.metadata.reduce((sum, i) => {
    if (i === 0) return sum
    if (!node.children[i - 1]) return sum
    return sum + summarizeNode(node.children[i - 1])
  }, 0)
}

describe('tree parser', () => {
  it('should parse test sequences', () => {
    const tree = parseTree('0 0'.split(' ').map(n => +n))
    expect(tree).toHaveLength(1)
  })
  it('should parse test sequences', () => {
    const tree = parseTree('0 1 2'.split(' ').map(n => +n))
    expect(tree).toHaveLength(1)
  })
  it('should parse test sequences', () => {
    const tree = parseTree('1 0 0 0 1 2'.split(' ').map(n => +n))
    expect(tree).toHaveLength(2)
  })
  it('should parse test sequences', () => {
    const tree = parseTree('1 0 1 0 0 0 1 2'.split(' ').map(n => +n))
    expect(tree).toHaveLength(3)
  })
  it('should parse test sequences', () => {
    const tree = parseTree('1 1 0 0 4 1 2'.split(' ').map(n => +n))
    expect(tree).toHaveLength(2)
    expect(tree[0].metadata).toEqual([4])
  })
  it('should parse test sequences', () => {
    const tree = parseTree('1 1 0 2 5 6 4 1 2'.split(' ').map(n => +n))
    expect(tree).toHaveLength(2)
    expect(tree[0].metadata).toEqual([4])
    expect(tree[1].metadata).toEqual([5, 6])
  })
  it('should parse the example sequence', () => {
    const tree = parseTree('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.split(' ').map(n => +n))
    expect(tree).toHaveLength(4)
  })

})
describe('metadataSum', () => {
  it('should sum the example sequence', () => {
    expect(metadataSum('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2')).toEqual(138)
  })
  it('should sum the puzzle sequence', () => {
    expect(metadataSum(input)).toEqual(36627)
  })
})

describe('rootNodeSum', () => {
  it('should calculate the example sequence', () => {
    expect(rootNodeSum('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2')).toEqual(66)
  })
  it('should calculate the puzzle sequence', () => {
    expect(rootNodeSum(input)).toEqual(16695)
  })
})
