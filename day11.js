'use strict'

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

const calculateGridPower = (x, y, serial, gridSize) => {
  const left = Math.floor(gridSize / 2)
  const right = gridSize - left - 1
  const startX = Math.max(x - left, 1)
  const endX = Math.min(x + right, 300)
  const startY = Math.max(y - left, 1)
  const endY = Math.min(y + right, 300)
  let power = 0
  for (let gx = startX; gx <= endX; gx++) {
    for (let gy = startY; gy <= endY; gy++) {
      power += fuelAt(gx, gy, serial)
    }
  }
  return power
}

const fullestCellWithGrid = (serial, gridSize = 3) => {
  const left = Math.floor(gridSize / 2)
  const maxPower = {power: 0, x: left, y: 300 - left}
  for (let x = left + 1; x <= 300 - left; x++) {
    for (let y = left + 1; y <= 300 - left; y++) {
      const power = calculateGridPower(x, y, serial, gridSize)
      if (maxPower.power < power) {
        maxPower.power = power
        maxPower.x = x
        maxPower.y = y
        maxPower.gridSize = gridSize
      }
    }
  }
  return {
    ...maxPower,
    x: maxPower.x - left,
    y: maxPower.y - left
  }
}

const fullestCell = serial => {
  const cells = []
  let cell
  let s = 0
  do {
    cell = fullestCellWithGrid(serial, ++s)
    cells.push(cell)
  } while (cell.power > 0 && s <= 300)
  return cells.sort(({power: p1}, {power: p2}) => p2 - p1)[0]
}

module.exports = {
  fullestCell,
  fullestCellWithGrid,
  fuelAt
}