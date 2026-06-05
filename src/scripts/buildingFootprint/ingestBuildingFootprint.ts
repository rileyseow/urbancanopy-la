import { cellToBoundary } from 'h3-js';
import fs from 'node:fs';
import path from 'node:path';

import type { ProcessedCellStats } from '@/scripts/buildingFootprint/coalesceBuildingFootprint';
import { supabase } from '@/server/supabase';

/**
 * Run `coalesceBuildingFootprint.ts` to generate the `INPUT_PATH` file.
 */

const INPUT_PATH = path.resolve(
  './building-footprint-coalesced.json'
);
const BATCH_SIZE = 1000;

const main = async () => {
  const data = JSON.parse(
    fs.readFileSync(INPUT_PATH, 'utf8')
  ) as ProcessedCellStats[];

  for (let i = 0; i < data.length; i += BATCH_SIZE) {
    const batch = data.slice(i, i + BATCH_SIZE);

    const results = await Promise.all(
      batch.map(f =>
        supabase.rpc('upsert_building_footprint', {
          p_h3_index: f.h3Index,
          p_geometry: {
            type: 'Polygon',
            coordinates: [
              [
                ...cellToBoundary(f.h3Index, true),
                cellToBoundary(f.h3Index, true)[0],
              ],
            ],
          },
          p_building_count: f.buildingCount,
          p_avg_building_height_m: f.avgBuildingHeightM,
          p_total_building_footprint_area_m2:
            f.totalFootprintAreaM2,
          p_building_coverage_ratio:
            f.buildingCoverageRatio,
          p_building_coverage_score:
            f.buildingCoverageScore,
          p_building_height_score: f.buildingHeightScore,
        })
      )
    );

    const failed = results.filter(r => r.error);

    if (failed.length > 0) {
      console.error(`Batch ${i / BATCH_SIZE + 1} failed`);

      failed.forEach(r => {
        console.error(r.error);
      });

      process.exit(1);
    }

    console.log(
      `Uploaded ${Math.min(i + BATCH_SIZE, data.length)} / ${data.length}`
    );
  }

  console.log(
    'Supabase ingestion complete for building footprint'
  );
};

main();
