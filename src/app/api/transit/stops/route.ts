import { NextResponse } from 'next/server';

import { fetchTransitStops } from '@/server/transit/fetchTransit';

export const GET = async () => {
  const data = await fetchTransitStops();
  return NextResponse.json(data);
};
