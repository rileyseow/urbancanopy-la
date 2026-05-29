import CodePurpleSvg from '@meteocons/svg-static/flat/code-purple.svg';
import PollenWeedSvg from '@meteocons/svg-static/flat/pollen-weed.svg';

import TargetSvg from '@/assets/target.svg';
import { getWeatherCode } from '@/client/LocationInsights/getWeatherCode';
import {
  useWeatherForecast,
  useWeatherAQI,
} from '@/client/LocationInsights/useWeather';

import './LocationInsights.scss';

const LocationInsights = () => {
  const { data, error, isLoading } = useWeatherForecast();

  const {
    data: aqiData,
    error: aqiError,
    isLoading: aqiIsLoading,
  } = useWeatherAQI();

  if (
    error
    || aqiError
    || !data
    || !aqiData
    || isLoading
    || aqiIsLoading
  ) {
    return null;
  }

  const {
    apparentTemperature,
    temperature,
    uvIndex,
    weatherCode,
  } = data;

  const { Icon: WeatherIcon, label: weatherDesc } =
    getWeatherCode(weatherCode);

  return (
    <div className='LocationInsights'>
      <div className='temperature-summary'>
        <WeatherIcon className='weather-icon' />
        <b className='temp heavy'>
          {Math.round(temperature)}°F
        </b>
        <span>
          Feels like{' '}
          <b className='heavy'>
            {Math.round(apparentTemperature)}°F
          </b>
        </span>
        <span>{weatherDesc}</span>
      </div>
      <div className='weather-metadata'>
        <div className='heat-risk'>
          <PollenWeedSvg />
          <span>AQI</span>
          <b className='heavy'>{aqiData.aqi}</b>
        </div>
        <div className='uv-index'>
          <CodePurpleSvg />
          <span>UV Index</span>
          <b className='heavy'>{uvIndex}</b>
        </div>
      </div>
      <div className='user-location-text'>
        <TargetSvg />
        <span>
          <b>Center on your location</b> for more specific
          insights
        </span>
      </div>
    </div>
  );
};

export default LocationInsights;
