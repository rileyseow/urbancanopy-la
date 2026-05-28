import type {
  WeatherProperties,
  HeatRisk,
} from '@/types/weather.types';

/**
 * Util function to compute a simplified pedestrian heat-risk
 * score using weighted weather and environmental factors.
 *
 * @note Weighting is heuristic-based. Apparent temperature and
 * UV exposure are treated as the strongest contributors to outdoor
 * heat discomfort. Cloud cover and wind reduce perceived heat
 * exposure. Humidity slightly increases discomfort.
 */
const calculateHeatRisk = (
  weather: WeatherProperties
): HeatRisk => {
  let score = 0;

  score += weather.apparentTemperature * 0.65;
  score += weather.uvIndex * 3;
  score -= weather.cloudCover * 0.08;
  score -= weather.windSpeed * 0.4;
  score += weather.humidity * 0.05;

  if (score >= 85) {
    return 'Extreme';
  } else if (score >= 72) {
    return 'High';
  } else if (score >= 58) {
    return 'Moderate';
  } else {
    return 'Low';
  }
};

export default calculateHeatRisk;
