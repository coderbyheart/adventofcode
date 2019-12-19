# Note

The way the droneScan improves efficiency is to stop scanning in the current row
as soon as the tractor beam signal is no longer effective (it is assumed that
the tractor beam only works in one continuous area) and the position when the
signal became effective is carried over to the next row, and the scan starts
from there skipping all scans in the line to the left. This works because the
tractor beam start X coordinate is always 0 or larger and always equal or larger
than in the previous line.

The solution of part 2 is sped up further by knowing how many lines to skip
(900). This number can be found programmatically using a binary search, but this
step is omitted here.
