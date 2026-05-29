import { NextResponse } from 'next/server';

import fetchTreeDensity from '@/server/treeDensity/fetchTreeDensity';

export const GET = async () => {
  const data = await fetchTreeDensity();
  return NextResponse.json(data);
};
