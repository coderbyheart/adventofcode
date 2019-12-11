import { paintRobot } from './paintRobot'

describe('Paint Robot', () => {
	it('should throw an exception if an uneven number of inputs is given', () => {
		const [inp, done] = paintRobot()
		inp(1)
		expect(done).toThrow(/Number of inputs is uneven/)
	})
	it('should follow the example instructions and paint 6 panels', () => {
		const [inp, done] = paintRobot()
		inp(1)
		inp(0)
		inp(0)
		inp(0)
		inp(1)
		inp(0)
		inp(1)
		inp(0)
		inp(0)
		inp(1)
		inp(1)
		inp(0)
		inp(1)
		inp(0)
		const panels = done()
		expect(panels).toHaveLength(6)
	})
})
