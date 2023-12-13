export const manhattanDistance = (
  [x1, y1]: [x: number, y: number],
  [x2, y2] = [0, 0]
): number => Math.abs(x1 - x2) + Math.abs(y1 - y2);
