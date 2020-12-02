const policyAndPasswordsLine = new RegExp(
	/^(?<n1>[0-9]+)-(?<n2>[0-9]+) (?<letter>[a-z]): (?<password>[a-z]+)$/,
)

type PasswordChecker = (
	password: string,
	letter: string,
	n1: number,
	n2: number,
) => boolean

/**
 * indicates the lowest and highest number of times a given letter must appear for the password to be valid
 */
export const LegacyPasswordChecker: PasswordChecker = (
	password: string,
	letter: string,
	min: number,
	max: number,
): boolean =>
	((numChars: number) => numChars >= min && numChars <= max)(
		password.split('').filter((s) => s === letter).length,
	)

/**
 * describes two positions in the password, where 1 means the first character,
 * 2 means the second character, and so on.
 * (Be careful; Toboggan Corporate Policies have no concept of "index zero"!)
 * Exactly one of these positions must contain the given letter.
 * Other occurrences of the letter are irrelevant for the purposes of policy enforcement.
 */
export const TobogganPasswordChecker: PasswordChecker = (
	password: string,
	letter: string,
	pos1: number,
	pos2: number,
): boolean => {
	let count = 0
	if (password.charAt(pos1 - 1) === letter) count++
	if (password.charAt(pos2 - 1) === letter) count++
	return count === 1
}

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
