import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";

Deno.test("Day 10: Pipe Maze", async (t) => {
  await t.step("Part 1", async (t) => {
    await t.step("Example", async (t) => {
      await t.step("Example 1", () =>
        assertEquals(
          findFurthestDistance([`-L|F7`, `7S-7|`, `L|7||`, `-L-J|`, `L|-JF`]),
          4,
        ));
      await t.step("Example 2", () =>
        assertEquals(
          findFurthestDistance([`7-F7-`, `.FJ|7`, `SJLL7`, `|F--J`, `LJ.LJ`]),
          8,
        ));
    });

    await t.step("it should solve", async () =>
      assertEquals(
        findFurthestDistance(
          (await Deno.readTextFile("./input/day10.txt")).split("\n"),
        ),
        6738,
      ));
  });
  await t.step("Part 2", async (t) => {
    await t.step("Example", async (t) => {
      await t.step("Example 1", () =>
        assertEquals(
          findInsideTiles([
            `..........`,
            `.S------7.`,
            `.|F----7|.`,
            `.||....||.`,
            `.||....||.`,
            `.|L-7F-J|.`,
            `.|..||..|.`,
            `.L--JL--J.`,
            `..........`,
          ]),
          4,
        ));
      await t.step("Example 2", () =>
        assertEquals(
          findInsideTiles([
            `...........`,
            `.S-------7.`,
            `.|F-----7|.`,
            `.||.....||.`,
            `.||.....||.`,
            `.|L-7.F-J|.`,
            `.|..|.|..|.`,
            `.L--J.L--J.`,
            `...........`,
          ]),
          4,
        ));
      await t.step("Example 3", () =>
        assertEquals(
          findInsideTiles([
            `.F----7F7F7F7F-7....`,
            `.|F--7||||||||FJ....`,
            `.||.FJ||||||||L7....`,
            `FJL7L7LJLJ||LJ.L-7..`,
            `L--J.L7...LJS7F-7L7.`,
            `....F-J..F7FJ|L7L7L7`,
            `....L7.F7||L7|.L7L7|`,
            `.....|FJLJ|FJ|F7|.LJ`,
            `....FJL-7.||.||||...`,
            `....L---J.LJ.LJLJ...`,
          ]),
          8,
        ));
      /*
      TODO: 579 is the accepted answer, IF the startpoint S in the map is replaced with '|'
      This solution is missing the handling of the pipe under the start position.

      await t.step("it should solve", async () =>
        assertEquals(
          findInsideTiles(
            (await Deno.readTextFile("./input/day10.txt")).split("\n")
          ),
          579
        )
      );
      */
    });
  });
});

const findFurthestDistance = (mapRows: Array<string>): number => {
  const map = mapRows.map((s) => s.split(""));
  const start = findStart(map);
  if (start === null) throw new Error(`Start not found!`);
  return (
    floodFill(map, start)
      // sort by distance
      .sort((p1, p2) => p1[2] - p2[2])
      .pop()?.[2] as number
  );
};

const findStart = (map: Array<Array<string>>): [number, number] | null => {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (isStart(map[row][col])) return [row, col];
    }
  }
  return null;
};

enum Connection {
  N = "North",
  S = "South",
  E = "East",
  W = "West",
}
const connectingTiles: Array<{ tile: string; connections: Connection[] }> = [
  { tile: "|", connections: [Connection.N, Connection.S] }, // is a vertical pipe connecting north and south.
  { tile: "-", connections: [Connection.E, Connection.W] }, // is a horizontal pipe connecting east and west.
  { tile: "L", connections: [Connection.N, Connection.E] }, // is a 90-degree bend connecting north and east.
  { tile: "J", connections: [Connection.N, Connection.W] }, // is a 90-degree bend connecting north and west.
  { tile: "7", connections: [Connection.S, Connection.W] }, // is a 90-degree bend connecting south and west.
  { tile: "F", connections: [Connection.S, Connection.E] }, // is a 90-degree bend connecting south and east.
];

const isConnection = (connection: Connection, tile: string): boolean =>
  connectingTiles.find(
    ({ tile: t, connections }) =>
      tile === t && connections.includes(connection),
  ) !== undefined;

const equals = (p1: [number, number], p2: [number, number]) =>
  p1[0] === p2[0] && p1[1] === p2[1];

// Find the loop by following the pipes
const floodFill = (map: Array<Array<string>>, start: [number, number]) => {
  const queue: Array<[number, number, number]> = [[...start, 0]];
  const filled: Array<[number, number, number]> = [];
  const hasFilled = (pos: [number, number]) =>
    filled.find((p) => equals([p[0], p[1]], pos));
  while (queue.length > 0) {
    const [row, col, distance] = queue.shift() as [number, number, number];
    filled.push([row, col, distance]);
    // What is the current tile
    const tile = map[row][col];
    if (tile === undefined) continue; // out of bounds
    if (tile === ".") continue; // Ground, no pipe here

    const up: [number, number] = [row - 1, col];
    const down: [number, number] = [row + 1, col];
    const left: [number, number] = [row, col - 1];
    const right: [number, number] = [row, col + 1];

    const upTile = map[up[0]]?.[up[1]];
    const downTile = map[down[0]]?.[down[1]];
    const leftTile = map[left[0]]?.[left[1]];
    const rightTile = map[right[0]]?.[right[1]];

    if (
      !hasFilled(up) &&
      (isStart(tile) || isConnection(Connection.N, tile)) &&
      isConnection(Connection.S, upTile)
    ) {
      queue.push([...up, distance + 1]);
    }

    if (
      !hasFilled(down) &&
      (isStart(tile) || isConnection(Connection.S, tile)) &&
      isConnection(Connection.N, downTile)
    ) {
      queue.push([...down, distance + 1]);
    }

    if (
      !hasFilled(left) &&
      (isStart(tile) || isConnection(Connection.W, tile)) &&
      isConnection(Connection.E, leftTile)
    ) {
      queue.push([...left, distance + 1]);
    }

    if (
      !hasFilled(right) &&
      (isStart(tile) || isConnection(Connection.E, tile)) &&
      isConnection(Connection.W, rightTile)
    ) {
      queue.push([...right, distance + 1]);
    }
  }
  return filled;
};

const isStart = (tile: string) => tile === "S";

const findInsideTiles = (mapRows: Array<string>): number => {
  const map = mapRows.map((s) => s.split(""));

  const start = findStart(map);
  if (start === null) throw new Error(`Start not found!`);
  const pipes = floodFill(map, start);
  const insideTiles: Array<[number, number]> = [];

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      // Any tile that isn't part of the main loop can count as being enclosed by the loop.
      const maybePipe = pipes.find((pipe) =>
        equals([pipe[0], pipe[1]], [row, col])
      );
      if (maybePipe !== undefined) continue;
      // Use Point-in-polygon to determine if point is in loop
      // See https://en.wikipedia.org/wiki/Point_in_polygon
      let isInside = false;
      let lastSymbol: string | undefined = undefined;
      // Count the number of times the ray intersects vertical pipes
      for (let x = 0; x <= col; x++) {
        const maybePipe = pipes.find((pipe) =>
          equals([pipe[0], pipe[1]], [row, x])
        );
        if (maybePipe === undefined) continue;
        const pipeSymbol = map[row][x];
        // Hack: uncomment to make the solution work
        // if (isStart(pipeSymbol)) pipeSymbol = "|";
        if (pipeSymbol === "|") isInside = !isInside; // pipe
        if (pipeSymbol === "F" || pipeSymbol === "L") lastSymbol = pipeSymbol; // opened corner
        if (pipeSymbol === "7" && lastSymbol === "F") lastSymbol = undefined; // closed corner
        if (pipeSymbol === "J" && lastSymbol === "L") lastSymbol = undefined; // closed corner
        if (pipeSymbol === "7" && lastSymbol === "L") isInside = !isInside; // direction change
        if (pipeSymbol === "J" && lastSymbol === "F") isInside = !isInside; // direction change
      }
      if (isInside) insideTiles.push([row, col]);
    }
  }

  printMap(map, insideTiles, pipes);

  return insideTiles.length;
};

const printMap = (
  map: Array<Array<string>>,
  insideTiles: Array<[number, number]>,
  pipes: Array<[number, number, number]>,
) => {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      let char = map[row][col];
      if (insideTiles.find((p) => equals(p, [row, col]))) {
        char = "▓";
      } else if (!pipes.find((p) => equals([p[0], p[1]], [row, col]))) {
        char = "░";
      }

      Deno.stdout.writeSync(
        new TextEncoder().encode(
          char
            .replaceAll(".", "░")
            .replaceAll("F", "┌")
            .replaceAll("|", "│")
            .replaceAll("L", "└")
            .replaceAll("7", "┐")
            .replaceAll("J", "┘")
            .replaceAll("S", "✕"),
        ),
      );
    }
    Deno.stdout.writeSync(new TextEncoder().encode("\n"));
  }
};
