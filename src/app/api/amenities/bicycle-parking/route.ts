import { NextResponse } from 'next/server';

import { fetchBicycleParking } from '@/server/fetchAmenities';

export const GET = async () => {
  const data = await fetchBicycleParking();
  return NextResponse.json(data);
};
