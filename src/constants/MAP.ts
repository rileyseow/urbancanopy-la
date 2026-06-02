import { LngLat, type LngLatBoundsLike } from 'maplibre-gl';

/**
 * @constant
 * @description The initial center of the map - Los Angeles
 */
export const MAP_CENTER = new LngLat(-118.25, 34.05);

/**
 * @constant
 * @description The maximum bounds of the map - Southern California region
 */
export const MAP_MAX_BOUNDS: Extract<
  LngLatBoundsLike,
  [number, number, number, number]
> = [-121.81, 32.2, -113.9, 35.2];

/**
 * @constant
 * @description The map style spec
 * @see {@link https://openfreemap.org/}
 */
export const MAP_STYLE =
  'https://tiles.openfreemap.org/styles/bright';

/**
 * @constant
 * @description The initial zoom level of the map
 */
export const MAP_ZOOM = 10;

/**
 * @constant
 * @description The minimum zoom level for 3d buildings to be visible
 */
export const BUILDINGS_MIN_ZOOM = 14;

/**
 * @constant
 * @description The minimum zoom level for transit stops to be visible
 */
export const TRANSIT_STOPS_MIN_ZOOM = 12;
