import { NextResponse } from 'next/server';

import fetchIceCream from '@/server/iceCream/fetchIceCream';

export const GET = async () => {
  const data = await fetchIceCream();
  return NextResponse.json(data);
};
