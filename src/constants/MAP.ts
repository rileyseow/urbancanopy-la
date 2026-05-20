import { LngLat, type LngLatBoundsLike } from 'maplibre-gl';

export const MAP_CENTER = new LngLat(-118.25, 34.05); // Los Angeles

export const MAP_MAX_BOUNDS: Extract<
  LngLatBoundsLike,
  [number, number, number, number]
> = [
  // Southern California region
  -121.81, 32.2, -113.9, 35.2,
];

export const MAP_ZOOM = 10;
