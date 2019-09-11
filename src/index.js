import * as d3Array from "d3-array";

export { bin, chunk, d3Array as pick };

function bin(data, numBins, pickRepresentative = d3Array.max) {
  if (!Array.isArray(data)) {
    data = Array.from(data);
  }

  const chunks = chunk(data, numBins);
  return chunks.map(chunk => pickRepresentative(chunk.data));
}

function chunk(data, numBins) {
  const chunks = new Array(numBins);
  const binSize = data.length / numBins;

  for (let i = 0, start = 0, end = 0; i < numBins; i += 1) {
    end = Math.round((i + 1) * binSize);
    const slice = data.slice(start, end);
    chunks[i] = {
      start,
      end: end - 1,
      data: slice
    };
    start = end;
  }

  return chunks;
}
