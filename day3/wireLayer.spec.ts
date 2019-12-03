import { wireLayer } from "./wireLayer"

describe('wireLayer', () => {
    it('should follow directions', () => {
        const wire = wireLayer(['R8', 'U5', 'L5', 'D3'])
        expect(wire).toEqual([
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
            [5, 0],
            [6, 0],
            [7, 0],
            [8, 0],
            [8, 1],
            [8, 2],
            [8, 3],
            [8, 4],
            [8, 5],
            [7, 5],
            [6, 5],
            [5, 5],
            [4, 5],
            [3, 5],
            [3, 4],
            [3, 3],
            [3, 2],
        ])
    })
})