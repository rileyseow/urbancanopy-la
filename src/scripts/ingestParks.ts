import fs from 'node:fs';
import path from 'node:path';

import { supabase } from '@/server/supabase';

/**
 * Download `2025_Recreational_Spaces.geojson` for biannually-updated LA County Parks data
 * from {@link https://egis-lacounty.hub.arcgis.com/datasets/lacounty::recreational-spaces/about}.
 */
const INPUT_PATH = path.resolve(
  './2025_Recreational_Spaces.geojson'
);
const BATCH_SIZE = 100;

type Park = {
  properties: {
    SUID_NMA: string | number;
    PARK_NAME: string | null;
    ACCESS_TYP: string | null;
    PARK_URL: string | null;
    MNG_AGNCY: string | null;
    MNG_AG_LEV: string | null;
    AGNCY_WEB: string | null;
    ACRES: number | null;
  };
  geometry: GeoJSON.Geometry;
};

const isPark = (name: string | null | undefined) =>
  name?.toLowerCase().includes('park')
  || name?.toLowerCase().includes('garden');

const main = async () => {
  const geojson = JSON.parse(
    fs.readFileSync(INPUT_PATH, 'utf8')
  ) as {
    features: Park[];
  };

  const parks = geojson.features.filter(f =>
    isPark(f.properties.PARK_NAME)
  );

  console.log(
    `Found ${parks.length} parks/gardens out of ${geojson.features.length} recreational spaces`
  );

  for (let i = 0; i < parks.length; i += BATCH_SIZE) {
    const batch = parks.slice(i, i + BATCH_SIZE);

    const results = await Promise.all(
      batch.map(feature =>
        supabase.rpc('upsert_park', {
          p_id: String(feature.properties.SUID_NMA),
          p_name: feature.properties.PARK_NAME,
          p_access_type: feature.properties.ACCESS_TYP,
          p_url:
            !feature.properties.PARK_URL?.trim().length ?
              null
            : feature.properties.PARK_URL,
          p_managing_agency: feature.properties.MNG_AGNCY,
          p_agency_level: feature.properties.MNG_AG_LEV,
          p_agency_url:
            !feature.properties.AGNCY_WEB?.trim().length ?
              null
            : feature.properties.AGNCY_WEB,
          p_acres: feature.properties.ACRES,
          p_geometry: feature.geometry,
        })
      )
    );

    const failed = results.filter(result => result.error);

    if (failed.length > 0) {
      console.error(`Batch ${i / BATCH_SIZE + 1} failed`);

      failed.forEach(result => {
        console.error(result.error);
      });

      process.exit(1);
    }

    console.log(
      `Uploaded ${Math.min(i + BATCH_SIZE, parks.length)} / ${parks.length}`
    );
  }

  console.log('Supabase ingestion complete for parks');
};

main();
