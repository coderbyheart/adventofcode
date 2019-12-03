import { wireLayer } from "./wireLayer"
import { wireCrossSectionFinder } from "./wireCrossSectionFinder"

export const stepsToIntersection = (wireDirections: string[][]): number => {
    const wires = wireDirections.map(wireLayer)
    const crossSections = wireCrossSectionFinder(wireDirections)
    return crossSections
        .map(crossSection => wires
            .map(wire => wire
                // Number of steps is the index of the coordinate in the array
                .map(pos => JSON.stringify(pos)).indexOf(JSON.stringify(crossSection))
            )
        )
        // Sum up the distances of all wires to the intersection
        .map(steps => steps.reduce((sum, step) => sum + step, 0))
        .sort((a, b) => b - a)
        .pop() as number
}