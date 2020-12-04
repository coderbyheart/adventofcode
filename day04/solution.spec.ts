import { loader, loadString } from '../lib/loader'
import { parsePassportList } from './parsePassportList'
import { validatePassport, validatePassportStrict } from './validatePassport'

const load = loader(4)
const sample = load('sample')
const input = load('input')

describe('Day 4: Passport Processing', () => {
	describe('Part 1', () => {
		it('should solve the sample', () => {
			expect(parsePassportList(sample).filter(validatePassport)).toHaveLength(2)
		})
		it('should solve', () => {
			expect(parsePassportList(input).filter(validatePassport)).toHaveLength(
				250,
			)
		})
	})
	describe('Part 2', () => {
		it('should solve the sample', () => {
			expect(
				parsePassportList(
					loadString(`eyr:1972 cid:100
					hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926
					
					iyr:2019
					hcl:#602927 eyr:1967 hgt:170cm
					ecl:grn pid:012533040 byr:1946
					
					hcl:dab227 iyr:2012
					ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277
					
					hgt:59cm ecl:zzz
					eyr:2038 hcl:74454a iyr:2023
					pid:3556412378 byr:2007
					
					pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
					hcl:#623a2f

					eyr:2029 ecl:blu cid:129 byr:1989
					iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

					hcl:#888785
					hgt:164cm byr:2001 iyr:2015 cid:88
					pid:545766238 ecl:hzl
					eyr:2022

					iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`),
				).filter(validatePassportStrict),
			).toHaveLength(4)
		})

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

		it('should solve', () => {
			const v = parsePassportList(input).filter(validatePassportStrict)
			expect(v).toHaveLength(158)
		})
	})
})
