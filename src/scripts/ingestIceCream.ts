import 'dotenv/config';
import osmtogeojson from 'osmtogeojson';

import { supabase } from '@/server/supabase';

const query = `
[out:json][timeout:50];

(
 node["amenity"="ice_cream"](33.6, -118.7, 34.5, -117.2);
);

out body;
`;

const main = async () => {
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
      `Failed to fetch ice cream data: ${response.status} ${response.statusText}. ${errorText}`
    );
  }

  const data = await response.json();
  const geojson = osmtogeojson(data);

  for (const feature of geojson.features) {
    if (feature.geometry?.type !== 'Point') {
      continue;
    }

    const { name, opening_hours, id, amenity, ...rest } =
      feature.properties ?? {};

    const { error } = await supabase
      .from('ice_cream')
      .upsert({
        id: String(id),
        name: name ?? null,
        opening_hours: opening_hours ?? null,
        tags: rest,
        geom: `SRID=4326;POINT(${feature.geometry.coordinates[0]} ${feature.geometry.coordinates[1]})`,
      });

    if (error) {
      console.error(
        `Failed ice cream feature ${feature.id}`,
        error
      );
    } else {
      console.log(feature.id);
    }
  }
  console.log('Ice cream ingestion complete. Yum.');
};

main();
