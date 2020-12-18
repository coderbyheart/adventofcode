import { tokenize } from './tokenize'

describe('tokenize', () => {
	it.each([
		[
			'1 + 2',
			{
				type: 'op',
				op: '+',
				left: {
					type: 'value',
					value: 1,
				},
				right: {
					type: 'value',
					value: 2,
				},
			},
		],
		[
			'3 * 3',
			{
				type: 'op',
				op: '*',
				left: {
					type: 'value',
					value: 3,
				},
				right: {
					type: 'value',
					value: 3,
				},
			},
		],
		[
			'1 + 2 + 3',
			{
				type: 'op',
				op: '+',
				left: {
					type: 'op',
					op: '+',
					left: {
						type: 'value',
						value: 1,
					},
					right: {
						type: 'value',
						value: 2,
					},
				},
				right: {
					type: 'value',
					value: 3,
				},
			},
		],
		[
			'1 + 2 * 3',
			{
				type: 'op',
				op: '*',
				left: {
					type: 'op',
					op: '+',
					left: {
						type: 'value',
						value: 1,
					},
					right: {
						type: 'value',
						value: 2,
					},
				},
				right: {
					type: 'value',
					value: 3,
				},
			},
		],
		[
			'(2 * 3)',
			{
				type: 'group',
				group: {
					type: 'op',
					op: '*',
					left: {
						type: 'value',
						value: 2,
					},
					right: {
						type: 'value',
						value: 3,
					},
				},
			},
		],
		[
			'1 + (2 * 3)',
			{
				type: 'op',
				op: '+',
				left: {
					type: 'value',
					value: 1,
				},
				right: {
					type: 'group',
					group: {
						type: 'op',
						op: '*',
						left: {
							type: 'value',
							value: 2,
						},
						right: {
							type: 'value',
							value: 3,
						},
					},
				},
			},
		],
		[
			'1 + (2 * 3) + 4',
			{
				type: 'op',
				op: '+',
				left: {
					type: 'op',
					op: '+',
					left: {
						type: 'value',
						value: 1,
					},
					right: {
						type: 'group',
						group: {
							type: 'op',
							op: '*',
							left: {
								type: 'value',
								value: 2,
							},
							right: {
								type: 'value',
								value: 3,
							},
						},
					},
				},
				right: {
					type: 'value',
					value: 4,
				},
			},
		],
		[
			'(2 * 3) + (3 * 4)',
			{
				type: 'op',
				op: '+',
				left: {
					type: 'group',
					group: {
						type: 'op',
						op: '*',
						left: {
							type: 'value',
							value: 2,
						},
						right: {
							type: 'value',
							value: 3,
						},
					},
				},
				right: {
					type: 'group',
					group: {
						type: 'op',
						op: '*',
						left: {
							type: 'value',
							value: 3,
						},
						right: {
							type: 'value',
							value: 4,
						},
					},
				},
			},
		],
		[
			'1 + (2 * 3) + (4 * (5 + 6))',
			{
				type: 'op',
				op: '+',
				left: {
					type: 'op',
					op: '+',
					left: { type: 'value', value: 1 },
					right: {
						type: 'group',
						group: {
							type: 'op',
							op: '*',
							left: { type: 'value', value: 2 },
							right: { type: 'value', value: 3 },
						},
					},
				},
				right: {
					type: 'group',
					group: {
						type: 'op',
						op: '*',
						left: { type: 'value', value: 4 },
						right: {
							type: 'group',
							group: {
								type: 'op',
								op: '+',
								left: { type: 'value', value: 5 },
								right: { type: 'value', value: 6 },
							},
						},
					},
				},
			},
		],
		//['2 * 3 + (4 * 5)', 26],
		//['5 + (8 * 3 + 9 + 3 * 4 * 3)', 437],
		//['5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', 12240],
		//['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', 13632],
	])('should tokenize %s', (expression, expected) =>
		expect(tokenize(expression)).toEqual(expected),
	)
})
