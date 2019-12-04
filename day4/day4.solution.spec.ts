import { checkPassword } from "./checkPassword"

describe('Day 4: Part 1', () => {
    it('should calculate the solution', () => {
        const start = 125730
        const end = 579381
        let numPasswords = 0
        for (let i = start; i <= end; i++) {
            if (checkPassword(i)) {
                numPasswords++
            }
        }
        expect(numPasswords).toEqual(2081)
    })
})
