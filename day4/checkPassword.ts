export const checkPassword = (password: number) => {
    if (password < 100000) return false
    if (password >= 1000000) return false
    if (!checkIncreasingDigits(password)) return false
    return hasDoubleDigits(password)
}

const hasDoubleDigits = (password: number) => /00|11|22|33|44|55|66|77|88|99/.test(password.toString())

const checkIncreasingDigits = (password: number) => password.toString().split('').reduce((valid, digit, pos, digits) => {
    if (!valid) return valid
    if (pos === 0) return true
    if (digits[pos - 1] > digit) return false
    return valid
}, true)

const largerGroupMatch = /0{2,}|1{2,}|2{2,}|3{2,}|4{2,}|5{2,}|6{2,}|7{2,}|8{2,}|9{2,}/g

export const checkPasswordWithLargerGroup = (password: number) => {
    if (!checkPassword(password)) return false
    const groups = password.toString().match(largerGroupMatch)
    return groups?.filter(group => group.length == 2).length ? true : false
}
