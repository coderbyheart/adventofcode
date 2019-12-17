# Note

Part 2 has been solved manually in order to verify the solution.

The algorithm is:

from the start point (which can be seen in the first frame of the map) turn and
count to the next corner.

This results in these movements to cover the entire map:

L6 R8 L4 R8 L12 L12 R10 L4 L12 R10 L4 L12 L6 L4 L4 L12 R10 L4 L12 L6 L4 L4 L12
R10 L4 L12 L6 L4 L4 L6 R8 L4 R8 L12 L6 R8 L4 R8 L12

This now needs to be compressed into three sequences which can be repeatet
multiple times.

The solution needs to fit the 3x20 instructions limit, which can be found out
using permutations.

Eventually the result will be

A = L6,R8,L4,R8,L12 B = L12,R10,L4 C = L12,L6,L4,L4

And the sequence is

A,B,B,C,B,C,B,C,A,A

That this is the correct solution has been verified in the manual test.
