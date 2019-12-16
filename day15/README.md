# Note

My solution uses a maze walker to find the position of the oxygen tank, and once
this position is known calculates the shortes path between the two.

Then run the walker a second time to visit all unknown locations to build a
complete map for the next step.

The filling is done using a simpler algorithm, similar to Game of Life, which
iterates over all flooded pixels and spreads the flooding.

After finishing the solution I noticed that instead of using three algorithms,
this can all be done with the shortes path algorithm:

- from start run the shortes path algo until one of them reaches the oxygen tank
- from the oxygen tank run the shortes path algo until all have ended, which
  will eventually fill up the entire maze, even the unknown regions.
