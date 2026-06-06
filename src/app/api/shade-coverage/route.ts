import { NextResponse } from 'next/server';

import fetchShadeCoverage from '@/server/fetchShadeCoverage';

export const GET = async () => {
  const data = await fetchShadeCoverage();
  return NextResponse.json(data);
};
