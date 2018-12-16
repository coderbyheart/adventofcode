'use strict'

/* global describe, it, expect, safeRegion  */

const {parsePoints, movePoints, drawMap} = require('./day10')
const {readFileSync} = require('fs')
const input = readFileSync('./day10.txt', 'utf-8')
const solution = readFileSync('./day10.solution.txt', 'utf-8')

describe('stars alignment', () => {
  it('should parse the points', () => {
    expect(parsePoints([
      'position=< 3, 9> velocity=< 1, -2>'
    ])).toEqual([
      {x: 3, y: 9, vx: 1, vy: -2}
    ])
  })
  it('should move the points', () => {
    expect(movePoints(movePoints(movePoints(parsePoints([
      'position=< 3, 9> velocity=< 1, -2>'
    ]))))).toEqual([
      {x: 6, y: 3, vx: 1, vy: -2}
    ])
  })
  it('should draw the map', () => {
    expect(drawMap([
      {x: 0, y: 0}
    ]).join('\n')).toEqual(
      '#'
    )
    expect(drawMap([
      {x: 1, y: 1}
    ]).join('\n')).toEqual(
      '..\n' +
      '.#'
    )
    expect(drawMap([
      {x: 3, y: 2, vx: 1, vy: -2},
      {x: 6, y: 3, vx: 1, vy: -2}
    ]).join('\n')).toEqual(
      '.......\n' +
      '.......\n' +
      '...#...\n' +
      '......#'
    )
  })
  it('should draw the example map', () => {
    const points = parsePoints([
      'position=< 9,  1> velocity=< 0,  2>',
      'position=< 7,  0> velocity=<-1,  0>',
      'position=< 3, -2> velocity=<-1,  1>',
      'position=< 6, 10> velocity=<-2, -1>',
      'position=< 2, -4> velocity=< 2,  2>',
      'position=<-6, 10> velocity=< 2, -2>',
      'position=< 1,  8> velocity=< 1, -1>',
      'position=< 1,  7> velocity=< 1,  0>',
      'position=<-3, 11> velocity=< 1, -2>',
      'position=< 7,  6> velocity=<-1, -1>',
      'position=<-2,  3> velocity=< 1,  0>',
      'position=<-4,  3> velocity=< 2,  0>',
      'position=<10, -3> velocity=<-1,  1>',
      'position=< 5, 11> velocity=< 1, -2>',
      'position=< 4,  7> velocity=< 0, -1>',
      'position=< 8, -2> velocity=< 0,  1>',
      'position=<15,  0> velocity=<-2,  0>',
      'position=< 1,  6> velocity=< 1,  0>',
      'position=< 8,  9> velocity=< 0, -1>',
      'position=< 3,  3> velocity=<-1,  1>',
      'position=< 0,  5> velocity=< 0, -1>',
      'position=<-2,  2> velocity=< 2,  0>',
      'position=< 5, -2> velocity=< 1,  2>',
      'position=< 1,  4> velocity=< 2,  1>',
      'position=<-2,  7> velocity=< 2, -2>',
      'position=< 3,  6> velocity=<-1, -1>',
      'position=< 5,  0> velocity=< 1,  0>',
      'position=<-6,  0> velocity=< 2,  0>',
      'position=< 5,  9> velocity=< 1, -2>',
      'position=<14,  7> velocity=<-2,  0>',
      'position=<-3,  6> velocity=< 2, -1>'
    ])
    expect(drawMap(points).join('\n')).toEqual(
      '........#.............\n' +
      '................#.....\n' +
      '.........#.#..#.......\n' +
      '......................\n' +
      '#..........#.#.......#\n' +
      '...............#......\n' +
      '....#.................\n' +
      '..#.#....#............\n' +
      '.......#..............\n' +
      '......#...............\n' +
      '...#...#.#...#........\n' +
      '....#..#..#.........#.\n' +
      '.......#..............\n' +
      '...........#..#.......\n' +
      '#...........#.........\n' +
      '...#.......#..........'
    )
    expect(drawMap(movePoints(points)).join('\n')).toEqual(
      '........#....#....\n' +
      '......#.....#.....\n' +
      '#.........#......#\n' +
      '..................\n' +
      '....#.............\n' +
      '..##.........#....\n' +
      '....#.#...........\n' +
      '...##.##..#.......\n' +
      '......#.#.........\n' +
      '......#...#.....#.\n' +
      '#...........#.....\n' +
      '..#.....#.#.......'
    )
    expect(drawMap(movePoints(movePoints(movePoints(points)))).join('\n')).toEqual(
      '#...#..###\n' +
      '#...#...#.\n' +
      '#...#...#.\n' +
      '#####...#.\n' +
      '#...#...#.\n' +
      '#...#...#.\n' +
      '#...#...#.\n' +
      '#...#..###'
    )
  })
  it('should solve the puzzle', () => {
    let points = parsePoints(input.split('\n'))

    for (let i = 0; i <= 10458; i++) {
      points = movePoints(points)
    }
    expect(drawMap(points).join('\n')).toEqual(solution)
  })
})
