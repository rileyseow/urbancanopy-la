import { LngLat, type LngLatBoundsLike } from 'maplibre-gl';

/**
 * @constant MAP_CENTER
 * @description The initial center of the map - Los Angeles
 */
export const MAP_CENTER = new LngLat(-118.25, 34.05);

/**
 * @constant MAP_MAX_BOUNDS
 * @description The maximum bounds of the map - Southern California region
 */
export const MAP_MAX_BOUNDS: Extract<
  LngLatBoundsLike,
  [number, number, number, number]
> = [-121.81, 32.2, -113.9, 35.2];

/**
 * @constant MAP_ZOOM
 * @description The initial zoom level of the map
 */
export const MAP_ZOOM = 10;
