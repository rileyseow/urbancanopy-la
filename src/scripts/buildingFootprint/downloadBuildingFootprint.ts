import fs from 'node:fs';
import { latLngToCell } from 'h3-js';
import { setTimeout } from 'node:timers/promises';

/**
 * Data returned from the ArcGIS API query in this file is sourced from
 * LA County Dataset ('LARIAC6_BUILDINGS_2020' - 3,293,177 features)
 * {@link https://data.lacounty.gov/datasets/lacounty::countywide-building-outlines-2020/about?layer=0}.
 */

export type CellStats = {
  buildingCount: number;
  heightSumM: number;
  totalFootprintAreaM2: number;
};

type ArcGisFeature = {
  attributes?: {
    OBJECTID: number;
    HEIGHT?: number;
    Shape__Area?: number;
  };
  geometry?: {
    rings?: number[][][];
  };
};

const START_OFFSET = 0; // adjust for paginated queries

const REQ_MAX_FEATURES = 500_000;
const REQ_BATCH_SIZE = 2_000;
const H3_RESOLUTION = 9;

const BUILDINGS_URL =
  'https://services.arcgis.com/RmCCgQtiZLDCtblq/arcgis/rest/services/Countywide_Building_Outlines_(2020)/FeatureServer/0/query';

const cellData = new Map<string, CellStats>();

/**
 * Fetch a single page from ArcGIS
 */
const fetchPage = async (offset: number) => {
  const url = new URL(BUILDINGS_URL);

  url.searchParams.set('where', "CODE='Building'");
  url.searchParams.set(
    'outFields',
    'OBJECTID,HEIGHT,Shape__Area'
  );
  url.searchParams.set('orderByFields', 'OBJECTID ASC');
  url.searchParams.set('returnGeometry', 'true');
  url.searchParams.set('outSR', '4326');
  url.searchParams.set('f', 'json');
  url.searchParams.set('resultOffset', String(offset));
  url.searchParams.set(
    'resultRecordCount',
    String(REQ_BATCH_SIZE)
  );

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.log(
          `HTTP ${res.status} (attempt ${attempt})`
        );
        await setTimeout(5_000);
        continue;
      }
      return res.json();
    } catch (e) {
      console.log(`Request failed (attempt ${attempt})`);
      await setTimeout(5_000);
    }
  }
  console.error(`Failed to fetch offset ${offset}`);
};

/**
 * Aggregate a building into an H3 cell
 */
const processBuilding = (f: ArcGisFeature) => {
  const ring = f.geometry?.rings?.[0];
  const areaM2 = f.attributes?.Shape__Area;
  const heightFt = f.attributes?.HEIGHT;

  if (
    !ring?.length
    || typeof areaM2 !== 'number'
    || typeof heightFt !== 'number'
  ) {
    return;
  }

  const centroidLng =
    ring.reduce((s: number, p: number[]) => s + p[0], 0)
    / ring.length;

  const centroidLat =
    ring.reduce((s: number, p: number[]) => s + p[1], 0)
    / ring.length;

  const h3 = latLngToCell(
    centroidLat,
    centroidLng,
    H3_RESOLUTION
  );

  const cell = cellData.get(h3) ?? {
    buildingCount: 0,
    heightSumM: 0,
    totalFootprintAreaM2: 0,
  };

  cell.buildingCount += 1;
  cell.heightSumM += heightFt * 0.3048; // convert ft -> m
  cell.totalFootprintAreaM2 += areaM2;

  cellData.set(h3, cell);
};

/**
 * Fetch and process buildings
 */
const fetchAllBuildings = async (
  startOffset: number,
  maxFeatures: number
) => {
  let offset = startOffset;
  const endOffset = startOffset + maxFeatures;

  while (offset < endOffset) {
    const data = await fetchPage(offset);
    const features = data.features ?? [];

    if (!features.length) {
      console.log('Break - features.length falsy');
      break;
    }

    features.forEach(processBuilding);
    offset += features.length;

    console.log(
      `Processed up to OBJECTID ${features.at(-1).attributes?.OBJECTID} (Running: ${offset.toLocaleString()} feat.)`
    );
  }

  console.log(
    `Generated ${cellData.size.toLocaleString()} h3 cells`
  );
};

const main = async () => {
  await fetchAllBuildings(START_OFFSET, REQ_MAX_FEATURES);

  // Save aggregated H3 statistics as compact json file
  const fname = `building-footprint-${START_OFFSET}-${START_OFFSET + REQ_MAX_FEATURES - 1}.json`;
  const data = JSON.stringify(Object.fromEntries(cellData));
  fs.writeFileSync(fname, data);
  console.log(`Saved ${fname}`);
};

main();
