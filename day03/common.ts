export const mostCommon = (report: string[]): string => {
	const width = report[0].length
	const result = []
	for (let col = 0; col < width; col++) {
		const onbits = report.map((r) => r[col]).filter((b) => b === '1')
		if (onbits.length >= report.length - onbits.length) {
			result[col] = '1'
		} else {
			result[col] = '0'
		}
	}
	return result.join('')
}

export const leastCommon = (report: string[]): string =>
	mostCommon(report)
		.split('')
		.map((b) => (b === '1' ? '0' : '1')) // Invert
		.join('')

const findWithBitCriteria =
	(getCheckBits: (report: string[]) => string) =>
	(report: string[], index = 0): string => {
		if (report.length === 1) return report[0]
		const width = report[0].length
		if (index >= width) {
			throw new Error('End reached.')
		}
		const checkBit = getCheckBits(report)[index]
		return findWithBitCriteria(getCheckBits)(
			report.filter((r) => r[index] === checkBit),
			++index,
		)
	}

export const mostCommonBitCriteria = findWithBitCriteria(mostCommon)
export const leastCommonBitCriteria = findWithBitCriteria(leastCommon)
