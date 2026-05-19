import { NextResponse } from 'next/server';
import osmtogeojson from 'osmtogeojson';

import fetchParks from '@/server/parks/fetchParks';

export const GET = async () => {
  const raw = await fetchParks();
  const geojson = osmtogeojson(raw);
  return NextResponse.json(geojson);
};
