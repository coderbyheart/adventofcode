const parseHex = (hex: string): string =>
	parseInt(hex, 16)
		.toString(2)
		.padStart(hex.length * 4, '0')

describe('parseHex()', () => {
	it.each([['D2FE28', '110100101111111000101000']])(
		'should convert hex %s to binary %s',
		(hex, bin) => expect(parseHex(hex)).toEqual(bin),
	)
})

const toNumber = (bits: string): number => parseInt(bits, 2)

const chunk = (bits: string, length: number): string[] => {
	const chunks: string[] = []
	for (let i = 0; i < bits.length; i += length) {
		chunks.push(bits.slice(i, i + length))
	}
	return chunks
}

enum Type {
	Literal = 4,
	Operator = 9,
}

const vt = (binary: string) => ({
	version: toNumber(binary.slice(0, 3)),
	typeId: toNumber(binary.slice(3, 6)),
})

const parseTransmission = (binary: string, packets: any[] = [], pos = 0) => {
	const parseVersion = () => {
		const version = toNumber(binary.slice(pos, pos + 3))
		if (isNaN(version) || version === 0) return
		pos += 3
		return version
	}

	const parseTypeId = () => {
		const typeId = toNumber(binary.slice(pos, pos + 3))
		if (isNaN(typeId) || typeId === 0) return
		pos += 3
		return typeId
	}

	const parseLiteral = () => {
		let isLast = false
		const literalBits = []
		do {
			isLast = binary.slice(pos, pos + 1) === '0'
			literalBits.push(binary.slice(pos + 1, pos + 5))
			pos = pos + 5
		} while (!isLast)
		const literal = toNumber(literalBits.join(''))
		return literal
	}

	const parseLengthTypeId = () => {
		const lengthTypeId = parseInt(binary.slice(pos, pos + 1))
		pos++
		return lengthTypeId
	}

	const parseSubPacketLength = () => {
		const subPacketLength = toNumber(binary.slice(pos, pos + 15))
		pos += 15
		return subPacketLength
	}

	const parseSubPacketNumber = () => {
		const subPacketNumber = toNumber(binary.slice(pos, pos + 11))
		pos += 11
		return subPacketNumber
	}

	const parseSubPacketsByLength = (len: number) => {
		const subPacket = binary.slice(pos, pos + len)
		pos += len
		return parseTransmission(subPacket, packets, 0)
	}

	while (pos < binary.length) {
		const version = parseVersion()
		if (version === undefined) return pos
		const typeId = parseTypeId()
		if (typeId === undefined) return pos
		// console.log({ version, typeId })
		if (typeId === 4) {
			// Literal
			packets.push({ literal: parseLiteral(), version, typeId })
		} else {
			packets.push({ version, typeId })
			// Other types are operator packages
			const lengthTypeId = parseLengthTypeId()
			if (lengthTypeId === 0) {
				// 15-bit number representing the number of bits in the sub-packets
				const subPacketLength = parseSubPacketLength()
				parseSubPacketsByLength(subPacketLength)
			} else {
				// length is a 11-bit number representing the number of sub-packets.
				const subPacketNumber = parseSubPacketNumber()
				for (let p = 0; p < subPacketNumber; p++) {
					pos = parseTransmission(binary, packets, pos)
				}
			}
		}
	}
	return pos
}

describe('parseTransmission()', () => {
	it('should parse a literal', () => {
		const result: any[] = []
		parseTransmission(parseHex('D2FE28'), result)
		expect(result).toMatchObject([{ literal: 2021 }])
	})
	it('should parse operations', () => {
		const result: any[] = []
		parseTransmission(parseHex('38006F45291200'), result)
		expect(result).toMatchObject([
			{ version: 1, typeId: 6 },
			{ literal: 10 },
			{ literal: 20 },
		])
	})
	it('should parse operations', () => {
		const result: any[] = []
		parseTransmission(parseHex('EE00D40C823060'), result)
		expect(result).toMatchObject([
			{ version: 7, typeId: 3 },
			{ literal: 1 },
			{ literal: 2 },
			{ literal: 3 },
		])
	})
})

describe('Day 16: Packet Decoder', () => {
	describe('Part 1', () => {
		it.skip.each([
			['8A004A801A8002F478', 16],
			//['620080001611562C8802118E34', 12],
			//['C0015000016115A2E0802F182340', 23],
			//['A0016C880162017C3686B18A3D4780', 31],
		])('should solve the example', (hex, versionSum) => {
			const result: any[] = []
			parseTransmission(parseHex(hex), result)
			console.log(result)
			expect(result.reduce((sum, { version }) => sum + version, 0)).toEqual(
				versionSum,
			)
		})
	})
})
