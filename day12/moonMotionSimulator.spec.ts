describe('Moon Motion Simulator', () => {
    it('should calculate the motions of the first example', () => {
        const example = [
            [-1, 0, 2],
            [2, -10, -7],
            [4, -8, 8],
            [3, 5, -1],
        ]
        expect(moonMotionSimulator(example, 1)).toEqual([
            { pos: [2, -1, 1], vel: [3, -1, -1] },
            { pos: [3, -7, -4], vel: [1, 3, 3] },
            { pos: [1, -7, 5], vel: [-3, 1, -3] },
            { pos: [2, 2, 0], vel: [-1, -3, 1] },
        ])
        expect(moonMotionSimulator(example, 2)).toEqual([
            { pos: [5, -3, -1], vel: [3, -2, -2] },
            { pos: [1, -2, 2], vel: [-2, 5, 6] },
            { pos: [1, -4, -1], vel: [0, 3, -6] },
            { pos: [1, -4, 2], vel: [-1, -6, 2] },
        ])
        expect(moonMotionSimulator(example, 3)).toEqual([
            { pos: [5, -6, -1], vel: [0, -3, 0] },
            { pos: [0, 0, 6], vel: [-1, 2, 4] },
            { pos: [2, 1, -5], vel: [1, 5, -4] },
            { pos: [1, -8, 2], vel: [0, -4, 0] },
        ])
        expect(moonMotionSimulator(example, 4)).toEqual([
            { pos: [2, -8, 0], vel: [-3, -2, 1] },
            { pos: [2, 1, 7], vel: [2, 1, 1] },
            { pos: [2, 3, -6], vel: [0, 2, -1] },
            { pos: [2, -9, 1], vel: [1, -1, -1] },
        ])
        expect(moonMotionSimulator(example, 5)).toEqual([
            { pos: [-1, -9, 2], vel: [-3, -1, 2] },
            { pos: [4, 1, 5], vel: [2, 0, -2] },
            { pos: [2, 2, -4], vel: [0, -1, 2] },
            { pos: [3, -7, -1], vel: [1, 2, -2] },
        ])
        expect(moonMotionSimulator(example, 6)).toEqual([
            { pos: [-1, -7, 3], vel: [0, 2, 1] },
            { pos: [3, 0, 0], vel: [-1, -1, -5] },
            { pos: [3, -2, 1], vel: [1, -4, 5] },
            { pos: [3, -4, -2], vel: [0, 3, -1] },
        ])
        expect(moonMotionSimulator(example, 7)).toEqual([
            { pos: [2, -2, 1], vel: [3, 5, -2] },
            { pos: [1, -4, -4], vel: [-2, -4, -4] },
            { pos: [3, -7, 5], vel: [0, -5, 4] },
            { pos: [2, 0, 0], vel: [-1, 4, 2] },
        ])
        expect(moonMotionSimulator(example, 8)).toEqual([
            { pos: [5, 2, -2], vel: [3, 4, -3] },
            { pos: [2, -7, -5], vel: [1, -3, -1] },
            { pos: [0, -9, 6], vel: [-3, -2, 1] },
            { pos: [1, 1, 3], vel: [-1, 1, 3] },

        ])
        expect(moonMotionSimulator(example, 9)).toEqual([
            { pos: [5, 3, -4], vel: [0, 1, -2] },
            { pos: [2, -9, -3], vel: [0, -2, 2] },
            { pos: [0, -8, 4], vel: [0, 1, -2] },
            { pos: [1, 1, 5], vel: [0, 0, 2] },

        ])
        expect(moonMotionSimulator(example, 10)).toEqual([
            { pos: [2, 1, -3], vel: [-3, -2, 1] },
            { pos: [1, -8, 0], vel: [-1, 1, 3] },
            { pos: [3, -6, 1], vel: [3, 2, -3] },
            { pos: [2, 0, 4], vel: [1, -1, -1] },
        ])
    })
    it('should calculate the motions of the second example', () => {
        const example = [
            [-8, , -10, 0],
            [5, , 5, 10],
            [2, , -7, 3],
            [9, , -8, -3],
        ]
        expect(moonMotionSimulator(example, 10)).toEqual([
            { pos: [-9, -10, 1], vel: [-2, -2, -1] },
            { pos: [4, 10, 9], vel: [-3, 7, -2] },
            { pos: [8, -10, -3], vel: [5, -1, -2] },
            { pos: [5, -10, 3], vel: [0, -4, 5] },
        ])
        expect(moonMotionSimulator(example, 20)).toEqual([
            { pos: [-10, 3, -4], vel: [-5, 2, 0] },
            { pos: [5, -25, 6], vel: [1, 1, -4] },
            { pos: [13, 1, 1], vel: [5, -2, 2] },
            { pos: [0, 1, 7], vel: [-1, -1, 2] },
        ])
        expect(moonMotionSimulator(example, 30)).toEqual([
            { pos: [15, -6, -9], vel: [-5, 4, 0] },
            { pos: [-4, -11, 3], vel: [-3, -10, 0] },
            { pos: [0, -1, 11], vel: [7, 4, 3] },
            { pos: [-3, -2, 5], vel: [1, 2, -3] },
        ])
        expect(moonMotionSimulator(example, 40)).toEqual([
            { pos: [14, -12, -4], vel: [11, 3, 0] },
            { pos: [-1, 18, 8], vel: [-5, 2, 3] },
            { pos: [-5, -14, 8], vel: [1, -2, 0] },
            { pos: [0, -12, -2], vel: [-7, -3, -3] },
        ])
        expect(moonMotionSimulator(example, 50)).toEqual([
            { pos: [-23, 4, 1], vel: [-7, -1, 2] },
            { pos: [20, -31, 13], vel: [5, 3, 4] },
            { pos: [-4, 6, 1], vel: [-1, 1, -3] },
            { pos: [15, 1, -5], vel: [3, -3, -3] },
        ])
        expect(moonMotionSimulator(example, 60)).toEqual([
            { pos: [36, -10, 6], vel: [5, 0, 3] },
            { pos: [-18, 10, 9], vel: [-3, -7, 5] },
            { pos: [8, -12, -3], vel: [-2, 1, -7] },
            { pos: [-18, -8, -2], vel: [0, 6, -1] },

        ])
        expect(moonMotionSimulator(example, 70)).toEqual([
            { pos: [-33, -6, 5], vel: [-5, -4, 7] },
            { pos: [13, -9, 2], vel: [-2, 11, 3] },
            { pos: [11, -8, 2], vel: [8, -6, -7] },
            { pos: [17, 3, 1], vel: [-1, -1, -3] },
        ])
        expect(moonMotionSimulator(example, 80)).toEqual([
            { pos: [30, -8, 3], vel: [3, 3, 0] },
            { pos: [-2, -4, 0], vel: [4, -13, 2] },
            { pos: [-18, -7, 15], vel: [-8, 2, -2] },
            { pos: [-2, -1, -8], vel: [1, 8, 0] },

        ])
        expect(moonMotionSimulator(example, 90)).toEqual([
            { pos: [-25, -1, 4], vel: [1, -3, 4] },
            { pos: [2, -9, 0], vel: [-3, 13, -1] },
            { pos: [32, -8, 14], vel: [5, -4, 6] },
            { pos: [-1, -2, -8], vel: [-3, -6, -9] },

        ])
        expect(moonMotionSimulator(example, 100)).toEqual([
            { pos: [8, -12, -9], vel: [-7, 3, 0] },
            { pos: [13, 16, -3], vel: [3, -11, -5] },
            { pos: [-29, -11, -1], vel: [-3, 7, 4] },
            { pos: [16, -13, 23], vel: [7, 1, 1] },
        ])
    })
})