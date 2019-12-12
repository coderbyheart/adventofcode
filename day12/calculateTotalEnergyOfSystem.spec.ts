import { calculateTotalEnergyOfSystem } from "./calculateTotalEnergyOfSystem"

describe('Calculate the total energy of the system', () => {
    it('should calculate the total energy of the first example', () => {
        expect(calculateTotalEnergyOfSystem([
            { pos: [2, 1, -3], vel: [-3, -2, 1] },
            { pos: [1, -8, 0], vel: [-1, 1, 3] },
            { pos: [3, -6, 1], vel: [3, 2, -3] },
            { pos: [2, 0, 4], vel: [1, -1, -1] },
        ])).toEqual(179)
    })
    it('should calculate the total energy of the second example', () => {
        expect(calculateTotalEnergyOfSystem([
            { pos: [8, -12, -9], vel: [-7, 3, 0] },
            { pos: [13, 16, -3], vel: [3, -11, -5] },
            { pos: [-29, -11, -1], vel: [-3, 7, 4] },
            { pos: [16, -13, 23], vel: [7, 1, 1] },
        ])).toEqual(1940)
    })
})