const policyAndPasswordsLine = new RegExp(
	/^(?<minChars>[0-9]+)-(?<maxChars>[0-9]+) (?<char>[a-z]): (?<password>[a-z]+)$/,
)

const containsChar = (
	s: string,
	char: string,
	min: number,
	max: number,
): boolean => {
	const numChars = s.split('').filter((s) => s === char).length
	return numChars >= min && numChars <= max
}

export const findValidPasswords = (policyAndPasswords: string[]): number =>
	policyAndPasswords.reduce((count, s) => {
		const { minChars, maxChars, char, password } =
			policyAndPasswordsLine.exec(s)?.groups ?? {}
		if (
			containsChar(
				password,
				char,
				parseInt(minChars, 10),
				parseInt(maxChars, 10),
			)
		)
			return count + 1
		return count
	}, 0)
