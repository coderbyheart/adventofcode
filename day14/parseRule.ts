export type Rule = [pair: string, insertion: string]

export const parseRule = (rule: string): Rule => {
	const [pair, , insertion] = rule.split(' ')
	return [pair, insertion]
}
