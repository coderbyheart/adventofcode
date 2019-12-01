import { moduleLaunchFuel, modulesLaunchFuel } from "./moduleLaunchFuel"
import { fileToArray } from "./utils/fileToArray"

describe('Fuel Counter-Upper needs to determined the amount of fuel required', () => {
    describe('module launch fuel', () => {
        test.each([
            [12, 2],
            [14, 2],
            [1969, 654],
            [100756, 33583]
        ])(`mass of %i needs %i fuel`, (mass, expectedFuel) => {
            expect(moduleLaunchFuel(mass)).toEqual(expectedFuel)
        })
    })
    it('should calculate the required fuel for all modules', async () => {
        const modules = await fileToArray<number>('day1.input.txt', s => parseInt(s, 10))
        expect(modulesLaunchFuel(modules)).toEqual(3421505)
    })
})