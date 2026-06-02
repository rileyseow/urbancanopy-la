import { NextResponse } from 'next/server';

import fetchAmenities from '@/server/fetchAmenities';

export const GET = async () => {
  const data = await fetchAmenities();
  return NextResponse.json(data);
};
