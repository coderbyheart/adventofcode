import { parseProgram } from './parseProgram'

describe('parseProgram()', () => {
	it.each([
		['()'],
		['[]'],
		['([])'],
		['{()()()}'],
		['<([{}])>'],
		['[<>({}){}[([])<>]]'],
		['(((((((((())))))))))'],
	])('should parse program %s', (program) => {
		parseProgram(program)
	})
	it.each([['(]'], ['{()()()>'], ['(((()))}'], ['<([]){()}[{}])']])(
		'should fail to parse program %s',
		(program) => expect(() => parseProgram(program)).toThrow(),
	)
})
