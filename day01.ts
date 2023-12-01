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
