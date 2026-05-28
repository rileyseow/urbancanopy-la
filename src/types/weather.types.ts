export type HeatRisk =
  | 'Extreme'
  | 'High'
  | 'Moderate'
  | 'Low';

/**
 * @see {@link https://open-meteo.com/en/docs}
 */
export type WeatherProperties = {
  /**
   * The perceived feels-like temperature combining wind chill
   * factor, relative humidity and solar radiation.
   * @example 64.3
   */
  apparentTemperature: number;

  /**
   * Total cloud cover as an area fraction percentage.
   * @example 39
   */
  cloudCover: number;

  /**
   * Relative humidity percentage at 2 meters above ground.
   * @example 54
   */
  humidity: number;

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

  /**
   * Wind speed at 10 meters above ground.
   * @example 10.4
   */
  windSpeed: number;
};
