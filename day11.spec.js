'use strict'

/* global describe, it, expect  */

const fuelAt = (x, y, serial) => {
  // Find the fuel cell's rack ID, which is its X coordinate plus 10.
  const rackId = x + 10
  // Begin with a power level of the rack ID times the Y coordinate.
  let powerLevel = rackId * y
  // Increase the power level by the value of the grid serial number (your puzzle input).
  powerLevel += serial
  // Set the power level to itself multiplied by the rack ID.
  powerLevel = powerLevel * rackId
  // Keep only the hundreds digit of the power level (so 12345 becomes 3; numbers with no hundreds digit become 0).
  powerLevel = Math.floor(powerLevel / 100) - (Math.floor(powerLevel / 1000) * 10)
  // Subtract 5 from the power level.
  return powerLevel - 5
}

const fuelAtGridCell = (x, y, serial) => {
  if (x < 1) return 0
  if (y < 1) return 0
  if (x > 300) return 0
  if (y > 300) return 0
  return fuelAt(x, y, serial)
}

const fullestCell = serial => {
  const maxPower = {power: 0}
  for (let x = 1; x <= 300; x++) {
    for (let y = 1; y <= 300; y++) {
      const power =
        fuelAtGridCell(x - 1, y - 1, serial) +
        fuelAtGridCell(x, y - 1, serial) +
        fuelAtGridCell(x + 1, y - 1, serial) +
        fuelAtGridCell(x - 1, y, serial) +
        fuelAtGridCell(x, y, serial) +
        fuelAtGridCell(x + 1, y, serial) +
        fuelAtGridCell(x - 1, y + 1, serial) +
        fuelAtGridCell(x, y + 1, serial) +
        fuelAtGridCell(x + 1, y + 1, serial)
      if (maxPower.power < power) {
        maxPower.power = power
        maxPower.x = x
        maxPower.y = y
      }
    }
  }
  return {
    ...maxPower,
    x: maxPower.x - 1,
    y: maxPower.y - 1
  }
}

describe('chronal charge', () => {
  it('should calculate the example', () => {
    expect(fuelAt(3, 5, 8)).toEqual(4)
    expect(fuelAt(122, 79, 57)).toEqual(-5)
    expect(fuelAt(217, 196, 39)).toEqual(0)
    expect(fuelAt(101, 153, 71)).toEqual(4)
  })
  it('should find the example fuel cell', () => {
    expect(fullestCell(18)).toEqual({x: 33, y: 45, power: 29})
    expect(fullestCell(42)).toEqual({x: 21, y: 61, power: 30})
  })
  it('should solve the puzzle', () => {
    expect(fullestCell(9306)).toEqual({power: 30, x: 235, y: 38})
  })
})
