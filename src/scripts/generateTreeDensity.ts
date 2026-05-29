import fs from 'node:fs';
import { chain } from 'stream-chain';
import { parser } from 'stream-json';
import { pick } from 'stream-json/filters/pick.js';
import { streamArray } from 'stream-json/streamers/stream-array.js';
import { latLngToCell, cellToBoundary } from 'h3-js';

/**
 * Download `2022_Urban_Trees.geojson` for coordinates of ~9.4 million trees in LA County
 * 2022 from {@link https://data.lacounty.gov/datasets/lacounty::2022-urban-trees/about}.
 */
const INPUT = './2022_Urban_Trees.geojson';
const OUTPUT = './tree-density.geojson';

const H3_RESOLUTION = 8;

const counts = new Map<string, number>(); // map from h3 identifier to count of points in cell
let processed = 0; // iterator for console logging

const pipeline = chain([
  fs.createReadStream(INPUT),
  parser(),
  pick({ filter: 'features' }),
  streamArray(),
]);

pipeline.on('data', ({ value }) => {
  const coords = value.geometry?.coordinates;

  if (!coords) {
    return;
  }

  const [lng, lat] = coords;
  const h3 = latLngToCell(lat, lng, H3_RESOLUTION);
  counts.set(h3, (counts.get(h3) ?? 0) + 1);
  processed += 1;
  if (processed % 10000 === 0) {
    console.log(`Processed ${processed} trees`);
  }
});

pipeline.on('end', () => {
  const features = [];

  for (const [h3, treeCount] of counts.entries()) {
    const boundary = cellToBoundary(h3, true);

    features.push({
      type: 'Feature',
      properties: {
        h3_index: h3,
        tree_count: treeCount,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[...boundary, boundary[0]]],
      },
    });
  }

  const geojson = {
    type: 'FeatureCollection',
    features,
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(geojson));
  console.log(`Generated ${features.length} hexes`);
});
