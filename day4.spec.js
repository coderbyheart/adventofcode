'use strict'

/* global describe, it, expect */

const samples = [
  '[1518-11-01 00:00] Guard #10 begins shift',
  '[1518-11-01 00:05] falls asleep',
  '[1518-11-01 00:25] wakes up',
  '[1518-11-01 00:30] falls asleep',
  '[1518-11-01 00:55] wakes up',
  '[1518-11-01 23:58] Guard #99 begins shift',
  '[1518-11-02 00:40] falls asleep',
  '[1518-11-02 00:50] wakes up',
  '[1518-11-03 00:05] Guard #10 begins shift',
  '[1518-11-03 00:24] falls asleep',
  '[1518-11-03 00:29] wakes up',
  '[1518-11-04 00:02] Guard #99 begins shift',
  '[1518-11-04 00:36] falls asleep',
  '[1518-11-04 00:46] wakes up',
  '[1518-11-05 00:03] Guard #99 begins shift',
  '[1518-11-05 00:45] falls asleep',
  '[1518-11-05 00:55] wakes up'
]

const input = require('./day4.json')
const dateRx = /^\[(?<year>[0-9]+)-(?<month>[0-9]+)-(?<day>[0-9]+) (?<hours>[0-9]+):(?<minutes>[0-9]+)\]/
const guardReport = logs => {
  const report = logs.sort().reduce((guardLog, entry) => {
    if (/Guard #[0-9]+ begins shift/.test(entry)) {
      guardLog.activeGuard = +entry.match(/Guard #([0-9]+) begins shift/)[1]
    }
    if (/falls asleep/.test(entry)) {
      const { groups: { minutes } } = entry.match(dateRx)
      guardLog.start = +minutes
    }
    if (/wakes up/.test(entry)) {
      const { groups: { minutes } } = entry.match(dateRx)
      const end = +minutes
      const sleepMinutes = end - guardLog.start
      if (!guardLog.guards[guardLog.activeGuard]) {
        guardLog.guards[guardLog.activeGuard] = {
          sleepMinutes,
          asleepAt: []
        }
      } else {
        guardLog.guards[guardLog.activeGuard].sleepMinutes += sleepMinutes
      }
      for (let i = guardLog.start; i < end; i++) {
        if (guardLog.guards[guardLog.activeGuard].asleepAt[i]) {
          guardLog.guards[guardLog.activeGuard].asleepAt[i] += 1
        } else {
          guardLog.guards[guardLog.activeGuard].asleepAt[i] = 1
        }
      }
    }
    return guardLog
  }, { guards: {} })
  return report.guards
}

const findSleepyGuard = guards => {
  const guardSleeps = Object.keys(guards).map(k => ({
    id: k,
    sleepMinutes: guards[k].sleepMinutes
  }))
  const mostASleep = guardSleeps.sort(({ sleepMinutes: m1 }, { sleepMinutes: m2 }) => m2 - m1)
  const id = +mostASleep[0].id
  let highestMinute = 0
  let highestCount = 0
  for (let minute = 0; minute < 60; minute++) {
    const count = guards[id].asleepAt[minute]
    if (count > highestCount) {
      highestCount = count
      highestMinute = minute
    }
  }
  return {
    mostASleep: id,
    highestMinute
  }
}

const findFrequentGuard = guards => {
  const guardSleeps = Object.keys(guards).map(k => ({
    id: k,
    asleepAt: guards[k].asleepAt.reduce((freq, count, minute) => {
      if (count > freq.count) {
        freq.count = count
        freq.minute = minute
      }
      return freq
    }, { minute: 0, count: 0 })
  }))
  const mostFrequent = guardSleeps.sort(({ asleepAt: a1 }, { asleepAt: a2 }) => a2.count - a1.count)
  const id = +mostFrequent[0].id
  const highestMinute = +mostFrequent[0].asleepAt.minute
  return {
    mostFrequent: id,
    highestMinute
  }
}

describe('find the sleepy guard', () => {
  it('report the log', () => {
    expect(guardReport([
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:01] falls asleep',
      '[1518-11-01 00:02] wakes up'
    ])).toEqual({ '10': { 'asleepAt': [undefined, 1], 'sleepMinutes': 1 } })
    expect(guardReport([
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:01] falls asleep',
      '[1518-11-01 00:03] wakes up'
    ])).toEqual({ '10': { 'asleepAt': [undefined, 1, 1], 'sleepMinutes': 2 } })
    expect(guardReport([
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:01] falls asleep',
      '[1518-11-01 00:03] wakes up',
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-01 00:07] wakes up'
    ])).toEqual({ '10': { 'asleepAt': [undefined, 1, 1, undefined, undefined, 1, 1], 'sleepMinutes': 4 } })
    expect(guardReport([
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:01] falls asleep',
      '[1518-11-01 00:03] wakes up',
      '[1518-11-02 00:00] Guard #10 begins shift',
      '[1518-11-02 00:02] falls asleep',
      '[1518-11-02 00:03] wakes up'
    ])).toEqual({ '10': { 'asleepAt': [undefined, 1, 2], 'sleepMinutes': 3 } })
  })
  it('should find the sleepy guard', () => {
    expect(findSleepyGuard(guardReport(samples))).toEqual({ mostASleep: 10, highestMinute: 24 })
    expect(findSleepyGuard(guardReport([
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:01] falls asleep',
      '[1518-11-01 00:02] wakes up'
    ]))).toEqual({ mostASleep: 10, highestMinute: 1 })

    expect(findSleepyGuard(guardReport([
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:01] falls asleep',
      '[1518-11-01 00:03] wakes up',
      '[1518-11-02 00:00] Guard #10 begins shift',
      '[1518-11-02 00:02] falls asleep',
      '[1518-11-02 00:03] wakes up'
    ]))).toEqual({ mostASleep: 10, highestMinute: 2 })
  })
  it('should calculate the solution', () => {
    expect(findSleepyGuard(guardReport(input))).toEqual({ mostASleep: 1777, highestMinute: 48 })
  })
})

describe('find most frequent sleeper', () => {
  it('should find them in the example', () => {
    expect(findFrequentGuard(guardReport(samples))).toEqual({ mostFrequent: 99, highestMinute: 45 })
  })
  it('should calculate the solution', () => {
    expect(findFrequentGuard(guardReport(input))).toEqual({ mostFrequent: 1889, highestMinute: 31 })
  })
})
