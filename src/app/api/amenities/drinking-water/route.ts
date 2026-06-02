import { NextResponse } from 'next/server';

import { fetchDrinkingWater } from '@/server/fetchAmenities';

export const GET = async () => {
  const data = await fetchDrinkingWater();
  return NextResponse.json(data);
};
