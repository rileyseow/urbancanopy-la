import { supabase } from '@/server/supabase';
import osmtogeojson from 'osmtogeojson';

const query = `
[out:json][timeout:50];

(
 nwr["leisure"="park"](33.6, -117.95, 34.5, -117.2);
 nwr["landuse"="recreation_ground"](33.6, -117.95, 34.5, -117.2);
 nwr["boundary"="national_park"](33.6, -117.95, 34.5, -117.2);
 nwr["leisure"="garden"](33.6, -117.95, 34.5, -117.2);
);

out geom;
`;

async function main() {
  const response = await fetch(
    'https://overpass-api.de/api/interpreter',
    {
      method: 'POST',
      headers: {
        'User-Agent': 'UrbanCanopy/1.0',
      },
      body: new URLSearchParams({ data: query }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch parks: ${response.status} ${response.statusText}. ${errorText}`
    );
  }

  const data = await response.json();
  const geojson = osmtogeojson(data);

  for (const feature of geojson.features) {
    const type = feature.geometry?.type;
    const name = feature.properties?.name;

    if (!name) {
      continue;
    }

    let error = null;

    if (type === 'Polygon' || type === 'MultiPolygon') {
      error = await supabase.rpc('insert_park_polygon', {
        park: feature,
      });
    }

    if (type === 'Point') {
      error = await supabase.rpc('insert_park_point', {
        park: feature,
      });
    }

    if (error) {
      console.error(
        `Failed park ${feature.id}`,
        error.error
      );
    }
  }
  console.log('finished ingesting parks');
}

main();
