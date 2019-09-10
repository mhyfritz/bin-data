# Data binning

> Bin data into given number of chunks and pick a representative value for each bin.

## Installation

```bash
npm install @mhyfritz/bin-data
```

## Usage

Node:

```javascript
const binData = require("@mhyfritz/bin-data");

// or

import * as binData from "@mhyfritz/bin-data";
```

Browser:

```html
<!-- unpkg -->
<script src="https://unpkg.com/@mhyfritz/bin-data"></script>

<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/@mhyfritz/bin-data"></script>
```

API:

```javascript
const { bin, pick } = require("@mhyfritz/bin-data");

// data = [-10, -9, ..., -1. 0, 1, ..., 9, 10]
const data = Array.from({ length: 21 }, (_, i) => i - 11 + 1);

// by default, the max. value is picked
bin(data, 3);
// ==> [ -4, 3, 10 ]

bin(data, 3, pick.min);
// ==> [ -10, -3, 4 ]

bin(data, 3, pick.mean);
// ==> [ -7, 0, 7 ]

bin(data, 3, chunk => pick.quantile(chunk, 0.75));
// ==> [ -5.5, 1.5, 8.5 ]

// custom function:  maximum of the absolute values
function absMax(chunk) {
  let ret = chunk[0];
  for (const x of chunk) {
    if (Math.abs(x) > Math.abs(ret)) {
      ret = x;
    }
  }
  return ret;
}
bin(data, 3, absMax);
// ==> [ -10, -3, 10 ]
```

### `bin(data, numBins, pickRepresentative)`

- `data`: an array or other iterable
- `numBins`: the number of bins to generate
- `pickRepresentative [chunk => value]`: function to pick representative value of bins; default: `pick.max` (see below)

### `pick`

Object holding pre-defined functions to pick bin representative,
e.g. `pick.min` to pick minimum value of bin.
See [`d3-array`](https://github.com/d3/d3-array/blob/09b8ff21742b365a7090e728120640fb45464637/README.md)
for all options.
