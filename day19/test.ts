import { droneScan } from './droneScan'
import { fileToArray } from '../utils/fileToArray'

const program = fileToArray('day19/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]
const main = async () => {
	const w = 1200
	//const s =
	await droneScan([...program], w, 100, 900, ({ x, y }) => {
		console.log({ x, y, id: x * 10000 + y })
	})
	/*const screen = [] as string[][]
    for (let y = 0; y < s.length; y++) {
        screen[y] = []
        for (let x = w; x < w; x++) {
            screen[y][x] = ' '
        }
    }
    s.forEach((row, y) => {
        row.forEach((col, x) => {
            screen[y][x] = col
        })
    })
    console.log(screen.map(r => r.join('')).join('\n'))
*/
}

main()
