# Data binning

> Partition data into given number of chunks and pick a representative value for each chunk.

## Installation

```bash
npm install @mhyfritz/bin-data
```

## Usage

[Try `bin-data` in your browser.](https://npm.runkit.com/@mhyfritz/bin-data)

Node / module bundlers:

```javascript
const binData = require("@mhyfritz/bin-data");

// or

import * as binData from "@mhyfritz/bin-data";
```

Browser:

```html
<!-- import from unpkg -->
<script src="https://unpkg.com/@mhyfritz/bin-data"></script>

<!-- import from jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/@mhyfritz/bin-data"></script>

<!-- usage; module is globally registered as `mhyfritzBinData` -->
<script>
  const { bin } = mhyfritzBinData;
  bin([1, 2, 3, 4, 5], 2);
</script>
```

API:

```javascript
const { bin, chunk, pick } = require("@mhyfritz/bin-data");

// data = [-10, -9, ..., -1, 0, 1, ..., 9, 10]
const data = Array.from({ length: 21 }, (_, i) => i - 10);

// we can get the raw chunks if we want
chunk(data, 4);
// ==>
// [
//   { start: 0, end: 4, data: [ -10, -9, -8, -7, -6 ] },
//   { start: 5, end: 10, data: [ -5, -4, -3, -2, -1, 0 ] },
//   { start: 11, end: 15, data: [ 1, 2, 3, 4, 5 ] },
//   { start: 16, end: 20, data: [ 6, 7, 8, 9, 10 ] }
// ]

// bin the data; by default, the max. value is picked
bin(data, 4);
// ==> [ -6, 0, 5, 10 ]

bin(data, 4, pick.min);
// ==> [ -10, -5, 1, 6 ]

bin(data, 4, pick.mean);
// ==> [ -8, -2.5, 3, 8 ]

bin(data, 4, chunk => pick.quantile(chunk, 0.75));
// ==> [ -7, -1.25, 4, 9 ]

// for complex, non-numeric data, specify an accessor function
// objects = [{x: -10}, ..., {x: 0}, ..., {x: 10}]
const objects = data.map(value => ({ x: value }));
bin(objects, 4, chunk => pick.max(chunk, d => d.x));
// [ -6, 0, 5, 10 ]

// for getting back the actual objects, one can use `pick.greatest()`
bin(objects, 4, chunk => pick.greatest(chunk, d => d.x));
// [ { x: -6 }, { x: 0 }, { x: 5 }, { x: 10 } ]

// one can of course also provide a custom function
// example: pick  maximum of the absolute values
function absMax(chunk) {
  let ret = chunk[0];
  for (const x of chunk) {
    if (Math.abs(x) > Math.abs(ret)) {
      ret = x;
    }
  }
  return ret;
}

bin(data, 4, absMax);
// ==> [ -10, -5, 5, 10 ]
```

### `bin(data, numChunks, pickRepresentative)`

- `data`: an array or other iterable
- `numChunks`: the number of chunks to generate
- `pickRepresentative [chunk => value]`: function to pick representative value of chunk; default: `pick.max` (see below)

Example

```javascript
bin([1, 2, 3, 4, 5], 2);
// ==> [ 3, 5 ]
```

### `pick`

Object holding pre-defined functions to pick chunk representative,
e.g. `pick.min` to pick minimum value of chunk.
See [`d3-array`](https://github.com/d3/d3-array/blob/09b8ff21742b365a7090e728120640fb45464637/README.md)
for all options.

Example

```javascript
pick.mean([1, 2, 3]);
// ==> 2
pick.mean([4, 5]);
// ==> 4.5
bin([1, 2, 3, 4, 5], 2, pick.mean);
// ==> [ 2, 4.5 ]
```

### `chunk(data, numChunks)`

Partition `data` into `numChunks` chunks. Returns an array holding values of chunks plus start
and end indices in `data`.

Example

```javascript
chunk([1, 2, 3, 4, 5], 2);
// ==>
// [
//   { start: 0, end: 2, data: [ 1, 2, 3 ] },
//   { start: 3, end: 4, data: [ 4, 5 ] }
// ]
```
