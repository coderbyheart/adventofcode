export const wireLayer = (directions: string[]): [number, number][] => {
    const wire: [number, number][] = [[0, 0]]
    let pos = [0, 0] as [number, number]
    directions.forEach(direction => {
        const [dir, d] = direction.split('')
        const distance = parseInt(d, 10)
        let currentX = pos[0]
        let currentY = pos[1]
        switch (dir) {
            case 'R':
                for (let x = currentX + 1; x <= currentX + distance; x++) {
                    pos = [
                        x,
                        currentY
                    ]
                    wire.push(pos)
                }
                break
            case 'L':
                for (let x = currentX - 1; x >= currentX - distance; x--) {
                    pos = [
                        x,
                        currentY
                    ]
                    wire.push(pos)
                }
                break
            case 'U':
                for (let y = currentY + 1; y <= currentY + distance; y++) {
                    pos = [
                        currentX,
                        y,
                    ]
                    wire.push(pos)
                }
                break
            case 'D':
                for (let y = currentY - 1; y >= currentY - distance; y--) {
                    pos = [
                        currentX,
                        y,
                    ]
                    wire.push(pos)
                }
                break
        }
    })
    return wire
}