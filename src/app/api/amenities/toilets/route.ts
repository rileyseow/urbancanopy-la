import { NextResponse } from 'next/server';

import { fetchToilets } from '@/server/fetchAmenities';

export const GET = async () => {
  const data = await fetchToilets();
  return NextResponse.json(data);
};
