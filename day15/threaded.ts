import { fileToArray } from '../utils/fileToArray'
import { Worker } from 'worker_threads'
import * as path from 'path'

const program = fileToArray('day15/input.txt', s =>
	s.split(',').map(s => parseInt(s, 10)),
)[0]

const launchWorker = (id: number, maxMovements = Infinity) => {
	const worker = new Worker(
		path.join(process.cwd(), 'dist', 'day15', 'worker.js'),
		{
			workerData: {
				program: [...program],
				maxMovements,
			},
		},
	)
	worker.on('message', message => {
		console.log(`${id}`, message)
	})
	worker.on('error', err => {
		console.error(`${id}`, err)
	})
	worker.on('exit', code => {
		if (code !== 0) {
			throw new Error(`Worker ${id} stopped with exit code ${code}`)
		}
	})
}

const maxMovements = 7063

launchWorker(1, maxMovements)
launchWorker(2, maxMovements)
launchWorker(3, maxMovements)
launchWorker(4, maxMovements)
launchWorker(5, maxMovements)
launchWorker(6, maxMovements)
launchWorker(7, maxMovements)
launchWorker(8, maxMovements)
