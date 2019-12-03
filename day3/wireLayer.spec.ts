import { wireLayer } from "./wireLayer"

describe('wireLayer', () => {
    it.each([
        [
            ['R8', 'U5', 'L5', 'D3'],
            [
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
            ]
        ],
        [
            ['U7', 'R6', 'D4', 'L4'],
            [
                [0, 0],
                [0, 1],
                [0, 2],
                [0, 3],
                [0, 4],
                [0, 5],
                [0, 6],
                [0, 7],
                [1, 7],
                [2, 7],
                [3, 7],
                [4, 7],
                [5, 7],
                [6, 7],
                [6, 6],
                [6, 5],
                [6, 4],
                [6, 3],
                [5, 3],
                [4, 3],
                [3, 3],
                [2, 3],
            ]
        ]
    ])('should follow directions %p', (directions, expectedWired) => {
        expect(wireLayer(directions as string[])).toEqual(expectedWired)
    })
})