export const sum = (numbers: Array<number>): number =>
  numbers.length === 0 ? 0 : numbers.reduce((sum, number) => sum + number);
