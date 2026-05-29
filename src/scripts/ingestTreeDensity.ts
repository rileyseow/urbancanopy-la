import fs from 'fs';
import path from 'path';

import { supabase } from '@/server/supabase';

/**
 * @note
 * This script should be run after `generateTreeDensity.ts`.
 * That script generates `tree-density.geojson` used here.
 */

const INPUT_PATH = path.resolve('./tree-density.geojson');
const BATCH_SIZE = 1000;

type TreePolygonFeature = {
  properties: {
    h3_index: string;
    tree_count: number;
  };
  geometry: GeoJSON.Geometry;
};

const main = async () => {
  const geojson = JSON.parse(
    fs.readFileSync(INPUT_PATH, 'utf8')
  ) as {
    features: TreePolygonFeature[];
  };

  const { features } = geojson;

  for (let i = 0; i < features.length; i += BATCH_SIZE) {
    const batch = features.slice(i, i + BATCH_SIZE);

    const results = await Promise.all(
      batch.map(f =>
        supabase.rpc('upsert_tree_density', {
          p_h3_index: f.properties.h3_index,
          p_tree_count: f.properties.tree_count,
          p_geometry: f.geometry,
        })
      )
    );

    const failed = results.filter(r => r.error);

    if (failed.length > 0) {
      console.error(`Batch ${i / BATCH_SIZE + 1} failed`);

      failed.forEach(result => {
        console.error(result.error);
      });

      process.exit(1);
    }

    console.log(
      `Uploaded ${Math.min(i + BATCH_SIZE, features.length)} / ${features.length}`
    );
  }

  console.log(
    'Supabase ingestion complete for tree density'
  );
};

main();
