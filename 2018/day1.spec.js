'use strict'

const {calibrate, repeatedFrequency} = require('./day1')
const input = require('./day1.json')

function* listLooper (list) {
    var index = 0;
    while (true)
        yield list[index++ % list.length];
}

describe('device calibration', () => {
    it('should calculate the right frequency', () => {
        expect(calibrate([
            1, -2, 3, 1
        ])).toEqual(3)
        expect(calibrate([1, 1, 1])).toEqual(3)
        expect(calibrate([1, 1, -2])).toEqual(0)
        expect(calibrate([-1, -2, -3])).toEqual(-6)
    })

    it('should find the frequency which it reaches twice', () => {
        expect(repeatedFrequency(listLooper([
            1, -2, 3, 1
        ]))).toEqual(2)

        expect(repeatedFrequency(listLooper([
            +1, -1
        ]))).toEqual(0)

        expect(repeatedFrequency(listLooper([
            +3, +3, +4, -2, -4
        ]))).toEqual(10)

        expect(repeatedFrequency(listLooper([
            -6, +3, +8, +5, -6
        ]))).toEqual(5)

        expect(repeatedFrequency(listLooper([
            +7, +7, -2, -7, -4
        ]))).toEqual(14)
    })

    it('should calculate the first solution', () => {
        expect(calibrate(input)).toEqual(585)
    })

    it('should calculate the seconf solution', () => {
        expect(repeatedFrequency(listLooper(input))).toEqual(83173)
    })
})
