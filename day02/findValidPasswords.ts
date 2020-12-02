const policyAndPasswordsLine = new RegExp(
	/^(?<n1>[0-9]+)-(?<n2>[0-9]+) (?<letter>[a-z]): (?<password>[a-z]+)$/,
)

type PasswordChecker = (
	password: string,
	letter: string,
	n1: number,
	n2: number,
) => boolean

export const oldPasswordChecker: PasswordChecker = (
	s: string,
	char: string,
	min: number,
	max: number,
): boolean =>
	((numChars: number) => numChars >= min && numChars <= max)(
		s.split('').filter((s) => s === char).length,
	)

export const findValidPasswords = (passwordChecker: PasswordChecker) => (
	policyAndPasswords: string[],
): number =>
	policyAndPasswords.reduce((count, s) => {
		const { n1, n2, letter, password } =
			policyAndPasswordsLine.exec(s)?.groups ?? {}
		if (passwordChecker(password, letter, parseInt(n1, 10), parseInt(n2, 10)))
			return count + 1
		return count
	}, 0)
