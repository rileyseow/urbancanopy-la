import ClearDaySvg from '@meteocons/svg-static/flat/clear-day.svg';
import CloudySvg from '@meteocons/svg-static/flat/cloudy.svg';
import CodeYellowSvg from '@meteocons/svg-static/flat/code-yellow.svg';
import DrizzleSvg from '@meteocons/svg-static/flat/drizzle.svg';
import FogSvg from '@meteocons/svg-static/flat/fog.svg';
import MostlyClearDaySvg from '@meteocons/svg-static/flat/mostly-clear-day.svg';
import RainSvg from '@meteocons/svg-static/flat/rain.svg';
import SleetSvg from '@meteocons/svg-static/flat/sleet.svg';
import SnowSvg from '@meteocons/svg-static/flat/snow.svg';
import ThunderstormsSvg from '@meteocons/svg-static/flat/thunderstorms.svg';
import type { ComponentType, SVGProps } from 'react';

import type { WeatherForecastProperties } from '@/types/weather.types';

type Weather =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'freezing-rain'
  | 'snow'
  | 'thunderstorms'
  | 'unavailable';

const WEATHER_ICONS: Record<
  Weather,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  clear: ClearDaySvg,
  'partly-cloudy': MostlyClearDaySvg,
  cloudy: CloudySvg,
  fog: FogSvg,
  drizzle: DrizzleSvg,
  rain: RainSvg,
  'freezing-rain': SleetSvg,
  snow: SnowSvg,
  thunderstorms: ThunderstormsSvg,
  unavailable: CodeYellowSvg,
};

export const getWeatherCode = (
  code: WeatherForecastProperties['weatherCode']
): {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
} => {
  if (code === 0) {
    return {
      Icon: WEATHER_ICONS.clear,
      label: 'Clear sky',
    };
  } else if (code === 1 || code === 2) {
    return {
      Icon: WEATHER_ICONS['partly-cloudy'],
      label: code === 1 ? 'Mainly clear' : 'Partly cloudy',
    };
  } else if (code === 3) {
    return {
      Icon: WEATHER_ICONS['cloudy'],
      label: 'Overcast',
    };
  } else if (code === 45 || code === 48) {
    return {
      Icon: WEATHER_ICONS['fog'],
      label: 'Fog',
    };
  } else if (code === 51 || code === 53 || code === 55) {
    return {
      Icon: WEATHER_ICONS['drizzle'],
      label: 'Drizzle',
    };
  } else if (
    code === 61
    || code === 63
    || code === 65
    || code === 80
    || code === 81
    || code === 82
  ) {
    return {
      Icon: WEATHER_ICONS['rain'],
      label: 'Rain',
    };
  } else if (
    code === 56
    || code === 57
    || code === 66
    || code === 67
  ) {
    return {
      Icon: WEATHER_ICONS['freezing-rain'],
      label: 'Freezing rain',
    };
  } else if (
    code === 71
    || code === 73
    || code === 75
    || code === 77
    || code === 85
    || code === 86
  ) {
    return {
      Icon: WEATHER_ICONS['snow'],
      label: 'Snow',
    };
  } else if (code === 95 || code === 96 || code === 99) {
    return {
      Icon: WEATHER_ICONS['thunderstorms'],
      label: 'Thunderstorms',
    };
  } else {
    return {
      Icon: WEATHER_ICONS['unavailable'],
      label: 'Weather code unavailable',
    };
  }
};
