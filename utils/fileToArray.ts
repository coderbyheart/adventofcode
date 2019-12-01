
import { promises as fs } from "fs"
import * as path from 'path'

export const fileToArray = async <T>(filename: string, formatter: (s: string) => T): Promise<T[]> => (await fs.readFile(path.resolve(process.cwd(), filename), 'utf-8')).split('\n').map(s => s.trim()).map(formatter)
