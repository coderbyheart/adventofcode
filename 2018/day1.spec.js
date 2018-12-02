'use strict'

describe('device calibration', () => {
    it('should calculate the right frequency', () => {
        expect(calibrate([
            1, -2, 3, 1
        ])).toEqual(3)
        expect(calibrate([1,1,1])).toEqual(3)
        expect(calibrate([1,1,-2])).toEqual(0)
        expect(calibrate([-1,-2,-3])).toEqual(-6)
    })
})