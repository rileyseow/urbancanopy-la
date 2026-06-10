export type HeatRisk =
  | 'Extreme'
  | 'High'
  | 'Moderate'
  | 'Low';

/**
 * @see {@link https://open-meteo.com/en/docs}
 */
export type WeatherForecastProperties = {
  /**
   * The perceived feels-like temperature combining wind chill
   * factor, relative humidity and solar radiation.
   * @example 64.3
   */
  apparentTemperature: number;

  /**
   * Air temperature at 2 meters above ground.
   * @example 66.8
   */
  temperature: number;

  /**
   * Ultraviolet index.
   * @see {@link https://www.who.int/news-room/questions-and-answers/item/radiation-the-ultraviolet-(uv)-index}
   * @example 4.7
   */
  uvIndex: number;

  /**
   * Weather condition as a numeric code. Follows WMO weather interpretation codes.
   * @see {@link https://open-meteo.com/en/docs}
   * @example 1
   */
  weatherCode: number;
};

export type WeatherAQIProperties = {
  /**
   * Consolidated United States Air Quality Index (AQI). Returns
   * the maximum of all individual indices calculated for different
   * particulate matter and gases, e.g. `us_aqi_pm10`, `us_aqi_nitrogen_dioxide`
   * @example 49
   */
  aqi: number;
};
