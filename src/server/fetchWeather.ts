import type { Coordinates } from '@/types/map.types';
import type {
  WeatherForecastProperties,
  WeatherAQIProperties,
} from '@/types/weather.types';

const FORECAST_PARAMS =
  'current=apparent_temperature,temperature_2m,uv_index,weather_code&temperature_unit=fahrenheit';

export const fetchWeatherForecast = async ({
  lng,
  lat,
}: Coordinates): Promise<WeatherForecastProperties> => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&${FORECAST_PARAMS}`,
    {
      next: {
        revalidate: 60 * 5, // 5 minutes
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      'Failed to fetch weather forecast data from Open-Meteo'
    );
  }

  const data = await res.json();

  const {
    apparent_temperature,
    temperature_2m,
    uv_index,
    weather_code,
  } = data.current;

  return {
    apparentTemperature: apparent_temperature,
    temperature: temperature_2m,
    uvIndex: uv_index,
    weatherCode: weather_code,
  };
};

export const fetchWeatherAQI = async ({
  lng,
  lat,
}: Coordinates): Promise<WeatherAQIProperties> => {
  const res = await fetch(
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=us_aqi`,
    {
      next: {
        revalidate: 60 * 5, // 5 minutes
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      'Failed to fetch weather AQI data from Open-Meteo'
    );
  }

  const data = await res.json();
  return { aqi: data.current.us_aqi };
};
