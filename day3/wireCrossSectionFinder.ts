export const wireCrossSectionFinder = (wires: [number, number][][]): [number, number][] => {
    const wirePositionsCounter = {} as { [key: string]: { count: number, position: [number, number] } }

    wires.forEach(wire => wire.forEach(pos => {
        if (pos[0] === 0 && pos[1] === 0) return
        const coord = `${pos[0]}x${pos[1]}`
        if (!wirePositionsCounter[coord]) {
            wirePositionsCounter[coord] = {
                count: 1,
                position: pos
            }
        } else {
            wirePositionsCounter[coord].count++
        }
    }))

    return Object.values(wirePositionsCounter)
        .filter(({ count }) => count > 1)
        .map(({ position }) => position)
}