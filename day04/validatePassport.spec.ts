import { validatePassport, validatePassportStrict } from './validatePassport'

describe('validatePassport', () => {
	it.each([
		[
			{
				ecl: 'gry',
				pid: '860033327',
				eyr: '2020',
				hcl: '#fffffd',
				byr: '1937',
				iyr: '2017',
				cid: '147',
				hgt: '183cm',
			},
			true, // all eight fields are present
		],
		[
			{
				iyr: '2013',
				ecl: 'amb',
				cid: '350',
				eyr: '2023',
				pid: '028048884',
				hcl: '#cfa07d',
				byr: '1929',
			},
			false, // missing hgt
		],
		[
			{
				hcl: '#ae17e1',
				iyr: '2013',
				eyr: '2024',
				ecl: 'brn',
				pid: '760753108',
				byr: '1931',
				hgt: '179cm',
			},
			true, // temporarily ignore missing cid fields
		],
		[
			{
				hcl: '#cfa07d',
				eyr: '2025',
				pid: '166559648',
				iyr: '2011',
				ecl: 'brn',
				hgt: '59in',
			},
			false, // Missing cid is fine, but missing any other field is not, so this passport is invalid.
		],
	])('passport %s validity is %s', (passport, valid) =>
		expect(validatePassport(passport)).toEqual(valid),
	)
})

describe('validatePassportStrict', () => {
	it.each([
		[{ byr: '2002' }, true],
		[{ byr: '2003' }, false],
		[{ hgt: '60in' }, true],
		[{ hgt: '190cm' }, true],
		[{ hgt: '190in' }, false],
		[{ hgt: '190' }, false],
		[{ hcl: '#123abc' }, true],
		[{ hcl: '#123abz' }, false],
		[{ hcl: '123abc' }, false],
		[{ ecl: 'brn' }, true],
		[{ ecl: 'wat' }, false],
		[{ pid: '000000001' }, true],
		[{ pid: '0123456789' }, false],
	])(`should pass sample properties %s %s`, (props, isValid) => {
		const valid = {
			eyr: '2024',
			pid: '662406624',
			hcl: '#cfa07d',
			byr: '1947',
			iyr: '2015',
			ecl: 'amb',
			hgt: '150cm',
		}

		expect(validatePassportStrict(valid)).toEqual(true)
		expect(
			validatePassportStrict({
				...valid,
				...props,
			}),
		).toEqual(isValid)
	})
})
