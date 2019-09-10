import * as d3Array from "d3-array";

export { bin, d3Array as pick };

function bin(data, numBins, pickRepresentative = d3Array.max) {
  if (!Array.isArray(data)) {
    data = Array.from(data);
  }

  const binned = new Array(numBins);
  const binSize = data.length / numBins;

  for (let i = 0, start = 0, end = 0; i < numBins; i += 1) {
    end = Math.round((i + 1) * binSize);
    const chunk = data.slice(start, end);
    binned[i] = pickRepresentative(chunk);
    start = end;
  }

  return binned;
}
