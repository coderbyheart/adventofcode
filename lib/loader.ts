import * as fs from 'fs'
import * as path from 'path'

export const loader = (day: number) => (file: string): string[] =>
	fs
		.readFileSync(
			path.resolve(
				process.cwd(),
				`day${day.toString().padStart(2, '0')}`,
				`${file}.txt`,
			),
			'utf-8',
		)
		.split('\n')
		.map((s) => s.trim())
		.filter((s) => s.length > 0)
