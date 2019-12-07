import { calculateThrusterWithFeedbackLoop } from './calculateThrusterWithFeedbackLoop'

describe('Feedback Loop', () => {
	test.skip.each([
		[
			[
				3,
				26,
				1001,
				26,
				-4,
				26,
				3,
				27,
				1002,
				27,
				2,
				27,
				1,
				27,
				26,
				27,
				4,
				27,
				1001,
				28,
				-1,
				28,
				1005,
				28,
				6,
				99,
				0,
				0,
				5,
			],
			[9, 8, 7, 6, 5],
			139629729,
		],
	])(
		'program %p with phase setting sequence %p should calculate max thruster signal %i',
		(program, phaseSettingSequence, expected) => {
			expect(
				calculateThrusterWithFeedbackLoop(
					program as number[],
					phaseSettingSequence as number[],
				),
			).toEqual(expected)
		},
	)
})
