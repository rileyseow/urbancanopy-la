import { NextResponse } from 'next/server';

import { fetchWeatherForecast } from '@/server/fetchWeather';

export const GET = async () => {
  const data = await fetchWeatherForecast();
  return NextResponse.json(data);
};
