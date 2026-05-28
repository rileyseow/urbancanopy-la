import { MAP_CENTER } from '@/constants/MAP';
import type { WeatherProperties } from '@/types/weather.types';

const OPEN_METEO_URL_PARAMS =
  'current=apparent_temperature,cloud_cover,relative_humidity_2m,temperature_2m,uv_index,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph';

const fetchWeather =
  async (): Promise<WeatherProperties> => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${MAP_CENTER.lat}&longitude=${MAP_CENTER.lng}&${OPEN_METEO_URL_PARAMS}`,
      {
        next: {
          revalidate: 60 * 5, // 5 minutes
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        'Failed to fetch weather data from Open-Meteo'
      );
    }

    const data = await res.json();

    const {
      apparent_temperature,
      cloud_cover,
      relative_humidity_2m,
      temperature_2m,
      uv_index,
      weather_code,
      wind_speed_10m,
    } = data.current;

    return {
      apparentTemperature: apparent_temperature,
      cloudCover: cloud_cover,
      humidity: relative_humidity_2m,
      temperature: temperature_2m,
      uvIndex: uv_index,
      weatherCode: weather_code,
      windSpeed: wind_speed_10m,
    };
  };

export default fetchWeather;
