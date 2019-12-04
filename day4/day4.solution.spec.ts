import { checkPassword, checkPasswordWithLargerGroup as checkPasswordWithoutLargerGroup } from "./checkPassword"

const start = 125730
const end = 579381

describe('Day 4: Part 1', () => {
    it('should calculate the solution', () => {
        let numPasswords = 0
        for (let i = start; i <= end; i++) {
            if (checkPassword(i)) {
                numPasswords++
            }
        }
        expect(numPasswords).toEqual(2081)
    })
})

describe('Day 4: Part 2', () => {
    it('should calculate the solution', () => {
        let numPasswords = 0
        for (let i = start; i <= end; i++) {
            if (checkPasswordWithoutLargerGroup(i)) {
                numPasswords++
            }
        }
        expect(numPasswords).toEqual(1411)
    })
})
