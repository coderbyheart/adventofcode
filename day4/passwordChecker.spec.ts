import { checkPassword, checkPasswordWithLargerGroup } from './checkPassword'

describe('Password Checker', () => {
    it.each([
        [1, false], // not a six-digit number
        [1234567, false], // not a six-digit number
        [111111, true],
        [223450, false],
        [123789, false],
    ])('should mark %p as %p', (password, valid) => expect(checkPassword(password as number)).toEqual(valid))
})

describe('Password Checker with larger group checking', () => {
    it.each([
        [112233, true],
        [123444, false],
        [111122, true]
    ])('should mark %p as %p', (password, valid) => expect(checkPasswordWithLargerGroup(password as number)).toEqual(valid))
})