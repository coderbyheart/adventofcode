const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b)
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b)
export const lowestCommonDenominator = (n: number[]): number =>
	n.sort((a, b) => a - b).reduce(lcm)
