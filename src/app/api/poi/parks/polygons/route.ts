import { NextResponse } from 'next/server';

import { fetchParksPolygons } from '@/server/parks/fetchParks';

export const GET = async () => {
  const data = await fetchParksPolygons();
  return NextResponse.json(data);
};
