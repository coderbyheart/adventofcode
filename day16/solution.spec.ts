const parseHex = (hex: string): string => parseInt(hex, 16).toString(2)

describe('parseHex()', () => {
	it('should convert hex to binary', () =>
		expect(parseHex('D2FE28')).toEqual('110100101111111000101000'))
})

const toNumber = (bits: string): number => parseInt(bits, 2)

const chunk = (bits: string, length: number): string[] => {
	const chunks: string[] = []
	for (let i = 0; i < bits.length; i += length) {
		chunks.push(bits.slice(i, i + length))
	}
	return chunks
}

describe('Day 16: Packet Decoder', () => {
	describe('Part 1', () => {
		it('should parse literal values', () => {
			const message = 'D2FE28'
			// The first step of decoding the message is to convert the hexadecimal representation into binary.
			const binary = parseHex(message)
			// Every packet begins with a standard header:
			// - the first three bits encode the packet version
			const version = binary.slice(0, 3)
			// - and the next three bits encode the packet type ID
			const typeId = binary.slice(3, 6)
			// These two values are numbers; all numbers encoded in any packet are represented as binary with the most significant bit first.
			// For example, a version encoded as the binary sequence 100 represents the number 4.
			expect(toNumber(version)).toEqual(6)
			expect(toNumber(typeId)).toEqual(4)
			// Packets with type ID 4 represent a literal value.
			// Literal value packets encode a single binary number.
			// To do this, the binary number is padded with leading zeroes until its length is a multiple of four bits,
			const rest = binary.slice(6)
			// and then it is broken into groups of four bits.
			const groups = chunk(rest, 5)
			expect(groups).toEqual(['10111', '11110', '00101', '000'])
			// Each group is prefixed by a 1 bit except the last group, which is prefixed by a 0 bit. These groups of five bits immediately follow the packet header.
			const literal = groups
				.filter((g) => g.length === 5)
				.map((b) => b.slice(1))
				.join('')
			expect(literal).toEqual('011111100101')
			const number = toNumber(literal)
			expect(number).toEqual(2021)
		})
	})
})
