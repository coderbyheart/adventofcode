
export const parseParameter = (parameter: number) => {
    const s = parameter.toString()

    return {
        // The opcode is a two-digit number based only on the ones and tens digit of the value, 
        // that is, the opcode is the rightmost two digits of the first value in an instruction.
        op: parseInt(s.substr(-2), 10),
        // Parameter modes are single digits, one per parameter, read right-to-left from the opcode: 
        // the first parameter's mode is in the hundreds digit, 
        // the second parameter's mode is in the thousands digit, 
        // the third parameter's mode is in the ten-thousands digit, and so on. 
        modes: s.substr(0, s.length - 2).split('').map(s => parseInt(s, 10)).reverse()
        // Any missing modes are 0. -> these are blank in the modes array
    }
}