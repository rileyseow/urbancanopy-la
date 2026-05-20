import { NextResponse } from 'next/server';

import fetchParks from '@/server/parks/fetchParks';

export const GET = async () => {
  const data = await fetchParks();
  return NextResponse.json(data);
};
