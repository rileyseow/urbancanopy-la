import { NextResponse } from 'next/server';

import { fetchParksPoints } from '@/server/parks/fetchParks';

export const GET = async () => {
  const data = await fetchParksPoints();
  return NextResponse.json(data);
};
