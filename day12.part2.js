'use strict'

const {subsus, sumGen} = require('./day12')

const initialState = '##.#.#.##..#....######..#..#...#.#..#.#.#..###.#.#.#..#..###.##.#..#.##.##.#.####..##...##..#..##.#.'
const notes = [
  '...## => #',
  '#.#.# => #',
  '.###. => #',
  '#.#.. => .',
  '.#..# => #',
  '#..#. => #',
  '..##. => .',
  '....# => .',
  '#.... => .',
  '###.. => #',
  '.#### => #',
  '###.# => .',
  '#..## => #',
  '..... => .',
  '##.## => #',
  '####. => .',
  '##.#. => .',
  '#...# => .',
  '##### => .',
  '..#.. => .',
  '.#.#. => .',
  '#.### => .',
  '.##.# => .',
  '..#.# => .',
  '.#.## => #',
  '...#. => .',
  '##... => #',
  '##..# => #',
  '.##.. => .',
  '.#... => #',
  '#.##. => #',
  '..### => .'
].map(n => n.match(/(?<pattern>[.#]{5}) => (?<result>[.#])/).groups)
let res = {pot0: 0, pots: initialState}
let lastResults = [res]
for (let i = 1; i <= 10000; i++) {
  res = subsus(res.pot0, res.pots, notes)
  lastResults.push(res)
  console.log(res.pots)
  if (lastResults.length > 10) lastResults.shift()
  if (lastResults.reduce((same, {pots}, k) => k > 0 ? (same ? lastResults[k - 1].pots === pots : false) : true) === true) {
    console.log(sumGen({
      pots: lastResults[0].pots,
      pot0: 50000000000 - i + res.pot0
    }))
    break
  }
}