import 'dotenv/config';
import osmtogeojson from 'osmtogeojson';

import { supabase } from '@/server/supabase';

const query = `
[out:json][timeout:50];

(
 node["amenity"="drinking_water"](33.6, -118.7, 34.5, -117.2);
 node["amenity"="bicycle_parking"](33.6, -118.7, 34.5, -117.2);
 node["amenity"="toilets"](33.6, -118.7, 34.5, -117.2);
);

out body;
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
      `Failed to fetch amenities: ${response.status} ${response.statusText}. ${errorText}`
    );
  }

  const data = await response.json();
  const geojson = osmtogeojson(data);

  for (const feature of geojson.features) {
    if (feature.geometry?.type !== 'Point') {
      continue;
    }

    const properties = feature.properties ?? {};

    const amenityType =
      properties.amenity === 'drinking_water' ?
        'drinking_water'
      : properties.amenity === 'bicycle_parking' ?
        'bicycle_parking'
      : (
        properties.amenity === 'toilets'
        || properties.toilets === 'yes'
      ) ?
        'toilets'
      : null;

    if (!amenityType) {
      continue;
    }

    const { error } = await supabase
      .from('amenities')
      .upsert({
        id: feature.id,
        name: properties.name ?? null,
        tags: properties,
        geom: `SRID=4326;POINT(${feature.geometry.coordinates[0]} ${feature.geometry.coordinates[1]})`,
        amenity_type: amenityType,
      });

    if (error) {
      console.error(`Failed amenity ${feature.id}`, error);
    } else {
      console.log(feature.id);
    }
  }
  console.log('Amenities ingestion complete');
}

main();
