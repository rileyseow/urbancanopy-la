import fs from 'fs';
import { parse } from 'csv-parse/sync';
import path from 'path';

import buildLineStrings, {
  type ShapeRow,
} from '@/scripts/gtfs/buildLineStrings';
import { supabase } from '@/server/supabase';

/**
 * Download GTFS data from https://mobilitydatabase.org. Unzip.
 * Place files referenced in the `ingest*` functions in the specified
 * directories, e.g. `src/gtfs/la_metro_rail/stops.txt`.
 */
const GTFS_AGENCIES = [
  {
    agencyId: 'LACMTA_Rail',
    gtfsDir: 'src/gtfs/la_metro_rail',
  },
  {
    agencyId: 'LACMTA',
    gtfsDir: 'src/gtfs/la_metro_bus',
  },
];

const parseCsv = (filePath: string) => {
  return parse(fs.readFileSync(filePath, 'utf8'), {
    columns: true,
    skip_empty_lines: true,
  });
};

const chunk = <T>(arr: T[], size: number) =>
  Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, (i + 1) * size)
  );

const ingestStops = async ({
  agencyId,
  gtfsDir,
}: {
  agencyId: string;
  gtfsDir: string;
}) => {
  const stops = parseCsv(path.join(gtfsDir, 'stops.txt'));

  const normalizedStops = stops.map((stop: any) => ({
    stop_id: `${agencyId}_${stop.stop_id}`,
    agency_id: agencyId,
    stop_name: stop.stop_name,
    stop_code: stop.stop_code,
    route_type: agencyId === 'LACMTA_Rail' ? 1 : 3,
    geometry: `SRID=4326;POINT(${stop.stop_lon} ${stop.stop_lat})`,
  }));

  const { error } = await supabase
    .from('gtfs_stops')
    .upsert(normalizedStops, {
      onConflict: 'stop_id',
    });

  if (error) {
    console.error(error);
  } else {
    console.log('Stops data ingested successfully');
  }
};

const ingestRoutes = async ({
  agencyId,
  gtfsDir,
}: {
  agencyId: string;
  gtfsDir: string;
}) => {
  const routes = parseCsv(path.join(gtfsDir, 'routes.txt'));

  const normalizedRoutes = routes.map((route: any) => ({
    route_id: `${agencyId}_${route.route_id}`,
    agency_id: agencyId,
    route_short_name: route.route_short_name,
    route_long_name: route.route_long_name,
    route_desc: route.route_desc,
    route_type: parseInt(route.route_type),
    route_color: route.route_color,
    route_text_color: route.route_text_color,
    route_url: route.route_url,
  }));

  const { error } = await supabase
    .from('gtfs_routes')
    .upsert(normalizedRoutes, {
      onConflict: 'route_id',
    });

  if (error) {
    console.error(error);
  } else {
    console.log('Routes data ingested successfully');
  }
};

const ingestShapes = async ({
  agencyId,
  gtfsDir,
}: {
  agencyId: string;
  gtfsDir: string;
}) => {
  const trips = parseCsv(path.join(gtfsDir, 'trips.txt'));

  const shapes = parseCsv(
    path.join(gtfsDir, 'shapes.txt')
  ) as ShapeRow[];

  const lineStrings = buildLineStrings(shapes);

  const normalizedShapes = lineStrings
    .map(shape => {
      const matchingTrip = trips.find(
        (trip: any) => trip.shape_id === shape.shape_id
      ) as any;

      return matchingTrip ?
          {
            shape_id: `${agencyId}_${shape.shape_id}`,
            route_id: `${agencyId}_${matchingTrip.route_id}`,
            geometry: shape.geometry,
          }
        : null;
    })
    .filter(Boolean);

  // Chunk shape ingestion to avoid hitting statement_timeout errors
  for (const batch of chunk(normalizedShapes, 300)) {
    const { error } = await supabase.rpc(
      'ingest_gtfs_shapes',
      {
        shapes: batch,
      }
    );

    if (error) {
      console.error(error);
    } else {
      console.log('Shapes data ingested successfully');
    }
  }
};

const main = async () => {
  await ingestStops(GTFS_AGENCIES[0]);
  await ingestRoutes(GTFS_AGENCIES[0]);
  await ingestShapes(GTFS_AGENCIES[0]);

  await ingestStops(GTFS_AGENCIES[1]);
  await ingestRoutes(GTFS_AGENCIES[1]);
  await ingestShapes(GTFS_AGENCIES[1]);
};

main();
