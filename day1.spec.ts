import { moduleLaunchFuel, modulesLaunchFuel, moduleLaunchFuelWithExtraFuelForFuel, modulesLaunchFuelWithExtraFuelForFuel } from "./moduleLaunchFuel"
import { fileToArray } from "./utils/fileToArray"

const modules = fileToArray<number>('day1.input.txt', s => parseInt(s, 10))

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
        expect(modulesLaunchFuel(modules)).toEqual(3421505)
    })
    describe('fuel for fuel needs to be calculated', () => {
        test.each([
            [14, 2],
            [1969, 966],
            [100756, 50346]
        ])(`mass of %i needs %i fuel`, (mass, expectedFuel) => {
            expect(moduleLaunchFuelWithExtraFuelForFuel(mass)).toEqual(expectedFuel)
        })
    })
    it('should calculate the required fuel for all modules including the extra fuel', async () => {
        expect(modulesLaunchFuelWithExtraFuelForFuel(modules)).toEqual(5129386)
    })
})
