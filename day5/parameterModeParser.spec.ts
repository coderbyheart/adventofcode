import { parseParameter } from "./parseParameter"

describe('Parameter mode parser', () => {
    it('should parse parameters', () => {
        expect(parseParameter(1002)).toEqual({
            op: 2,
            modes: [
                0,
                1
            ]
        })
    })
})