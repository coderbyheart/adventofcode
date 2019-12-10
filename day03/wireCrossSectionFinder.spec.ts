import { wireCrossSectionFinder } from './wireCrossSectionFinder'

describe('wireCrossSectionFinder', () => {
	it('should find two crosssections', () => {
		const crossSections = wireCrossSectionFinder([
			['R8', 'U5', 'L5', 'D3'],
			['U7', 'R6', 'D4', 'L4'],
		])
		expect(crossSections).toHaveLength(2)
		expect(crossSections).toContainEqual([3, 3])
		expect(crossSections).toContainEqual([6, 5])
	})
})
