import { reverseString } from "./util/reverseString.ts";

/**
 * the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
 */
export const calibrationValue = (line: string): number => {
  const first = line.split("").find((s) => /[0-9]/.test(s));
  const last = line
    .split("")
    .reverse()
    .find((s) => /[0-9]/.test(s));
  return parseInt(`${first}${last}`);
};

const numberMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

/**
 * Find the first number in a line
 */
const findFirstNumber = (line: string, reverse = false): string | undefined =>
  [
    // Find number words
    ...Object.entries(numberMap).map<[string, number]>(([search]) => [
      numberMap[search as keyof typeof numberMap],
      line.indexOf(reverse ? reverseString(search) : search),
    ]),
    // Find real numbers
    ...line
      .split("")
      .map<[string, number]>((s, i) => (/[0-9]/.test(s) ? [s, i] : [s, -1])),
  ]
    .filter(([, index]) => index > -1)
    .sort(([, index1], [, index2]) => index1 - index2)[0]?.[0] as
      | keyof typeof numberMap
      | undefined;

/**
 * Find a number at the beginning and at the end of the line.
 * Numbers can also be expresses as words.
 */
export const twoNumbers = (line: string): string => {
  const firstNumber = findFirstNumber(line);
  const lastNumber = findFirstNumber(reverseString(line), true);
  return `${firstNumber ?? ""}${lastNumber ?? ""}`;
};
