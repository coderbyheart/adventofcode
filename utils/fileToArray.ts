
import * as fs from "fs"
import * as path from 'path'

export const fileToArray = <T>(filename: string, formatter: (s: string) => T): T[] => fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8').split('\n').map(s => s.trim()).map(formatter)
