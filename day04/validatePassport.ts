/**
 * Validate a passport.
 * cid field is optional
 */
export const validatePassport = (p: Record<string, string>): boolean => {
	if (!('ecl' in p)) return false
	if (!('pid' in p)) return false
	if (!('eyr' in p)) return false
	if (!('hcl' in p)) return false
	if (!('byr' in p)) return false
	if (!('iyr' in p)) return false
	// if (!('cid' in p)) return false
	if (!('hgt' in p)) return false
	return true
}
