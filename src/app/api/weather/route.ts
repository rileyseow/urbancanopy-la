import { NextResponse } from 'next/server';

import fetchWeather from '@/server/weather/fetchWeather';

export const GET = async () => {
  const data = await fetchWeather();
  return NextResponse.json(data);
};
