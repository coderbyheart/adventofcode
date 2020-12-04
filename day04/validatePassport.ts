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

export const validatePassportStrict = (p: Record<string, string>): boolean => {
	if (!validatePassport(p)) return false
	// byr (Birth Year) - four digits; at least 1920 and at most 2002.
	const byr = parseInt(p.byr, 10)
	if (byr < 1920 || byr > 2002) return false
	// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
	const iyr = parseInt(p.iyr, 10)
	if (iyr < 2010 || iyr > 2020) return false
	// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
	const eyr = parseInt(p.eyr, 10)
	if (eyr < 2020 || eyr > 2030) return false
	// hgt (Height) - a number followed by either cm or in:
	const hgt = /^([0-9]+)(cm|in)$/.exec(p.hgt)
	if (hgt === null) return false
	const hgtValue = parseInt(hgt[0], 10)
	// If cm, the number must be at least 150 and at most 193.
	if (hgt[1] === 'cm' && (hgtValue < 150 || hgtValue > 193)) return false
	// If in, the number must be at least 59 and at most 76.
	if (hgt[1] === 'in' && (hgtValue < 59 || hgtValue > 76)) return false
	// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
	if (!/^#[0-9a-f]{6}$/.test(p.hcl)) return false
	// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
	if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(p.ecl))
		return false
	// pid (Passport ID) - a nine-digit number, including leading zeroes.
	if (!/^[0-9]{9}$/.test(p.pid)) return false
	// cid (Country ID) - ignored, missing or not.
	return true
}
