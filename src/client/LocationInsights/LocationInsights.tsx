import CodePurpleSvg from '@meteocons/svg-static/flat/code-purple.svg';
import ThermometerSvg from '@meteocons/svg-static/monochrome/thermometer.svg';

import TargetSvg from '@/assets/target.svg';
import calculateHeatRisk from '@/client/LocationInsights/calculateHeatRisk';
import { getWeatherCode } from '@/client/LocationInsights/getWeatherCode';
import { useWeather } from '@/client/LocationInsights/useWeather';

import './LocationInsights.scss';

const LocationInsights = () => {
  const { data, error, isLoading } = useWeather();

  if (error || !data || isLoading) {
    return null;
  }

  const heatRisk = calculateHeatRisk(data);

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
          <ThermometerSvg />
          <span>Heat Risk</span>
          <b className='heavy'>{heatRisk}</b>
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
