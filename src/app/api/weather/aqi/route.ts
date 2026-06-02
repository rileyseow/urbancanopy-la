import { NextResponse } from 'next/server';

import { fetchWeatherAQI } from '@/server/fetchWeather';

export const GET = async () => {
  const data = await fetchWeatherAQI();
  return NextResponse.json(data);
};
