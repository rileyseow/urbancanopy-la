import { NextResponse } from 'next/server';

import { fetchTransitRoutes } from '@/server/transit/fetchTransit';

export const GET = async () => {
  const data = await fetchTransitRoutes();
  return NextResponse.json(data);
};
