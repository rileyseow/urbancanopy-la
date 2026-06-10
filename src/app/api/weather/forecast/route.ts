import { NextResponse } from 'next/server';

import { fetchWeatherForecast } from '@/server/fetchWeather';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const lng = Number(searchParams.get('lng'));
  const lat = Number(searchParams.get('lat'));

  if (Number.isNaN(lng) || Number.isNaN(lat)) {
    return NextResponse.json(
      { error: 'Invalid coordinates' },
      { status: 400 }
    );
  }

  const data = await fetchWeatherForecast({ lng, lat });
  return NextResponse.json(data);
};
