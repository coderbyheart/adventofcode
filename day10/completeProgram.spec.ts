import { completeProgram } from './completeProgram'

describe('completeProgram()', () => {
	it.each([
		['(', ')'],
		['[({(<(())[]>[[{[]{<()<>>', '}}]])})]'],
		['[(()[<>])]({[<{<<[]>>(', ')}>]})'],
		['(((({<>}<{<{<>}{[]{[]{}', '}}>}>))))'],
		['{<[[]]>}<{[{[{[]{()[[[]', ']]}}]}]}>'],
		['<{([{{}}[<[[[<>{}]]]>[]]', '])}>'],
	])('should complete program %s with %s', (program, completion) =>
		expect(completeProgram(program)).toEqual(completion.split('')),
	)
})
