import { NextResponse } from 'next/server';

import fetchIceCream from '@/server/fetchIceCream';

export const GET = async () => {
  const data = await fetchIceCream();
  return NextResponse.json(data);
};
