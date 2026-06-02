import { MAP_CENTER } from '@/constants/MAP';
import type {
  WeatherForecastProperties,
  WeatherAQIProperties,
} from '@/types/weather.types';

const FORECAST_PARAMS =
  'current=apparent_temperature,cloud_cover,relative_humidity_2m,temperature_2m,uv_index,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph';

export const fetchWeatherForecast =
  async (): Promise<WeatherForecastProperties> => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${MAP_CENTER.lat}&longitude=${MAP_CENTER.lng}&${FORECAST_PARAMS}`,
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

export const fetchWeatherAQI =
  async (): Promise<WeatherAQIProperties> => {
    const res = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${MAP_CENTER.lat}&longitude=${MAP_CENTER.lng}&current=us_aqi`,
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
