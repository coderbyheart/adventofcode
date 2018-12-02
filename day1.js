'use strict'

const calibrate = changes => changes.reduce((frequencies, frequency) => frequencies + frequency, 0)

const repeatedFrequency = frequencyGenerator => {
  const seenFrequencies = { 0: true }
  const seenChanges = []
  do {
    seenChanges.push(frequencyGenerator.next().value)
    const frequency = calibrate(seenChanges)
    if (seenFrequencies[frequency]) return frequency
    seenFrequencies[frequency] = true
  } while (true)
}

module.exports = {
  calibrate,
  repeatedFrequency
}
