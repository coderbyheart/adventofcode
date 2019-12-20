import { findPortals } from './findPortals'
import * as fs from 'fs'
import * as path from 'path'

describe('Find the portals', () => {
	it('should find all portals in the map', () => {
		const example = fs.readFileSync(
			path.resolve(process.cwd(), 'day20/example1.txt'),
			'utf-8',
		)
		const portals = findPortals({
			maze: example.trimEnd().replace(/\n/g, ''),
			width: example.indexOf('\n'),
		})
		console.log(portals)
		expect(portals).toHaveLength(8)
	})
	it('should find the VT portal in the second example', () => {
		const example = fs.readFileSync(
			path.resolve(process.cwd(), 'day20/example2.txt'),
			'utf-8',
		)
		const portals = findPortals({
			maze: example.trimEnd().replace(/\n/g, ''),
			width: example.indexOf('\n'),
		})
		expect(portals.filter(({ label }) => label === 'VT')).toHaveLength(2)
	})
	it('should detect inner and outer portals', () => {
		const example = fs.readFileSync(
			path.resolve(process.cwd(), 'day20/example2.txt'),
			'utf-8',
		)

		const portals = findPortals({
			maze: example.trimEnd().replace(/\n/g, ''),
			width: example.indexOf('\n'),
		})
		const aa = portals.find(({ label }) => label === 'AA')
		const zz = portals.find(({ label }) => label === 'ZZ')
		const cpOuter = portals.find(
			({ label, pos: { y } }) => label === 'CP' && y === 34,
		)
		const cpInner = portals.find(
			({ label, pos: { y } }) => label === 'CP' && y === 8,
		)
		const vtOuter = portals.find(
			({ label, pos: { y } }) => label === 'VT' && y === 11,
		)
		const vtInner = portals.find(
			({ label, pos: { y } }) => label === 'VT' && y === 23,
		)
		expect(aa?.isOuter).toEqual(true)
		expect(zz?.isOuter).toEqual(true)
		expect(cpOuter?.isOuter).toEqual(true)
		expect(cpInner?.isOuter).toEqual(false)
		expect(vtOuter?.isOuter).toEqual(true)
		expect(vtInner?.isOuter).toEqual(false)
	})
})
