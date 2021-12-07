import { moveCrabs } from './moveCrabs'

describe('moveCrabs()', () => {
	it.each([
		//[[0], 0],
		[[1, 2, 3], 2],
	])(
		'should calculate the fuel needed to move the crabs %j to be %d',
		(crabs, expectedFuel) => expect(moveCrabs(crabs)).toEqual(expectedFuel),
	)
})
